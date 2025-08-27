import React from 'react'
import Image from 'next/image'

interface BlogListTableProps {
  authorImage?: string
  title?: string
  authorName?:string
  mongoId: string;
  date?: string
  deleteBlog?: (id: string) => void;
}

const BlogListTable: React.FC<BlogListTableProps> = ({authorImage,title,authorName,date,mongoId,deleteBlog }) => {
    const blogData = date ? new Date(date) : new Date()
  return (
    <tr className="bg-white border-b hover:bg-gray-50">
      <th
        scope="row"
        className="items-center gap-3 hidden sm:flex px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        <Image
          src={authorImage ? authorImage : './assets/images/userup.png'} 
          alt="Author"
          width={40}
          height={40}
          className="rounded-full"
        />
        <p>{authorName?authorName:"No author"}</p>
      </th>
      <td className="px-6 py-4">{title ? title : 'No title'}</td>
      <td className="px-6 py-4">{blogData.toDateString()}</td>
      <td className="px-6 py-4 cursor-pointer" onClick={()=>deleteBlog?.(mongoId)}>x</td>
    </tr>
  )
}

export default BlogListTable
