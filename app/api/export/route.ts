// app/api/export/route.ts
import { generateFile } from "@/app/lib/createFile";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Parse the request body to get the data
    const body = await request.text();

    // Decode the URL-encoded body
    const params = new URLSearchParams(body);
    const dataString = params.get("data"); // Get the 'data' field

    if (!dataString) {
      throw new Error('Missing "data" field in request body');
    }

    // Parse the decoded string as JSON
    const data = JSON.parse(dataString);
    // Generate the Excel file and get the file name
    const { buffer, fileName } = await generateFile(data);

    // Return the Excel file as a downloadable response
    // const buffer = "gioo";
    console.log(data);

    return new NextResponse(buffer, {
      headers: {
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    });
  } catch (error) {
    console.error("Error exporting to Excel:", error);
    return NextResponse.json(
      { error: "Failed to export data to Excel" },
      { status: 500 }
    );
  }
}
