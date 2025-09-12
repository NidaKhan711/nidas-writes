'use client'
import SubTableItem from "@/app/components/Admincompo/SubTableItem";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";


interface Subscription {
  _id: string;
  email?: string;
  Date?: string;
}

const Page = () => {
  const [emails, setEmails] = useState<Subscription[]>([]);

  const fetchEmails = async () => {
    try {
      const response = await axios.get('/api/email');
      setEmails(response.data.emails);
    } catch {
      toast.error("Failed to fetch subscriptions.");
    }
  };

  const deleteEmail = async (mongoId: string | undefined) => {
    try {
      if (!mongoId) {
        toast.error("Invalid subscription ID.");
        return;
      }
      const response = await axios.delete('/api/email', {
        params: { id: mongoId }
      });
      if (response.data.success) {
        toast.success("Subscription deleted successfully.");
        fetchEmails();
      } else {
        toast.error("Something went wrong.");
      }
    } catch {
      toast.error("Error deleting subscription.");
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  return (
    <div className='flex-1 p-8' style={{ backgroundColor: '#fffcf1' }}>
      <div className="mb-8 pb-2 border-b" style={{ borderColor: '#d3c6b6' }}>
        <h1 className='text-3xl font-serif font-bold' style={{ color: '#5a3e36' }}>
          Subscription List 💌
        </h1>
        <p className="mt-2 text-sm" style={{ color: '#996568' }}>
          Manage your newsletter subscribers.
        </p>
      </div>

      {emails.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[70vh] text-center">
          <p className="text-xl font-serif" style={{ color: '#996568' }}>
            No subscribers found.
          </p>
          <p className="mt-2 text-lg" style={{ color: '#5a3e36' }}>
            Wait for new sign-ups to see them here!
          </p>
        </div>
      ) : (
        <div 
          className='relative h-[80vh] max-w-full overflow-x-auto mt-4 rounded-lg shadow-inner' 
          style={{ border: '1px solid #d3c6b6' }}
        >
          <table className='w-full text-sm' style={{ color: '#5a3e36' }}>
            <thead className='text-sm uppercase' style={{ backgroundColor: '#f5f0e9' }}>
              <tr>
                <th scope='col' className='hidden sm:block px-6 py-4' style={{ fontFamily: 'serif' }}>
                  Email Subscriptions
                </th>
                <th scope='col' className='px-6 py-4' style={{ fontFamily: 'serif' }}>
                  Date
                </th>
                <th scope='col' className='px-6 py-4' style={{ fontFamily: 'serif' }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: '#d3c6b6' }}>
              {emails.map((item, index) => (
                <SubTableItem 
                  key={index}
                  mongoId={item._id}
                  email={item.email}
                  Date={item.Date}
                  deleteEmail={deleteEmail}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Page;