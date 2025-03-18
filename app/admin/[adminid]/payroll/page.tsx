"use client";

import React, { useState } from 'react'
import SelectFilter from '@/components/SelectFilter'
import Link from "next/link";


import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/Table"
import { Colors } from '@/Colors';

const months = [
  {
    index: 1,
    month: "January",
    status: "Approved",
    payrollSize: "₦453,072.00",
    employeeSize: 52,
    requestBy: "Akadiri Shogo",
    dateOfRequest: "21/12/2024",
    approvedBy: "Winner Akako",
    dateOfApproval: "21/12/2024"
  },

 {
    index: 2,
    month: "February",
    status: "Approved",
    payrollSize: "₦453,072.00",
    employeeSize: 52,
    requestBy: "Akadiri Shogo",
    dateOfRequest: "21/12/2024",
    approvedBy: "Winner Akako",
    dateOfApproval: "21/12/2024"
  },

  {
    index: 3,
    month: "March",
    status: "Approved",
    payrollSize: "₦453,072.00",
    employeeSize: 52,
    requestBy: "Akadiri Shogo",
    dateOfRequest: "21/12/2024",
    approvedBy: "Winner Akako",
    dateOfApproval: "21/12/2024"
  },

  {
    index: 4,
    month: "April",
    status: "Approved",
    payrollSize: "₦453,072.00",
    employeeSize: 52,
    requestBy: "Akadiri Shogo",
    dateOfRequest: "21/12/2024",
    approvedBy: "Winner Akako",
    dateOfApproval: "21/12/2024"
  },

  {
    index: 5,
    month: "May",
    status: "Approved",
    payrollSize: "₦453,072.00",
    employeeSize: 52,
    requestBy: "Akadiri Shogo",
    dateOfRequest: "21/12/2024",
    approvedBy: "Winner Akako",
    dateOfApproval: "21/12/2024"
  },

  {
    index: 6,
    month: "June",
    status: "Approved",
    payrollSize: "₦453,072.00",
    employeeSize: 52,
    requestBy: "Akadiri Shogo",
    dateOfRequest: "21/12/2024",
    approvedBy: "Winner Akako",
    dateOfApproval: "21/12/2024"
  },

  {
    index: 7,
    month: "July",
    status: "Approved",
    payrollSize: "₦453,072.00",
    employeeSize: 52,
    requestBy: "Akadiri Shogo",
    dateOfRequest: "21/12/2024",
    approvedBy: "Winner Akako",
    dateOfApproval: "21/12/2024"
  },

  {
    index: 8,
    month: "August",
    status: "Approved",
    payrollSize: "₦453,072.00",
    employeeSize: 52,
    requestBy: "Akadiri Shogo",
    dateOfRequest: "21/12/2024",
    approvedBy: "Winner Akako",
    dateOfApproval: "21/12/2024"
  },

  {
    index: 9,
    month: "September",
    status: "Approved",
    payrollSize: "₦453,072.00",
    employeeSize: 52,
    requestBy: "Akadiri Shogo",
    dateOfRequest:"21/12/2024",
    approvedBy: "Winner Akako",
    dateOfApproval: "21/12/2024"
  },

  {
    index: 10,
    month: "October",
    status: "Approved",
    payrollSize: "₦453,072.00",
    employeeSize: 52,
    requestBy: "Akadiri Shogo",
    dateOfRequest: "21/12/2024",
    approvedBy: "Winner Akako",
    dateOfApproval: "21/12/2024"
  },

  {
    index: 11,
    month: "November",
    status: "Approved",
    payrollSize: "₦453,072.00",
    employeeSize: 52,
    requestBy: "Akadiri Shogo",
    dateOfRequest: "21/12/2024",
    approvedBy: "Winner Akako",
    dateOfApproval: "21/12/2024"
  },

  {
    index: 12,
    month: "December",
    status: "In Progress",
    payrollSize: "₦453,072.00",
    employeeSize: 52,
    requestBy: "Akadiri Shogo",
    dateOfRequest: "21/12/2024",
    approvedBy: "Winner Akako",
    dateOfApproval: "21/12/2024"
  },
]


const userData = JSON.parse(localStorage.getItem("userInfo") || "{}")


export default function PayrollListPage() {
  const [selectedYear, setSelectedYear] = useState<string>(`Year ${new Date().getFullYear()}`);

  

  const handleFilterChange = (value: string) => {
    console.log("Selected Year:", value);
    setSelectedYear(value);
    // Use this function elsewhere in ParentComponent
};



  return (
    <div>
      <div className='font-semibold text-[25px] mb-4 px-4'>
        <span className='bg-clip-text 
        text-transparent bg-gradient-to-r from-fromGreetGradient 
        via-throughGreet to-primary'>
          Payroll History
        </span>
      </div>
    <div className='bg-white mx-6 rounded-t-2xl my-10'>
      
      <div className='mb-6 rounded-t-2xl flex text-white bg-gradient-to-r from-fromGreetGradient via-throughGreet to-primary justify-between items-center text-[15px] p-2'>
          <p>{selectedYear}</p>  
          <SelectFilter onFilterChange={handleFilterChange} color={Colors.onPrimary} />
      </div>
      <div className='px-4'>
          <Table className='w-full'>
          <TableHeader className='bg-Inactive text-white'>
            <TableRow>
              <TableHead>Month</TableHead>
              <TableHead>Payroll Size</TableHead>
              <TableHead>Employee Size</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Requested by</TableHead>
              <TableHead>Date Requested</TableHead>
              <TableHead>Approved by</TableHead>
              <TableHead>Date Approved</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className='text-[12px]'>
            {months.map((month) => (
              <TableRow key={month.index}>
                <TableCell className="font-medium">{month.month}</TableCell>
                <TableCell className="text-right">{month.payrollSize}</TableCell>
                <TableCell className='text-center'>{month.employeeSize}</TableCell>
                <TableCell className={`h-[25px] mt-[6px] text-[10px] text-white rounded-[5px] flex justify-center items-center 
    ${month.status === "Approved" ? "bg-approved" : "bg-progress"}`}>{month.status}</TableCell>
                <TableCell className='text-center'>{month.requestBy}</TableCell>
                <TableCell className='text-center'>{month.dateOfRequest}</TableCell>
                <TableCell>{month.approvedBy}</TableCell>
                <TableCell className='text-center'>{month.dateOfApproval}</TableCell>
                <TableCell className='flex justify-center'><Link href={`/admin/${userData.id}/payroll/${month.month.toLowerCase()}/list`}><button className='text-white bg-black text-[10px] px-[7px] py-[1px]'>View</button></Link></TableCell>
              </TableRow>
            ))}
          </TableBody>
          {/* <TableFooter>
            <TableRow>
              <TableCell colSpan={8}>Total</TableCell>
              <TableCell className="text-right">$2,500.00</TableCell>
            </TableRow>
          </TableFooter> */}
        </Table>
      </div>    
    </div>
    </div>
  )
}
