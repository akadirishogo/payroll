"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Cards";
import { Input } from "@/components/Inputs";
import { Checkbox } from "@/components/Checkbox";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/Table";
import Link from "next/link";




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
  deduction: number;
  department: string;
  phone: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  bankDetails: BankDetail[];
};


const userData = JSON.parse(localStorage.getItem("userInfo") || "{}")


export default function PayrollForm() {
  const [totalSalary, setTotalSalary] = useState(0);
  // const { employees, fetchEmployees } = useEmployeeStore()
  const employees = JSON.parse(localStorage.getItem("Employees") || "[]")
  const [name, setName] = useState('')
  const [monthYear, setMonthYear] = useState("");
  const [checkedEmployees, setCheckedEmployees] = useState<Record<number, boolean>>({});
  const [salaries, setSalaries] = useState<Record<number, number>>({});

  

  const handleCheckboxChange = (id: number) => {
    setCheckedEmployees((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSalaryChange = (id: number, value: string) => {
    setSalaries((prev) => ({
      ...prev,
      [id]: value ? parseFloat(value) : 0, // Convert input value to a number
    }));
  };

 /* useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    fetchEmployees(token || "", userData.companyId ); // Fetch employees on mount
  }, [userData]);
 */
  useEffect(() => {
    if (employees.length > 0) {
      setCheckedEmployees(
        employees.reduce((acc: number | object, employee: Employee) => ({ ...acc as object, [employee.id]: true }), {})
      );
  
      setSalaries(
        employees.reduce((acc: number | object, employee: Employee) => ({ ...acc as object, [employee.id]: employee.netSalary }), {})
      );
    }
  }, []); // Runs when employees are fetched
  

  useEffect(() => {
    if (Object.keys(checkedEmployees).length > 0) { // Ensure it's initialized
      const sum = employees.reduce((acc: number, employee: Employee) => {
        return checkedEmployees[employee.id] ? acc + (salaries[employee.id] || 0) : acc;
      }, 0);
  
      setTotalSalary(sum);
    }
  }, [salaries, checkedEmployees]); // Runs whenever salaries change

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedEmployees = employees.filter((emp: Employee) => checkedEmployees[emp.id])
    .map((emp: Employee) => ({
        ...emp,
        salary: salaries[emp.id] // Use updated salary values from state
      }));;
    console.log({ name, monthYear, dateCreated: new Date().toISOString(), selectedEmployees });
  };

  console.log(employees)

  return (
    <div className="my-4 px-4">
        <div className='font-semibold text-[25px] mb-4 px-4'>
            <span className='bg-clip-text 
            text-transparent bg-gradient-to-r from-fromGreetGradient 
            via-throughGreet to-primary'>
            Create Payroll
            </span>
        </div>
    <Card className="bg-white mx-auto p-4">
      <CardHeader>
        <CardTitle className="text-primary">Add New Payroll</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
            <div className="flex gap-x-12">
                <div className="mb-3">
                    <label className="block font-medium">Name</label>
                    <Input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="block font-medium">Month & Year</label>
                    <Input type="month" value={monthYear} onChange={(e) => setMonthYear(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="block font-medium">Date Created</label>
                    <Input type="text" value={new Date().toLocaleDateString()} disabled />
                </div>
            </div>
         
          <h3 className="font-medium mb-2">Select Employees</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Employee Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Designation</TableHead>
                <TableHead>Bank Name</TableHead>
                <TableHead>Account No.</TableHead>
                <TableHead>Net Salary</TableHead>
                <TableHead>Include</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees?.map((employee: Employee) => (
                <TableRow key={employee.id}>
                  <TableCell>{employee.id}</TableCell>
                  <TableCell>{employee.firstname} {employee.lastname}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>{employee.bankDetails[0]?.bankName}</TableCell>
                  <TableCell>{employee.bankDetails[0]?.accountNumber}</TableCell>
                  <TableCell>
                    <Input type="text"   value={salaries[employee.id] !== undefined ? salaries[employee.id].toString() : ""} 
 disabled onChange={(e) => handleSalaryChange(employee.id, e.target.value)} required />
                  </TableCell>
                  <TableCell>
                    <Checkbox checked={checkedEmployees[employee.id]} 
                      onCheckedChange={() => handleCheckboxChange(employee.id)} />
                  </TableCell>
                  <TableCell>
                      <Link href={`/admin/${userData?.id}/createPayroll/${employee.id}/salaryDetails`}><button className='text-white bg-black text-[10px] px-[7px] py-[1px]'>Reset</button></Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          

           <div className="flex justify-end gap-x-10">
                <button className="flex mt-4 w-full max-w-fit px-[10px] py-[5px]">
                    Payroll Size: ₦{totalSalary ? totalSalary.toLocaleString() : 0}
                </button>
                <button className="flex mt-4 w-full bg-primary text-white max-w-fit px-[10px] py-[5px]">
                    Create
                </button>
           </div>  
        </form>
      </CardContent>
    </Card>
    </div>
  );
}
