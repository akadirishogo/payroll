import { fetchEmployees } from '@/apiService';
import { create } from 'zustand';


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
  deduction: number;
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
};

// Zustand store
export const useEmployeeStore = create<EmployeeStore>((set) => ({
  employees: [],
  loading: false,

  fetchEmployees: async (token: string, companyId: string) => {
    set({ loading: true });

    try {
      // Load from local storage first
      const storedEmployees = await localStorage.getItem('Employees');
      if (storedEmployees) {
        set({ employees: JSON.parse(storedEmployees) });
      }

      // Fetch fresh data from API
      const res = await fetchEmployees(token, companyId);
      const data: Employee[] = res

      console.log(data)

      // Save to store and local storage
      set({ employees: data, loading: false });
    } catch (error) {
      console.error('Error fetching employees:', error);
      set({ loading: false });
    }
  },
}));
