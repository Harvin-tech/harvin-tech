'use client'

import React from 'react'
import Users from './Content'

const page = () => {
  return (
    <div className='p-2'>
      <div className='text-sm md:text-base font-semibold mb-1 text-foreground'>Manage Users</div>
      <h1><Users users={users}/></h1>
    </div>
  )
}

export default page

const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    address: "123 Main St",
    phone: "(555) 123-4567",
    status: "active" as "active" | "inactive",
    isAdmin: false
  },
  {
    id: 2,
    name: "John Doe",
    email: "john@example.com",
    address: "123 Main St",
    phone: "(555) 123-4567",
    status: "active" as "active" | "inactive",
    isAdmin: false
  },
  {
    id: 3,
    name: "John Doe",
    email: "john@example.com",
    address: "123 Main St",
    phone: "(555) 123-4567",
    status: "active" as "active" | "inactive",
    isAdmin: false
  },
  {
    id: 4,
    name: "John Doe",
    email: "john@example.com",
    address: "123 Main St",
    phone: "(555) 123-4567",
    status: "active" as "active" | "inactive",
    isAdmin: false
  },
  {
    id: 5,
    name: "John Doe",
    email: "john@example.com",
    address: "123 Main St",
    phone: "(555) 123-4567",
    status: "active" as "active" | "inactive",
    isAdmin: false
  },
  {
    id: 6,
    name: "John Doe",
    email: "john@example.com",
    address: "123 Main St",
    phone: "(555) 123-4567",
    status: "active" as "active" | "inactive",
    isAdmin: false
  },
  {
    id: 7,
    name: "John Doe",
    email: "john@example.com",
    address: "123 Main St",
    phone: "(555) 123-4567",
    status: "active" as "active" | "inactive",
    isAdmin: false
  },
  {
    id: 8,
    name: "John Doe",
    email: "john@example.com",
    address: "123 Main St",
    phone: "(555) 123-4567",
    status: "active" as "active" | "inactive",
    isAdmin: false
  },
  {
    id: 9,
    name: "John Doe",
    email: "john@example.com",
    address: "123 Main St",
    phone: "(555) 123-4567",
    status: "active" as "active" | "inactive",
    isAdmin: false
  },
  // ... more users
];