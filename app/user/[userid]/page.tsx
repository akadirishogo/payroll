'use client';

import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/Cards'
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
        <div className='px-5 py-6'>
            <div className='lg:flex lg:gap-x-4'>
                <EmployeeIdCard employeeDetails={userInfo} />
                <EmployeePersonal employeeDetails={userInfo} />
            </div>
            <div className='mt-6'>
                <Card className='flex-1 bg-white'>
                    <CardHeader className='border-primary border-b-2'>
                        <CardTitle className='text-primary lg:text-[15px] text-[12px]'>Official information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div>
                            <form>
                                <div className="mt-10">
                                    <div className="mb-2 flex gap-x-4 items-center">
                                        <div className='w-max'>
                                            <label className="font-medium lg:text-[15px] text-[10px]">Designation/Role</label>
                                        </div>
                                        <div className='bg-lightGrey lg:text-[15px] text-[10px] w-2/3 p-2'>{userInfo?.role || 'N/A'}</div>
                                    </div>
                                    <div className="mb-2 flex gap-x-4 items-center">
                                        <div className='w-max'>
                                            <label className="font-medium lg:text-[15px] text-[10px]">Department</label>
                                        </div>
                                        <div className='bg-lightGrey lg:text-[15px] text-[10px] w-2/3 p-2'>{userInfo?.department || 'N/A'}</div>
                                    </div>
                                    <div className="mb-2 flex gap-x-4 items-center">
                                        <label className="font-medium lg:text-[15px] text-[10px]">Date Joined</label>
                                        <div className='bg-lightGrey lg:text-[15px] text-[10px] w-2/3 p-2'>{userInfo?.startDate.split("T")[0]}</div>
                                    </div>
                                </div>
                            </form>
                            <div className='text-primary font-semi mt-14'>Salary information</div>
                            
                            <div className='p-4 flex flex-col lg:flex-row lg:gap-x-6 lg:w-full gap-y-4'>
                                <div className='p-4 border-lightGrey lg:w-1/3 border-2 rounded-xl'>
                                    <div className='flex'>
                                        <p className='font-regular'>Net Salary</p>
                                    </div>
                                    <div className='flex justify-end'>
                                        <p className='text-xl font-bold text-primary'>₦{(userInfo?.grossSalary - userInfo?.deduction).toLocaleString()}</p>
                                    </div>
                                </div>

                                <div className='p-4 border-lightGrey border-2 lg:w-1/3 rounded-xl'>
                                    <div className='flex'>
                                        <p className='font-regular'>Gross Salary</p>
                                    </div>
                                    <div className='flex justify-end'>
                                        <p className='text-xl font-bold text-primary'>₦{userInfo?.grossSalary.toLocaleString()}</p>
                                    </div>
                                </div>

                                <div className='p-4 border-lightGrey border-2 lg:w-1/3 rounded-xl'>
                                    <div className='flex'>
                                        <p className='font-regular'>Deductions</p>
                                    </div>
                                    <div className='flex justify-end'>
                                        <p className='text-xl font-bold text-primary'>{userInfo?.deduction}</p>
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
