import prisma from "./prisma";

export async function getManufacturedPartsCosting(partNo, rev) {
  const result = await prisma.$queryRaw`
    SELECT 
      i."PartNo", 
      i."Rev",
      CASE 
        WHEN m."MaterialClass" IN ('PL', 'PPL', 'WM', 'EM') 
        THEN i."Weight" * ((m."Dim1" / 1000 * m."Dim2" / 1000) * (m."Dim3" / 1000) * m."MassDensity") * im."SourceCost"
        WHEN m."MaterialClass" IN ('RB', 'SB', 'FL', 'AN', 'RT', 'CH', 'HS', 'UC', 'UB', 'WP', 'MLNG') 
        THEN (i."Length" / m."Dim4") * im."SourceCost"
        ELSE NULL
      END AS "MaterialCost"
    FROM "Item" i
    LEFT JOIN "Material" m ON i."MaterialStandard" = m."PartNo"
    LEFT JOIN "Item" im ON m."PartNo" = im."PartNo" 
      AND im."Rev" = (
        SELECT MAX(im2."Rev") 
        FROM "Item" im2 
        WHERE im2."PartNo" = im."PartNo"
      )
    WHERE i."PartNo" = ${partNo} 
      AND i."Rev" = ${rev};
  `;

  // If there are no results, return null or an appropriate message
  if (result.length === 0) {
    return null;
  }

  // Return the calculated material cost
  return result[0].MaterialCost; // Since the query returns an array, we access the first element
}
