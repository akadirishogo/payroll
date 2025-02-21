'use client'


import React, { useState } from "react";
import Image from "next/image";







const CreateNewPassword = () => {
    const [loading, setLoading] = useState(false);
   const [error, setError] = useState("");
   const [formData, setFormData] = useState({
     newPassword: "",
     confirmNewPassword: ""
   });


   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)
    setError('')
    setLoading(false)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

    
    

return (
    <div className="flex items-center justify-center">
        <div className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-md mt-8">
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
                name="password"
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