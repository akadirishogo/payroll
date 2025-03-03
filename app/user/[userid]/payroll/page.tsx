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


const months = [
  {
    index: 1,
    month: "January",
    netSalary: '₦60,000',
    status: "In Progress",
    monthlyGross: '₦60,000',
    datePaid: "21/12/2024",
  },

 {
    index: 2,
    month: "February",
    netSalary: '₦60,000',
    status: "In Progress",
    monthlyGross: '₦60,000',
    datePaid: "21/12/2024",
  },

  {
    index: 3,
    month: "March",
    netSalary: '₦60,000',
    status: "In Progress",
    monthlyGross: '₦60,000',
    datePaid: "21/12/2024",
  },

  {
    index: 4,
    month: "April",
    netSalary: '₦60,000',
    status: "In Progress",
    monthlyGross: '₦60,000',
    datePaid: "21/12/2024",
  },

  {
    index: 5,
    month: "May",
    netSalary: '₦60,000',
    status: "In Progress",
    monthlyGross: '₦60,000',
    datePaid: "21/12/2024",
  },

  {
    index: 6,
    month: "June",
    netSalary: '₦60,000',
    status: "In Progress",
    monthlyGross: '₦60,000',
    datePaid: "21/12/2024",
  },

  {
    index: 7,
    month: "July",
    netSalary: '₦60,000',
    status: "In Progress",
    monthlyGross: '₦60,000',
    datePaid: "21/12/2024",
  },

  {
    index: 8,
    month: "August",
    netSalary: '₦60,000',
    status: "In Progress",
    monthlyGross: '₦60,000',
    datePaid: "21/12/2024",
  },

  {
    index: 9,
    month: "September",
    netSalary: '₦60,000',
    status: "In Progress",
    monthlyGross: '₦60,000',
    datePaid: "21/12/2024",
  },

  {
    index: 10,
    month: "October",
    netSalary: '₦60,000',
    status: "In Progress",
    monthlyGross: '₦60,000',
    datePaid: "21/12/2024",
  },

  {
    index: 11,
    month: "November",
    netSalary: '₦60,000',
    status: "In Progress",
    monthlyGross: '₦60,000',
    datePaid: "21/12/2024",
  },

  {
    index: 12,
    month: "December",
    netSalary: '₦60,000',
    status: "In Progress",
    monthlyGross: '₦60,000',
    datePaid: "21/12/2024",
  },
]


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
          <SelectFilter onFilterChange={handleFilterChange}/>
      </div>
      <div className='px-4'>
          <Table className='w-full'>
          <TableHeader className='bg-Inactive text-white'>
            <TableRow>
              <TableHead>Month</TableHead>
              <TableHead>Net Salary</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Gross Salary</TableHead>
              <TableHead>Date Paid</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className='text-[12px]'>
            {months.map((month) => (
              <TableRow key={month.index}>
                <TableCell className="font-medium">{month.month}</TableCell>
                <TableCell className="">{month.netSalary}</TableCell>
                <TableCell className={`h-[25px] mt-[6px] text-[10px] text-white rounded-[5px] flex justify-center items-center 
    ${month.status === "Approved" ? "bg-approved" : "bg-progress"}`}>{month.status}</TableCell>
                <TableCell>{month.monthlyGross}</TableCell>
                <TableCell>{month.datePaid}</TableCell>
                <TableCell><Link href=''><button className='text-white bg-black text-[10px] px-[7px] py-[1px]'>Details</button></Link></TableCell>
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

