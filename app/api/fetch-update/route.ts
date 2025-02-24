import { NextResponse } from "next/server";
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

        const partNumber: any = partNumberField?.value;
        let reworkCost = reworkCostField?.value;

        // If "Rwk: Part Number" exists, query the database
        if (partNumber) {
          const materialCost = await getManufacturedPartsCosting(partNumber, 0); // rev = 0
          console.log(partNumber);
          // If a valid material cost is returned, update "Rework Cost"
          if (materialCost !== null && reworkCostField) {
            await updateCustomField(task.id, reworkCostField.id, materialCost);
            reworkCost = materialCost; // Update the value in the response
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
