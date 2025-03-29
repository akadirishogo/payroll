"use client;"


import React, { useEffect, useRef, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../Cards'
import { Button } from '../Button'
import { Input } from '../Inputs'
// import { RiDeleteBin6Line } from 'react-icons/ri'
import { Loader2 } from 'lucide-react'
import { updateEmployeeData } from '@/apiService'
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

export interface Employee {
    id: number;
    DOB: string;
    maritalStatus: string;
    company: Company;
    firstname: string;
    lastname: string;
    gender: string;
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
    const [loading, setLoading] = useState(false);
    const [saveLoading, setSaveLoading] = useState(false)
    const [userInfo, setUserInfo] = useState<Employee | null>(null);
    const [modifiedFields, setModifiedFields] = useState<Partial<Employee>>({});
    const [isEditing, setIsEditing] = useState(false);

    const token = sessionStorage.getItem("userToken")

   
    const formatForBackend = (uiDate: string) => {
        if (!uiDate) return "";
        const [month, day, year] = uiDate.split("-");
        return `${day}-${month}-${year}`; // Convert to dd-mm-yyyy for backend
    };
 
        
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

      // Listen for changes in localStorage to update UI when profile picture is updated

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoading(true)
        if (e.target.files && e.target.files[0] && userInfo?.company?.id) {
            try {
                const file = e.target.files[0]; 
                const imageResult = await uploadImage(token || "", userInfo.company.id, userInfo.id || 0, file); 
                updateProfilePicture(imageResult?.profilePictureUrl)
                setLoading(false)
            }catch(error) {
                console.log(error)
            }finally {
                setLoading(false)
            }   
        }
    };


    const updateProfilePicture = (newProfilePictureUrl: string) => {
        
        if (!userInfo) return;

        const updatedInfo = { ...userInfo, profilePictureUrl: newProfilePictureUrl }; // Update field
        localStorage.setItem("employeeInfo", JSON.stringify(updatedInfo)); // Save to localStorage
        setUserInfo(updatedInfo);      
    };


    
    


    const handleSubmit = async () => {
        setSaveLoading(true)
        if (!Object.keys(modifiedFields).length) {
            console.log("No changes to update.");
            return;
        }

        const payload: Partial<Employee> = { ...modifiedFields };

        if (payload.DOB) {
            payload.DOB = formatForBackend(payload.DOB);
        }
        await updateEmployeeData(
            userInfo?.company?.id || "", 
            userInfo?.id || 0, 
            token || "", 
            payload as Employee  // Cast the partial payload to Employee
        );
        console.log("Submitting Data:", payload);
        setSaveLoading(false)
        setIsEditing(false)
    }

  

  if (!userInfo)
    return (
    <div className="flex items-center justify-center h-screen">
      <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
    </div>
  );

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!userInfo) return;

    const { name, value } = e.target;
    let updatedValue = value;

    if (name === "DOB") {
        updatedValue = value; // UI uses yyyy-mm-dd
    }

    const updatedInfo = { ...userInfo, [name]: updatedValue };

    // Save to localStorage
    localStorage.setItem("employeeInfo", JSON.stringify(updatedInfo));

    // Track modified fields
    setModifiedFields(prev => ({
        ...prev,
        [name]: updatedValue
    }));

    setUserInfo(updatedInfo); // Update state to trigger re-render
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
                    <Button onClick={() => fileInputRef.current?.click()} className="text-white border-2 px-4 py-1 rounded-xl">
                     {loading ? "Uploading..." : userInfo?.profilePictureUrl ? "Change Photo" : "Upload photo"}
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
            <div className='mt-6 items-center'>
                <label className="text-sm text-gray-500">Date of Birth</label>
                <input 
                        type="date" 
                        name="DOB" 
                        value={userInfo?.DOB || ""} 
                        disabled={!isEditing}
                        onChange={handleChange}
                        className="lg:min-w-[250px] border mx-4 text-gray-500"
                />

                <label className='text-sm text-gray-500'>Gender</label>
                <select 
                    className='border text-sm text-gray-500' 
                    name="gender"
                    value={userInfo?.gender}
                    onChange={handleChange} 
                    disabled={!isEditing}>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
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

        <div className="mt-6 sm:flex sm:gap-x-2 md:flex md:items-center md:gap-x-4 lg:flex lg:gap-x-4">
            <div>
                <label className="text-sm text-gray-500">Phone</label>
                <Input
                    name="phone"
                    value={userInfo?.phone || ""}
                    onChange={handleChange}
                    disabled={!isEditing}
                />
            </div>

            <div className='flex flex-col'>
                <label className="text-sm text-gray-500">Marital Status</label>
                <select 
                    className='border text-sm text-gray-500' 
                    name="maritalStatus"
                    value={userInfo?.maritalStatus}
                    onChange={handleChange} 
                    disabled={!isEditing}>
                    <option value="">Select Status</option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                </select>
            </div>
        </div>

         {/* Email */}
         <div className="mt-6">
        <label className="text-sm text-gray-500">Address</label>
            <Input
                name="residentialAddress"
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
            onClick={handleSubmit}
            className="bg-primary text-white"
            >
            {saveLoading ? "Saving..." : "Save"}
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
            onClick={() => {
                setIsEditing(false);
                setModifiedFields({}); // Clear modified fields when canceling
            }}
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
