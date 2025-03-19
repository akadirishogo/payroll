"use client";

import React from 'react'
import dynamic from "next/dynamic";



const EmployeeSalaryForm = dynamic(() => import("@/components/employee/employeeSalaryForm"), {
  ssr: false, // Disable SSR for this component
});

export default function SalaryPage() {

  return (
    <div className='mt-6'>
        <EmployeeSalaryForm />
    </div>
  )
}
