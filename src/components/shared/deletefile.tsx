"use client"
import { useRouter } from "next/navigation"
import React from 'react'
import toast from "react-hot-toast"
import {BsTrash3} from "react-icons/bs"

interface a {
    url: string,
}
export default function DeleteFile(props:a){
    const router = useRouter()
    return(
        <button className="text-black" onClick={async () => { 
            const delApi = async() =>{ await fetch(`api/upload`,{method:"DELETE",body:JSON.stringify({url:props.url,})})};
        router.refresh()
        toast.promise(delApi(), {
            loading: "Deleting Proposal",
            success: "Proposal Deleted successfully",
            error: "Failed to Delete Proposal",
          });
    }}><BsTrash3/></button>
    )
}