"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { BiHomeAlt2 } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
import { PiBuildingOfficeBold } from "react-icons/pi";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { Colors } from "@/Colors";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import { FaUser } from "react-icons/fa6";



/* interface Employee {
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
  } */


export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const userInfo = JSON.parse(localStorage.getItem("employeeInfo") || "{}") 
    const pathname = usePathname();
    const router = useRouter();

    const params = useParams();

    const id = params.userid

    console.log(id)


    const logOut = () => {
        sessionStorage.removeItem("userToken");
        localStorage.removeItem("employeeInfo");
        localStorage.removeItem("companyInfo");
        router.push("/signin");
    }

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };



  
    return (
      <div className="font-regular w-screen">
        <div className={`fixed top-0 left-0 h-full w-[60%] bg-gradient-to-t from-fromGradient via-throughGradient to-primary transform ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out lg:hidden z-50`}>
                <div className="p-6">
                    <button onClick={toggleMenu} className="text-white text-xl">✖</button>
                    <div className="mt-8 flex flex-col gap-y-4 text-white">
                    <Link href={`/user/${id}`} className= {`${pathname === `/user/${id}` ? "bg-white" : ""} 
                    ${pathname === `/user/${id}` ? "text-primary" : ""} p-2 max-w-[80%] rounded-[7px] flex gap-x-2`}>
                        <BiHomeAlt2 className="h-5 w-5" />
                        Home
                    </Link>
                    

                    <Link href= {`/user/${id}/payroll`} className= {`${pathname.startsWith(`/user/${id}/payroll`) ? "bg-white" : ""} 
                        ${pathname.startsWith(`/user/${id}/payroll`) ? "text-primary" : ""} p-2 max-w-[80%] rounded-[7px] flex gap-x-2`}>
                        <MdOutlineLibraryBooks className="h-5 w-5" />
                        Payroll History
                    </Link>
                    <Link href={`/user/${id}/settings`} className= {`${pathname.startsWith(`/user/${id}/settings`) ? "bg-white" : ""}  
                    ${pathname.includes(`/user/${id}/settings`) ? "text-primary" : ""} p-2 max-w-[80%] rounded-[7px] flex gap-x-2`}>
                        <IoSettingsOutline className="h-5 w-5" />
                        Settings
                    </Link>
                        <button onClick={logOut} className="mt-4 p-2 text-white rounded-lg">
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        <div className="bg-backGroundGrey lg:flex w-[100%] min-h-[100vh]">
            <div className="lg:hidden bg-primary py-4 px-4 flex items-center justify-between">
                <div onClick={() => setIsMenuOpen(!isMenuOpen)} className="cursor-pointer">
                    <GiHamburgerMenu color={Colors.onPrimary} size={25}/>
                </div>
                <div className="flex gap-x-3 items-center">
                    <div className="flex gap-x-2 items-center">
                        <div className="h-[35px] w-[35px] rounded-full bg-red-500 overflow-hidden">
                            <img src="/user.jpg" alt="user image" className="w-[100%] h-[100%]"/>
                        </div>
                                    
                        <div>
                            <p className="text-[10px] text-white">{userInfo?.firstname} {userInfo?.lastname}</p>
                            <p className="text-[8px] text-white font-light">{userInfo?.role}</p>
                        </div>
                    </div>
                    <div onClick={logOut} className="cursor-pointer hover:underline">
                        <p className="text-[10px] text-white">Sign Out</p>
                    </div>
                </div>
            </div>
            <div className="hidden pl-8 lg:inline-flex bg-gradient-to-t from-fromGradient via-throughGradient to-primary flex flex-col min-w-[20%] min-h-[100%]">
                <div className="mt-4 mb-8">
                    <Image height={50} width={100} src={'/logo_white.png'} alt="logo"/>
                </div>
                <p className="text-white text-xl font-semi mb-4">Main Menu</p>
                <div className="flex flex-col gap-y-2 font-regular text-white">
                    <Link href={`/user/${id}`} className= {`${pathname === `/user/${id}` ? "bg-white" : ""} 
                    ${pathname === `/user/${id}` ? "text-primary" : ""} p-2 max-w-[80%] rounded-[7px] flex gap-x-2`}>
                        <BiHomeAlt2 className="h-5 w-5" />
                        Home
                    </Link>
                    

                    <Link href= {`/user/${id}/payroll`} className= {`${pathname.startsWith(`/user/${id}/payroll`) ? "bg-white" : ""} 
                        ${pathname.startsWith(`/user/${id}/payroll`) ? "text-primary" : ""} p-2 max-w-[80%] rounded-[7px] flex gap-x-2`}>
                        <MdOutlineLibraryBooks className="h-5 w-5" />
                        Payroll History
                    </Link>
                    <Link href={`/user/${id}/settings`} className= {`${pathname.startsWith(`/user/${id}/settings`) ? "bg-white" : ""}  
                    ${pathname.includes(`/user/${id}/settings`) ? "text-primary" : ""} p-2 max-w-[80%] rounded-[7px] flex gap-x-2`}>
                        <IoSettingsOutline className="h-5 w-5" />
                        Settings
                    </Link>
                </div>
            </div>
            <div className="min-w-[80%]">
                <div className="hidden lg:flex text-primary bg-backGroundGrey p-2 flex justify-end items-center gap-x-4 pr-4 sticky top-0 z-50">
                    <div className="flex gap-x-2">
                        <p className="text-[12px]">{userInfo?.company?.name}</p>
                        <PiBuildingOfficeBold className="w-5 h-5"/>
                    </div>

                    <div className="flex gap-x-2">
                        <div className="max-h-[30px] max-w-[30px]">
                            {userInfo?.profilePictureUrl ? (
                                <img src={`${userInfo?.profilePictureUrl}`} width={40} height={40} className="rounded-full" alt="user image"/>
                            ) 
                            : 
                            (
                                <FaUser color={Colors.greyBorder} size={10} />
                            )}
                            
                        </div>
                        
                        <div>
                            <p className="text-[14px]">{userInfo?.firstname} {userInfo?.lastname}</p>
                            <p className="text-[12px] font-light">{userInfo?.role}</p>
                        </div>
                        
                    </div>
                    <div onClick={logOut}>
                        <p className="text-[12px]">Sign Out</p>
                    </div>
                </div>
                 {/* Page Content */}
                <div>{children}</div>
            </div>

            
        </div>
  
       
      </div>
    );
  }