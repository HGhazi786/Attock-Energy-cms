import ComplaintCard from '@/components/shared/complaintCard'
import UserCard from '@/components/shared/userCard';
import { getSpecificComplaint, getSpecificUser } from '@/lib/actions';
import React from 'react'

export default async function Page({params}:{params:{slug:string}}) {
  const res = await getSpecificComplaint(Number(params.slug))
  const complaintData = res
  const resp = await getSpecificUser(Number(params.slug))
  const userData = resp;
  return (
    <div className="flex justify-between flex-col mt-32 xl:mt-0 lg:mt-0">
      <h2 className="text-heading2-bold">User Information</h2>
      <div className="ml-5 xl:ml-0 lg:ml-0">
        {
          // @ts-ignore
          userData?.map((item: clieent) => (
            <UserCard
              key={item.user_id}
              id={item.user_id}
              contact_details={item.contactdetails}
              name={item.username}
              email={item.email}
              systemSize={item.system_size}
              date_of_installation={item.date_of_installation}
            />
          ))
        }
      </div>
      <h2 className="text-heading2-bold">Complaints</h2>
      <div className="grid xl:grid-cols-3 lg:grid-cols-3 grid-cols-1 m-auto gap-10">
        {
          // @ts-ignore
          complaintData?.map((num: complaaint) => (
            <ComplaintCard
              key={num.complaint_id}
              title={num.title}
              complaintId={num.complaint_id}
              status={num.status}
              desc={num.description}
            />
          ))
        }
      </div>
    </div>
  );
}
