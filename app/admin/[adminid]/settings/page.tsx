"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Cards";
import { Input } from "@/components/Inputs";
import { Checkbox } from "@/components/Checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/Radio"
import { Label } from "@/components/Label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/Dialog";
import { AddAdminUser, getAllAdmins, removeAdmin } from "@/apiService";



interface Admins { 
  id: number | null;
  firstname: string;
  lastname: string;
  email: string;
  userType: string;
}


interface UserInfo {
  id: number;
  company: string;
  companyId: string;
  isVerified: boolean;
  firstName: string;
  lastName: string;  // Add other properties if needed
}



export default function AdminSettings() {
  const [loading, setLoading] = useState(false)
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const [admins, setAdmins] = useState<Admins[]>([]);
  const [selectedAdminId, setSelectedAdminId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [token, setToken] = useState<string | null>("")
  const {register, handleSubmit, reset, setValue, watch, formState: { errors },} = useForm<Admins>();
  const [storedUser, setStoredUser] = useState<UserInfo>({} as UserInfo);


  // Watch the selected value for debugging
  const selectedUserType = watch("userType");


  useEffect(() => {
    const fetchAdmin = async ()=>{
      const storedAdmins = JSON.parse(localStorage.getItem("allAdmins") || "[]")
      
      if (Array.isArray(storedAdmins)) {
        setAdmins(storedAdmins);
      }

      // Now, fetch fresh data in the background
      const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
      const token = sessionStorage.getItem("accessToken");
      setUserInfo(userInfo)
      setToken(token)
      setStoredUser(userInfo)

      if (token && userInfo?.companyId) {
        const fetchedAdmins = await fetchAllAdmins(token, userInfo.companyId);
        setAdmins(fetchedAdmins)
      }
    }

    fetchAdmin();
  }, [])
 

  const fetchAllAdmins = async (token: string, companyId: string): Promise<Admins[]> => {
    try {
      const result = await getAllAdmins(token, companyId);
      if (Array.isArray(result)) {
        return result;
      }
      return []
    } catch(error) {
      console.log(error)
      return []; 
    }
      
  }

 

   // Handle Removing Selected Admins
   const handleRemove = async (companyId: string, userId: number | null) => {
    const token = sessionStorage.getItem("accessToken");
    setLoading(true)
    if (!token) {
      console.error("No token found, user not authenticated");
      return;
    }

    console.log(token)
  
    const res = await removeAdmin(companyId, userId, token);
    console.log(res);
    const updatedAdmins = await fetchAllAdmins(token, storedUser.companyId);
    setAdmins(updatedAdmins); // Update state with new admin list

    // Reset selectedAdminId if it's no longer valid
  if (!updatedAdmins.some(admin => admin.id === selectedAdminId)) {
    setSelectedAdminId(null);
  }

  setLoading(false)
   
  };


  const handleCheckboxChange = (id: number | null) => {
    setSelectedAdminId((prev) => (prev === id ? null : id)); // Toggle selection
  };


  // Handle Adding a New Admin (React Hook Form)
  const onSubmit = async (data: Admins) => {
    if (!token || !userInfo?.companyId) {
      console.error("Token or companyId is missing");
      return;
    }
    setLoading(true)

    try {
      await AddAdminUser(data, token, userInfo.companyId);
      const updatedAdmins = await fetchAllAdmins(token, userInfo.companyId);
      setAdmins(updatedAdmins);
      reset(); // Clear form after submission
    } catch (error) {
      console.log(error);
    }
    setLoading(false)
    setIsModalOpen(false);
  };

  

  return (
    <div className="my-4 px-4">
      <div className="font-semibold text-[15px] sm:text-[18px] mb-4 px-4">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-fromGreetGradient via-throughGreet to-primary">
          Administration Settings
        </span>
      </div>

      <Card className="bg-white mx-auto p-4">
        <CardHeader>
          <CardTitle className="text-primary">Administrators</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-end gap-x-4 mb-4">
            {/* Remove Button */}
            <button
              onClick={()=>handleRemove(userInfo?.companyId || "", selectedAdminId || null)}
              className="bg-unPaid text-white text-[9px] sm:text-[14px] px-4 py-2 rounded-md disabled:opacity-50"
              disabled={!selectedAdminId}
            >
              Remove
            </button>

            {/* Add Admin Button (Opens Modal) */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <button className="bg-primary text-white text-[9px] sm:text-[14px] px-4 py-2 rounded-md">
                  Add Admin
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Admin</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <Input
                    type="text"
                    placeholder="First Name"
                    {...register("firstname", { required: "First name is required" })}
                  />
                  {errors.firstname && <p className="text-red-500">{errors.firstname.message}</p>}

                  <Input
                    type="text"
                    placeholder="Last Name"
                    {...register("lastname", { required: "Last name is required" })}
                  />
                  {errors.lastname && <p className="text-red-500">{errors.lastname.message}</p>}

                  <Input
                    type="email"
                    placeholder="Email"
                    {...register("email", { required: "Email is required" })}
                  />
                  {errors.email && <p className="text-red-500">{errors.email.message}</p>}

                  <RadioGroup  
                  value={selectedUserType} // Ensure it's controlled
                  onValueChange={(value) => setValue("userType", value)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Admin" id="admin"/>
                      <Label htmlFor="admin">Admin</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Manager" id="manager" />
                      <Label htmlFor="manager">Manager</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Auditor" id="auditor" />
                      <Label htmlFor="auditor">Auditor</Label>
                    </div>
                  </RadioGroup>
                  {errors.userType && <p className="text-red-500">{errors.userType.message}</p>}

                  <button type="submit" className="bg-primary text-white px-4 py-2 rounded-md w-full">
                    {loading ? "Adding Admin..." : "Admin"}
                  </button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Admins List */}
          <div className="space-y-4">
            {admins?.map((admin) => (
              <div key={admin.id} className="flex items-center gap-x-4 border-b pb-2">
                {/* Checkbox to select admin */}
                <Checkbox
                  checked={selectedAdminId === admin.id}
                  onCheckedChange={() => handleCheckboxChange(admin.id || null)}
                />

                {/* Admin Details */}
                <div className="flex-1">
                  <div className="flex gap-x-[4px]">
                    <p className="font-medium text-[10px] sm:text-[14px]">{admin?.firstname}</p>
                    <p className="font-medium text-[10px] sm:text-[14px]">{admin?.lastname}</p>
                  </div>
                  <p className="text-[8px] sm:text-[10px] text-gray-500">{admin.email}</p>
                </div>

                {/* Role Display */}
                <span className="px-3 py-1 text-[8px] sm:text-[10px] font-medium bg-gray-200 rounded-md">
                  {admin.userType}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

