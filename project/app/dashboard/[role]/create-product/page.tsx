"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
// import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {  useParams } from 'next/navigation';

export default function CreateProduct() {
   const params = useParams();
  const router = useRouter();
  const roleParam = params.role;
const role = Array.isArray(roleParam) ? roleParam[0] : roleParam || '';

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    moq: '',
    userRole: 'manufacturer', // Default role
    images: [''], // Array of image URLs
    specifications: {
      material: '',
      weight: '',
      dimensions: '',
    },
  });

  const [error, setError] = useState('');

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    
    if (name.includes('specifications.')) {
      // Handle nested specifications
      const specKey = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        specifications: { ...prev.specifications, [specKey]: value },
      }));
    } else {
      // Handle normal fields
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (index: number, value: string) => {
    const updatedImages = [...formData.images];
    updatedImages[index] = value;
    setFormData((prev) => ({ ...prev, images: updatedImages }));
  };

  const addImageField = () => {
    setFormData((prev) => ({ ...prev, images: [...prev.images, ''] }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    try {
      const res = await fetch('/api/auth/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error(`Failed to create product. Status: ${res.status}`);
      }

      router.push(`/dashboard/${role}/products`);
      // router.push('/login'); // Redirect after successful creation
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to create product. Please try again.');
    }
  };

  return (
    
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create Product</h2>
        {error && <p className="text-red-600 mb-4">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Product Name */}
          <input name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} className="input-field" style={{border: '2px solid #ccc'}} required />

          {/* Description */}
          <textarea style={{border: '2px solid #ccc'}} name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="input-field" required />

          {/* Price */}
          <input style={{border: '2px solid #ccc'}} name="price" type="number" placeholder="Price" value={formData.price} onChange={handleChange} className="input-field" required />

          {/* Category */}
          <input  style={{border: '2px solid #ccc'}}  name="category" placeholder="Category" value={formData.category} onChange={handleChange} className="input-field" required />

          {/* Minimum Order Quantity (MOQ) */}
          <input style={{border: '2px solid #ccc'}}  name="moq" type="number" placeholder="Minimum Order Quantity (MOQ)" value={formData.moq} onChange={handleChange} className="input-field" required />

          {/* Specifications */}
          <div style={{border: '2px solid #ccc'}} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input style={{border: '2px solid #ccc'}} name="specifications.material" placeholder="Material" value={formData.specifications.material} onChange={handleChange} className="input-field" />
            <input style={{border: '2px solid #ccc'}} name="specifications.weight" placeholder="Weight" value={formData.specifications.weight} onChange={handleChange} className="input-field" />
            <input style={{border: '2px solid #ccc'}} name="specifications.dimensions" placeholder="Dimensions" value={formData.specifications.dimensions} onChange={handleChange} className="input-field" />
          </div>

          {/* Images */}
          <div className="space-y-2">
            {formData.images.map((image, index) => (
              <input key={index} style={{border: '2px solid #ccc'}} type="text" placeholder="Image URL" value={image} onChange={(e) => handleImageChange(index, e.target.value)} className="input-field" />
            ))}
            <button type="button" style={{border: '2px solid #ccc'}} onClick={addImageField} className="btn-secondary">+ Add Another Image</button>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn-primary w-full" style={{ marginTop: '1rem',backgroundColor: '#3b82f6' }}>Create Product</button>
        </form>
      </div>
    </div>
  );
}


// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function CreateProduct() {
//   const router = useRouter();

//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     price: "",
//     category: "",
//     moq: "",
//     images: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const res = await fetch("/api/auth/products", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (!res.ok) {
//         throw new Error(`Failed to create product. Status: ${res.status}`);
//       }

//       router.push("/login"); // Redirect to products list
//     } catch (err) {
//       setError((err as Error).message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Product</h2>

//       <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg">
//         {error && <p className="text-red-600 mb-4">{error}</p>}

//         <form className="space-y-4" onSubmit={handleSubmit}>
//           <input type="text" name="name" placeholder="Product Name" onChange={handleChange} className="w-full p-3 border rounded-lg" required />
//           <textarea name="description" placeholder="Description" onChange={handleChange} className="w-full p-3 border rounded-lg" required />
//           <input type="number" name="price" placeholder="Price" onChange={handleChange} className="w-full p-3 border rounded-lg" required />
//           <input type="text" name="category" placeholder="Category" onChange={handleChange} className="w-full p-3 border rounded-lg" required />
//           <input type="number" name="moq" placeholder="Minimum Order Quantity (MOQ)" onChange={handleChange} className="w-full p-3 border rounded-lg" required />
//           <input type="text" name="images" placeholder="Image URL" onChange={handleChange} className="w-full p-3 border rounded-lg" />

//           <button type="submit" className="bg-indigo-600 text-white p-3 rounded-lg w-full font-semibold hover:bg-indigo-700">
//             {loading ? "Creating..." : "Create Product"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }



// // 'use client';

// // import { useState } from 'react';
// // import { useForm } from 'react-hook-form';
// // import { useRouter } from 'next/navigation';
// // import { z } from 'zod';
// // import { zodResolver } from '@hookform/resolvers/zod';

// // const productSchema = z.object({
// //   name: z.string().min(2, 'Product name must be at least 2 characters'),
// //   description: z.string().min(10, 'Description must be at least 10 characters'),
// //   price: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid price format'),
// //   category: z.string().min(2, 'Category must be at least 2 characters'),
// //   moq: z.string().regex(/^\d+$/, 'MOQ must be a number'),
// //   specifications: z.object({
// //     material: z.string().optional(),
// //     weight: z.string().optional(),
// //     dimensions: z.string().optional(),
// //   }),
// //   images: z.array(z.string()).optional(),
// // });

// // type ProductFormData = z.infer<typeof productSchema>;

// // export default function CreateProduct() {
// //   const router = useRouter();
// //   const [error, setError] = useState('');

// //   const {
// //     register,
// //     handleSubmit,
// //     formState: { errors },
// //   } = useForm<ProductFormData>({
// //     resolver: zodResolver(productSchema),
// //     defaultValues: {
// //       specifications: { material: '', weight: '', dimensions: '' },
// //       images: [],
// //     },
// //   });

// //   const onSubmit = async (data: ProductFormData) => {
// //     try {
// //       const response = await fetch('/api/auth/products', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify(data),
// //       });

// //       const result = await response.json();
// //       if (!response.ok) throw new Error(result.message || 'Product creation failed');

// //       router.push('/dashboard/login');///dashboard/manufacturer/products
// //     } catch (err) {
// //       setError(err instanceof Error ? err.message : 'Product creation failed');
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
// //       <div className="sm:mx-auto sm:w-full sm:max-w-md">
// //         <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create Product</h2>
// //       </div>
// //       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
// //         <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
// //           {error && <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 text-red-700">{error}</div>}
// //           <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700">Product Name</label>
// //               <input {...register('name')} className="input-field" />
// //               {errors.name && <p className="error-text">{errors.name.message}</p>}
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-gray-700">Description</label>
// //               <textarea {...register('description')} className="input-field" />
// //               {errors.description && <p className="error-text">{errors.description.message}</p>}
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-gray-700">Price</label>
// //               <input {...register('price')} type="text" className="input-field" />
// //               {errors.price && <p className="error-text">{errors.price.message}</p>}
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-gray-700">Category</label>
// //               <input {...register('category')} className="input-field" />
// //               {errors.category && <p className="error-text">{errors.category.message}</p>}
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-gray-700">MOQ</label>
// //               <input {...register('moq')} type="text" className="input-field" />
// //               {errors.moq && <p className="error-text">{errors.moq.message}</p>}
// //             </div>

// //             <div>
// //               <button type="submit" className="btn-primary">Create Product</button>
// //             </div>
// //           </form>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }



// // "use client";

// // import { useEffect, useState } from "react";
// // import { useRouter,useParams } from "next/navigation";
// // import Image from "next/image";

// // export default function CreateProduct() {
// //   const router = useRouter();
// //   const [formData, setFormData] = useState({
// //     name: "",
// //     description: "",
// //     price: "",
// //     category: "",
// //     moq: "",
// //     // specifications: { material: "", weight: "", dimensions: "" },
// //     // images: [],
// //   });
// //   const params = useParams();
// //     const role = params.role; //as keyof typeof roleSpecificContent;
// //     // const content = roleSpecificContent[role];

// //   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
// //     const { name, value } = e.target;
// //     setFormData({ ...formData, [name]: value });
// //   };

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     const response = await fetch("/api/auth/products", {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify(formData),
// //     });
// //     if (response.ok) {
// //       router.push(`/dashboard/${role}/products`);
// //     } else {
// //       console.error("Error submitting product:", await response.json());
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
// //       <h2 className="text-2xl font-bold mb-6 text-gray-800">Create Product</h2>
// //       <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg w-full max-w-3xl space-y-4">
// //         <input type="text" name="name" placeholder="Product Name" onChange={handleChange} className="w-full p-3 border rounded-lg" required />
// //         <textarea name="description" placeholder="Description" onChange={handleChange} className="w-full p-3 border rounded-lg" required></textarea>
// //         <input type="number" name="price" placeholder="Price" onChange={handleChange} className="w-full p-3 border rounded-lg" required />
// //         <input type="text" name="category" placeholder="Category" onChange={handleChange} className="w-full p-3 border rounded-lg" required />
// //         <input type="number" name="moq" placeholder="Minimum Order Quantity (MOQ)" onChange={handleChange} className="w-full p-3 border rounded-lg" required />
// //         <button type="submit" className="bg-blue-600 text-white p-3 rounded-lg w-full font-semibold hover:bg-blue-700 transition">Save Product</button>
// //       </form>
// //     </div>
// //   );
// // }


// // // "use client";

// // // import { useParams, useRouter } from "next/navigation";
// // // import { useState, useEffect } from "react";
// // // // Create Product Page
// // // export function CreateProduct() {
// // //     const router = useRouter();
// // //     const [formData, setFormData] = useState({
// // //       name: "",
// // //       description: "",
// // //       price: "",
// // //       category: "",
// // //       moq: "",
// // //       specifications: { material: "", weight: "", dimensions: "" },
// // //       images: [],
// // //     });
  
// // //     const handleChange = (e) => {
// // //       const { name, value } = e.target;
// // //       setFormData({ ...formData, [name]: value });
// // //     };
  
// // //     const handleSubmit = async (e) => {
// // //       e.preventDefault();
// // //       const response = await fetch("/api/products", {
// // //         method: "POST",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify(formData),
// // //       });
// // //       if (response.ok) {
// // //         router.push("/dashboard/manufacturer/products");
// // //       }
// // //     };
  
// // //     return (
// // //       <div className="max-w-4xl mx-auto py-10">
// // //         <h2 className="text-2xl font-bold mb-6">Create Product</h2>
// // //         <form onSubmit={handleSubmit} className="space-y-4">
// // //           <input type="text" name="name" placeholder="Product Name" onChange={handleChange} className="w-full p-2 border" required />
// // //           <textarea name="description" placeholder="Description" onChange={handleChange} className="w-full p-2 border" required></textarea>
// // //           <input type="number" name="price" placeholder="Price" onChange={handleChange} className="w-full p-2 border" required />
// // //           <input type="text" name="category" placeholder="Category" onChange={handleChange} className="w-full p-2 border" required />
// // //           <button type="submit" className="bg-blue-600 text-white p-2 rounded">Save Product</button>
// // //         </form>
// // //       </div>
// // //     );
// // //   }
  
// // // // import { useParams, useRouter } from "next/navigation";
// // // // import { useState, useEffect } from "react";

