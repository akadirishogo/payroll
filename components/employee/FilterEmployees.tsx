import { useState } from "react";
import { Input } from "@/components/Inputs"; // shadcn input component
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/Table";
import Link from "next/link";
import { useEmployeeStore } from "@/store/employeeStore";



  export default function FilterEmployees() {
    const employees = useEmployeeStore((state) => state.employees);
    const [search, setSearch] = useState("");
  
    // Filtering function
    const filteredEmployees = employees.filter(
      (employee) =>
        employee.firstName.toLowerCase().includes(search.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(search.toLowerCase()) ||
        employee.phoneNumber.includes(search)
    );



    return (
        <div className='bg-white mx-6 rounded-t-2xl my-10'>
            <div className='mb-4 rounded-t-2xl flex text-white bg-gradient-to-r from-fromGreetGradient via-throughGreet to-primary justify-between items-center text-[15px] p-2'>
                <p>Filter Records</p>  
            </div>
            <div className='px-4 pb-4'>
                <div className="mb-4">
                    <Input
                    type="text"
                    placeholder="Search by name or phone..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-max"
                    />
                </div>
                <Table className="w-full">
                    <TableHeader className="bg-Inactive text-white">
                    <TableRow>
                        <TableHead>Id</TableHead>
                        <TableHead>Full Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Designation</TableHead>
                        <TableHead>Bank Name</TableHead>
                        <TableHead>Account Number</TableHead>
                        <TableHead>Monthly Gross</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Phone Number</TableHead>
                        <TableHead>Details</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody className="text-[12px]">
                    {filteredEmployees.length > 0 ? (
                        filteredEmployees.map((employee) => (
                        <TableRow key={employee.id}>
                            <TableCell>{employee.id}</TableCell>
                            <TableCell>{employee.lastName} {employee.firstName}</TableCell>
                            <TableCell>{employee.email}</TableCell>
                            <TableCell>{employee.role}</TableCell>
                            <TableCell>{employee.bank}</TableCell>
                            <TableCell>{employee.accountNumber}</TableCell>
                            <TableCell>{employee.monthlyGross}</TableCell>
                            <TableCell>{employee.department}</TableCell>
                            <TableCell>{employee.phoneNumber}</TableCell>
                            <TableCell>
                            <Link href={`/admin/employee/${employee.id}/employeeDetails`}><button className='text-white bg-black text-[10px] px-[7px] py-[1px]'>View</button></Link>
                            </TableCell>
                        </TableRow>
                        ))
                    ) : (
                        <TableRow>
                        <TableCell colSpan={9} className="text-center text-gray-500">
                            No results found.
                        </TableCell>
                        </TableRow>
                    )}
                    </TableBody>
                   </Table>
                </div>    
            </div>
        )
    }

