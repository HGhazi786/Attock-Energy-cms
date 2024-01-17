"use client";
import React from "react";
import { useForm } from "react-hook-form";
import toast  from "react-hot-toast";



function UserForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    const dateofInstallation = new Date(data.date_of_installation);

    const currentDate = new Date();
    const timediff = currentDate.getTime() - dateofInstallation.getTime();
    const millisecondsInOneYear = 365 * 24 * 60 * 60 * 1000;
    const isGreaterThan = timediff > millisecondsInOneYear;
    console.log(isGreaterThan)
    const inv = isGreaterThan;
    // Handle form submission here
    const apiPost=async()=>{const response = await fetch("/api/user/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-cache",
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        contact_details: data.contact_details,
        system_size:data.system_size,
        date_of_installation:data.date_of_installation,
        invoice_required:inv
      }),
    });}
    toast.promise(apiPost(), {
      loading: "Registering...",
      success: "User registered successfully",
      error: "Failed to registered User",
    });
  
  };

  return (
    <form
      className="p-10 rounded-3xl glassmorphism shadow-2xl"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="sm:flex md:flex xl:flex lg:flex justify-between space-x-2">
        <div className="block font-medium">
          <label>User Name:</label>
          <input
            type="text"
            id="username"
            className="mt-1 p-1 font-sans focus:ring-0 focus:outline-none focus:ring-none block w-full text-brown bg-transparent border border-b-2 border-b-emerald-900 border-transparent shadow-sm"
            {...register("username", { required: true })}
          />
        </div>
        <div className="block font-medium">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            className="mt-1 p-1 font-sans focus:outline-none focus:ring-none focus:ring-0 block w-full text-brown bg-transparent border border-b-2 border-b-emerald-900 border-transparent shadow-sm"
            {...register("email", { required: true })}
          />
        </div>
      </div>
      <div className="block font-medium">
        <label>Contact Details:</label>
        <input
          type="text"
          id="contact_details"
          className="mt-1 p-1 focus:outline-none focus:ring-none font-sans focus:ring-0 block w-full text-brown bg-transparent border border-b-2 border-b-emerald-900 border-transparent shadow-sm"
          {...register("contact_details", { required: true })}
        />
      </div>
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
        <label>Date of Installation:</label>
        <input
          type="date"
          id="date_of_installation"
          className="mt-1 p-1 text-gray-400 font-sans focus:ring-0 block w-full text-brown bg-transparent focus:outline-none focus:ring-none border border-b-2 border-b-emerald-900 border-transparent shadow-sm"
          {...register("date_of_installation", { required: true })}
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 mt-5 bg-black text-white rounded-full"
      >
        Submit
      </button>
    </form>
  );
}

export default UserForm;




