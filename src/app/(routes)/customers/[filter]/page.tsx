import Filters from "@/components/shared/filters";
import CustomerTable from "@/components/tables/customerTable";
import Link from "next/link";
import React from "react";

export default function page({params}:{params:{filter:string}}) {
return (
  <div className="">
    <h2 className="mt-36 text-heading1-bold font-extrabold mb-5 text-center">
      Customers
    </h2>
    <div className="mx-2 flex mb-5 xl:space-x-10 lg:space-x-10 space-x-2">
      <Link
        href={"/customers/oldest"}
        className="px-4 py-2 rounded-full bg-gray-900 text-white shadow-lg"
      >
        By Date Oldest
      </Link>
      <Link
        className="px-4 py-2 rounded-full bg-gray-900 text-white shadow-lg"
        href={"/customers/newest"}
      >
        By Date Latest
      </Link>
    </div>
    <div className="h-[44vh] sm:w-[580px] md:w-full xs:w-[380px] w-[300px] xl:w-full lg:w-full scroll-smooth overflow-y-auto overflow-x-auto mx-2 mt-5 mb-14 xl:mb-0 lg:mb-0 rounded-3xl shadow-xl">
      <CustomerTable fltr={params.filter} />
    </div>
  </div>
);
}
