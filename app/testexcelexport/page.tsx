"use client";

import { useState } from "react";
import * as XLSX from "xlsx";

export default function ExportPage() {
  // Sample data
  const [data, setData] = useState([
    {
      taskID: 1,
      part_number: "555",
      description: "wedwed test",
      status: "pending",
      cost: 165.42,
    },
    {
      taskID: 2,
      part_number: "123444",
      description: "teeeeest",
      status: "complete",
      cost: 320.15,
    },
    {
      taskID: 3,
      part_number: "123",
      description: "test2 test2",
      status: "pending",
      cost: 450.0,
    },
    // Add more rows as needed
  ]);

  // Function to export data to Excel
  const exportToExcel = () => {
    // Create a worksheet from the data
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Create a workbook and add the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Write the workbook to a file
    XLSX.writeFile(workbook, "table_data.xlsx");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Table Data Export</h1>
      <button onClick={exportToExcel} style={{ marginBottom: "20px" }}>
        Export to Excel
      </button>
      <table border={1} cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Task ID</th>
            <th>Part Number</th>
            <th>Description</th>
            <th>Status</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.taskID}>
              <td>{row.taskID}</td>
              <td>{row.part_number}</td>
              <td>{row.description}</td>
              <td>{row.status}</td>
              <td>{row.cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
