"use client";

import { useParams } from 'next/navigation';
import React from 'react'
import { FaRegPenToSquare } from "react-icons/fa6";
import { GiTakeMyMoney } from "react-icons/gi";
import { Colors } from '@/Colors'
import { IoIosPeople } from "react-icons/io";







export default function PayrollDetailPage() {
    const params = useParams();
    
    
    return (
      <div className='px-6'>
        <div>
          <span className='bg-clip-text 
              text-transparent bg-gradient-to-r from-fromGreetGradient 
              via-throughGreet to-primary'>
              {typeof params.month === 'string' ? params.month.charAt(0).toUpperCase() + params.month.slice(1) : 'Unknown'}
          </span>
        </div>
        <div className='bg-white px-8 py-4 my-6 flex'>
          <div className='flex flex-col gap-y-1 flex-1'>
            <div className='bg-primary w-10 h-10 rounded-[20px] flex items-center justify-center'>
                <FaRegPenToSquare className='text-white' />
            </div>
            <p className='text-[13px] text-Inactive font-semi'>STEP 1</p>
            <p className='font-semi text-primary'>Update & Review</p>
            <p className='bg-approved text-[12px] max-w-min px-[2px] py-[4px] text-white rounded-[4px]'>Complete</p>
          </div>
          
          <div className='flex flex-col gap-y-1 flex-1 items-center'>
            <div className='flex w-36'>
              <div className='bg-primary w-10 h-10 rounded-[20px] flex items-center justify-center'>
                  <FaRegPenToSquare className='text-white' />
              </div>
            </div>
            <div className='flex w-36'>
                <p className='text-[13px] text-Inactive font-semi'>STEP 2</p>
            </div>
            <div className='flex w-36'>
                <p className='font-semi text-primary'>Approval</p>
            </div>
            <div className='flex w-36'>
              <p className='bg-progress text-[12px] min-w-min px-[2px] py-[4px] text-white rounded-[4px]'>InProgress</p>
            </div>
          </div>
          
          <div className='flex flex-col gap-y-1 flex-1 justify-center items-end'>
            <div className='flex w-36'>
              <div className='bg-Inactive w-10 h-10 rounded-[20px] flex items-center justify-center'>
                  <FaRegPenToSquare className='text-white' />
              </div>
            </div>
            
            <div className='flex w-36'>
                <p className='text-[13px] text-Inactive font-semi'>STEP 3</p>
            </div>
            <div className='flex w-36'>
                <p className='font-semi text-Inactive'>Payment & Close</p>
            </div>
           
            <div className='flex w-36'>
              <p className='bg-Inactive text-[12px] min-w-min px-[2px] py-[4px] text-white rounded-[4px]'>Pending</p>
            </div>
          </div>
        </div>

        <div>
          <div className='bg-gradient-to-r from-fromGreetGradient 
        via-throughGreet to-primary px-4 py-2 rounded-t-[15px]'>
            <p className='text-white'>Summary</p>
          </div>
        </div>

        <div className='flex gap-x-40 mt-10'>
            <div className='bg-white rounded-xl p-4 pr-32'>
              <GiTakeMyMoney size={45} color={Colors.primary}/>
              <p className='text-[20px]'>Employee Salary</p>
              <p className='text-4xl font-semi'>₦154,097.00</p>
              <button className='bg-primary text-white text-[15px] px-[6px] py-[2px] mt-[4px]'>View</button>
            </div>

            <div className='bg-white rounded-xl p-4 pr-48'>
              <IoIosPeople size={45} color={Colors.primary}/>
              <p className='text-[20px] mt-6'>Employee Size</p>
              <p className='text-4xl font-semi'>150</p>
            </div>
        </div>
        <div className='flex justify-end text-white gap-x-4 mt-10'>
            <button className='bg-unPaid px-10 py-4 rounded-[7px] font-semi'>Reject Payroll</button>
            <button className='bg-approved px-10 py-4 rounded-[7px] font-semi'>Approve Payroll</button>
            <button className='bg-primary px-10 py-4 rounded-[7px] font-semi'>Make Payments</button>
        </div>
      </div>
    )
  }

 