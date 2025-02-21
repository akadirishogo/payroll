'use client'

import React, { useState } from "react";
import Image from "next/image";
import ResetModal from '@/components/userAuthForms/ResetModal';
import { PiEnvelopeSimpleThin } from "react-icons/pi";
import { Colors } from "@/Colors";
import Loading from "../Loading";



const ResetForm = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
      email: "",
    });
  
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
   
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setError("");
  
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    setIsModalOpen(true)
  
      setLoading(false);

      console.log('email sent')
      }

      if (loading) {
        <Loading />
      }

return (
    <div className="flex items-center justify-center mt-16">
        <div className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center">Forgot Password</h2>
        <p className="mb-4 font-regular text-Inactive text-center text-[14px]">No worries, we will send you instructions for reset</p>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4 font-regular">
            <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full p-3 border border-gray-300 rounded-[7px] mb-10"
                value={formData.email}
                onChange={handleChange}
                required
            />
            
            <button
            onClick={handleSubmit}
            type="submit"
            className="w-full bg-primary text-white p-3 rounded-[7px] font-semibold"
            >
            Reset Password
            </button>            
            </form>
            <div className="flex justify-center mt-10">
                <Image height={50} width={100} src={'/logo_blue.png'} alt="logo"/>
            </div>
        </div>
        <ResetModal isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        message={['We have sent an email to tr******@gmail.com', 'Click the link to get started']}
        title="Check your email" 
        icon= {<PiEnvelopeSimpleThin size={100} color={Colors.primary}/>}>
            <div className="flex flex-col items- mt-4">
                <p className="font-medium">Did not get an email?</p>
                <p className="text-primary">Resend</p>
            </div>
        </ResetModal> 
    </div>
    )
}


    export default ResetForm;