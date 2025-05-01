'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' })
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);


  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
  
      const result = await res.json();
      if (!res.ok) throw new Error(result.message);
  
      // Save token
      localStorage.setItem('token', result.token);
  
      // Delay decoding until after hydration
      setTimeout(() => {
        const payload = JSON.parse(atob(result.token.split('.')[1]));
        const role = payload.role;
        const userId = payload.userId;
  
        localStorage.setItem('role', role);
        localStorage.setItem('userId', userId);
  
        router.push(`/dashboard/${role}`);
      }, 0);
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };
  
  // const onSubmit = async (data: LoginFormData) => {
  //   setLoading(true);
  //   setError('');
  //   try {
  //     const res = await fetch('/api/auth/login', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(data)
  //     });

  //     const result = await res.json();
  //     if (!res.ok) throw new Error(result.message);

  //     // Save token in localStorage
  //     localStorage.setItem('token', result.token);

  //     // Decode token to get user info
  //     const payload = JSON.parse(atob(result.token.split('.')[1]));
  //     const role = payload.role;
  //     const userId = payload.userId;

  //     // Optionally save role/userId in localStorage too
  //     localStorage.setItem('role', role);
  //     localStorage.setItem('userId', userId);

  //     // Navigate to role-based dashboard
  //     router.push(`/dashboard/${role}`);
  //   } catch (err: any) {
  //     setError(err.message || 'Login failed');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            type="email"
            placeholder="Email"
            {...register('email')}
            className="w-full px-4 py-2 border rounded"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            {...register('password')}
            className="w-full px-4 py-2 border rounded"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
