'use client'


import React, { useState } from "react";
import Image from "next/image";
import { createNewUser } from "@/apiService";
import { useSearchParams, useRouter } from "next/navigation";







const CreateNewPassword = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
     const token = searchParams.get("token");
    const [loading, setLoading] = useState(false);
   const [error, setError] = useState("");
   const [formData, setFormData] = useState({
     newPassword: "",
     confirmNewPassword: ""
   });


   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)
    try {
        const result = await createNewUser(token || "", formData.newPassword, formData.confirmNewPassword)
        setFormData({
            newPassword: "",
            confirmNewPassword: ""
        })
        console.log(result)
        router.push(`/`)
    }catch(error){
        setError(`${error}`)
    }
   
    setError('')

    setLoading(false)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

    
    

return (
    <div className="flex items-center justify-center">
        <div className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semi text-center mb-4">Create New Password</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4 font-regular">
            <input
                type="password"
                name="newPassword"
                placeholder="Enter New Password"
                className="w-full p-3 border border-gray-300 rounded-[7px]"
                value={formData.newPassword}
                onChange={handleChange}
                required
            />
            <input
                type="password"
                name="confirmNewPassword"
                placeholder="Confirm New Password"
                className="w-full p-3 border border-gray-300 rounded-[7px]"
                value={formData.confirmNewPassword}
                onChange={handleChange}
                required
            />
        <button
        type="submit"
        className="w-full bg-primary text-white p-3 rounded-[7px] font-semibold"
        disabled={loading}
        >
        {loading ? "Please wait..." : "Save New Password"}
        </button>
                    
        </form>
        
        <div className="flex justify-center mt-20 -mb-4">
            <Image height={40} width={100} src={'/logo_blue.png'} alt="logo"/>
        </div>
    </div>
    </div>
        )
}   

export default CreateNewPassword;