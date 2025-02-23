import prisma from "./prisma";

const partNumbers = [
  "555",
  "123444",
  "123",
  "2417773 / 2417719",
  "2417792",
  "N/A",
  "2417786",
  "1616556",
  "2417751",
  "2417757",
  "1111",
  "2317679",
  "2417809 / 810",
  "2417809 / 2417810",
  "2317678",
  "2417768",
  "2317582",
  "2417758",
  "2417776 **ASAP**",
  "2317680",
  "2417793",
  "2217543/2217544",
  "2417750",
  "2417688",
];

// Function to generate random values
const getRandomValue = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// Function to generate random material class
const getRandomMaterialClass = () => {
  const materialClasses = [
    "PL",
    "PPL",
    "WM",
    "EM",
    "RB",
    "SB",
    "FL",
    "AN",
    "RT",
    "CH",
    "HS",
    "UC",
    "UB",
    "WP",
    "MLNG",
  ];
  return materialClasses[getRandomValue(0, materialClasses.length - 1)];
};

// Function to insert random data
const insertRandomData = async (part_numbers: any) => {
  for (const partNo of part_numbers) {
    // Insert into Material table
    const material = await prisma.material.create({
      data: {
        PartNo: partNo,
        MaterialClass: getRandomMaterialClass(),
        Dim1: getRandomValue(100, 1000),
        Dim2: getRandomValue(100, 1000),
        Dim3: getRandomValue(100, 1000),
        Dim4: getRandomValue(100, 1000),
        MassDensity: getRandomValue(1, 10),
      },
    });

    // Insert into Item table
    await prisma.item.create({
      data: {
        PartNo: partNo,
        Rev: getRandomValue(1, 10),
        Weight: getRandomValue(1, 100),
        Length: getRandomValue(1, 100),
        MaterialStandard: material.PartNo,
      },
    });
  }
};

// // Run the function
// insertRandomData()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

export { insertRandomData, partNumbers };
