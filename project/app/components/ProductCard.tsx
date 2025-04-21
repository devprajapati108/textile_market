import Link from 'next/link';

// Define the Product type
interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  thumbnail: string;
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-40 object-cover rounded-md"
      />
      <h2 className="text-lg font-bold mt-2">{product.title}</h2>
      <p className="text-sm text-gray-600">{product.category}</p>
      <p className="text-lg font-semibold text-indigo-600">${product.price}</p>
      <Link
        href={`/dashboard/manufacturer/products/${product.id}`}
        className="mt-4 inline-block text-indigo-500 hover:text-indigo-700"
      >
        Read More
      </Link>
    </div>
  );
}




// import Link from 'next/link';

// export default function ProductCard({ product }) {
//   return (
//     <div className="bg-white shadow rounded-lg p-4">
//       <img
//         src={product.thumbnail}
//         alt={product.title}
//         className="w-full h-40 object-cover rounded-md"
//       />
//       <h2 className="text-lg font-bold mt-2">{product.title}</h2>
//       <p className="text-sm text-gray-600">{product.category}</p>
//       <p className="text-lg font-semibold text-indigo-600">${product.price}</p>
//       <Link
//         href={`/dashboard/manufacturer/products/${product.id}`}
//         className="mt-4 inline-block text-indigo-500 hover:text-indigo-700"
//       >
//         Read More
//       </Link>
//     </div>
//   );
// }
