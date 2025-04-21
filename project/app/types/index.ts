export interface User {
  _id?: string;
  name: string;
  email: string;
  password: string;
  role: 'manufacturer' | 'agent' | 'trader' | 'vendor';
  company: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Product {
  _id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  userId: string;
  userRole: string;
  images: string[];
  specifications: {
    material: string;
    weight: string;
    dimensions: string;
    [key: string]: string;
  };
  moq: number; // Minimum Order Quantity
  createdAt?: Date;
  updatedAt?: Date;
}