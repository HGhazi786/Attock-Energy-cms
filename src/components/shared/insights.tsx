import React from 'react'
import AnimatedNumber from './animatedNumber'
import { getInsights } from '@/lib/actions';

export default async function Insights() {
    const data = await getInsights()
    if(data){
    return (
      <div className="grid grid-cols-2 gap-8">
        <AnimatedNumber desc="Users" targetNumber={data.Users} bgr='bg-sky-500'/>
        <AnimatedNumber desc="Complaints" targetNumber={data.Complaint} bgr='bg-rose-500'/>
        <AnimatedNumber desc="Payed Visits" targetNumber={data.Payed} bgr='bg-green-500'/>
        <AnimatedNumber desc="Pending Complaints" targetNumber={data.Pending} bgr='bg-rose-500'/>
      </div>
    );
  }
  else{
    <div className="grid grid-cols-2 gap-3">
      <AnimatedNumber desc="Users" targetNumber={0} bgr='rose-500'/>
      <AnimatedNumber desc="Complaints" targetNumber={0} bgr='rose-500'/>
      <AnimatedNumber desc="Payed Visits" targetNumber={0} bgr='rose-500'/>
      <AnimatedNumber desc="Pending Complaints" targetNumber={0} bgr='rose-500'/>
    </div>;
  }


}
