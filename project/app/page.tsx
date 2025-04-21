import Link from 'next/link';

const roles = [
  {
    name: 'Manufacturer',
    description: 'Register as a manufacturer to showcase your products and connect with buyers.',
    href: '/register/manufacturer',
  },
  {
    name: 'Agent',
    description: 'Join as an agent to connect manufacturers with potential buyers.',
    href: '/register/agent',
  },
  {
    name: 'Trader',
    description: 'Register as a trader to buy and sell textile products.',
    href: '/register/trader',
  },
  {
    name: 'Vendor',
    description: 'Join as a vendor to retail textile products to end customers.',
    href: '/register/vendor',
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              Textile Industry Marketplace
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Connect with manufacturers, agents, traders, and vendors in the textile industry
            </p>
          </div>
        </div>
      </div>

      {/* Registration Options */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
              Get Started
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Choose your role
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {roles.map((role) => (
                <div key={role.name} className="relative">
                  <Link href={role.href}>
                    <div className="relative bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <h3 className="text-lg font-medium text-gray-900">{role.name}</h3>
                      <p className="mt-2 text-base text-gray-500">{role.description}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}


// import Link from 'next/link';

// export default function Home() {
//   return (
//     <main className="min-h-screen bg-gray-50">
//       {/* Hero Section */}
//       <div className="bg-white">
//         <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
//           <div className="text-center">
//             <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
//               Textile Industry Marketplace
//             </h1>
//             <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
//               Connect with manufacturers, agents, traders, and vendors in the textile industry
//             </p>
//             <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
//               <div className="rounded-md shadow">
//                 <Link
//                   href="/register"
//                   className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
//                 >
//                   Get Started
//                 </Link>
//               </div>
//               <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
//                 <Link
//                   href="/products"
//                   className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
//                 >
//                   Browse Products
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Features Section */}
//       <div className="py-12 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="lg:text-center">
//             <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Features</h2>
//             <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
//               Everything you need in one place
//             </p>
//           </div>

//           <div className="mt-10">
//             <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
//               {[
//                 {
//                   title: 'For Manufacturers',
//                   description: 'Showcase your products and connect with potential buyers worldwide.',
//                 },
//                 {
//                   title: 'For Agents',
//                   description: 'Find quality products and expand your network of suppliers.',
//                 },
//                 {
//                   title: 'For Traders',
//                   description: 'Access a wide range of textile products and negotiate directly.',
//                 },
//                 {
//                   title: 'For Vendors',
//                   description: 'Source products efficiently and manage your inventory better.',
//                 },
//               ].map((feature) => (
//                 <div key={feature.title} className="relative">
//                   <div className="relative bg-white p-6 rounded-lg shadow-lg">
//                     <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
//                     <p className="mt-2 text-base text-gray-500">{feature.description}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }