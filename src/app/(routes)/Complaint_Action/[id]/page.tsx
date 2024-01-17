import TakeAction from '@/components/forms/takeAction'
import React from 'react'

export default function page({params}:{params:{id:number}}) {
  return (
    <div>
      <TakeAction _id={params.id}/>
    </div>
  )
}
