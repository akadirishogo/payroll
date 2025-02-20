"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { BiHomeAlt2 } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
import { PiBuildingOfficeBold } from "react-icons/pi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { useEffect } from "react";
import { useState } from "react";
import users from "@/Employees";

interface Employee {
    id: number;
    firstName: string;
    lastName: string;
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
  }


export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const params = useParams();

    const [employee, setEmployee] = useState<Employee | null>();
    const id = params.userId


    useEffect(() => {
        const employee = users.find((user) => user.id === Number(id));
        if(employee) {
          setEmployee(employee)
        }
    }, [])


  
    return (
      <div className="font-regular">
        {/* Menu Tabs */}
        <div className="bg-backGroundGrey bg-cover min-h-[100vh] flex">
            <div className="pl-8 bg-gradient-to-t from-fromGradient via-throughGradient to-primary flex flex-col min-w-[20%] min-h-[100%]">
                <div className="mt-4 mb-8">
                    <Image height={50} width={100} src={'/logo_white.png'} alt="logo"/>
                </div>
                <p className="text-white text-xl font-semi mb-4">Main Menu</p>
                <div className="flex flex-col gap-y-2 font-regular text-white">
                    <Link href={`/${id}/home`} className= {`${pathname.includes("/home") ? "bg-white" : ""} 
                    ${pathname.includes("/home") ? "text-primary" : ""} p-2 max-w-[80%] rounded-[7px] flex gap-x-2`}>
                        <BiHomeAlt2 className="h-5 w-5" />
                        Home
                    </Link>
                    

                    <Link href= {`/${id}/payroll`} className= {`${pathname.includes("/payroll") ? "bg-white" : ""} 
                        ${pathname.includes("/payroll") ? "text-primary" : ""} p-2 max-w-[80%] rounded-[7px] flex gap-x-2`}>
                        <MdOutlineLibraryBooks className="h-5 w-5" />
                        Payroll History
                    </Link>
                    <Link href={`/${id}/settings`} className= {`${pathname.includes("/settings") ? "bg-white" : ""}  
                    ${pathname.includes("/settings") ? "text-primary" : ""} p-2 max-w-[80%] rounded-[7px] flex gap-x-2`}>
                        <IoSettingsOutline className="h-5 w-5" />
                        Settings
                    </Link>
                </div>
            </div>
            <div className="min-w-[80%]">
                <div className="text-primary bg-backGroundGrey p-2 flex justify-end items-center gap-x-4 pr-4 sticky top-0 z-50">
                    <div className="flex gap-x-2">
                        <p className="text-[12px]">CredLock Africa</p>
                        <PiBuildingOfficeBold className="w-5 h-5"/>
                    </div>

                    <div className="flex gap-x-2">
                        <div className="max-h-[30px] max-w-[30px]">
                            <Image src={'/user.jpg'} width={40} height={40} className="rounded-full" alt="user image"/>
                        </div>
                        
                        <div>
                            <p className="text-[14px]">{employee?.firstName} {employee?.lastName}</p>
                            <p className="text-[12px] font-light">{employee?.role}</p>
                        </div>
                        
                    </div>
                    <div>
                        <p className="text-[12px]">Sign Out</p>
                    </div>
                    <IoIosNotificationsOutline className="w-7 h-7" />
                </div>
                 {/* Page Content */}
                <div>{children}</div>
            </div>

            
        </div>
  
       
      </div>
    );
  }