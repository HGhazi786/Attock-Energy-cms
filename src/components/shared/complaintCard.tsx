import Link from 'next/link'
import React from 'react'

interface complaint{
    title:string
    complaintId:number
    status:boolean    
    desc:string
}

export default function ComplaintCard(props:complaint) {
  return (
    <div className="text-black flex flex-col w-[300px] justify-between shadow-2xl p-5 rounded-3xl glassmorphism">
      <div className="flex justify-between">
        <p className="text-heading3-bold">{props.title}</p>
        <p className="text-body-medium text-black">{props.complaintId}</p>
      </div>
      <p className="text-gray-600 text-base-medium">{props.desc}</p>
      <div className=" flex justify-between rounded-full">
        {
          // @ts-ignore
          props.status === "true" ? (
            <div className="flex text-green-500 text-body-bold items-center">
              Resolved
            </div>
          ) : (
            <div className="flex text-rose-700 text-body-bold items-center">
              Pending
            </div>
          )
        }
        <Link
          href={`/Complaint_Action/${props.complaintId}`}
          className="px-2 py-1 rounded-full bg-black text-white"
        >
          Action
        </Link>
      </div>
    </div>
  );
}

interface sta{
  status:boolean
}

