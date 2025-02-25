// app/api/items/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import sql from "mssql";

export async function GET() {
  console.time("Query Execution Time");
  try {
    const pool = await connectDB();
    console.log("Connection successful!");

    // Prepare the query (use parameterized queries to avoid SQL injection)
    const partNo = "268181"; // Replace with your actual partNo value
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

    console.log("Executing query...");
    const result = await pool
      .request()
      .input("partNo", sql.VarChar, partNo)
      .input("rev", sql.VarChar, rev)
      .query(query);

    console.timeEnd("Query Execution Time");

    // Log the result to check if data is being returned
    console.log("Query result:", result.recordset);

    if (result.recordset.length === 0) {
      console.log("No data found matching the query.");
      return NextResponse.json({ message: "No data found" }, { status: 404 });
    }

    // Return the result if there is data
    return NextResponse.json(result.recordset);
  } catch (error) {
    console.error("Error executing query:", error);
    return NextResponse.json(
      { error: "Database query failed" },
      { status: 500 }
    );
  }
}
