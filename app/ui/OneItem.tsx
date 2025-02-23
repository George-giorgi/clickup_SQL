"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { redirect } from "next/navigation";

const OneItem = ({
  taskID,
  part_number,
  description,
  status,
}: {
  taskID: any;
  part_number: any;
  description: any;
  status: any;
}) => {
  const searchParams = useSearchParams();
  let markitem = searchParams.get("query");
  // console.log();

  const pathname = usePathname();
  const { replace } = useRouter();
  const handleClick = (part_number: any) => {
    const params = new URLSearchParams(searchParams);
    params.set("taskID", taskID);
    params.set("part_number", part_number);
    params.set("description", description);
    params.set("status", status);
    replace(`${pathname}?${params.toString()}`);
    redirect(
      `/oneitempage?taskID=${encodeURIComponent(
        taskID
      )}&part_number=${encodeURIComponent(
        part_number
      )}&description=${encodeURIComponent(
        description
      )}&status=${encodeURIComponent(status)}`
    );
  };
  return (
    <>
      <span
        // onClick={() => handleCklick(each.id)}
        className={` ${
          markitem == part_number && "bg-red-600"
        } hover:bg-yellow-500 transition-all w-max h-20 pl-3 pr-3 flex items-center justify-center rounded-full bg-blue-500 text-white text-sm cursor-pointer`}
        onClick={() => handleClick(part_number)}
      >
        {part_number} &nbsp; {taskID}
      </span>
    </>
  );
};

export default OneItem;
