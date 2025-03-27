"use client;"


import React, { useEffect, useRef, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../Cards'
import { Button } from '../Button'
import { Input } from '../Inputs'
// import { RiDeleteBin6Line } from 'react-icons/ri'
import { Loader2 } from 'lucide-react'

import { FaUser } from "react-icons/fa6";
import { Colors } from '@/Colors'
import { uploadImage } from '@/apiService'


interface Company {
    id: string;
    name: string;
    contactAddress: string;
    phone: string | null;
    createdAt: string;
    updatedAt: string;
}

interface Employee {
    id: number;
    DOB: string;
    maritalStatus: string;
    company: Company;
    firstname: string;
    lastname: string;
    deduction: number;
    email: string;
    role: string;
    startDate: string;
    grossSalary: number;
    netSalary: number;
    department: string;
    profilePictureUrl: string;
    phone: string;
    accountNumber: string;
    bank: string;
    createdAt: string;
    residentialAddress: string;
  }


export default function ProfileDetails() {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [employee, setEmployee] = useState([])
    const [userInfo, setUserInfo] = useState<Employee | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    const token = sessionStorage.getItem("userToken")

   
    
    // const id = params.userId

        
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

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0] && userInfo?.company?.id) {
            const file = e.target.files[0];
            setSelectedFile(file); 
            const imageResult = await uploadImage(token || "", userInfo.company.id, userInfo.id || 0, file); 
            console.log(imageResult);
        }
    };


  

  if (!userInfo)
    return (
    <div className="flex items-center justify-center h-screen">
      <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
    </div>
  );

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!userInfo) return;
    setEmployee({ ...employee, [e.target.name]: e.target.value });
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

            <div className="lg:absolute lg:right-2 lg:-top-6 mb-4">
                    <div className="w-[150px] h-[150px] flex items-center border justify-center rounded-full overflow-hidden">
                        {userInfo?.profilePictureUrl ? (
                            <img src={`${userInfo?.profilePictureUrl}`} className="object-cover" alt="User image" />
                        )
                        :
                        (
                            <FaUser color={Colors.greyBorder} size={70} />
                        )
                    }
                        
                    </div>
                    <div className="mt-6 gap-x-4 flex">
                    <input type="file" 
                            accept="image/*" 
                            className="hidden"
                            ref={fileInputRef} 
                            onChange={handleFileChange} 
                        />
                    <Button onClick={() => fileInputRef.current?.click()} className="border-2 px-4 py-1 rounded-xl">
                     {userInfo?.profilePictureUrl ? "Change Photo" : "Upload Photo"}
                    </Button>
                    </div>
                </div>


            <div className="sm:flex sm:gap-x-2 md:flex md:gap-x-4 lg:flex lg:gap-x-4">
                <div>
                    <label className="text-sm text-gray-500">First Name</label>
                    <Input
                        name="firstName"
                        value={userInfo?.firstname || ""}
                        onChange={handleChange}
                        disabled
                        className="lg:min-w-[250px]"
                    />
                </div>

                <div>
                    <label className="text-sm text-gray-500">Last Name</label>
                    <Input
                        name="lastName"
                        value={userInfo?.lastname || ""}
                        onChange={handleChange}
                        disabled
                        className="lg:min-w-[250px]"
                    />
                </div>
            </div>
        </div>

       

        {/* Email */}
        <div className="mt-6">
        <label className="text-sm text-gray-500">Email</label>
            <Input
                name="email"
                value={userInfo?.email || ""}
                onChange={handleChange}
                disabled
                className="lg:min-w-[300px] md:min-w-[400px]"
            />
        </div>

        <div className="mt-6 sm:flex sm:gap-x-2 md:flex md:gap-x-4 lg:flex lg:gap-x-4">
            <div>
                <label className="text-sm text-gray-500">Phone</label>
                <Input
                    name="phone"
                    value={userInfo?.phone || ""}
                    onChange={handleChange}
                    disabled={!isEditing}
                />
            </div>

            <div>
                <label className="text-sm text-gray-500">Marital Status</label>
                <Input
                    name="status"
                    value={userInfo?.maritalStatus || ""}
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
                value={userInfo?.residentialAddress || ""}
                onChange={handleChange}
                disabled={!isEditing}
                className="lg:min-w-[400px] md:min-w-[400px]"
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
