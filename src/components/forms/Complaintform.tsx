"use client";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface mid{
  _id:number
}

function ComplaintForm(props:mid) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    const apiPost = async () => {
      const response = await fetch("/api/complaints/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-cache",
        body: JSON.stringify({
          user_id: props._id,
          title: data.title,
          description: data.description,
        }),
      });
    };
    toast.promise(apiPost(), {
      loading: "Registering...",
      success: "Complaint registered successfully",
      error: "Failed to registered Complaint",
    });
  };

  return (
    <form className="px-10" onSubmit={handleSubmit(onSubmit)}>
    <div className="block font-medium">
        <label>Title:</label>
        <input
          type="text"
          id="title"
          className="mt-1 p-1 text-gray-400 font-sans focus:ring-0 block w-full text-brown bg-transparent border border-b-2 border-b-emerald-900 border-transparent shadow-sm"
          {...register("title", { required: true })}
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          id="description"
          className="mt-1 p-1 text-gray-400 font-sans focus:ring-0 block w-full text-brown bg-transparent border border-b-2 border-b-emerald-900 border-transparent shadow-sm"
          {...register("description", { required: true })}
        />
      </div>
      <button type="submit" className="px-4 py-2 mt-5 bg-black text-white">
        Submit
      </button>
    </form>
  );
}

export default ComplaintForm;
