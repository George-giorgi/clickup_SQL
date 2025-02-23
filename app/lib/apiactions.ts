import axios from "axios";
import fs from "fs/promises"; // Import fs module for file operations

const filePath = "./data.json";
// const filePath1 = "./test.json"; // Path to JSON file

const API_TOKEN = process.env.CLICKUP_API_TOKEN;
const LIST_ID = process.env.CLICKUP_LIST_ID;

const BASE_URL = "https://api.clickup.com/api/v2";
const HEADERS = {
  Authorization: API_TOKEN,
  "Content-Type": "application/json",
};

async function fetchgetTasks() {
  try {
    const response = await axios.get(`${BASE_URL}/list/${LIST_ID}/task`, {
      headers: HEADERS,
    });

    // all tasks [{},{},{},{}]
    const tasks = response.data.tasks;
    // console.log(tasks);

    const combinedResults = tasks.map((task: any) => {
      const contractField = task.custom_fields.find(
        (field: any) => field.name === "Rwk: Contract Number / PO"
      );
      const descriptionField = task.custom_fields.find(
        (field: any) => field.name === "Description"
      );
      const status = task.status.status;

      return {
        id: task.id,
        part_number: contractField?.value || "N/A",
        description: descriptionField?.value || "N/A",
        status: status || "N/A",
      };
    });

    // console.log(combinedResults);

    await fs.writeFile(
      filePath,
      JSON.stringify(combinedResults, null, 2),
      "utf8"
    );

    // await fs.writeFile(
    //   filePath1,
    //   JSON.stringify(response.data.tasks, null, 2),
    //   "utf8"
    // );

    // console.log("📌 All Tasks:", response.data);
    // return response.data.tasks;
    return combinedResults;
  } catch (error: any) {
    console.error(
      "❌ Error Fetching Tasks:",
      error.response?.data || error.message
    );
  }
}

export { fetchgetTasks };
