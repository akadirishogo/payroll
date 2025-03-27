"use client";

import React, { useEffect, useState } from 'react'
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
import { fetchYearPayroll } from '@/apiService';


interface Employee {
  id: number;
  DOB: string;
  maritalStatus: string;
  firstname: string;
  lastname: string;
  deduction: number;
  email: string;
  role: string;
  startDate: string;
  grossSalary: number;
  netSalary: number;
  department: string;
  phone: string;
  accountNumber: string;
  bank: string;
  createdAt: string;

}

// Add this type definition before the component
type PayrollData = {
  month: string;
  year: number;
  totalAmount: number;
  employeeCount: number;
};

export default function PayrollListPage() {
  const [selectedYear, setSelectedYear] = useState<string>('2025');
  const [payroll, setPayroll] = useState<PayrollData[]>([]);
  const [userData, setUserData] = useState<Employee>();

  useEffect(() => {
    // Initialize user data from localStorage
    if (typeof window !== 'undefined') {
      const storedUserInfo = localStorage.getItem("userInfo");
      if (storedUserInfo) {
        setUserData(JSON.parse(storedUserInfo));
      }

      // Initialize payroll data
      const storedPayroll = localStorage.getItem("Payroll");
      if (storedPayroll) {
        setPayroll(JSON.parse(storedPayroll));
      }
    }
  }, []);

  useEffect(() => {
    const getPayroll = async () => {
      const token = sessionStorage?.getItem("accessToken") || "";
      const payroll = await fetchYearPayroll(token, selectedYear || "");
      setPayroll(payroll ?? []);
      if (payroll && typeof window !== 'undefined') {
        localStorage.setItem("Payroll", JSON.stringify(payroll));
      }
    }
    getPayroll();    
  }, [selectedYear]);

  const handleFilterChange = (value: string) => {
    setSelectedYear(value);
  };

  console.log(selectedYear)
  return (
    <div>
      <div className='font-semibold text-[25px] mb-4 mt-4 px-4'>
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
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className='text-[12px]'>
            {payroll.length > 0 ? payroll?.map((roll, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{roll?.month}</TableCell>
                <TableCell className="">₦{Number(roll?.totalAmount).toLocaleString()}</TableCell>
                <TableCell className=''>{roll?.employeeCount}</TableCell>
                <TableCell className=''>
                  {userData && (
                    <Link href={`/admin/${userData.id}/payroll/${roll?.month.toLowerCase()}/list?year=${selectedYear}`}>
                      <button className='text-white bg-black text-[10px] px-[7px] py-[1px]'>View</button>
                    </Link>
                  )}
                </TableCell>
              </TableRow>
            ))
            :
            (
              <TableRow>
              <TableCell colSpan={9} className="text-center text-gray-500">
                  No payroll found for the year selected!
              </TableCell>
              </TableRow>
          )}
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
