"use client"
import React, { useState } from 'react'

const Page = () => {
  const [text, setText] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data ={
      email,
      text
    }
   
 
    const response = await fetch('http://localhost:5000/nida', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      
    });
    console.log(data," this is data")

  }
  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Enter text" 
        value={text} 
        onChange={(e) => setText(e.target.value)}
        required
      />
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Submit</button>
    </form>
  )
}

export default Page