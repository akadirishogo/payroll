"use client";

import React, { useState } from 'react'
import { useParams, useRouter } from 'next/navigation';
import AddEmployee from '@/app/components/AddEmployees';
import FilterEmployees from '@/app/components/FilterEmployees';


export default function EmployeeRecords() {
    return (
        <>
            <AddEmployee />
            <FilterEmployees />
        </>
        
    )
}
