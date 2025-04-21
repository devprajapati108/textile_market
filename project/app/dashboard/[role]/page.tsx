"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const roleSpecificContent = {
  manufacturer: {
    title: "Manufacturer Dashboard",
    features: [
      "Manage Products",
      "Production Overview",
      "Order Management",
      "Factory Analytics",
    ],
  },
  agent: {
    title: "Agent Dashboard",
    features: [
      "Client Portfolio",
      "Commission Tracking",
      "Market Analysis",
      "Lead Management",
    ],
  },
  trader: {
    title: "Trader Dashboard",
    features: [
      "Trading Overview",
      "Market Prices",
      "Transaction History",
      "Inventory Management",
    ],
  },
  vendor: {
    title: "Vendor Dashboard",
    features: [
      "Store Management",
      "Sales Analytics",
      "Inventory Control",
      "Customer Orders",
    ],
  },
};

export default function Dashboard() {
  const params = useParams();
  const role = params.role as keyof typeof roleSpecificContent;
  const content = roleSpecificContent[role];
  const router = useRouter();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (role === "manufacturer") {
      fetch("/api/auth/products")
        .then((res) => res.json())
        .then((data) => setProducts(data));
    }
  }, [role]);

  if (!content) {
    return <div>Invalid role specified</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">{content.title}</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {content.features.map((feature) => (
                <div
                  key={feature}
                  className="bg-white overflow-hidden shadow rounded-lg p-5"
                >
                  <div className="flex flex-col items-center text-center">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {feature}
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {feature === "Manage Products" && role === "manufacturer" ? (
                            <>
                              <button
                                onClick={() => router.push(`/dashboard/${role}/products`)}
                                className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
                              >
                                View Products
                              </button>
                              <button
                                onClick={() => router.push(`/dashboard/${role}/create-product`)}
                                className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition ml-2"
                              >
                                Create Product
                              </button>
                            </>
                          ) : (
                            "Coming Soon"
                          )}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


// "use client";

// import { useParams } from "next/navigation";
// import { useRouter } from "next/navigation";

// const roleSpecificContent = {
//   manufacturer: {
//     title: "Manufacturer Dashboard",
//     features: [
//       "Manage Products",
//       "Production Overview",
//       "Order Management",
//       "Factory Analytics",
//     ],
//   },
//   agent: {
//     title: "Agent Dashboard",
//     features: [
//       "Client Portfolio",
//       "Commission Tracking",
//       "Market Analysis",
//       "Lead Management",
//     ],
//   },
//   trader: {
//     title: "Trader Dashboard",
//     features: [
//       "Trading Overview",
//       "Market Prices",
//       "Transaction History",
//       "Inventory Management",
//     ],
//   },
//   vendor: {
//     title: "Vendor Dashboard",
//     features: [
//       "Store Management",
//       "Sales Analytics",
//       "Inventory Control",
//       "Customer Orders",
//     ],
//   },
// };

// export default function Dashboard() {
//   const params = useParams();
//   const role = params.role as keyof typeof roleSpecificContent;
//   const content = roleSpecificContent[role];
//   const router = useRouter();

//   if (!content) {
//     return <div>Invalid role specified</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <header className="bg-white shadow">
//         <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
//           <h1 className="text-3xl font-bold text-gray-900">{content.title}</h1>
//         </div>
//       </header>
//       <main>
//         <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//           <div className="px-4 py-6 sm:px-0">
//             <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
//               {content.features.map((feature) => (
//                 <div
//                   key={feature}
//                   className="bg-white overflow-hidden shadow rounded-lg"
//                 >
//                   <div className="p-5">
//                     <div className="flex flex-col items-center text-center">
//                       <dl>
//                         <dt className="text-sm font-medium text-gray-500 truncate">
//                           {feature}
//                         </dt>
//                         <dd className="flex items-baseline">
//                           <div className="text-2xl font-semibold text-gray-900">
//                             {feature === "Manage Products" && role === "manufacturer" ? (
//                               <button ///dashboard/${role}/products
//                                 onClick={() => router.push(`/dashboard/${role}/products`)}
//                                 className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
//                               >
//                                 View Products
//                               </button>
//                             ) : (
//                               "Coming Soon"
//                             )}
//                           </div>
//                         </dd>
//                       </dl>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }




// // 'use client';

// // import { useParams } from 'next/navigation';
// // import { useRouter } from "next/navigation";

// // const roleSpecificContent = {
// //   manufacturer: {
// //     title: 'Manufacturer Dashboard',
// //     features: [
// //       'Manage Products',
// //       'Production Overview',
// //       'Order Management',
// //       'Factory Analytics',
// //     ],
// //   },
// //   agent: {
// //     title: 'Agent Dashboard',
// //     features: [
// //       'Client Portfolio',
// //       'Commission Tracking',
// //       'Market Analysis',
// //       'Lead Management',
// //     ],
// //   },
// //   trader: {
// //     title: 'Trader Dashboard',
// //     features: [
// //       'Trading Overview',
// //       'Market Prices',
// //       'Transaction History',
// //       'Inventory Management',
// //     ],
// //   },
// //   vendor: {
// //     title: 'Vendor Dashboard',
// //     features: [
// //       'Store Management',
// //       'Sales Analytics',
// //       'Inventory Control',
// //       'Customer Orders',
// //     ],
// //   },
// // };

// // export default function Dashboard() {
// //   const params = useParams();
// //   const role = params.role as keyof typeof roleSpecificContent;
// //   const content = roleSpecificContent[role];
// //   const router = useRouter();
// //   if (!content) {
// //     return <div>Invalid role specified</div>;
// //   }

// //   return (
// //     <div className="min-h-screen bg-gray-100">
// //       <header className="bg-white shadow">
// //         <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
// //           <h1 className="text-3xl font-bold text-gray-900">{content.title}</h1>
// //         </div>
// //       </header>
// //       <main>
// //         <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
// //           <div className="px-4 py-6 sm:px-0">
// //             <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
// //               {content.features.map((feature) => (
// //                 <div
// //                   key={feature}
// //                   className="bg-white overflow-hidden shadow rounded-lg"
// //                 >
// //                   <div className="p-5">
// //                     <div className="flex items-center">
// //                       <div className="ml-5 w-0 flex-1">
// //                         <dl>
// //                           <dt className="text-sm font-medium text-gray-500 truncate">
// //                             {feature}
// //                           </dt>
// //                           <dd className="flex items-baseline">
// //                             <div className="text-2xl font-semibold text-gray-900">
// //                               Coming Soon
// //                             </div>
// //                           </dd>
// //                         </dl>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         </div>
// //       </main>
// //     </div>
// //   );
// // }