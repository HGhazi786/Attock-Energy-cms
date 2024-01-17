import Filters from '@/components/shared/filters';
import ComplientTable from '@/components/tables/complaintsTable'
import React from 'react'

export default function page() {
  return (
    <div className="">
      <h2 className="text-heading1-bold mt-36 mb-6 text-center">Complaints</h2>
      <Filters />
      <div className="h-[44vh] sm:w-[580px] md:w-full xs:w-[380px] w-[300px] xl:w-full lg:w-full scroll-smooth overflow-y-auto overflow-x-auto mx-2 mt-5 mb-14 xl:mb-0 lg:mb-0 rounded-3xl shadow-xl">
        <ComplientTable fltr="" />
      </div>
    </div>
  );
}
