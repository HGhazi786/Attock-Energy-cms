import Image from 'next/image'
import React from 'react'

export default function Proposal() {
  return (
      <div className="flex flex-row">
        <Image src={"/logo.png"} alt="logo" width={50} height={50} />
        <h2 className='text-heading1-bold'>Attock Energy Private Limited</h2>
        <div className='text-small-regular'>
          <p>Ref: AEPL/329R1</p>
          <p>Dated: 04-01-2024</p>
          <p>Valid Till: 10-01-2024</p>
          <p>Client: Mr. Haider Bangish</p>
        </div>
      </div>
    );
}
