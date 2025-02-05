"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Modal from "@/app/components/Modal";
import { IoMailOutline } from "react-icons/io5";
import Image from "next/image";
import { VscPassFilled } from "react-icons/vsc";



type CreateNewPasswordProps = {
  onSwitch: () => void;
};

export default function CreateNewPassword({ onSwitch }: CreateNewPasswordProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmNewPassword: ""
  });

  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

 
  

    if (formData.newPassword !== formData.confirmNewPassword) {
        setError("Passwords do not match!");
        return;
      }

    setLoading(true);


    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword: formData.newPassword }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Signup failed");

      alert("Signup successful!");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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
                        <button onClick={onSwitch} className="bg-primary rounded-2xl	text-white px-7 py-3 mt-10 font-semi tracking-widest">Get Started</button>
                    </div>
                    <div className="flex items-center justify-center">
                <div className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                  <h2 className="text-2xl font-bold mb-4">Create New Password</h2>
                  {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                  <form onSubmit={handleSubmit} className="space-y-4 font-regular">
                  <label htmlFor="newPassword" className="block font-medium">New Password</label>
                    <input
                      id="newPassword"
                      type="password"
                      name="newPassword"
                      placeholder="Enter New Password"
                      className="w-full p-3 border border-gray-300 rounded-[7px]"
                      value={formData.newPassword}
                      onChange={handleChange}
                      required
                    />

                  <label htmlFor="confirmNewPassword" className="block font-medium">Confirm New Password</label>
                    <input
                      id="confirmNewPassword"
                      type="password"
                      name="confirmNewPassword"
                      placeholder="Confirm New Password"
                      className="w-full p-3 border border-gray-300 rounded-[7px]"
                      value={formData.confirmNewPassword}
                      onChange={handleChange}
                      required
                    />
                    <button
                      onClick={() => setIsModalOpen(true)}
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
       <Modal
          isOpen={isModalOpen}
          title="Check Your Email"
          message = {["We have sent an email to trig*****@gmail.com", "Click the link to get started"]}
          icon={<IoMailOutline className="text-primary text-6xl" />} 
          onClose={() => setIsModalOpen(false)}
        />
    </div>
                </div>

                <Modal
                  isOpen={isModalOpen}
                  title="Password Reset Successful"
                  message = {["You can now use your new password to login to your account"]}
                  icon={<VscPassFilled className="text-primary text-6xl" />} 
                  onClose={() => setIsModalOpen(false)}
                />
                                        
            </div>
        </div>
  );
}
