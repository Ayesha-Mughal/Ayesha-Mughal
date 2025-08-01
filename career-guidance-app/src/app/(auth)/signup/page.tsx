'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

interface SignupFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  city: string;
  matricMarks: number;
  interMarks?: number;
}

export default function SignupPage() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<SignupFormData>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { signup } = useAuth();
  
  const password = watch('password');

  const onSubmit = async (data: SignupFormData) => {
    if (data.password !== data.confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      setError(null);
      setLoading(true);
      
      await signup(
        data.email, 
        data.password, 
        data.username, 
        data.city, 
        data.matricMarks, 
        data.interMarks
      );
      
      router.push('/educational-background');
    } catch (error: any) {
      setError(error.message || 'Failed to create an account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden md:max-w-lg">
      <div className="px-6 py-8">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-8">Create an Account</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              id="username"
              type="text"
              {...register('username', { required: 'Username is required' })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>}
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              {...register('password', { 
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters'
                }
              })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
          </div>
          
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              {...register('confirmPassword', { 
                required: 'Please confirm your password',
                validate: value => value === password || 'Passwords do not match'
              })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>}
          </div>
          
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
            <input
              id="city"
              type="text"
              {...register('city', { required: 'City is required' })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>}
          </div>
          
          <div>
            <label htmlFor="matricMarks" className="block text-sm font-medium text-gray-700">Matric Marks (out of 1100)</label>
            <input
              id="matricMarks"
              type="number"
              {...register('matricMarks', { 
                required: 'Matric marks are required',
                min: {
                  value: 0,
                  message: 'Marks cannot be negative'
                },
                max: {
                  value: 1100,
                  message: 'Marks cannot exceed 1100'
                }
              })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.matricMarks && <p className="mt-1 text-sm text-red-600">{errors.matricMarks.message}</p>}
          </div>
          
          <div>
            <label htmlFor="interMarks" className="block text-sm font-medium text-gray-700">
              FSc/Inter Marks (out of 1100) <span className="text-gray-500 text-xs">(Optional)</span>
            </label>
            <input
              id="interMarks"
              type="number"
              {...register('interMarks', { 
                min: {
                  value: 0,
                  message: 'Marks cannot be negative'
                },
                max: {
                  value: 1100,
                  message: 'Marks cannot exceed 1100'
                }
              })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.interMarks && <p className="mt-1 text-sm text-red-600">{errors.interMarks.message}</p>}
          </div>
          
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </div>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}