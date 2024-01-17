"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import DeleteFile from "../shared/deletefile";
import { formatNumberWithCommas } from "@/lib/func";

export default function PropsalForm() {
  const [url , seturl]=useState("")
  const [stat , setStat]=useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

    const currentDate = new Date();
    const  ValidDate = new Date()   
    ValidDate.setDate(currentDate.getDate() + 5);
    const cur_Month = currentDate.getMonth()+1
    const val_Month = ValidDate.getMonth()+1
    const curr_date=String(currentDate.getDate()+'-'+cur_Month+'-'+currentDate.getFullYear())
    const valid_dte=String(ValidDate.getDate()+'-'+val_Month+'-'+ValidDate.getFullYear())
  const onSubmit = async (data:any) => {
    const total =formatNumberWithCommas(Number(data.aepl_charges)+Number(data.sub_charges)-Number(data.discount))
    const apiPost = async () => {
      const response = await fetch("/api/proposal/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-cache",
        body: JSON.stringify({
          refno: data.refno,
          name: data.name,
          valid: valid_dte,
          date: curr_date,
          address: data.address,
          city: data.city,
          phno: String(data.phno),
          panels: String(data.panels),
          pnlsize: String(data.pnlsize),
          sys_size: String(data.sys_size),
          inv_size: String(data.inv_size),
          pnl_brand: data.pnl_brand,
          inv_brand: data.inv_brand,
          aepl_charges: formatNumberWithCommas(data.aepl_charges),
          sub_charges: formatNumberWithCommas(data.sub_charges),
          discount: formatNumberWithCommas(data.discount),
          cust_struct: data.cust_struct,
          total: total,
          warranty: String(data.warranty),
          tilt: String(data.tilt),
        }),
      });
      const blob= await response.json()
      seturl(blob.url)
      setStat(true)
    };
    toast.promise(apiPost(), {
      loading: "Registering...",
      success: "User registered successfully",
      error: "Failed to registered User",
    });
  };

  return (
    <div className="p-5 rounded-3xl glassmorphism shadow-2xl">
    <form
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-heading3-bold">Enter Data Manually</h2>
      <div className="sm:flex md:flex xl:flex lg:flex justify-between space-x-2">
        <div className="block font-medium">
          <label>Refrence Number:</label>
          <input
            type="text"
            id="refno"
            className="mt-1 p-1 font-sans focus:ring-0 focus:outline-none focus:ring-none block w-full text-brown bg-transparent border border-b-2 border-b-emerald-900 border-transparent shadow-sm"
            {...register("refno", { required: true })}
          />
        </div>
        <div className="block font-medium">
          <label>Name:</label>
          <input
            type="text"
            id="name"
            className="mt-1 p-1 font-sans focus:ring-0 focus:outline-none focus:ring-none block w-full text-brown bg-transparent border border-b-2 border-b-emerald-900 border-transparent shadow-sm"
            {...register("name", { required: true })}
          />
        </div>
      </div>
      <div className="sm:flex md:flex xl:flex lg:flex justify-between space-x-2">
        <div className="block font-medium">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            className="mt-1 p-1 font-sans focus:outline-none focus:ring-none focus:ring-0 block w-full text-brown bg-transparent border border-b-2 border-b-emerald-900 border-transparent shadow-sm"
            {...register("address", { required: true })}
          />
        </div>
        <div className="block font-medium">
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            className="mt-1 p-1 font-sans focus:outline-none focus:ring-none focus:ring-0 block w-full text-brown bg-transparent border border-b-2 border-b-emerald-900 border-transparent shadow-sm"
            {...register("city")}
          />
        </div>
        <div className="block font-medium">
          <label htmlFor="">Phone Number:</label>
          <input
            type="number"
            id="phno"
            className="mt-1 p-1 font-sans focus:outline-none focus:ring-none focus:ring-0 block w-full text-brown bg-transparent border border-b-2 border-b-emerald-900 border-transparent shadow-sm"
            {...register("phno")}
          />
        </div>
      </div>
      <div className="sm:flex md:flex xl:flex lg:flex justify-between space-x-2">
        <div className="block font-medium">
          <label>Panel Brand:</label>
          <input
            type="text"
            id="pnl_brand"
            className="mt-1 p-1 focus:outline-none focus:ring-none font-sans focus:ring-0 block w-full text-brown bg-transparent border border-b-2 border-b-emerald-900 border-transparent shadow-sm"
            {...register("contact_details", { required: true })}
          />
        </div>
        <div className="block font-medium">
          <label>Panel Wattage:</label>
          <input
            type="number"
            id="pnlsize"
            className="mt-1 p-1 focus:outline-none focus:ring-none font-sans focus:ring-0 block w-full text-brown bg-transparent border border-b-2 border-b-emerald-900 border-transparent shadow-sm"
            {...register("pnlsize", { required: true })}
          />
        </div>
        <div className="block font-medium">
          <label>No Of Panels:</label>
          <input
            type="number"
            id="panels"
            className="mt-1 p-1 focus:outline-none focus:ring-none font-sans focus:ring-0 block w-full text-brown bg-transparent border border-b-2 border-b-emerald-900 border-transparent shadow-sm"
            {...register("panels", { required: true })}
          />
        </div>
      </div>
      <div className="sm:flex md:flex xl:flex lg:flex justify-between space-x-2">
        <div className="block font-medium">
          <label>System Size:</label>
          <input
            type="number"
            id="system_size"
            className="mt-1 p-1 font-sans focus:ring-0 block w-full focus:outline-none focus:ring-none text-brown bg-transparent border border-b-2 border-b-emerald-900 border-transparent shadow-sm"
            {...register("system_size", { required: true })}
          />
        </div>
        <div className="block font-medium">
          <label>Inverter Size:</label>
          <input
            type="number"
            id="inv_size"
            className="mt-1 p-1 font-sans focus:ring-0 block w-full focus:outline-none focus:ring-none text-brown bg-transparent border border-b-2 border-b-emerald-900 border-transparent shadow-sm"
            {...register("inv_size", { required: true })}
          />
        </div>
        <div className="block font-medium">
          <label>Inverter Brand:</label>
          <input
            type="text"
            id="inv_brand"
            className="mt-1 p-1 font-sans focus:ring-0 block w-full focus:outline-none focus:ring-none text-brown bg-transparent border border-b-2 border-b-emerald-900 border-transparent shadow-sm"
            {...register("inv_brand", { required: true })}
          />
        </div>
      </div>
      <div className="sm:flex md:flex xl:flex lg:flex justify-between space-x-2">
        <div className="block font-medium">
          <label>AEPL Charges:</label>
          <input
            type="number"
            id="aepl_charges"
            className="mt-1 p-1 font-sans focus:ring-0 block w-full focus:outline-none focus:ring-none text-brown bg-transparent border border-b-2 border-b-emerald-900 border-transparent shadow-sm"
            {...register("aepl_charges", { required: true })}
          />
        </div>
        <div className="block font-medium">
          <label>Contractor Charges:</label>
          <input
            type="number"
            id="sub_charges"
            className="mt-1 p-1 font-sans focus:ring-0 block w-full focus:outline-none focus:ring-none text-brown bg-transparent border border-b-2 border-b-emerald-900 border-transparent shadow-sm"
            {...register("sub_charges", { required: true })}
          />
        </div>
        <div className="block font-medium">
          <label>Discount:</label>
          <input
            type="number"
            id="discount"
            className="mt-1 p-1 font-sans focus:ring-0 block w-full focus:outline-none focus:ring-none text-brown bg-transparent border border-b-2 border-b-emerald-900 border-transparent shadow-sm"
            {...register("discount", { required: true })}
          />
        </div>
      </div>
      <div className="sm:flex md:flex xl:flex lg:flex justify-between space-x-2">
        <div className="block font-medium">
          <label>Tilt Angle:</label>
          <input
            type="number"
            id="tilt"
            className="mt-1 p-1 font-sans focus:ring-0 block w-full focus:outline-none focus:ring-none text-brown bg-transparent border border-b-2 border-b-emerald-900 border-transparent shadow-sm"
            {...register("tilt", { required: true })}
          />
        </div>
        <div className="block font-medium">
          <label>Inverters Warranty:</label>
          <input
            type="number"
            id="warranty"
            className="mt-1 p-1 font-sans focus:ring-0 block w-full focus:outline-none focus:ring-none text-brown bg-transparent border border-b-2 border-b-emerald-900 border-transparent shadow-sm"
            {...register("warranty", { required: true })}
          />
        </div>
        <div className="block font-medium">
          <label>Customized Structure:</label>
          <input
            type="text"
            id="cust_struct"
            className="mt-1 p-1 font-sans focus:ring-0 block w-full focus:outline-none focus:ring-none text-brown bg-transparent border border-b-2 border-b-emerald-900 border-transparent shadow-sm"
            {...register("cust_struct")}
          />
        </div>
      </div>
      <div className='my-3'>
      <button
        type="submit"
        className="px-4 py-2 bg-black text-white rounded-full"
      >
        Submit
      </button>
      </div>
    </form>
    {stat && (<div className="flex space-x-5 item-center">
        <Link href={url} className="px-4 py-2 text-white rounded-full bg-black">
          Download
        </Link>
        <DeleteFile url={url}/>
      </div>
      )}
    </div>
  );
}
