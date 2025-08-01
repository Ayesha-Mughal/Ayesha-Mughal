'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { doc, updateDoc } from 'firebase/firestore';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { educationalBackgrounds } from '@/data/educationData';

export default function EducationalBackgroundPage() {
  const [selectedBackground, setSelectedBackground] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const router = useRouter();
  const { user, getUserData } = useAuth();

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    const fetchUserData = async () => {
      const data = await getUserData();
      setUserData(data);
      
      // If user already has an educational background, pre-select it
      if (data?.educationalBackground) {
        setSelectedBackground(data.educationalBackground);
      }
    };

    fetchUserData();
  }, [user, getUserData, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedBackground) {
      setError('Please select your educational background');
      return;
    }

    if (!user) {
      router.push('/login');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // Update user document with selected educational background
      await updateDoc(doc(db, 'users', user.uid), {
        educationalBackground: selectedBackground
      });
      
      // Redirect to degree selection page
      router.push('/degree-selection');
    } catch (error) {
      console.error('Error updating educational background:', error);
      setError('Failed to update your educational background. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Select Your Educational Background</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {educationalBackgrounds.map((background) => (
            <div 
              key={background.id}
              className={`border rounded-lg p-6 cursor-pointer transition-all ${
                selectedBackground === background.id 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
              }`}
              onClick={() => setSelectedBackground(background.id)}
            >
              <div className="flex items-start">
                <input
                  type="radio"
                  id={background.id}
                  name="educationalBackground"
                  value={background.id}
                  checked={selectedBackground === background.id}
                  onChange={() => setSelectedBackground(background.id)}
                  className="mt-1"
                />
                <label htmlFor={background.id} className="ml-3 cursor-pointer">
                  <div className="font-medium text-lg">{background.name}</div>
                  <p className="text-gray-600 mt-1">{background.description}</p>
                </label>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading || !selectedBackground}
            className="px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Continue'}
          </button>
        </div>
      </form>
    </div>
  );
}