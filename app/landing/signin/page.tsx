"use client";


import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";



export default function SigninForm(){
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
  const router = useRouter();

  const goToDashboard = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    if (!formData.password) {
      setError('Enter your password.')
      setLoading(false)
      return;
    }
    router.push('/admin')
  }

 

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
        return;
      }

    setLoading(true);
    }


  return (
        <div className="relative bg-backImage bg-cover min-h-[100vh]">
            <div className="p-8 absolute inset-0 bg-primary bg-opacity-70">
                <div>
                    <Image height={50} width={100} src={'/logo_white.png'} alt="logo"/>
                </div>
                <div className="mt-16 flex items-center">
                    <div className="w-3/5 h-18">
                        <div>
                            <p className="font-boldItalic text-5xl inline-block mr-3 text-splash">Smart</p><p className="inline-block font-extraBold text-5xl text-white"> Payroll for</p>
                            <p className="font-extraBold text-5xl text-white">Businesses</p>
                        </div>
                        <div className="w-[80%]">
                            <p className="text-white text-[20px] font-regular">Start managing your workforce Salaries with
                                automation, precision and security. </p>
                        </div>
                        <button
                            className="bg-primary rounded-2xl text-white px-7 py-3 mt-10 font-semi tracking-widest">
                            Get Started
                        </button>
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                            <h2 className="text-2xl font-bold text-center mb-4">Sign In</h2>
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
                                    placeholder="Password"
                                    className="w-full p-3 border border-gray-300 rounded-[7px]"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                                <button
                                onClick={()=>goToDashboard()}
                                type="submit"
                                className="w-full bg-primary text-white p-3 rounded-[7px] font-semibold"
                                disabled={loading}
                                >
                                {loading ? "Please wait..." : "Sign In"}
                                </button>
                            </form>
                        <div className="flex justify-center font-regular mb-12">
                            <p>Forgot Password? </p>
                            <p className="text-primary ml-2">Reset</p>
                        </div>
                        <div className="flex justify-center mt-20 -mb-4">
                            <Image height={40} width={100} src={'/logo_blue.png'} alt="logo"/>
                        </div>
                    </div>
                 </div>
            </div>
        </div>
                    
    </div>
  );
}