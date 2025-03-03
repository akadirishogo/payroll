"use client"

import React, { useEffect, useState } from 'react'
import GraphComponent from '@/components/Charts'


type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  accessToken: string;
};


export default function Home() {
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    // Retrieve user data from localStorage
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) {
      setUserData(JSON.parse(storedUser)); // Parse JSON string back to object
    }
  }, []);




  return (
    <div className='px-6'>
      <div className='font-semibold text-[25px] mb-4'>
        <span className='bg-clip-text text-transparent bg-gradient-to-r from-fromGreetGradient via-throughGreet to-primary'>{`Welcome, ${userData?.firstName}`}</span>
      </div>
      <div className='flex gap-6'>
          <div className='bg-gradient-to-t from-fromGreenCard to-toGreenCard w-64 p-2 text-white rounded-xl'>
            <p className='font-light'>Wallet Balance</p>
            <h5 className='text-3xl'>₦500,972.00</h5>
            <button className='mt-6 bg-black text-[12px] py-1 px-2'>Add fund</button>
          </div>
          <div className='bg-gradient-to-t from-fromOrangeCard to-toOrangeCard w-64 p-2 text-white rounded-xl'>
            <p className='font-light'>Payroll Size</p>
            <h5 className='text-3xl'>₦450,072.00</h5>
            <div className='mt-6 bg-white text-black text-[12px] py-1 px-2 flex gap-16'>
              <p>Next pay date</p>
              <p>8days Left</p>
            </div>
          </div>
          <div className='bg-black w-64 p-2 text-white rounded-xl'>
            <p className='font-light'>Total Employee</p>
            <h5 className='text-3xl'>150 Employees</h5>
            <div className='mt-6 bg-black text-[12px] py-1 px-2 flex gap-6'>
              <p>88 Female</p>
              <p>62 Male</p>
            </div>
          </div>
      </div>
      <div className='my-10 w-82'>
          <GraphComponent />
      </div>
    </div>
  )
}
