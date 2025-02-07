"use client";

import React, { useState } from 'react'
import { useParams, useRouter } from 'next/navigation';
import AddEmployee from './AddEmployees';
import FilterEmployees from './FilterEmployees';


export default function EmployeeRecords() {
    return (
        <>
            <AddEmployee />
            <FilterEmployees />
        </>
        
    )
}
