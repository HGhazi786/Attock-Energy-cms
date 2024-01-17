import ComplaintForm from '@/components/forms/Complaintform'
import React from 'react'

export default function page({params}:{params:{id:number}}) {
  return (
    <div className="my-32 mx-auto">
      <ComplaintForm _id={params.id}/>
    </div>
  );
}
