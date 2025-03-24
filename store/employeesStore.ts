"use client";

import { fetchEmployees } from '@/apiService';
import { create } from 'zustand';


type Allowance = {
  type: string;
  amount: number;
};

type Deduction = {
  reason: string;
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
  deduction: number;
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

type EmployeeStore = {
  employees: Employee[];
  loading: boolean;
  fetchEmployees: (token: string, companyId: string) => Promise<void>;
  updateEmployee: (id: number, deduction?: Deduction, allowance?: Allowance) => void;
  syncEmployeesFromStorage: () => void;
};

// Zustand store
export const useEmployeeStore = create<EmployeeStore>((set) => ({
  employees: [],
  loading: false,

  fetchEmployees: async (token: string, companyId: string) => {
    set({ loading: true });

    try {
      // Load from local storage first
      const storedEmployees = localStorage.getItem('Employees');
      if (storedEmployees) {
        set({ employees: JSON.parse(storedEmployees) });
      }

      // Fetch fresh data from API
 /*      const res = await fetchEmployees(token, companyId);
      const data: Employee[] = res

      console.log(data)

      // Save to store and local storage
      set({ employees: data, loading: false });
      return res */
    } catch (error) {
      console.error('Error fetching employees:', error);
      set({ loading: false });
    }
  },

  updateEmployee: (id, deduction?: Deduction, allowance?: Allowance) => {
    set((state) => {
      // Fetch the latest employees from localStorage for consistency
      const storedEmployees = JSON.parse(localStorage.getItem("Employees") || "[]");
      // Use the stored employees if available, otherwise use the store state
      const employees = storedEmployees.length ? storedEmployees : state.employees;
  
      console.log(allowance)
      const updatedEmployees = employees.map((emp: Employee) => {
        if (emp.id !== id) return emp;
  
        // Ensure these properties are always arrays
        const existingDeductions: Deduction[] = Array.isArray(emp.deductions) ? emp.deductions : [];
        const existingAllowances: Allowance[] = Array.isArray(emp.allowances) ? emp.allowances : [];
  
             // Append new deduction if provided; otherwise, leave existing array unchanged.
      const updatedDeductions =
      deduction && deduction.reason.trim() !== "" && Number(deduction.amount) !== 0
        ? [...existingDeductions, deduction]
        : existingDeductions;

    // Append new allowance if provided; otherwise, leave existing array unchanged.
    const updatedAllowances =
      allowance && allowance.type.trim() !== "" && Number(allowance.amount) !== 0
        ? [...existingAllowances, allowance]
        : existingAllowances;

        // Calculate totals
        const totalDeductions = updatedDeductions.reduce((sum, d) => sum + Number(d.amount), 0);
        const totalAllowances = updatedAllowances.reduce((sum, a) => sum + Number(a.amount), 0);
        const netSalary = emp.grossSalary - totalDeductions + totalAllowances;
  
        return {
          ...emp,
          deductions: updatedDeductions,
          allowances: updatedAllowances,
          totalDeductions: totalDeductions,
          totalAllowances: totalAllowances,
          netSalary: netSalary,
        };
      });
  
      console.log("Updated Employees:", updatedEmployees);
      // Persist the updated employees to localStorage
      localStorage.setItem("Employees", JSON.stringify(updatedEmployees));
      return { employees: updatedEmployees };
    });
  },
  
  

  syncEmployeesFromStorage: () => {
    const storedEmployees = JSON.parse(localStorage.getItem('Employees') || '[]');
    set({ employees: storedEmployees });
  }
}));

window.addEventListener("storage", (event) => {
  if (event.key === "Employees") {
    useEmployeeStore.getState().syncEmployeesFromStorage();
  }
});