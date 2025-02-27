import Cost from "../ui/Cost";
import Link from "next/link";
import LeftArrow from "../ui/leftArrow";

const page = async (props: {
  searchParams: Promise<{
    taskID?: any;
    part_number?: any;
    description?: any;
    status?: any;
  }>;
}) => {
  const searchParams = await props.searchParams;

  const taskID = searchParams.taskID;
  const part_number = searchParams.part_number;
  const description = searchParams.description;
  const status = searchParams.status;
  // heare should be try write code for sql query prisma after sh1 script
  // or will make saparate component
  return (
    <div className="pl-5 pr-5">
      <table className="  mt-20 table-auto w-full border-collapse border border-gray-400 text-left">
        <thead className="">
          <tr>
            <th className="border border-gray-400 px-4 py-2">Task ID</th>
            <th className="border border-gray-400 px-4 py-2">Part Number</th>
            <th className="border border-gray-400 px-4 py-2">Description</th>
            <th className="border border-gray-400 px-4 py-2">Status</th>
            <th className="border border-gray-400 px-4 py-2">Cost</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-400 px-4 py-2">{taskID}</td>
            <td className="border border-gray-400 px-4 py-2">{part_number}</td>
            <td className="border border-gray-400 px-4 py-2">{description}</td>
            <td className="border border-gray-400 px-4 py-2">{status}</td>
            <td className="border border-gray-400 px-4 py-2">
              {/* we need all prop due to generate file in futura and part_number tu pick up cost from sqlserver */}
              <Cost
                description={description}
                status={status}
                taskID={taskID}
                part_number={part_number}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <Link href={"/itemlist"}>
          <div className=" flex mt-10 gap-2 items-center">
            <LeftArrow />
            <p className=" font-semibold  ">Back to items page</p>
          </div>
        </Link>
      </div>
      html Copy Edit
      <svg width="200" height="200" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="#ddd"
          stroke-width="4"
          fill="none"
        />

        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="#000"
          stroke-width="2"
          fill="none"
          stroke-dasharray="283"
          stroke-dashoffset="283"
          stroke-linecap="round"
          transform="rotate(-90 50 50)"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="283"
            to="0"
            dur="15s"
            repeatCount="indefinite"
          />
        </circle>

        <text x="50" y="55" font-size="12" text-anchor="middle" fill="#ffff">
          10 min
        </text>
      </svg>
    </div>
  );
};

export default page;
