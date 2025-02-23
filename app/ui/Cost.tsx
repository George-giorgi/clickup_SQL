import { generateFile } from "@/app/lib/createFile";
import claimItemCost from "../lib/actions";
import { getManufacturedPartsCosting } from "@/app/lib/costcalculate.js";

const Cost = async ({
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
  const LongQueryCost = await getManufacturedPartsCosting(part_number, 0);
  const roundedNumber = Number(LongQueryCost.toFixed(2));

  // here sql logic
  const item = await claimItemCost({ part_number, taskID });
  // console.log(item);
  // console.log(item[0].cost);

  const cost = "178";
  // generate excel file here
  generateFile({ taskID, part_number, description, status, cost });
  return (
    <>
      <div>{<p>{roundedNumber}£</p>}</div>
      {/* <div>{<p>{item?.cost || item[0]?.cost}£</p>}</div> */}
    </>
  );
};

export default Cost;
