"use client";

import React, { useEffect, useState } from 'react'
import { FaChevronLeft } from "react-icons/fa6";
import Link from "next/link";
import { useParams, useRouter } from 'next/navigation';
import { Colors } from '@/Colors';
import { useSearchParams } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/Table"
import { fetchMonthPayroll } from '@/apiService';



export type UserInfo = {
  firstname: string;
  lastname: string;
};

export type Payroll = {
  id: number;
  status: "pending" | "approved" | "processed"; // Adjust based on possible statuses
  name: string;
  month: string;
  year: number;
  totalAmount: string; // Keeping it as a string since it represents a decimal number
  createdBy: UserInfo
  approvedBy: UserInfo | null;
  approval_date: string | null;
  processed_date: string | null;
  createdAt: string; // ISO date string
};


export default function Payrolls() {
  const [monthPayroll, setMonthPayroll] = useState<Payroll[]>([]);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedYear = searchParams.get("year");


  useEffect(() => {
    const token = sessionStorage.getItem("accessToken") || ""
   
    const getMonthPayroll = async () => {
      setLoading(true)
      try {
        if (!params?.month) return;

        const month = Array.isArray(params.month) ? params.month[0] : params.month; 

        const formattedMonth = month.charAt(0).toUpperCase() + month.slice(1).toLowerCase();

        const monthPayroll = await fetchMonthPayroll(token, formattedMonth, selectedYear)
        setMonthPayroll(monthPayroll ?? [])
        setError(null);
        setLoading(false)
      }catch(error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        setError(errorMessage);
      }
      setLoading(false)
    }
    getMonthPayroll();
  }, [params?.month, selectedYear])


  const getBack = () => {
    router.back()
  }

  console.log(selectedYear)
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
              <TableHead>Status</TableHead>
              <TableHead className='text-center'>Requested by</TableHead>
              <TableHead>Date Requested</TableHead>
              <TableHead>Approved by</TableHead>
              <TableHead>Date Approved</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className='text-[12px]'>
          {loading ? (
    <TableRow>
      <TableCell colSpan={8} className="text-center text-gray-500">
        Loading payroll...
      </TableCell>
    </TableRow>
  ) : monthPayroll?.length > 0 ? (
    monthPayroll.map((month, index) => (
      <TableRow key={index}>
        <TableCell className="font-medium">{month?.name}</TableCell>
        <TableCell className="text-left">₦{Number(month?.totalAmount).toLocaleString()}</TableCell>
        <TableCell
          className={`h-[25px] mt-[6px] text-[10px] text-white rounded-[5px] flex justify-center items-center 
          ${month?.status === "approved" ? "bg-approved" : "bg-progress"}`}
        >
          {month.status}
        </TableCell>
        <TableCell className='text-center'>
          {month?.createdBy?.firstname} {month?.createdBy?.lastname}
        </TableCell>
        <TableCell>{month?.createdAt.split("T")[0]}</TableCell>
        <TableCell className='text-center'>
          {month?.approvedBy?.firstname && month?.approvedBy?.lastname
            ? `${month?.approvedBy?.firstname} ${month?.approvedBy?.lastname}`
            : "_"}
        </TableCell>
        <TableCell className='text-center'>
          {month?.approval_date ? month?.approval_date.split("T")[0] : "_"}
        </TableCell>
        <TableCell>
          <Link href={`/admin/${params.adminid}/payroll/${month?.name.toLowerCase()}/list/payrollDetails?id=${month.id}`}>
            <button className='text-white bg-black text-[10px] px-[7px] py-[1px]'>View</button>
          </Link>
        </TableCell>
      </TableRow>
    ))
  ) : (
    <TableRow>
      <TableCell colSpan={8} className="text-center text-gray-500">
        {error ?? "No payrolls available"}
      </TableCell>
    </TableRow>
  )}
          </TableBody>
         
        </Table>
      </div>    
    </div>
    </div>
  )
}
