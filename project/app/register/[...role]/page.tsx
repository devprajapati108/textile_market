'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter, useParams } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  company: z.string().min(2, 'Company name must be at least 2 characters'),
  role: z.enum(['manufacturer', 'agent', 'trader', 'vendor']),
  id: z.string().optional(),
});

type RegisterFormData = z.infer<typeof registerSchema>;

const roleSpecificFields = {
  manufacturer: [
    { name: 'productionCapacity', label: 'Production Capacity', type: 'text' },
    { name: 'factoryLocation', label: 'Factory Location', type: 'text' },
  ],
  agent: [
    { name: 'specialization', label: 'Specialization', type: 'text' },
    { name: 'territory', label: 'Territory', type: 'text' },
  ],
  trader: [
    { name: 'tradingLicense', label: 'Trading License Number', type: 'text' },
    { name: 'businessType', label: 'Business Type', type: 'text' },
  ],
  vendor: [
    { name: 'shopLocation', label: 'Shop Location', type: 'text' },
    { name: 'businessCategory', label: 'Business Category', type: 'text' },
  ],
};

export default function Register() {
  const router = useRouter();
  const params = useParams();
  // const role = params.role as keyof typeof roleSpecificFields;
  const id = params.id as string; // Extracting id from URL params
  const [error, setError] = useState('');

  // const params = useParams();
const roleParam = params.role;
const role = Array.isArray(roleParam) ? roleParam[0] : roleParam || '';


  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: role as 'manufacturer' | 'agent' | 'trader' | 'vendor',
      id: id, // Setting id in default values
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, id }), // Including id
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Registration failed');
      }

      router.push(`/dashboard/${role}`);
      // router.push(`/dashboard/${role}/products`); // Redirecting with id /${id}
      console.log('response:',id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    }
  };

  // if (!roleSpecificFields[role]) {
  //   return <div>Invalid role specified</div>;
  // }
if (!role || !roleSpecificFields[role as keyof typeof roleSpecificFields]) {
  return <div>Invalid role specified</div>;
}
const formattedRole = typeof role === 'string' ? role.charAt(0).toUpperCase() + role.slice(1) : 'Unknown';

console.log('params.role:', params.role);
const fields = roleSpecificFields[role as keyof typeof roleSpecificFields];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Register as {role.charAt(0).toUpperCase() + role.slice(1)}
        </h2> */}
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
  Register as {formattedRole}
</h2>

      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" {...register('id')} /> {/* Hidden input for id */}

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                {...register('name')}
                type="text"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                {...register('email')}
                type="email"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                {...register('password')}
                type="password"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                Company Name
              </label>
              <input
                {...register('company')}
                type="text"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.company && <p className="mt-1 text-sm text-red-600">{errors.company.message}</p>}
            </div>

            {/* {roleSpecificFields[role].map((field) => ( */}
            {fields.map((field) => (
              <div key={field.name}>
                <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  {...register(field.name as keyof RegisterFormData)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            ))}

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// old---------------------==========================------------------------------

// 'use client';

// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { useRouter, useParams } from 'next/navigation';
// import { z } from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';
// import Link from 'next/link';

// const registerSchema = z.object({
//   name: z.string().min(2, 'Name must be at least 2 characters'),
//   email: z.string().email('Invalid email address'),
//   password: z.string().min(6, 'Password must be at least 6 characters'),
//   company: z.string().min(2, 'Company name must be at least 2 characters'),
//   role: z.enum(['manufacturer', 'agent', 'trader', 'vendor']),
// });

// type RegisterFormData = z.infer<typeof registerSchema>;

// const roleSpecificFields = {
//   manufacturer: [
//     { name: 'productionCapacity', label: 'Production Capacity', type: 'text' },
//     { name: 'factoryLocation', label: 'Factory Location', type: 'text' },
//   ],
//   agent: [
//     { name: 'specialization', label: 'Specialization', type: 'text' },
//     { name: 'territory', label: 'Territory', type: 'text' },
//   ],
//   trader: [
//     { name: 'tradingLicense', label: 'Trading License Number', type: 'text' },
//     { name: 'businessType', label: 'Business Type', type: 'text' },
//   ],
//   vendor: [
//     { name: 'shopLocation', label: 'Shop Location', type: 'text' },
//     { name: 'businessCategory', label: 'Business Category', type: 'text' },
//   ],
// };

// export default function Register() {
//   const router = useRouter();
//   const params = useParams();
//   const role = params.role as keyof typeof roleSpecificFields;
//   const [error, setError] = useState('');

//   const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
//     resolver: zodResolver(registerSchema),
//     defaultValues: {
//       role: role as 'manufacturer' | 'agent' | 'trader' | 'vendor',
//     },
//   });

//   const onSubmit = async (data: RegisterFormData) => {
//     try {
//       const response = await fetch('/api/auth/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       });

//       const result = await response.json();

//       if (!response.ok) {
//         throw new Error(result.message || 'Registration failed');
//       }

//       // router.push(`/dashboard/products/${result.id}`);
//       router.push(`/dashboard/${role}`);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Registration failed');
//     }
//   };

//   if (!roleSpecificFields[role]) {
//     return <div>Invalid role specified</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-md">
//         <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//           Register as {role.charAt(0).toUpperCase() + role.slice(1)}
//         </h2>
//       </div>

//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
//           {error && (
//             <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
//               <p className="text-red-700">{error}</p>
//             </div>
//           )}

//           <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
//             <div>
//               <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//                 Full Name
//               </label>
//               <div className="mt-1">
//                 <input
//                   {...register('name')}
//                   type="text"
//                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 />
//                 {errors.name && (
//                   <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
//                 )}
//               </div>
//             </div>

//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                 Email address
//               </label>
//               <div className="mt-1">
//                 <input
//                   {...register('email')}
//                   type="email"
//                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 />
//                 {errors.email && (
//                   <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
//                 )}
//               </div>
//             </div>

//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                 Password
//               </label>
//               <div className="mt-1">
//                 <input
//                   {...register('password')}
//                   type="password"
//                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 />
//                 {errors.password && (
//                   <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
//                 )}
//               </div>
//             </div>

//             <div>
//               <label htmlFor="company" className="block text-sm font-medium text-gray-700">
//                 Company Name
//               </label>
//               <div className="mt-1">
//                 <input
//                   {...register('company')}
//                   type="text"
//                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 />
//                 {errors.company && (
//                   <p className="mt-1 text-sm text-red-600">{errors.company.message}</p>
//                 )}
//               </div>
//             </div>

//             {roleSpecificFields[role].map((field) => (
//               <div key={field.name}>
//                 <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
//                   {field.label}
//                 </label>
//                 <div className="mt-1">
//                   <input
//                     type={field.type}
//                     id={field.name}
//                     name={field.name}
//                     className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                   />
//                 </div>
//               </div>
//             ))}

//             <div>
//               <button
//                 type="submit"
//                 className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//               >
//                 Register
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }