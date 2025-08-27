'use client'
import SubTableItem from "@/app/components/Admincompo/SubTableItem";
import React, { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";


interface Blog {
  _id: string;
  email?:string,
  index?:string,
   mongoId?:string,
   Date?:string
}

const page = () => {
  const[emails,setEmails]=React.useState<Blog[]>([])
  const fetchEmails=async()=>{
    const response=await axios.get('/api/email');
    setEmails(response.data.emails)
  }
  useEffect(()=>{
    fetchEmails()  
   } ,[])
   const deleteEmail= async (mongoId:string|undefined)=>{
    const response = await axios.delete('/api/email',{
      params:{id:mongoId}
    })
    if(response.data.success){
      toast.success("Email deleted successfully")
      fetchEmails()

    }else{
      toast.error("Something went wrong")
    }
   }

 
  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
      <h1>All Subscription</h1>
      <div className='relative h-[80vh] max-w-[850px] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide '>
        <table className='w-full text-sm text-gray-500'>
          <thead className='text-sm text-gray-700 uppercase bg-gray-50'>
            <tr>
              <th scope='col' className='hidden sm:block px-6 py-3' >
                Email Subscibtions
              </th>
              <th scope='col' className=' px-6 py-3' >
                  Date
              </th>
              
              <th scope='col' className=' px-6 py-3' >
                Action

              </th>
            </tr>
          </thead>
          <tbody>
            {
              emails.map((item,index)=>{
                return <SubTableItem key={index} mongoId={item._id} email={item.email} Date={item.Date} deleteEmail={deleteEmail}
                />
              })
            }
            

            
          </tbody>

        </table>
      </div>
    </div>
  )
}

export default page