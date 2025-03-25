"use client";

import React, { useState } from "react";
import { useRouter } from 'next/navigation'
import createBusinessAdmin from "@/apiService";
import useStore from "@/store/employeeStore";
import ConfirmModal from '@/components/ConfirmAdminModal'



const NewPasswordMobileForm = () => {
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
        router.push('/signinMobile')
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
    <div className="flex h-[100vh] items-center justify-center">
        <div className="relative h-[70%] w-[90%] bg-white p-8 rounded-lg shadow-lg">
        {/* <div className="relative bg-white p-8 rounded-lg shadow-lg 1xl:w-[600px] 1xl:h-[500px]"> */}
        <h2 className="text-xl font-semi text-center mb-4">Sign Up</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 font-regular 1xl:space-y-10">
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
            <div className="flex">
                <div 
                    onClick={getSignIn}
                    className="flex justify-center font-regular mt-2 cursor-pointer flex-1">
                    <p>Already have an account? </p>
                    <p className="text-primary ml-2">Sign In</p>
                </div>
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


    export default NewPasswordMobileForm;