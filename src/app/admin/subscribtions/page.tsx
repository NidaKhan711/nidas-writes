'use client';
import React, { useState, useEffect } from 'react';

interface Subscription {
  id: number;
  email: string;
}

// Example subscriptions (replace with API call)
const subscriptionsData: Subscription[] = [
  { id: 1, email: 'nida@example.com' },
  { id: 2, email: 'awa@example.com' },
  { id: 3, email: 'user123@example.com' },
];

const AdminSubscriptionsPage = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  useEffect(() => {
    // fetch subscriptions from backend
    setSubscriptions(subscriptionsData);
  }, []);

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this subscription?')) {
      setSubscriptions(subscriptions.filter(sub => sub.id !== id));
      // Also send delete request to backend here
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Subscriptions</h1>
      <table className="min-w-full bg-white shadow-md rounded overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4">#</th>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map((sub, index) => (
            <tr key={sub.id} className="border-b hover:bg-gray-100">
              <td className="py-2 px-4">{index + 1}</td>
              <td className="py-2 px-4">{sub.email}</td>
              <td className="py-2 px-4">
                <button className="text-red-500" onClick={() => handleDelete(sub.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminSubscriptionsPage;
