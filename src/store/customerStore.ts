import { create } from "zustand";

export interface CustomerData {
  fullName: string;
  age: number;
  idNumber: string;
  contactNumber: string;
  emergencyContact1?: string;
  emergencyContact2?: string;
}

interface CustomerStore {
  customerData: CustomerData;
  updateCustomerData: (data: CustomerData) => void;
}

export const useCustomers = create<CustomerStore>((set) => ({
  customerData: {} as CustomerData,
  updateCustomerData: (data) => set({ customerData: data }),
}));

const URL = "https://smartbus-5a355-default-rtdb.firebaseio.com/customers.json";

export const saveCustomerData = async (data: CustomerData) => {
  try {
    const resp = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (resp.ok) {
      const response = await resp.json();
      console.log(response);
      return
    }
    throw new Error('Failed try again later')
  } catch (error) {
    console.error("Error uploading towns:", error);
  }
};
