"use client"; // Mark this as a Client Component

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter

interface Task {
  id: string;
  name: string;
  status: string;
  customFields: {
    id: string;
    name: string;
    value: any;
    displayValue: string | number;
  }[];
}

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [timestamp, setTimestamp] = useState(Date.now());

  const router = useRouter(); // Initialize Next.js router

  // Fetch tasks from API
  const fetchTasks = async () => {
    console.log("Fetching tasks...");
    try {
      const response = await fetch("/api/fetchupdate", { cache: "no-store" }); // Ensure fresh data
      const data = await response.json();
      console.log(response);

      if (response.ok) {
        setTasks(data);
        setTimestamp(Date.now()); // Update timestamp to force re-render
      } else {
        setError(data.error || "Failed to fetch tasks");
      }
    } catch (error) {
      setError("An error occurred while fetching tasks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks(); // Initial fetch
    const interval = setInterval(() => {
      console.log("Refreshing page and fetching new data...");
      router.refresh(); // Refresh the page
      fetchTasks(); // Fetch new data again after refresh
    }, 15000); // Refresh every 15 seconds
    return () => {
      console.log("Cleaning up interval...");
      clearInterval(interval);
    };
  }, [router]); // Depend on router to prevent unnecessary re-renders

  if (loading) {
    return <p className="text-center text-gray-600">Loading tasks...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-4">Task List</h1>
      <p className="text-center text-gray-500">
        Last updated: {new Date(timestamp).toLocaleTimeString()}
      </p>

      <table className="w-full border-collapse border border-gray-300 rounded-lg shadow-md mt-4">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Task Name
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Status
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Custom Fields
            </th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, i) => (
            <tr key={task?.id || i} className="">
              <td className="border border-gray-300 px-4 py-2 font-semibold">
                {task?.name || "Unknown"}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <span
                  className={`px-2 py-1 text-sm font-medium rounded ${
                    task?.status === "completed"
                      ? "bg-green-200 text-green-700"
                      : "bg-yellow-200 text-yellow-700"
                  }`}
                >
                  {task?.status}
                </span>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {task?.customFields.length > 0 ? (
                  <ul className="list-disc pl-4">
                    {task.customFields.map((field) => (
                      <li key={field.id}>
                        <span className="font-semibold">{field.name}:</span>{" "}
                        {field.displayValue}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className="text-gray-500">No custom fields</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
