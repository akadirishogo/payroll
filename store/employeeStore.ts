import { create } from "zustand";
import users from '@/Employees'; // Import your dummy data

interface EmployeeState {
  employees: typeof users;
  addEmployee: (newEmployee: any) => void;
  removeEmployee: (id: number) => void;
  updateEmployee: (id: number, updatedData: Partial<any>) => void;
}

export const useEmployeeStore = create<EmployeeState>((set) => ({
  employees: users, // Initialize with dummy data

  addEmployee: (newEmployee) =>
    set((state) => ({
      employees: [...state.employees, newEmployee],
    })),

  removeEmployee: (id) =>
    set((state) => ({
      employees: state.employees.filter((emp) => emp.id !== id),
    })),

  updateEmployee: (id, updatedData) =>
    set((state) => ({
      employees: state.employees.map((emp) =>
        emp.id === id ? { ...emp, ...updatedData } : emp
      ),
    })),
}));
