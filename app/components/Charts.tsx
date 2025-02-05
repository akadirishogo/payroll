"use client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import SelectFilter from '../components/SelectFilter'
import { useState } from "react";



const data = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 500 },
  { name: "Apr", value: 700 },
  { name: "May", value: 700 },
  { name: "Jun", value: 800 },
  { name: "Jul", value: 800 },
  { name: "Aug", value: 800 },
  { name: "Sep", value: 900 },
  { name: "Oct", value: 1000 },
  { name: "Nov", value: 1000 },
  { name: "Dec", value: 1000 },
];


export default function GraphComponent() {
    const [selectedYear, setSelectedYear] = useState<string>("");


    const handleFilterChange = (value: string) => {
        console.log("Selected Year:", value);
        setSelectedYear(value);
        // Use this function elsewhere in ParentComponent
    };

    return (
      <div className="bg-white p-6 rounded-lg shadow-md max-w-[80%]">
        <div className="flex justify-between mb-10">
            <h2 className="text-lg font-semibold mb-4">Payroll History</h2>
            <SelectFilter onFilterChange={handleFilterChange} />
        </div>
        
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#4F46E5" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
