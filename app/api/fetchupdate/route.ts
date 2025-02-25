import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import sql from "mssql";
import axios from "axios";
import { getManufacturedPartsCosting } from "@/app/lib/costcalculate";
interface ClickUpTask {
  id: string;
  name: string;
  status: {
    status: string;
  };
  custom_fields: {
    id: string;
    name: string;
    value: any; // Value can be a string, number, or object
  }[];
}

interface ClickUpTaskResponse {
  tasks: ClickUpTask[];
}

const API_TOKEN = process.env.CLICKUP_API_TOKEN;
const LIST_ID = process.env.CLICKUP_LIST_ID;

const BASE_URL = "https://api.clickup.com/api/v2";
const HEADERS = {
  Authorization: API_TOKEN,
  "Content-Type": "application/json",
};

// Function to update a custom field in ClickUp
async function updateCustomField(taskId: string, fieldId: string, value: any) {
  try {
    const response = await axios.post(
      `${BASE_URL}/task/${taskId}/field/${fieldId}`,
      { value },
      { headers: HEADERS }
    );
    return response.data;
  } catch (error: any) {
    console.error(
      `❌ Error Updating Field ${fieldId} for Task ${taskId}:`,
      error.response?.data || error.message
    );
    throw error;
  }
}

export async function GET() {
  try {
    const pool = await connectDB();
    console.log("Connection successful!");
    const response = await axios.get<ClickUpTaskResponse>(
      `${BASE_URL}/list/${LIST_ID}/task`,
      {
        headers: HEADERS,
      }
    );

    const tasks = response.data.tasks;

    // Transform tasks and update "Rework Cost" based on "Rwk: Part Number"
    const transformedTasks = await Promise.all(
      tasks.map(async (task) => {
        const partNumberField = task.custom_fields.find(
          (field) => field.name === "Rwk: Part Number"
        );
        const reworkCostField = task.custom_fields.find(
          (field) => field.name === "Rework Cost"
        );

        const partNumber: any = partNumberField?.value || 1;
        let reworkCost = reworkCostField?.value;

        // If "Rwk: Part Number" exists, query the database
        if (partNumber) {
          const partNo = partNumber; // Replace with your actual partNo value
          const rev = "0"; // Replace with your actual rev value

          const query = `
            SELECT 
              i."PartNo", 
              i."Rev",
              CASE 
                WHEN m."MaterialClass" IN ('PL', 'PPL', 'WM', 'EM') 
                THEN i."Weight" * ((m."Dim1" / 1000 * m."Dim2" / 1000) * (m."Dim3" / 1000) * m."MassDensity") * im."SourceCost"
                WHEN m."MaterialClass" IN ('RB', 'SB', 'FL', 'AN', 'RT', 'CH', 'HS', 'UC', 'UB', 'WP', 'MLNG') 
                THEN (i."Length" / m."Dim4") * im."SourceCost"
                ELSE NULL
              END AS "MaterialCost"
            FROM "Item" i
            LEFT JOIN "Material" m ON i."MaterialStandard" = m."PartNo"
            LEFT JOIN "Item" im ON m."PartNo" = im."PartNo" 
              AND im."Rev" = (
                SELECT MAX(im2."Rev") 
                FROM "Item" im2 
                WHERE im2."PartNo" = im."PartNo"
              )
            WHERE i."PartNo" = @partNo
              AND i."Rev" = @rev;
          `;

          // console.log(`Executing query for task ${task.id}...`);
          // console.time("Query Execution Time"); // Start the timer
          const result = await pool
            .request()
            .input("partNo", sql.VarChar, partNo)
            .input("rev", sql.VarChar, rev)
            .query(query);

          // console.timeEnd("Query Execution Time"); // End the timer
          // console.log(`Query executed for task ${task.id}`);
          if (result.recordset.length === 0) {
            console.error("No results found for part number:", partNumber);
            return null; // Skip this task or handle it appropriately
          }
          const resultcost_value = result.recordset[0].MaterialCost;
          // console.log(`Material cost for task ${task.id}:`, resultcost_value);

          // If a valid material cost is returned, update "Rework Cost"
          if (result !== null && reworkCostField) {
            await updateCustomField(task.id, reworkCostField.id, partNo);
            reworkCost = resultcost_value; // Update the value in the response
          }
        }

        return {
          id: task.id,
          name: task.name,
          status: task.status.status,
          customFields: task.custom_fields.map((field) => ({
            id: field.id,
            name: field.name,
            value: field.value,
            displayValue:
              typeof field.value === "object" && field.value !== null
                ? field.value.percent_complete || JSON.stringify(field.value)
                : field.value,
          })),
          partNumber,
          reworkCost,
        };
      })
    );

    return NextResponse.json(transformedTasks);
  } catch (error: any) {
    console.error(
      "❌ Error Fetching Tasks:",
      error.response?.data || error.message
    );
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}
