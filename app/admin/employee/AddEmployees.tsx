"use client";

import React, { useState } from 'react'
import SelectFilter from '@/app/components/SelectFilter'
import Link from "next/link";
import { useParams, useRouter } from 'next/navigation';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/app/components/Table"

import { Input } from '@/app/components/Inputs';
import { Colors } from '@/Colors';

interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    deductions: any;
    email: string;
    role: string;
    startDate: any;
    monthlyGross: any;
    department: string;
    phoneNumber: string
  }




export default function AddEmployee() {
    const [employees, setEmployees] = useState<Employee[]>([
        {   id: 1,
            firstName: '',
            lastName: '',
            deductions: '',
            email: '',
            role: '',
            startDate: '',
            monthlyGross: '',
            department: '',
            phoneNumber: ''  
        }, // Initial empty row
      ]);

     const router = useRouter();

     const handleFilterChange = (value: string) => {
        console.log("Selected Year:", value);
        // Use this function elsewhere in ParentComponent
    };

      // Function to handle input changes
  const handleInputChange = (id: number, field: keyof Employee, value: string) => {
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === id ? { ...emp, [field]: value } : emp))
    );
  };

  // Function to add a new row
  const addEmployee = () => {
    setEmployees([...employees, { id: employees.length + 1, 
            firstName: '',
            lastName: '',
            deductions: '',
            email: '',
            role: '',
            startDate: '',
            monthlyGross: '',
            department: '',
            phoneNumber: ''  
    }]);
  };

  // Function to save data (send to backend)
  /* const saveRecords = async () => {
    try {
      const response = await fetch("/api/payroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employees),
      });
      if (response.ok) {
        alert("Records saved successfully!");
      } else {
        alert("Failed to save records.");
      }
    } catch (error) {
      console.error("Error saving records:", error);
    }
  }; */


    return (
    <div>
        <div className='font-semibold text-[25px] mb-4 px-4'>
            <span className='bg-clip-text 
            text-transparent bg-gradient-to-r from-fromGreetGradient 
            via-throughGreet to-primary'>
            Employee Records
            </span>
        </div>
        <div className='bg-white mx-6 rounded-t-2xl my-10'>
      
            <div className='rounded-t-2xl flex text-white bg-gradient-to-r from-fromGreetGradient via-throughGreet to-primary justify-between items-center text-[15px] p-2'>
            <p>Add Employee</p>  
            </div>
                <div className='px-4 pb-4'>
                    <div className='flex p-2 justify-end gap-x-4'>
                        <button onClick={()=>addEmployee} className='bg-primary text-white px-4 py-2 text-[15px]'>Add Record</button> 
                        <button className='bg-primary text-white px-4 py-2 text-[15px]'>Save Record</button> 
                    </div>
                    <Table className=''>
                    <TableHeader className='bg-Inactive text-white'>
                        <TableRow>
                        <TableHead>Id</TableHead>
                        <TableHead>First Name</TableHead>
                        <TableHead>Last Name</TableHead>
                        <TableHead>Deductions</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Start Date</TableHead>
                        <TableHead>Monthly Gross</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Phone Number</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className='text-[12px]'>
                        {employees.map((emp) => (
                            <TableRow key={emp.id}>
                            <TableCell>
                                <Input
                                type="text"
                                value={emp.id}
                                onChange={(e) => handleInputChange(emp.id, "id", e.target.value)}
                                className='w-16'
                                />
                            </TableCell>
                            <TableCell>
                            <Input
                                type="text"
                                value={emp.firstName}
                                onChange={(e) => handleInputChange(emp.id, "firstName", e.target.value)}
                                />
                            </TableCell>
                            <TableCell>
                                <Input
                                    type="text"
                                    value={emp.lastName}
                                    onChange={(e) => handleInputChange(emp.id, "lastName", e.target.value)}
                                    />
                            </TableCell>
                            
                            <TableCell>
                                <Input
                                    type="text"
                                    value={emp.deductions}
                                    onChange={(e) => handleInputChange(emp.id, "deductions", e.target.value)}
                                />
                            </TableCell>
                            <TableCell>
                                <Input
                                    type="text"
                                    value={emp.email}
                                    onChange={(e) => handleInputChange(emp.id, "email", e.target.value)}
                                />
                            </TableCell>
                            <TableCell>
                                <Input
                                    type="text"
                                    value={emp.role}
                                    onChange={(e) => handleInputChange(emp.id, "role", e.target.value)}
                                />
                            </TableCell>
                            <TableCell>
                                <Input
                                    type="text"
                                    value={emp.startDate}
                                    onChange={(e) => handleInputChange(emp.id, "startDate", e.target.value)}
                                />
                            </TableCell>
                            <TableCell>
                                <Input
                                    type="text"
                                    value={emp.monthlyGross}
                                    onChange={(e) => handleInputChange(emp.id, "monthlyGross", e.target.value)}
                                />
                            </TableCell>

                            <TableCell>
                                <Input
                                    type="text"
                                    value={emp.department}
                                    onChange={(e) => handleInputChange(emp.id, "department", e.target.value)}
                                />
                            </TableCell>
                            <TableCell>
                                <Input
                                    type="text"
                                    value={emp.phoneNumber}
                                    onChange={(e) => handleInputChange(emp.id, "phoneNumber", e.target.value)}
                                />
                            </TableCell>
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
