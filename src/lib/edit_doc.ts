import fs from "fs/promises";
import path from "path";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";

interface Data {
  refno: string;
  name: string;
  valid: string;
  date: string;
  address: string;
  city: string;
  phno: string;
  panels: string;
  pnlsize: string;
  sys_size: string;
  inv_size: string;
  pnl_brand: string;
  inv_brand: string;
  aepl_charges: string;
  sub_charges: string;
  discount: string;
  total:string
  cust_struct: string;
  warranty: string;
  tilt: string;
}

export default async function edit_docx(d:Data) {

  try {
    const templatePath = path.join(process.cwd(), "public", "temp.docx");
    const content = await fs.readFile(templatePath);

    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    const data: Data = d;
    doc.setData(data);

    doc.render();

    const buf = doc.getZip().generate({
      type: "nodebuffer",
      compression: "DEFLATE",
    });
const outputPath = path.join(process.cwd(), "public", "output.docx");
await fs.writeFile(outputPath, buf);
    
  } catch (error) {
    console.error("Error generating document:", error);
  }
}
