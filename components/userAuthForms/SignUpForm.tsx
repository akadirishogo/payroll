"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation'
import createBusinessAdmin from "@/apiService";
import useStore from "@/store/employeeStore";
import ConfirmModal from '@/components/ConfirmAdminModal'



const SignUpForm = () => {
    const [formData, setFormData] = useState({
      email: "",
      password: "",
      confirmPassword: "",
    });
  
    const [loading, setLoading] = useState(false);
    const [itExist, setItExist] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();
    const setUser = useStore((state) => state.setUser);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const getSignIn = () => {
        router.push('/signin')
    }
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setError("");
  
      if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match!");
          return;
        }
    
        try {
            const userData = await createBusinessAdmin(formData.email, formData.password, formData.confirmPassword)
            if (userData) {
                console.log(userData)
                setUser(userData)
                setFormData({ email: "", password: "", confirmPassword: ""});
                setLoading(false);
                router.push(`/businessProfile`);
            } 
                
        }catch(error) {
            if (error instanceof Error) {
                console.log(error)
                setItExist(true) 
            } else {
                setError("Something went wrong, please try again.");
            }
        } finally {
            setLoading(false)
        }
      }


return (
    <div className="flex items-center justify-center">
        <div className="relative bg-white p-8 rounded-lg shadow-lg max-w-md xl:max-w-xl xl:max-h-xl">
        <h2 className="text-xl font-semi text-center mb-4">Sign Up</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4 font-regular">
            <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full p-3 border border-gray-300 rounded-[7px]"
                value={formData.email}
                onChange={handleChange}
                required
            />
            <input
                type="password"
                name="password"
                placeholder="Set Password"
                className="w-full p-3 border border-gray-300 rounded-[7px]"
                value={formData.password}
                onChange={handleChange}
                required
            />
            <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="w-full p-3 border border-gray-300 rounded-[7px]"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
            />
            <button
            type="submit"
            className="w-full bg-primary text-white p-3 rounded-[7px] font-semibold"
            >
            {loading ? "Registering..." : "Register"}
            </button>            
            </form>
            <div 
                onClick={getSignIn}
                 className="flex justify-center font-regular mb-12 mt-2 cursor-pointer">
                <p>Already have an account? </p>
                <p className="text-primary ml-2">Sign In</p>
            </div>
            <div className="flex justify-center mt-10">
                <Image height={50} width={100} src={'/logo_blue.png'} alt="logo"/>
            </div>
        </div>
        {itExist && (
        <ConfirmModal title="User Exists!">
            <div className="font-regular mb-4">
                <h4>Click the button below to sign in to your account</h4>
            </div>
            <div className="mt-4">
              <button onClick={getSignIn} className="text-primary px-4 py-2 rounded-md mx-2 border-2">
                Sign in
              </button>
            </div>
        </ConfirmModal>
      )}
    </div>
    )
}


    export default SignUpForm;