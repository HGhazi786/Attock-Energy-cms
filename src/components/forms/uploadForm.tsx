'use client';
import type { PutBlobResult } from '@vercel/blob';
import Link from 'next/link';
import { useState, useRef } from 'react';
import readExcelAndSendToApi from '@/lib/extractExcel';
import toast from 'react-hot-toast';
import DeleteFile from '../shared/deletefile';
import { formatNumberWithCommas } from '@/lib/func';

export default function UploadForm() {
  const [stat , setStat]=useState(false)
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const [blobdoc, setBlobdoc] = useState<PutBlobResult | null>(null);
  const currentDate = new Date();
  const  ValidDate = new Date()   
  ValidDate.setDate(currentDate.getDate() + 5);
  const cur_Month = currentDate.getMonth()+1
  const val_Month = ValidDate.getMonth()+1
  const curr_date=String(currentDate.getDate()+'-'+cur_Month+'-'+currentDate.getFullYear())
  const valid_dte=String(ValidDate.getDate()+'-'+val_Month+'-'+ValidDate.getFullYear())
  return (
    <div className="p-10 rounded-3xl glassmorphism shadow-2xl">
      <h3 className='text-heading3-bold'>Upload excel file</h3>

      <form
        onSubmit={async (event) => {
          event.preventDefault();
          event.preventDefault();
          if (!inputFileRef.current?.files) {
            throw new Error("No file selected");
          }

          const file = inputFileRef.current.files[0];

          const response = await fetch(
            `/api/upload?filename=${file.name}`,
            {
              method: 'POST',
              body: file,
            },
          )
    //@ts-ignore
    const newBlob = (await response.json()) as PutBlobResult;
    setBlob(newBlob);
    }}
    >
        <input name="file" ref={inputFileRef} type="file" required />
        <button type="submit" className='px-4 py-2 rounded-full bg-black text-white'>Upload</button>
      </form>
      <div className='flex space-x-5'>
      {
        blob && (
          <button className='px-4 py-2 rounded-full text-white bg-black' onClick={async()=>{
            let data:any;
            if(blob){
                data= await readExcelAndSendToApi(blob.url).catch((error) => {
                console.error(`Error processing Excel file and sending data to API: ${error.message}`);
              });
            }
            const total =formatNumberWithCommas(Number(data.AEPL_Charges)+Number(data.Subcontractor_Charges)-Number(data.Discount))
            const apiPost = async () => {
              const response = await fetch("/api/proposal/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                cache: "no-cache",
                body: JSON.stringify({
                  refno: data.Reference_Number,
                  name: data.Name,
                  valid: valid_dte,
                  date: curr_date,
                  address: data.Address,
                  city: data.City,
                  phno: String(data.Phone_Number),
                  panels: String(data.Panels),
                  pnlsize: String(data.Panel_Size),
                  sys_size: String(data.System_Size),
                  inv_size: String(data.Inverter_Size),
                  pnl_brand: data.Panel_Brand,
                  inv_brand: data.Inverter_Brand,
                  aepl_charges: formatNumberWithCommas(data.AEPL_Charges),
                  sub_charges: formatNumberWithCommas(data.Subcontractor_Charges),
                  discount: formatNumberWithCommas(data.Discount),
                  cust_struct: data.Customized_Structure_Detail,
                  total: total,
                  warranty: String(data.Warranty),
                  tilt: String(data.Tilt),
                }),
              });
              const blob= await response.json()
              setBlobdoc(blob)
              setStat(true)
            };
            toast.promise(apiPost(), {
              loading: "Creating Proposal",
              success: "Proposal created successfully",
              error: "Failed to create Proposal",
            });
          }}>
            Create Proposal
          </button>
        )
      }
      {blobdoc && blob && (<div className='flex space-x-5 item center'>
        <Link href={blobdoc.url} className="px-4 py-2 text-white rounded-full bg-black mx-5">
          Download
        </Link>
        <p className='py-2 bg-transperant'>{blobdoc.pathname}</p>
        <DeleteFile url={blobdoc.url}/>
        <p className='py-2 bg-transperant'>{blob.pathname}</p>
        <DeleteFile url={blob.url}/>
      </div>
      )}
      </div>
    </div>
  );
}