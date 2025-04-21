'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface Product {
  _id: string;
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
  };
  moq: number;
}

export default function ProductDetails() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params.id;

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/auth/products?id=${id}`);
        if (!res.ok) throw new Error('Product not found');
        const data: Product = await res.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
      <div className="max-w-md bg-white p-4 rounded-lg shadow-md">
        <img src={product.images[0]} alt={product.name} className="w-40 h-40 object-cover rounded-md mx-auto" />
        <h2 className="text-lg font-bold mt-2 text-center">{product.name}</h2>
        <p className="text-gray-600 text-sm mt-1 text-center">{product.description}</p>
        <p className="text-md font-semibold text-indigo-600 mt-2 text-center">${product.price}</p>
        <p className="text-xs text-gray-500 text-center">Category: {product.category}</p>
        <p className="text-xs text-gray-500 text-center">MOQ: {product.moq}</p>
        <p className="text-xs text-gray-500 text-center">Material: {product.specifications.material}</p>
        <p className="text-xs text-gray-500 text-center">Weight: {product.specifications.weight}</p>
        <p className="text-xs text-gray-500 text-center">Dimensions: {product.specifications.dimensions}</p>
      </div>
    </div>
  );
}



// 'use client';

// import { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';

// // Define the Product type
// interface Product {
//   id: number;
//   title: string;
//   description: string;
//   price: number;
//   stock: number;
//   category: string;
//   thumbnail: string;
// }

// export default function ProductDetails() {

//     const params = useParams();
//     const id = Array.isArray(params.id) ? params.id[0] : params.id;
    
//     //   const { id } = useParams();
//   const [product, setProduct] = useState<Product | null>(null); // Explicit type

//   useEffect(() => {
//     const fetchProduct = async () => {
//       const res = await fetch(`/api/auth/products?id=${id}`);
//       const data: Product = await res.json(); // Explicitly cast data as Product
//       setProduct(data);
//     };
//     fetchProduct();
//   }, [id]);

//   if (!product) return <p>Loading...</p>;

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-xs bg-white p-4 rounded-lg shadow-md">
//   <img
//     src={product.thumbnail}
//     alt={product.title}
//     className="w-30 h-30 object-cover rounded-md mx-auto"
//   />
//   <h2 className="text-lg font-bold mt-2 text-center">{product.title}</h2>
//   <p className="text-gray-600 text-sm mt-1 text-center">{product.description}</p>
//   <p className="text-md font-semibold text-indigo-600 mt-2 text-center">${product.price}</p>
//   <p className="text-xs text-gray-500 text-center">Stock: {product.stock}</p>
//   <p className="text-xs text-gray-500 text-center">Category: {product.category}</p>
// </div>

//       {/* <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
//         <img
//           src={product.thumbnail}
//           alt={product.title}
//           className="w-30 h-30 object-cover rounded-md"
//         />
//         <h1 className="text-3xl font-bold mt-4">{product.title}</h1>
//         <p className="text-gray-600 mt-2">{product.description}</p>
//         <p className="text-lg font-semibold mt-4 text-indigo-600">${product.price}</p>
//         <p className="text-sm text-gray-500">Stock: {product.stock}</p>
//         <p className="text-sm text-gray-500">Category: {product.category}</p>
//       </div> */}
//     </div>
//   );
// }



// // 'use client';

// // import { useEffect, useState } from 'react';
// // import { useParams } from 'next/navigation';

// // export default function ProductDetails() {
// //   const { id } = useParams();
// //   const [product, setProduct] = useState(null);

// //   useEffect(() => {
// //     const fetchProduct = async () => {
// //       const res = await fetch(`/api/products?id=${id}`);
// //       const data = await res.json();
// //       setProduct(data);
// //     };
// //     fetchProduct();
// //   }, [id]);

// //   if (!product) return <p>Loading...</p>;

// //   return (
// //     <div className="min-h-screen bg-gray-100 p-6">
// //       <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
// //         <img
// //           src={product.thumbnail}
// //           alt={product.title}
// //           className="w-full h-60 object-cover rounded-md"
// //         />
// //         <h1 className="text-3xl font-bold mt-4">{product.title}</h1>
// //         <p className="text-gray-600 mt-2">{product.description}</p>
// //         <p className="text-lg font-semibold mt-4 text-indigo-600">${product.price}</p>
// //         <p className="text-sm text-gray-500">Stock: {product.stock}</p>
// //         <p className="text-sm text-gray-500">Category: {product.category}</p>
// //       </div>
// //     </div>
// //   );
// // }
