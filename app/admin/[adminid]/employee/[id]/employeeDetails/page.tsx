"use client";

import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/Cards'
import { IoChevronBackSharp } from "react-icons/io5"
import { useParams, useRouter } from "next/navigation";

import dynamic from "next/dynamic";


type BankDetail = {
    id: number;
    bankName: string;
    bankCode: string;
    accountNumber: string;
    recipientCode: string | null;
    isDefault: boolean;
  };


type Employee = {
    id: number;
    firstname: string;
    lastname: string;
    gender: string | null;
    email: string;
    grossSalary: number;
    netSalary: number;
    deduction: number;
    department: string;
    phone: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    bankDetails: BankDetail[];
  };

  const EmployeeIdCard =  dynamic(() => import("@/components/employee/employeeIdCard"), {
    ssr: false, // Disable SSR for this component
  });

  const EmployeePersonal = dynamic(() => import("@/components/employee/employeePersonal"), {
        ssr: false,
  }) ;


export default function EmployeeDetails() {
    const { id } = useParams();
    const router = useRouter();
    const [employee, setEmployee] = useState<Employee | undefined>(undefined);
    const [details, setDetails] = useState<Employee>();
    

    

    useEffect(() => {
        const employees = JSON.parse(localStorage.getItem("Employees") || "[]")
        if (employees.length > 0) {
            const clickedEmployee = employees.find((emp: Employee) => emp.id === Number(id));
            if (clickedEmployee) {
                setEmployee(clickedEmployee);
                setDetails(clickedEmployee)
            }
        }
    }, []);


    const backToRecords = () => {
        router.back();
    }

    console.log(employee)
      
  return (
    <div className='px-4 py-4'>
        <div onClick={backToRecords} className='flex gap-x-2 items-center mb-6 cursor-pointer'>
            <IoChevronBackSharp size={25} />
            <span className='bg-clip-text 
            text-transparent bg-gradient-to-r from-fromGreetGradient 
            via-throughGreet to-primary text-[20px] font-semi'>
            Back to records
            </span>
        </div>
        <div className='flex gap-x-14'>
            <EmployeeIdCard details={details} />
            <EmployeePersonal details={details} />
        </div>
        <div className='mt-6'>
            <Card className='flex-1 bg-white'>
                <CardHeader className='border-primary border-b-2'>
                    <CardTitle className='text-primary'>Official information</CardTitle>
                </CardHeader>
                <CardContent>
                    <div>
                        <form>
                            <div className="mt-10">
                                <div className="mb-2 flex gap-x-14 items-center">
                                    <div className='w-max'>
                                        <label className="font-medium">Designation/Role</label>
                                    </div>
                                    <div className='bg-lightGrey w-2/3 p-2'>{details?.department}</div>
                                </div>
                                <div className="mb-2 flex gap-x-24 items-center">
                                    <div className='w-max'>
                                        <label className="font-medium">Department</label>
                                    </div>
                                    <div className='bg-lightGrey w-2/3 p-2'>{details?.department}</div>
                                </div>
                                <div className="mb-2 flex gap-x-20 items-center">
                                    <label className="font-medium">Date Joined</label>
                                    <div className='bg-lightGrey w-2/3 p-2'>{details?.createdAt.split("T")[0]}</div>
                                </div>
                            </div>
                        </form>
                    </div>
                </CardContent>
                </Card>
           </div>
    </div>
)}
