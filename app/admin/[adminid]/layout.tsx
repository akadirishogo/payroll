"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiHomeAlt2 } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
import { PiBuildingOfficeBold } from "react-icons/pi";
import { BsPeople } from "react-icons/bs";
import { LuNotebookPen } from "react-icons/lu";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    accessToken: string;
    company: string;
  };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [userId, setUserId] = useState<string | null>(null);
    const [userData, setUserData] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    const pathname = usePathname();

    useEffect(() => {
        const token = sessionStorage.getItem("accessToken");
        const storedUserInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");

        if (!token) {
            router.push("/signin"); // Redirect if not authenticated
        } else {
            setIsAuthenticated(true);
            setUserData(storedUserInfo);
            setUserId(storedUserInfo.id)
        }
    }, [router]); // Ensures consistent behavior

    if (!isAuthenticated) {
        return 
    }
    
    const logOut = () => {
        sessionStorage.removeItem("accessToken");
        localStorage.removeItem("userInfo");
        localStorage.removeItem("allAdmins");  // Optional
        router.push("/signin");
    }

   
    console.log(userData)
  
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
                <Link href= {`/admin/${userId}`} className= {`p-2 max-w-[80%] rounded-[7px] flex gap-x-2 ${pathname === `/admin/${userId}` ? "bg-white text-primary" : ""}`}>
                        <BiHomeAlt2 className="h-5 w-5" />
                        Home
                    </Link>
                    
                    <Link href= {`/admin/${userId}/employee`} className= {`${pathname.startsWith(`/admin/${userId}/employee`) ? "bg-white" : ""}  
                    ${pathname.startsWith(`/admin/${userId}/employee`) ? "text-primary" : ""} p-2 min-w-[85%] rounded-[7px] flex gap-x-2`}>
                        <BsPeople className="h-5 w-5" />
                        Employee Records
                    </Link>

                    <Link href={`/admin/${userId}/createPayroll`} className= {`${pathname.startsWith(`/admin/${userId}/createPayroll`) ? "bg-white" : ""}  
                    ${pathname.startsWith(`/admin/${userId}/createPayroll`) ? "text-primary" : ""} p-2 max-w-[80%] rounded-[7px] flex gap-x-2`}>
                        <LuNotebookPen className="h-5 w-5" />
                        Create Payroll
                    </Link>

                    <Link href={`/admin/${userId}/payroll`} className= {`${pathname.startsWith(`/admin/${userId}/payroll`) ? "bg-white" : ""} 
                        ${pathname.startsWith(`/admin/${userId}/payroll`) ? "text-primary" : ""} p-2 max-w-[80%] rounded-[7px] flex gap-x-2`}>
                        <MdOutlineLibraryBooks className="h-5 w-5" />
                        Payroll History
                    </Link>
                    <Link href={`/admin/${userId}/settings`} className= {`${pathname === `/admin/${userId}/settings` ? "bg-white" : ""}  
                    ${pathname === `/admin/${userId}/settings` ? "text-primary" : ""} p-2 max-w-[80%] rounded-[7px] flex gap-x-2`}>
                        <IoSettingsOutline className="h-5 w-5" />
                        Admin Settings
                    </Link>
                </div>
            </div>
            <div className="min-w-[80%]">
                <div className="text-primary bg-backGroundGrey p-2 flex justify-end items-center gap-x-4 pr-4 sticky top-0 z-50">
                    <div className="flex gap-x-2">
                        <p className="text-[12px]">{userData?.company}</p>
                        <PiBuildingOfficeBold className="w-5 h-5"/>
                    </div>

                    <div className="flex gap-x-2">
                        <div className="max-h-[30px] max-w-[30px]">
                            <Image src={'/user.jpg'} width={40} height={40} className="rounded-full" alt="user image"/>
                        </div>
                        
                        <div>
                            <p className="text-[14px]">{userData?.firstname} {userData?.lastname}</p>
                            <p className="text-[12px] font-light">Admin</p>
                        </div>
                        
                    </div>
                    <div onClick={logOut} className="cursor-pointer hover:underline">
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