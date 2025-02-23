// createFile.ts
import * as XLSX from "xlsx";

export async function generateFile(data: any[]) {
  try {
    // Add headers to the data
    const headers = ["Task ID", "Part Number", "Description", "Status", "Cost"];
    const worksheetData = [
      headers,
      ...data.map((row) => [
        row.taskID,
        row.part_number,
        row.description,
        row.status,
        row.cost,
      ]),
    ];

    // Create a worksheet from the data
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

    // Apply formatting and styles
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, worksheet, "Sheet1");

    // Format the "Cost" column as currency
    const range = XLSX.utils.decode_range(worksheet["!ref"]!);
    for (let col = range.s.c; col <= range.e.c; col++) {
      const headerCell = XLSX.utils.encode_cell({ r: 0, c: col });
      if (worksheet[headerCell]) {
        // Bold headers
        worksheet[headerCell].s = { font: { bold: true } };
      }

      // Format the "Cost" column (assuming it's the last column)
      if (col === headers.length - 1) {
        for (let row = range.s.r + 1; row <= range.e.r; row++) {
          const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
          if (worksheet[cellAddress]) {
            worksheet[cellAddress].z = "£#,##0.00"; // Currency format
          }
        }
      }
    }

    // Auto-adjust column widths
    worksheet["!cols"] = headers.map(() => ({ wch: 20 })); // Set column width to 20 characters

    // Add filters to headers
    worksheet["!autofilter"] = { ref: XLSX.utils.encode_range(range) };

    // Freeze the header row
    worksheet["!views"] = [{ state: "frozen", ySplit: 1 }];

    // Write the workbook to a buffer
    const buffer = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });
    // Generate the file name from the first row's description
    const fileName = data[0]?.description
      ? `${data[0].description.replace(/[^a-zA-Z0-9]/g, "_")}.xlsx` // Replace special characters with underscores
      : "table_data.xlsx"; // Fallback name

    return { buffer, fileName };
  } catch (error) {
    console.error("Error generating Excel file:", error);
    throw new Error("Failed to generate Excel file");
  }
}
