"use client;"


import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../Cards'
import { Button } from '../Button'
import { Input } from '../Inputs'
import { RiDeleteBin6Line } from 'react-icons/ri'
import addBankAccount from '@/utilityFunctions'
import { Loader2 } from 'lucide-react'
import users from '@/Employees'
import { useParams } from 'next/navigation'

interface BankAccount {
    id: number;
    bankName: string;
    accountNumber: string;
    isDefault: boolean;
  }

interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    maritalStatus: string;
    deductions: string;
    email: string;
    role: string;
    startDate: string;
    monthlyGross: string;
    netSalary: string;
    department: string;
    phoneNumber: string;
    accountNumber: string;
    bank: string;
    address: string;
  }


export default function ProfileDetails() {
    const params = useParams();

    const [employee, setEmployee] = useState<Employee | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [accountsDetails, setAccountsDetails] = useState<BankAccount[]>([
        { id: 1, bankName: "First Bank", accountNumber: "1234567890", isDefault: true }
    ])
    const [defaultAccount, setDefaultAccount] = useState()
    const id = params.userId

    useEffect(() => {
        const employee = users.find((user) => user.id === Number(id));
        if(employee) {
          setEmployee(employee)
        }
    }, [])

  

  if (!employee)
    return (
    <div className="flex items-center justify-center h-screen">
      <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
    </div>
  );

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!employee) return;
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleAddBank = (newBank: BankAccount) => {
    setAccountsDetails(addBankAccount(accountsDetails, newBank));
  };



  return (
    <Card className="max-w-full bg-white mt-4 p-4">
    <CardHeader>
        <CardTitle className="text-lg">Profile</CardTitle>
    </CardHeader>
    <CardContent className="">
        
        <div className="relative">
            <div className="mb-6 -mt-4">
                <p>Set your profile details</p>
            </div>
            <div className="flex gap-x-4">
                <div>
                    <label className="text-sm text-gray-500">First Name</label>
                    <Input
                        name="firstName"
                        value={employee?.firstName || ""}
                        onChange={handleChange}
                        disabled
                        className="min-w-[300px]"
                    />
                </div>

                <div>
                    <label className="text-sm text-gray-500">Last Name</label>
                    <Input
                        name="lastName"
                        value={employee?.lastName || ""}
                        onChange={handleChange}
                        disabled
                        className="min-w-[300px]"
                    />
                </div>
                <div className="absolute right-44 -top-6">
                    <div className="w-[150px] h-[150px] flex items-center justify-center rounded-full overflow-hidden">
                        <img src='/user.jpg' className="w-full h-full object-cover" alt="User" />
                    </div>
                    <div className="mt-6 gap-x-4 flex">
                        <button className="border-2 px-4 py-1 rounded-xl">
                            <p className="text-[15px]">Change Photo</p>
                        </button>
                        <button className="border-2 w-10 h-10 flex items-center justify-center rounded-full">
                            <RiDeleteBin6Line />
                        </button>
                    </div>
                </div>

            </div>
        </div>

       

        {/* Email */}
        <div className="mt-6">
        <label className="text-sm text-gray-500">Email</label>
            <Input
                name="email"
                value={employee?.email || ""}
                onChange={handleChange}
                disabled
                className="min-w-[500px]"
            />
        </div>

        <div className="mt-6 flex gap-x-6">
            <div>
                <label className="text-sm text-gray-500">Phone</label>
                <Input
                    name="phone"
                    value={employee?.phoneNumber || ""}
                    onChange={handleChange}
                    disabled={!isEditing}
                />
            </div>

            <div>
                <label className="text-sm text-gray-500">Marital Status</label>
                <Input
                    name="status"
                    value={employee?.maritalStatus || ""}
                    onChange={handleChange}
                    disabled={!isEditing}
                />
            </div>
        </div>

         {/* Email */}
         <div className="mt-6">
        <label className="text-sm text-gray-500">Address</label>
            <Input
                name="address"
                value={employee?.address || ""}
                onChange={handleChange}
                disabled={!isEditing}
                className="min-w-[500px]"
            />
        </div>

        {/* Buttons */}
        <div className="flex gap-x-6 mt-8">
        {isEditing ? (
            <Button
            onClick={() => setIsEditing(false)}
            className="bg-primary text-white"
            >
            Save
            </Button>
        ) : (
            <Button
            onClick={() => setIsEditing(true)}
            className="bg-primary text-white"
            >
            Edit
            </Button>
        )}
        {isEditing && (
            <Button
            onClick={() => setIsEditing(false)}
            variant="outline"
            className="border-gray-300"
            >
            Cancel
            </Button>
        )}
        </div>
    </CardContent>
    </Card>
  )
}
