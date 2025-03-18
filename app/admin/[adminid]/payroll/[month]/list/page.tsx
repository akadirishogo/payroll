"use client";

import React from 'react'
import { FaChevronLeft } from "react-icons/fa6";
import Link from "next/link";
import { useParams, useRouter } from 'next/navigation';
import { Colors } from '@/Colors';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/Table"

const payrolls = [
  {
    index: 1,
    Name: "Mid-month",
    status: "Approved",
    payrollSize: "₦530,072.00",
    employeeSize: 52,
    requestBy: "Akadiri Shogo",
    dateOfRequest: "21/12/2024",
    approvedBy: "Winner Akako",
    dateOfApproval: "21/12/2024"
  },

 {
    index: 2,
    Name: "Managers",
    status: "Approved",
    payrollSize: "₦153,072.00",
    employeeSize: 52,
    requestBy: "Akadiri Shogo",
    dateOfRequest: "21/12/2024",
    approvedBy: "Winner Akako",
    dateOfApproval: "21/12/2024"
  },

  {
    index: 3,
    Name: "Credlock",
    status: "Approved",
    payrollSize: "₦53,072.00",
    employeeSize: 52,
    requestBy: "Akadiri Shogo",
    dateOfRequest: "21/12/2024",
    approvedBy: "Winner Akako",
    dateOfApproval: "21/12/2024"
  },

  {
    index: 4,
    Name: "Half",
    status: "Approved",
    payrollSize: "₦53,072.00",
    employeeSize: 52,
    requestBy: "Akadiri Shogo",
    dateOfRequest: "21/12/2024",
    approvedBy: "Winner Akako",
    dateOfApproval: "21/12/2024"
  },


]


export default function Payrolls() {
  const selectedYear = new Date().getFullYear();
  const params = useParams();
  const router = useRouter();

  console.log(params)


  const getBack = () => {
    router.back()
  }

  return (
    <div>
      <div onClick={getBack} className='px-4 cursor-pointer'>
          <FaChevronLeft size={20} color={Colors.primary} />
      </div>
      <div className='font-semibold text-[25px] mb-4 mt-4 px-4'>
        <span className='bg-clip-text 
        text-transparent bg-gradient-to-r from-fromGreetGradient 
        via-throughGreet to-primary'>
            {typeof params.month === 'string' ? params.month.charAt(0).toUpperCase() + params.month.slice(1) : 'Unknown'} Payrolls
        </span>
      </div>
    <div className='bg-white mx-6 rounded-t-2xl my-10'>
      
      <div className='mb-6 rounded-t-2xl flex text-white bg-gradient-to-r from-fromGreetGradient via-throughGreet to-primary items-center text-[15px] p-2 gap-x-1'>
          <p>{typeof params.month === 'string' ? 
          params.month.charAt(0).toUpperCase() + 
          params.month.slice(1) : 'Unknown'}</p>
          <p>{selectedYear}</p>  
      </div>
      <div className='px-4'>
          <Table className='w-full'>
          <TableHeader className='bg-Inactive text-white'>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Payroll Size</TableHead>
              <TableHead>Staff Size</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Requested by</TableHead>
              <TableHead>Date Requested</TableHead>
              <TableHead>Approved by</TableHead>
              <TableHead>Date Approved</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className='text-[12px]'>
            {payrolls.map((month) => (
              <TableRow key={month.index}>
                <TableCell className="font-medium">{month.Name}</TableCell>
                <TableCell className="text-right">{month.payrollSize}</TableCell>
                <TableCell>{month.employeeSize}</TableCell>
                <TableCell className={`h-[25px] mt-[6px] text-[10px] text-white rounded-[5px] flex justify-center items-center 
    ${month.status === "Approved" ? "bg-approved" : "bg-progress"}`}>{month.status}</TableCell>
                <TableCell>{month.requestBy}</TableCell>
                <TableCell>{month.dateOfRequest}</TableCell>
                <TableCell>{month.approvedBy}</TableCell>
                <TableCell>{month.dateOfApproval}</TableCell>
                <TableCell><Link href={`/admin/${params.adminid}/payroll/${month.Name.toLowerCase()}/list/payrollDetails`}><button className='text-white bg-black text-[10px] px-[7px] py-[1px]'>View</button></Link></TableCell>
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
