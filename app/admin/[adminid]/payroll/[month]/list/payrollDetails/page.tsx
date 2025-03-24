"use client";

import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { FaChevronLeft, FaRegPenToSquare } from "react-icons/fa6";
import { GiTakeMyMoney } from "react-icons/gi";
import { Colors } from '@/Colors'
import { IoIosPeople } from "react-icons/io";
import { approvePayroll, fetchMonthPayroll, viewPayroll } from '@/apiService';
import { useSearchParams } from "next/navigation";


type Employee = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  bankDetails: {
    bankName: string;
    accountNumber: string;
    recipientCode: string;
  }[];
};

type PaymentHistory = {
  id: number;
  paymentStatus: "Paid" | "Not Paid";
  approvalStatus: "Approved" | "Pending" | "Rejected";
  netSalary: number;
  employee: Employee;
};

type Payroll = {
  id: number;
  status: "pending" | "approved" | "rejected";
  name: string;
  totalAmount: string;
  paymentHistories: PaymentHistory[];
  createdBy: {
    firstname: string;
    lastname: string;
  };
  approvedBy: {
    firstname: string;
    lastname: string;
  } | null;
};

type PayrollResponse = {
  employeeCount: number;
  payroll: Payroll;
};

interface UserData {
  id: number;
  // add other user properties as needed
}

export default function PayrollDetailPage() {
  const [loading, setLoading] = useState(false)
  const [approvalLoading, setApprovalLoading] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState("InProgress")
  const [payrollDetails, setPayrollDetails] = useState<PayrollResponse | null>(null);
 
  const [userData, setUserData] = useState<UserData>()
    const params = useParams();
    const searchParams = useSearchParams();

    const router = useRouter();


    const getBack = () => {
      router.back()
    }

    const id = searchParams.get("id");


  useEffect(() => {
    const token = sessionStorage.getItem("accessToken") || ""
    const userData = JSON.parse(localStorage.getItem("userInfo") || "{}")
    setUserData(userData)
    const payrollView = async () => {
      setLoading(true)
      try {
          if (!id) return;
          const payView = await viewPayroll(Number(id), token)
          setPayrollDetails(payView)
          console.log(payView)
          setLoading(false)
      } catch(err) {
        console.log(err)
      } finally {
        setLoading(false)
      }  
    }
    payrollView();
  }, [])



  
const approvePayment = async(id: number) => {
    setApprovalLoading(true)
    try {
         const token = sessionStorage.getItem("accessToken") || ""
        await approvePayroll(userData?.id, id, token)
        setLoading(false)
    } catch(err) {
      console.log(err)
    } finally {
      setApprovalLoading(false)
    }
}


   
    return (
      <div className='px-6 mb-14'>
         <div onClick={getBack} className='cursor-pointer mb-4'>
            <FaChevronLeft size={20} color={Colors.primary} />
        </div>
        <div>
          <span className='bg-clip-text 
              text-transparent bg-gradient-to-r from-fromGreetGradient 
              via-throughGreet to-primary font-semibold text-[25px]'>
              {typeof params.month === 'string' ? params.month.charAt(0).toUpperCase() + params.month.slice(1) : 'Unknown'}
          </span>
        </div>
        <div className='bg-white px-8 py-4 my-6 flex'>
          <div className='flex flex-col gap-y-1 flex-1'>
            <div className='bg-primary w-10 h-10 rounded-[20px] flex items-center justify-center'>
                <FaRegPenToSquare className='text-white' />
            </div>
            <p className='text-[13px] text-Inactive font-semi'>STEP 1</p>
            <p className='font-semi text-primary'>Processed</p>
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
              <p className={`text-[12px] min-w-min px-[2px] py-[4px] text-white rounded-[4px]
                ${payrollDetails?.payroll?.status === "approved" ? "bg-approved" : "bg-progress"}
                `}>{payrollDetails?.payroll?.status === "approved" ? "Approved" : "InProgress"}</p>
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
              <p className='text-[20px]'>Payroll Size</p>
              <p className='text-4xl font-semi'>₦{Number(payrollDetails?.payroll?.totalAmount).toLocaleString()}</p>
              <button className='bg-primary text-white text-[15px] px-[6px] py-[2px] mt-[4px]'>View</button>
            </div>

            <div className='bg-white rounded-xl p-4 pr-48'>
              <IoIosPeople size={45} color={Colors.primary}/>
              <p className='text-[20px] mt-6'>Employee Size</p>
              <p className='text-4xl font-semi'>{payrollDetails?.employeeCount}</p>
            </div>
        </div>
        <div className='flex justify-end text-white gap-x-4 mt-10 min-h-[50px]'>
            <button className='bg-unPaid px-10 py-4 rounded-[7px] font-semi'>Reject Payroll</button>
            <button onClick={() => approvePayment(Number(id))} className='bg-approved px-10 py-4 rounded-[7px] font-semi'>
              {approvalLoading ? "Approving..." : "Approve Payroll"}
            </button>
            <button className={`px-10 py-4 rounded-[7px] font-semi transition 
                ${payrollDetails?.payroll?.status === "approved" ? "bg-primary text-white cursor-pointer" : "bg-gray-400 text-gray-300 cursor-not-allowed"}
                  `}
                  disabled={payrollDetails?.payroll?.status !== "approved"}
                  >
                  Make Payments
            </button>
        </div>
      </div>
    )
  }

 