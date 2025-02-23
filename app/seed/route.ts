import prisma from "@/app/lib/prisma";
import { insertRandomData, partNumbers } from "../lib/seed";
const items = [
  { id: "86981tt7h", part_number: "2417773 / 2417719" },
  { id: "86981qmb2", part_number: "2417792" },
  { id: "86981pyz7", part_number: "N/A" },
  { id: "86981pqgc", part_number: "2417786" },
  { id: "86981pp1c", part_number: "2417786" },
  { id: "86981pb0h", part_number: "1616556" },
  { id: "86981pagr", part_number: "1616556" },
  { id: "86981pa2e", part_number: "1616556" },
  { id: "86981mtf9", part_number: "2417751" },
  { id: "86981m7yw", part_number: "N/A" },
  { id: "86981kb2y", part_number: "N/A" },
  { id: "86981j91q", part_number: "2417757" },
  { id: "86981cqae", part_number: "1111" },
  { id: "86981am6e", part_number: "2317679" },
  { id: "869818x51", part_number: "2417809 / 810" },
  { id: "869818wat", part_number: "2417809 / 810" },
  { id: "869818vn9", part_number: "2417809 / 2417810" },
  { id: "869818271", part_number: "2317678" },
  { id: "869816xtt", part_number: "1616556" },
  { id: "869816x8r", part_number: "1616556" },
  { id: "869815mjr", part_number: "2317678" },
  { id: "869814uxv", part_number: "2417768" },
  { id: "86980z1b2", part_number: "2317582" },
  { id: "86980z09v", part_number: "2317582" },
  { id: "86980yz75", part_number: "2317582" },
  { id: "86980ywtc", part_number: "2317582" },
  { id: "86980yvwt", part_number: "2317582" },
  { id: "86980yuj2", part_number: "2317582" },
  { id: "86980yrzb", part_number: "2317582" },
  { id: "86980yppu", part_number: "2317582" },
  { id: "86980yn7k", part_number: "2317582" },
  { id: "86980y6kp", part_number: "2417757" },
  { id: "86980wc17", part_number: "2417758" },
  { id: "86980waya", part_number: "2417758" },
  { id: "86980w43k", part_number: "2417786" },
  { id: "86980vraw", part_number: "2317679" },
  { id: "86980ug2b", part_number: "2417776 **ASAP**" },
  { id: "86980rudb", part_number: "N/A" },
  { id: "86980rtqt", part_number: "2317679" },
  { id: "86980rngf", part_number: "2317679" },
  { id: "86980q51v", part_number: "2317680" },
  { id: "86980pt2w", part_number: "2417793" },
  { id: "86980me0t", part_number: "2217543/2217544" },
  { id: "86980md6n", part_number: "2217543/2217544" },
  { id: "86980mc5n", part_number: "2217543/2217544" },
  { id: "86980mbfx", part_number: "2217543/2217544" },
  { id: "86980majx", part_number: "2217543/2217544" },
  { id: "86980m9q2", part_number: "2217543/2217544" },
  { id: "86980m88b", part_number: "2217543/2217544" },
  { id: "86980m7e2", part_number: "2217543/2217544" },
  { id: "86980m564", part_number: "2217543/2217544" },
  { id: "86980m4ce", part_number: "2217543/2217544" },
  { id: "86980kud2", part_number: "2217543/2217544" },
  { id: "86980kqp1", part_number: "2217543/2217544" },
  { id: "86980kmq9", part_number: "2217543/2217544" },
  { id: "86980kfc4", part_number: "2417750" },
  { id: "86980kfbm", part_number: "2217543/2217544" },
  { id: "86980keeb", part_number: "2217543/2217544" },
  { id: "86980kcrh", part_number: "2217543/2217544" },
  { id: "869805h6q", part_number: "N/A" },
  { id: "869804pbf", part_number: "2417786" },
  { id: "8697zp20y", part_number: "2417786" },
  { id: "8697zkmbg", part_number: "2417786" },
  { id: "8697zk4mz", part_number: "2417786" },
  { id: "8697zhthw", part_number: "2417793" },
];
const getRandomValue = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
export async function GET() {
  try {
    // await insertRandomData(partNumbers);
    // const partNumberCostMap = new Map();

    // for (const item of items) {
    //   let cost;

    //   if (partNumberCostMap.has(item.part_number)) {
    //     cost = partNumberCostMap.get(item.part_number);
    //   } else {
    //     cost = Math.floor(Math.random() * 500) + 50; // Random cost between 50-550
    //     partNumberCostMap.set(item.part_number, cost);
    //   }

    //   // await prisma.itemCost.create({
    //   //   data: {
    //   //     taskId: item.id,
    //   //     part_number: item.part_number,
    //   //     cost,
    //   //   },
    //   // });
    // }
    // // await prisma.itemCost.deleteMany({});
    console.log("Items seeed secsessfuly");
    return Response.json({
      message: "Database seeded successfully",
    });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
