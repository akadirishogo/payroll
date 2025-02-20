"use client";

import React from 'react'
import AddEmployee from '../../../components/employee/AddEmployees';
import FilterEmployees from '../../../components/employee/FilterEmployees';


export default function EmployeeRecords() {
    return (
        <>
            <AddEmployee />
            <FilterEmployees />
        </>
        
    )
}
