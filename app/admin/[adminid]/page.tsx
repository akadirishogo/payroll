"use client"

import React, { useEffect, useState } from 'react'
import GraphComponent from '@/components/Charts'
import { Calendar } from "@/components/Calendar"
import { useEmployeeStore } from '@/store/employeesStore'



type User = {
  id: string;
  firstname: string;
  lastName: string;
  email: string;
  accessToken: string;
  companyId: string;
};


export default function Home() {
  const { fetchEmployees } = useEmployeeStore();
  const [userData, setUserData] = useState<User | null>(null);
  const [date, setDate] = React.useState<Date | undefined>(new Date())


  useEffect(() => {
    const getInitData = async () => {

       if (typeof window !== "undefined") {

      try {

        const storedUser = localStorage.getItem("userInfo");
        const token = sessionStorage.getItem("accessToken");
       
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
        setUserData(parsedUser); // Update state

        console.log(parsedUser)
        // Fetch employees only if userData and token exist
        if (token && parsedUser?.companyId) {
          await fetchEmployees(token, parsedUser.companyId);
        }
      }
      } catch(err) {
        console.error(err)
      }
    }
  }
    getInitData();
  }, []);


  return (
    <div className='px-6 flex gap-x-4 h-[100vh]'>
      <div className='flex flex-col w-[80%]'>
        <div className='font-semibold text-[25px]'>
          <span className='bg-clip-text text-transparent bg-gradient-to-r from-fromGreetGradient via-throughGreet to-primary'>{`Welcome, ${userData?.firstname}`}</span>
        </div>
        <div className='flex gap-6'>
            <div className='bg-gradient-to-t from-fromGreenCard to-toGreenCard w-[30%] p-2 text-white rounded-xl'>
              <p className='font-light'>Wallet Balance</p>
              <h5 className='text-3xl'>₦500,972.00</h5>
              <button className='mt-6 bg-black text-[12px] py-1 px-2'>Add fund</button>
            </div>
            <div className='bg-gradient-to-t from-fromOrangeCard to-toOrangeCard w-[30%] p-2 text-white rounded-xl'>
              <p className='font-light'>Payroll Size</p>
              <h5 className='text-3xl'>₦450,072.00</h5>
              <div className='mt-6 bg-white text-black text-[12px] py-1 px-2 flex gap-16'>
                <p>Next pay date</p>
                <p>8days Left</p>
              </div>
            </div>
            <div className='bg-black w-[30%] p-2 text-white rounded-xl'>
              <p className='font-light'>Total Employee</p>
              <h5 className='text-3xl'>150 Employees</h5>
              <div className='mt-6 bg-black text-[12px] py-1 px-2 flex gap-6'>
                <p>88 Female</p>
                <p>62 Male</p>
              </div>
            </div>
        </div>
        <div className='my-10'>
            <GraphComponent />
        </div>
      </div>
      <div className='mb-10 mt-10 flex flex-col gap-y-8'>
        <div className='bg-gradient-to-t from-fromGradient via-throughGradient to-primary flex justify-center max-w-fit rounded-xl'>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md h-full scale-[0.7]"
          />
        </div>
        <div className='mt-2 bg-white pb-8 rounded-xl'>
          <div className='bg-primary font-medium rounded-t-xl text-white text-[18px] flex items-center px-[6px] py-[10px]'>
            January Birthdays
          </div>
          <div className='my-1'>
            <div className='flex justify-between text-[12px] font-regular px-2 border-b'>
                <div>Hellen Adewoye</div>
                <div>2nd</div>
            </div>
            <div className='flex justify-between text-[12px] font-regular px-2 border-b'>
                <div>Ademola Ayeni</div>
                <div>10th</div>
            </div>
            <div className='flex justify-between text-[12px] font-regular px-2 border-b'>
                <div>Samuel Adegoke</div>
                <div>20th</div>
            </div>
            <div className='flex justify-between text-[12px] font-regular px-2 border-b'>
                <div>Muyiwa Dosunmu</div>
                <div>26th</div>
            </div>
            <div className='flex justify-between text-[12px] font-regular px-2 border-b'>
                <div>Samson Oluwadare</div>
                <div>31st</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
