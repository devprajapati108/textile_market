'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Product from '@/app/models/Product';
import Image from 'next/image';
export default function ManageProducts() {
  const params = useParams();
  // const id = Array.isArray(params?.id) ? params.id[0] : params.id;

  const [products, setProduct] = useState<any[]>([]); // Using any[] since Product model is not imported
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log("Fetching data from API...");
        const res = await fetch(`/api/auth/products`);

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        console.log("API Response:--->", data); // ✅ Debugging log
        // console.log("id is:-", id);
        // const products = Array.isArray(data) ? data : data.product ?? [];

        const products = Array.isArray(data) ? data : data.products;
        console.log("Products:----------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", products.length);
        if (!Array.isArray(products)) {
          throw new Error("Invalid API response format");
        }

        setProduct(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  if (loading) return <p>Loading... in page</p>;

  // if (products.length === 0) return <p>No products found.</p>;
  console.log("Product is->", products);
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-wrap justify-center gap-6">
  <div className="text-lg font-semibold text-gray-700">Product List</div>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {products.map((product) => {
      console.log("In map, Product is->", product);
      return (
        <div
          key={product._id}
          className="bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          {/* Image Section */}
          <div className="relative w-full h-48 rounded-t-xl overflow-hidden"> 
          <Image
  src={product.images[0]}
  alt={product.name}
  fill
  className="object-cover"
  unoptimized
/>
</div>

          {/* {product.images?.length < 0 ? (
            <div className="relative w-full h-48 rounded-t-xl overflow-hidden">
              <Image
                src={product.images} // Display the first image
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-full h-48 bg-gray-300 flex items-center justify-center rounded-t-xl">
              <span className="text-gray-500">No Image Available</span>
            </div>
          )} */}

          {/* Product Details */}
          <div className="p-4 text-center">
            <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
            <p className="text-gray-600 text-sm mt-1">{product.description}</p>
            <p className="text-md font-bold text-indigo-600 mt-2">${product.price}</p>
            <p className="text-xs text-gray-500 mt-1">Category: {product.category}</p>
            <p className="text-xs text-gray-500">MOQ: {product.moq}</p>
          </div>
        </div>
      );
    })}
  </div>
</div>

//     <div className="min-h-screen bg-gray-100 p-6 flex flex-wrap gap-4 justify-center">
//   <div className="p">dev</div>

//   {products.map((product) => {
//     console.log("In map, Product is->", product);
//     return (
//       <div key={product._id} className="max-w-md bg-white p-4 rounded-lg shadow-md">
//         {/* Optimized Image Using next/image */}
//         {product.images?.length > 0 ? (
//           <div className="relative w-full h-48">
//             <Image
//               src={product.images[0]} // Display the first image
//               alt={product.name}
//               fill // Makes it responsive inside the container
//               className="object-cover rounded-t-lg"
//               // priority // Helps improve LCP for important images
//             />
//           </div>
//         ) : (
//           <div className="w-full h-48 bg-gray-300 flex items-center justify-center rounded-t-lg">
//             <span className="text-gray-500">No Image Available</span>
//           </div>
//         )}

//         {/* Product Details */}
//         <div className="p-4">
//           <h2 className="text-lg font-bold mt-2 text-center">{product.name}</h2>
//           <p className="text-gray-600 text-sm mt-1 text-center">{product.description}</p>
//           <p className="text-md font-semibold text-indigo-600 mt-2 text-center">${product.price}</p>
//           <p className="text-xs text-gray-500 text-center">Category: {product.category}</p>
//           <p className="text-xs text-gray-500 text-center">MOQ: {product.moq}</p>
//         </div>
//       </div>
//     );
//   })}
// </div>
    // <div className="min-h-screen bg-gray-100 p-6 flex flex-wrap gap-4 justify-center">
    //   <div className="p">dev</div>
      
    //   {products.map((products) => {
    //     console.log(" in map Product is->", products);
    //     return (
    //       <div key={products._id} className="max-w-md bg-white p-4 rounded-lg shadow-md">
    //         <h2 className="text-lg font-bold mt-2 text-center">{products.name} </h2>
    //         <p className="text-gray-600 text-sm mt-1 text-center">{products.description}</p>
    //         <p className="text-md font-semibold text-indigo-600 mt-2 text-center">${products.price}</p>
    //         <p className="text-xs text-gray-500 text-center">Category: {products.category}</p>
    //         <p className="text-xs text-gray-500 text-center">MOQ: {products.moq}</p>
    //       </div>
    //     );
    //   })}
    // </div>
  );
}



// 'use client';

// import { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';
// import Product from '@/app/models/Product'; // Import the Product model

// export default function ManageProducts() {
//   const params = useParams();
//   const id = Array.isArray(params?.id) ? params.id[0] : params.id;

//   const [product, setProduct] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         console.log("Fetching data from API...");
//         const res = await fetch(`/api/auth/products`);

//         if (!res.ok) {
//           throw new Error(`HTTP error! Status: ${res.status}`);
//         }

//         const data = await res.json();
//         console.log("API Response:", data); // ✅ Debugging log

//         const products = Array.isArray(data) ? data : data.product;

//         if (!Array.isArray(products)) {
//           throw new Error("Invalid API response format");
//         }

//         setProduct(products);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//   }, []);

//   if (loading) return <p>Loading... in page</p>;

//   if (product.length === 0) return <p>No products found.</p>;

//   return (
//     <div className="min-h-screen bg-gray-100 p-6 flex flex-wrap gap-4 justify-center">
//       <div className="p">dev</div>
//       {product.map((product) => {
//         console.log("Product is->", product);
//         return (
//           <div key={product._id} className="max-w-md bg-white p-4 rounded-lg shadow-md">
//             <h2 className="text-lg font-bold mt-2 text-center">{product.name}</h2>
//             <p className="text-gray-600 text-sm mt-1 text-center">{product.description}</p>
//             <p className="text-md font-semibold text-indigo-600 mt-2 text-center">${product.price}</p>
//             <p className="text-xs text-gray-500 text-center">Category: {product.category}</p>
//             <p className="text-xs text-gray-500 text-center">MOQ: {product.moq}</p>
//           </div>
//         );
//       })}
//     </div>
//   );
// }




// // 'use client';

// // import { useEffect, useState } from 'react';
// // import { useParams } from 'next/navigation';

// // interface Product {
// //   _id: string;
// //   name: string;
// //   description: string;
// //   price: number;
// //   category: string;
// //   userId: string;
// //   userRole: string;
// //   images: string[];
// //   specifications: {
// //     material: string;
// //     weight: string;
// //     dimensions: string;
// //   };
// //   moq: number;
// // }

// // export default function ManageProducts() {
// //   const params = useParams();
// //   const id = Array.isArray(params?.id) ? params.id[0] : params.id;

// //   const [product, setProduct] = useState<Product[]>([]);

// //   useEffect(() => {
// //     const fetchProduct = async () => {
// //       try {
// //         const res = await fetch(`/api/auth/products`);
// //         if (!res.ok) throw new Error('Product not found');

// //         const data = await res.json();
// //         console.log("API Raw Response:", data); // Log the response

// //         // Handle API response whether it's an array or inside an object
// //         const products = Array.isArray(data) ? data : data.product;
        
// //         if (!Array.isArray(products)) {
// //           throw new Error("Invalid API response format");
// //         }

// //         setProduct(products);
// //       } catch (error) {
// //         console.error(error);
// //       }
// //     };

// //     fetchProduct();
// //   }, []);

// //   if (product.length === 0) return <p>Loading... in page</p>;

// //   return (
// //     <div className="min-h-screen bg-gray-100 p-6 flex flex-wrap gap-4 justify-center">
// //       <div className="p">dev</div>
// //       {product.map((product) => {
// //         console.log("product is->", product);
// //         return (
// //           <div key={product._id} className="max-w-md bg-white p-4 rounded-lg shadow-md">
// //             <h2 className="text-lg font-bold mt-2 text-center">{product.name}</h2>
// //             <p className="text-gray-600 text-sm mt-1 text-center">{product.description}</p>
// //             <p className="text-md font-semibold text-indigo-600 mt-2 text-center">${product.price}</p>
// //             <p className="text-xs text-gray-500 text-center">Category: {product.category}</p>
// //             <p className="text-xs text-gray-500 text-center">MOQ: {product.moq}</p>
// //           </div>
// //         );
// //       })}
// //     </div>
// //   );
// // }



// // // 'use client';

// // // import { useEffect, useState } from 'react';
// // // import { useParams } from 'next/navigation';
// // // // import  Product  from '@/app/models/Product';

// // // interface Product {
// // //   _id: string;
// // //   name: string;
// // //   description: string;
// // //   price: number;
// // //   category: string;
// // //   userId: string;
// // //   userRole: string;
// // //   images: string[];
// // //   specifications: {
// // //     material: string;
// // //     weight: string;
// // //     dimensions: string;
// // //   };
// // //   moq: number;
// // // }

// // // export default function ManageProducts() {
// // //   const params = useParams();
// // //   const id = Array.isArray(params?.id) ? params.id[0] : params.id;

// // //   const [product, setProduct] = useState<Product []>([]);//| null>(null);

// // //   useEffect(() => {
// // //     // if (!id) return;

// // //     const fetchProduct = async () => {
// // //       try {  
// // //         const res = await fetch(`/api/auth/products`); ///api/auth/products?id=${id}
// // //         if (!res.ok) throw new Error('Product not found');
// // //         // const data: Product = await res.json();
// // //         // const data = await res.json(); // Expecting an array
// // //         const data: { product: Product[] } = await res.json(); // Ensure correct type
// // //         console.log("API Response:", data); // ✅ Log to check API response

// // //         if (!Array.isArray(data.product)) {
// // //           throw new Error("Invalid API response format");
// // //         }
        
// // //         setProduct(data.product);
// // //         console.log("data is->",data);
// // //       } catch (error) {
// // //         console.error(error);
// // //       }
// // //     };

// // //     fetchProduct();
// // //   }, []);//, [id]

// // //   // if (product.length === 0) return <p>Loading... in page</p>;
// // //   if (!product) return <p>Loading... in page</p>;

// // //   return (
// // //     <div className="min-h-screen bg-gray-100 p-6 flex flex-wrap gap-4 justify-center">
// // //       <div className="p">dev</div>
// // //       {product.map((product) => (
// // //         console.log("product is->",product),
// // //         <div key={product._id} className="max-w-md bg-white p-4 rounded-lg shadow-md">
// // //           <h2 className="text-lg font-bold mt-2 text-center">{product.name}</h2>
// // //           <p className="text-gray-600 text-sm mt-1 text-center">{product.description}</p>
// // //           <p className="text-md font-semibold text-indigo-600 mt-2 text-center">${product.price}</p>
// // //           <p className="text-xs text-gray-500 text-center">Category: {product.category}</p>
// // //           <p className="text-xs text-gray-500 text-center">MOQ: {product.moq}</p>
// // //         </div>
// // //       ))}
// // //     </div>
// // //   );
  
// // //   // return (
// // //   //   console.log("product is->",product),
// // //   //   <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
// // //   //     <div className="max-w-md bg-white p-4 rounded-lg shadow-md">
// // //   //       {/* <img src={product.images[0]} alt={product.name} className="w-40 h-40 object-cover rounded-md mx-auto" /> */}
// // //   //       <h2 className="text-lg font-bold mt-2 text-center">{product.name}</h2>
// // //   //       <p className="text-gray-600 text-sm mt-1 text-center">{product.description}</p>
// // //   //       <p className="text-md font-semibold text-indigo-600 mt-2 text-center">${product.price}</p>
// // //   //       <p className="text-xs text-gray-500 text-center">Category: {product.category}</p>
// // //   //       <p className="text-xs text-gray-500 text-center">MOQ: {product.moq}</p>
// // //   //       {/* <p className="text-xs text-gray-500 text-center">Material: {product.specifications.material}</p> */}
// // //   //       {/* <p className="text-xs text-gray-500 text-center">Weight: {product.specifications.weight}</p> */}
// // //   //       {/* <p className="text-xs text-gray-500 text-center">Dimensions: {product.specifications.dimensions}</p> */}
// // //   //     </div>
// // //   //   </div>
// // //   // );
// // // }


// // // // 'use client';

// // // // import { useEffect, useState } from 'react';
// // // // import ProductCard from '@/app/components/ProductCard';

// // // // // Define the Product type
// // // // interface Product {
// // // //   id: number;
// // // //   title: string;
// // // //   category: string;
// // // //   price: number;
// // // //   thumbnail: string;
// // // // }

// // // // export default function ManageProducts() {
// // // //   // Explicitly define products as an array of Product type
// // // //   const [products, setProducts] = useState<Product[]>([]);

// // // //   useEffect(() => {
// // // //     const fetchProducts = async () => {
// // // //       const res = await fetch('/api/auth/products');
// // // //       const data = await res.json();
// // // //       setProducts(data.products);
// // // //     };
// // // //     fetchProducts();
// // // //   }, []);

// // // //   return (
// // // //     <div className="min-h-screen bg-gray-100 p-6">
// // // //       <h1 className="text-2xl font-bold mb-4">Manage Products</h1>
// // // //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // // //         {products.map((product) => (
// // // //           <ProductCard key={product.id} product={product} />
// // // //         ))}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }


// // // // // 'use client';

// // // // // import { useEffect, useState } from 'react';
// // // // // import ProductCard from '@/app/components/ProductCard';

// // // // // export default function ManageProducts() {
// // // // //   const [products, setProducts] = useState([]);

// // // // //   useEffect(() => {
// // // // //     const fetchProducts = async () => {
// // // // //       const res = await fetch('/api/products');
// // // // //       const data = await res.json();
// // // // //       setProducts(data.products);
// // // // //     };
// // // // //     fetchProducts();
// // // // //   }, []);

// // // // //   return (
// // // // //     <div className="min-h-screen bg-gray-100 p-6">
// // // // //       <h1 className="text-2xl font-bold mb-4">Manage Products</h1>
// // // // //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // // // //         {products.map((product) => (
// // // // //           <ProductCard key={product.id} product={product} />
// // // // //         ))}
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }
