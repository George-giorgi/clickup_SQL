const generateFile = ({
  taskID,
  part_number,
  description,
  status,
  cost,
}: {
  taskID: any;
  part_number: any;
  description: any;
  status: any;
  cost: any;
}) => {
  console.log(taskID, part_number, description, status, cost);
};

export { generateFile };
