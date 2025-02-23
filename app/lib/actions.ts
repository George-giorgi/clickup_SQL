import prisma from "./prisma";

const claimItemCost = async ({
  part_number,
  taskID,
}: {
  part_number: string;
  taskID: string;
}) => {
  // Find the first item with the matching part_number
  const itemCost = await prisma.itemCost.findFirst({
    where: {
      part_number: part_number,
      taskId: taskID,
    },
    select: {
      cost: true,
    },
  });
  //   const itemCost = await prisma.$queryRaw`
  //   SELECT "cost"
  //   FROM "ItemCost"
  //   WHERE "part_number" = ${part_number} AND "taskId" = ${taskID}
  //   LIMIT 1;
  // `;

  return itemCost; // Return the cost (or handle it as needed)
};

export default claimItemCost;
