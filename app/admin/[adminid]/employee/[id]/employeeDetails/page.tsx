'use client';

import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/Cards'
import { IoChevronBackSharp } from "react-icons/io5"
import { useParams, useRouter } from "next/navigation";
import EmployeeSalaryForm from '@/components/employee/employeeSalaryForm';
import EmployeeIdCard from '@/components/employee/employeeIdCard';
import EmployeePersonal from '@/components/employee/employeePersonal';
import { useEmployeeStore } from '@/store/employeesStore';


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



export default function EmployeeDetails() {
    const { employees } = useEmployeeStore();
    const { id } = useParams();
    const router = useRouter();
    const [employee, setEmployee] = useState<Employee>()
    const [details, setDetails] = useState<Employee | null>(null);
    

    

    useEffect(() => {
        if (employees.length > 0) {
            const clickedEmployee = employees.find(emp => emp.id === Number(id));
            if (clickedEmployee) {
                setEmployee(clickedEmployee);
            }
        }
    }, [id, employees]);

    useEffect(() => {
        if (employee) {
            setDetails(employee);
            localStorage.setItem("employeeDetails", JSON.stringify(employee));
            console.log("Employee details saved")
        }
    }, [employee]);


    useEffect(() => {
        try {
            const storedData = localStorage.getItem("employeeDetails");
            if (storedData) {
                setDetails(JSON.parse(storedData));
            }
        } catch (error) {
            console.error("Error parsing localStorage data", error);
        }
    }, []);
   

    const backToRecords = () => {
        router.back();
    }
  

      
  return (
    <div className='px-14 py-6'>
        <div onClick={backToRecords} className='flex gap-x-2 items-center mb-6 cursor-pointer'>
            <IoChevronBackSharp size={25} />
            <span className='bg-clip-text 
            text-transparent bg-gradient-to-r from-fromGreetGradient 
            via-throughGreet to-primary text-2xl font-semi'>
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
                                    <div className='bg-lightGrey w-2/3 p-2'>{details?.createdAt}</div>
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
                                    <p className='text-3xl font-bold text-primary'>{details?.netSalary}</p>
                                </div>
                            </div>

                            <div className='p-4 border-lightGrey border-2 w-1/3 rounded-xl'>
                                <div className='flex'>
                                    <p className='font-regular'>Gross Salary</p>
                                </div>
                                <div className='flex justify-end'>
                                    <p className='text-3xl font-bold text-primary'>{details?.grossSalary}</p>
                                </div>
                            </div>

                            <div className='p-4 border-lightGrey border-2 w-1/3 rounded-xl'>
                                <div className='flex'>
                                    <p className='font-regular'>Deductions</p>
                                </div>
                                <div className='flex justify-end'>
                                    <p className='text-3xl font-bold text-primary'>{details?.deduction}</p>
                                </div>
                            </div>
                        </div>
                    <EmployeeSalaryForm details={details} />

                </div>
                    
                    
                </CardContent>
                </Card>
            </div>
    </div>
  )
}
