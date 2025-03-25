'use client';

import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/Cards'
import { useParams } from "next/navigation";
import EmployeeSalaryForm from '@/components/userHome/employeeSalaryForm';
import EmployeeIdCard from '@/components/userHome/employeeIdCard';
import EmployeePersonal from '@/components/userHome/employeePersonal';

import { Loader2 } from 'lucide-react';


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


export default function HomePage() {
    const [userInfo, setUserInfo] = useState<Employee | null>(null);
    

    useEffect(() => {
        const storedData = localStorage.getItem("employeeInfo");
        if (storedData) {
            try {
                setUserInfo(JSON.parse(storedData));
            } catch (error) {
                console.error("Error parsing employeeInfo from localStorage", error);
            }
        }
    }, []);

    console.log(userInfo)
    
    if (!userInfo) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className='px-14 py-6'>
            <div className='flex gap-x-14'>
                <EmployeeIdCard employeeDetails={userInfo} />
                <EmployeePersonal employeeDetails={userInfo} />
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
                                        <div className='bg-lightGrey w-2/3 p-2'>{userInfo?.role || 'N/A'}</div>
                                    </div>
                                    <div className="mb-2 flex gap-x-24 items-center">
                                        <div className='w-max'>
                                            <label className="font-medium">Department</label>
                                        </div>
                                        <div className='bg-lightGrey w-2/3 p-2'>{userInfo?.department || 'N/A'}</div>
                                    </div>
                                    <div className="mb-2 flex gap-x-20 items-center">
                                        <label className="font-medium">Date Joined</label>
                                        <div className='bg-lightGrey w-2/3 p-2'>{userInfo?.startDate.split("T")[0]}</div>
                                    </div>
                                </div>
                            </form>
                            <div className='text-primary font-semi mt-14'>Salary information</div>
                            
                            <div className='flex p-4 gap-x-4'>
                                <div className='p-4 border-lightGrey border-2 w-1/3 rounded-xl'>
                                    <div className='flex'>
                                        <p className='font-regular'>Net Salary</p>
                                    </div>
                                    <div className='flex justify-end'>
                                        <p className='text-3xl font-bold text-primary'>₦{(userInfo?.grossSalary - userInfo?.deduction).toLocaleString()}</p>
                                    </div>
                                </div>

                                <div className='p-4 border-lightGrey border-2 w-1/3 rounded-xl'>
                                    <div className='flex'>
                                        <p className='font-regular'>Gross Salary</p>
                                    </div>
                                    <div className='flex justify-end'>
                                        <p className='text-3xl font-bold text-primary'>₦{userInfo?.grossSalary.toLocaleString()}</p>
                                    </div>
                                </div>

                                <div className='p-4 border-lightGrey border-2 w-1/3 rounded-xl'>
                                    <div className='flex'>
                                        <p className='font-regular'>Deductions</p>
                                    </div>
                                    <div className='flex justify-end'>
                                        <p className='text-3xl font-bold text-primary'>{userInfo?.deduction}</p>
                                    </div>
                                </div>
                            </div>
                            <EmployeeSalaryForm employeeDetails={userInfo} />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
