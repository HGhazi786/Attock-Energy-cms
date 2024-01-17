import * as ExcelJS from 'exceljs';

export default async function readExcelAndSendToApi(filePath:string){
  // Download the Excel file from the URL using fetch
  try {
  const response = await fetch(filePath);
  if (!response.ok) {
      throw new Error(`Failed to fetch the Excel file. Status: ${response.status}`);
  }
  // Convert the response to an ArrayBuffer
  // Load the Excel workbook from the downloaded data
  const arrayBuffer = await response.arrayBuffer();
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(arrayBuffer);

  const worksheet = workbook.getWorksheet(1); // Assuming the data is on the first (and only) sheet
    if (!worksheet) {
      throw new Error('Sheet not found in the Excel file.');
    }

    const jsonData: { [key: string]: any } = {};

    worksheet.eachRow((row, rowNumber) => {
      const thingName = row.getCell(1).value;
      const thingValue = row.getCell(2).value;

      if (thingName !== undefined && thingValue !== undefined) {
        jsonData[String(thingName)] = thingValue;
      }
    });
    return jsonData;
  } catch (error) {
    throw error;
  }
}
