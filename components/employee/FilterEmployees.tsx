import { useState, useEffect } from "react";
import { Input } from "@/components/Inputs"; // shadcn input component
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/Table";
import Link from "next/link";



type Allowance = {
    type: string;
    amount: number;
  };
  
  type Deduction = {
    type: string;
    amount: number;
  };
  
  
  
  // Define types
  type BankDetail = {
    id: number;
    bankName: string;
    bankCode: string;
    accountNumber: string;
    recipientCode: string | null;
    isDefault: boolean;
  };
  
  type Employee = {
    id: number;
    firstname: string;
    lastname: string;
    gender: string | null;
    email: string;
    grossSalary: number;
    netSalary: number;
    allowances: Allowance[];
    deductions: Deduction[];
    totalDeductions: number | null;
    totalAllowances: number | null;
    department: string;
    phone: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    bankDetails: BankDetail[];
  };




  


  export default function FilterEmployees() {
    const employees = JSON.parse(localStorage.getItem("Employees") || "[]")
    const [userData, setUserData] = useState({
        company: "",
        companyId: "",
        email: "",
        firstname: "",
        id: 0,
        lastname: "",
      })
    const [search, setSearch] = useState("");
  
    
   useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("userInfo") || "{}");
        setUserData(userData)
      }, []);


      

       // Filtering function
    const filteredEmployees = employees.filter(
        (employee: Employee) =>
          employee.firstname.toLowerCase().includes(search.toLowerCase()) ||
        employee.lastname.toLowerCase().includes(search.toLowerCase()) ||
          employee.phone.includes(search)
      );
  

      console.log(filteredEmployees)


    return (
        <div className="mt-4 max-w-[1000px]">
            <div className='font-semibold text-[18px] mb-4 px-4'>
                <span className='bg-clip-text 
                text-transparent bg-gradient-to-r from-fromGreetGradient 
                via-throughGreet to-primary'>
                Employee Records
                </span>
            </div>
            <div className='bg-white mx-2 sm:mx-6 rounded-t-2xl my-10'>
                <div className='mb-4 rounded-t-2xl flex text-white bg-gradient-to-r from-fromGreetGradient via-throughGreet to-primary justify-between items-center text-[15px] p-2'>
                    <p>Filter Records</p>  
                </div>
                <div className='px-2 sm:px-4 pb-4'>
                    <div className="mb-4">
                        <Input
                        type="text"
                        placeholder="Search by name or phone..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="text-[12px]"
                        />
                    </div>
                    <div className="overflow-x-auto -mx-2 sm:-mx-4">
                        <Table className="w-full">
                            <TableHeader className="bg-Inactive text-white">
                            <TableRow>
                                <TableHead>Id</TableHead>
                                <TableHead>Full Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Bank Name</TableHead>
                                <TableHead>Account Number</TableHead>
                                <TableHead>Monthly Gross</TableHead>
                                <TableHead>Monthly Net</TableHead>
                                <TableHead>Department</TableHead>
                                <TableHead>Phone Number</TableHead>
                                <TableHead>Details</TableHead>
                            </TableRow>
                            </TableHeader>
                            <TableBody className="text-[12px]">
                                {filteredEmployees.length > 0 ? (
                                    filteredEmployees.map((employee: Employee) => (
                                   <TableRow key={employee.id}>
                                   <TableCell>{employee?.id}</TableCell>
                                   <TableCell>{employee?.firstname} {employee.lastname}</TableCell>
                                   <TableCell>{employee?.email}</TableCell>
                                   <TableCell>{employee?.bankDetails[0]?.bankName}</TableCell>
                                   <TableCell>{employee?.bankDetails[0]?.accountNumber}</TableCell>
                                   <TableCell>{employee?.grossSalary}</TableCell>
                                   <TableCell>{employee?.netSalary}</TableCell>
                                   <TableCell>{employee?.department}</TableCell>
                                   <TableCell>{employee?.phone}</TableCell>
                                   <TableCell>
                                   <Link href={`/admin/${userData?.id}/employee/${employee?.id}/employeeDetails`}><button className='text-white bg-black text-[10px] px-[7px] py-[1px]'>View</button></Link>
                                   </TableCell>
                               </TableRow> 
                                )))
                                : 
                                (
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
            </div>
        </div>
    )
}

