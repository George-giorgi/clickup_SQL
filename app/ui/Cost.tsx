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
  // const roundedNumber = Number(LongQueryCost.toFixed(2));

  // here sql logic
  const item = await claimItemCost({ part_number, taskID });

  // const cost = "178";
  // generate excel file here
  const data = [
    {
      taskID: taskID,
      part_number: part_number,
      description: description,
      status: status,
      cost: LongQueryCost,
    },
  ];
  // console.log(data);

  // await generateFile(data);

  return (
    <>
      <div>{<p>{LongQueryCost}£</p>}</div>
      {/* <div>{<p>{item?.cost || item[0]?.cost}£</p>}</div> */}
      <div className=" absolute top-7 bg-slate-900 font-semibold p-2 rounded-xl">
        <form action="/api/export" method="POST">
          <input type="hidden" name="data" value={JSON.stringify(data)} />
          <button type="submit">Download Excel</button>
        </form>
      </div>
    </>
  );
};

export default Cost;
