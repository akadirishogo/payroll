import { useState } from "react";
import { Input } from "@/app/components/Inputs"; // shadcn input component
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/Table";
import Link from "next/link";

const employees = [
    { id: 1, name: "John Doe", email: "john@example.com", designation: "Manager", bank: "Bank A", account: "12345678", gross: "$5000", department: "HR", phone: "123-456-7890" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", designation: "Developer", bank: "Bank B", account: "87654321", gross: "$4000", department: "IT", phone: "987-654-3210" },
    { id: 3, name: "Alice Johnson", email: "alice@example.com", designation: "Designer", bank: "Bank C", account: "11223344", gross: "$4500", department: "Marketing", phone: "555-123-4567" },
  ];


  export default function FilterEmployees() {
    const [search, setSearch] = useState("");
  
    // Filtering function
    const filteredEmployees = employees.filter(
      (employee) =>
        employee.name.toLowerCase().includes(search.toLowerCase()) ||
        employee.phone.includes(search)
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
                <Table className="">
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
                            <TableCell>{employee.name}</TableCell>
                            <TableCell>{employee.email}</TableCell>
                            <TableCell>{employee.designation}</TableCell>
                            <TableCell>{employee.bank}</TableCell>
                            <TableCell>{employee.account}</TableCell>
                            <TableCell>{employee.gross}</TableCell>
                            <TableCell>{employee.department}</TableCell>
                            <TableCell>{employee.phone}</TableCell>
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

