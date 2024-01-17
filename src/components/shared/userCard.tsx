import Link from 'next/link'
import React from 'react'

interface user {
    id:number
    name:string
    email:string
    contact_details:string
    systemSize:number
    date_of_installation:Date
}

export default function UserCard(props:user) {
  return (
    <div className="flex flex-col space-y-5">
      <h2 className="text-heading1-bold">{props.name}</h2>
      <h3>
        <span className="font-semibold">Email: </span>
        {props.email}
      </h3>
      <h3>
        <span className="font-semibold">Details: </span>
        {props.contact_details}
      </h3>
      <p>
        <span className="font-semibold">System Size: </span>
        {props.systemSize}
      </p>
      <p>{String(props.date_of_installation)}</p>
    </div>
  );
}
