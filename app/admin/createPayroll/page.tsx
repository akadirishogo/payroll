"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/Cards";
import { Input } from "@/app/components/Inputs";
import { Checkbox } from "@/app/components/Checkbox";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/app/components/Table";

interface Employee {
  id: number;
  fullName: string;
  email: string;
  designation: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
  salary: number 
}

const employees: Employee[] = [
  { id: 1, 
    fullName: "John Doe", 
    email: "johndoe@gmail.com",
    designation: 'Manager',
    bankName: 'Access',
    accountNumber: '0234523231',
    accountName: 'John Doe',
    salary: 150000 
},
  { id: 2, 
    fullName: "Jane Smith",
    email: "janesmith@gmail.com",
    designation: 'HR Assistant',
    bankName: 'UBA',
    accountNumber: '0234523231',
    accountName: 'Jane Smith',
    salary: 350000 
},
  { id: 3, 
    fullName: "Michael Johnson",
    email: "michealjohn@gmail.com",
    designation: 'Customer Service Rep',
    bankName: 'Wema',
    accountNumber: '0234523231',
    accountName: 'John Micheal',
    salary: 250000 
},
];


export default function PayrollForm() {
  const [totalSalary, setTotalSalary] = useState(0);
  const [name, setName] = useState('')
  const [monthYear, setMonthYear] = useState("");
  const [checkedEmployees, setCheckedEmployees] = useState<Record<number, boolean>>(
    employees.reduce((acc, employee) => ({ ...acc, [employee.id]: true }), {})
  );

  const [salaries, setSalaries] = useState<Record<number, number>>(
    employees.reduce((acc, employee) => ({ ...acc, [employee.id]: employee.salary }), {})
  );

  const handleCheckboxChange = (id: number) => {
    setCheckedEmployees((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSalaryChange = (id: number, value: string) => {
    setSalaries((prev) => ({
      ...prev,
      [id]: value ? parseFloat(value) : 0, // Convert input value to a number
    }));
  };

  useEffect(() => {
    const sum = employees.reduce((acc, employee) => {
        // Only add salary if the employee is checked
        return checkedEmployees[employee.id] ? acc + salaries[employee.id] : acc;
      }, 0);
    
      setTotalSalary(sum);
    setTotalSalary(sum);
  }, [salaries, checkedEmployees]); // Runs whenever salaries change

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedEmployees = employees.filter(emp => checkedEmployees[emp.id])
    .map(emp => ({
        ...emp,
        salary: salaries[emp.id] // Use updated salary values from state
      }));;
    console.log({ name, monthYear, dateCreated: new Date().toISOString(), selectedEmployees });
  };

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
                <TableHead>Acct. Name</TableHead>
                <TableHead>Net Salary</TableHead>
                <TableHead>Include</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee, index) => (
                <TableRow key={employee.id}>
                  <TableCell>{employee.id}</TableCell>
                  <TableCell>{employee.fullName}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.designation}</TableCell>
                  <TableCell>{employee.bankName}</TableCell>
                  <TableCell>{employee.accountNumber}</TableCell>
                  <TableCell>{employee.accountName}</TableCell>
                  <TableCell>
                    <Input type="text" value={salaries[employee.id]} onChange={(e) => handleSalaryChange(employee.id, e.target.value)} required />
                  </TableCell>
                  <TableCell>
                    <Checkbox checked={checkedEmployees[employee.id]} 
                      onCheckedChange={() => handleCheckboxChange(employee.id)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          

           <div className="flex justify-end gap-x-10">
                <button className="flex mt-4 w-full bg-primary text-white max-w-fit px-[10px] py-[5px]">
                    Payroll Size: ₦{totalSalary.toLocaleString()}
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
