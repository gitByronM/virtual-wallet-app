import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Customer {
  document: string;
  names: string;
  email: string;
  phone: string;
  balance: number | null;
}

interface CustomerContextProps {
  customer: Customer;
  setCustomer: React.Dispatch<React.SetStateAction<Customer>>;
}

const defaultCustomer: Customer = {
  document: '',
  names: '',
  email: '',
  phone: '',
  balance: null,
};

const CustomerContext = createContext<CustomerContextProps | undefined>(undefined);

export const useCustomer = () => {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error('useCustomer must be used within a CustomerProvider');
  }
  return context;
};

export const CustomerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [customer, setCustomer] = useState<Customer>(defaultCustomer);

  return (
    <CustomerContext.Provider value={{ customer, setCustomer }}>
      {children}
    </CustomerContext.Provider>
  );
};
