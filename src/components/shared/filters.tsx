"use client"
import Link from 'next/link'
import React from 'react'

export default function Filters() {
return (
  <div className="grid grid-cols-2 xl:grid-cols-4 lg:grid-cols-4 mb-5 gap-5 lg:gap-x-10 xl:gap-x-10">
    <div>
    <Link
      href={"/complaints/oldest"}
      className="px-4 py-2 rounded-full bg-gray-900 text-white shadow-lg"
    >
      Oldest
    </Link>
    </div>
    <div>
    <Link
      className="px-4 py-2 rounded-full bg-gray-900 text-white shadow-lg"
      href={"/complaints/newest"}
    >
      Latest
    </Link>
    </div>
    <div>
    <Link
      href={"/complaints/pending"}
      className="px-4 py-2 rounded-full bg-gray-900 text-white shadow-lg"
    >
      Pending
    </Link>
    </div>
    <div>
      <Link
        href={"/complaints/resolved"}
        className="px-4 py-2 rounded-full bg-gray-900 text-white shadow-lg"
      >
        Resolved
      </Link>
    </div>
  </div>
);
}
