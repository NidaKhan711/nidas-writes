import React from 'react'

interface BlogListTableProps {
    email?: string,
    mongoId?:string,
    Date?:string,
    date?:string,
    deleteEmail?: (id?: string) => void

}

const SubTableItem: React.FC<BlogListTableProps> = ({email, mongoId, date, deleteEmail}) => {
    const emailDate= new Date(date || "")
    return (
    <tr className="bg-white border-b hover:bg-gray-50">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 wwhitespace-nowrap">{email?email:"No Email"}</th>
    <td className='px py-4 hidden sm:block'>{emailDate.toDateString()}</td>
    <td className='px py-4 cursor-pointer' onClick={()=>deleteEmail?.(mongoId)}>x</td>
   
    </tr>
  )
}

export default SubTableItem
