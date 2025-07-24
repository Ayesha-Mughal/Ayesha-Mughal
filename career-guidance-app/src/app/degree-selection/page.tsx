'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { doc, updateDoc } from 'firebase/firestore';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { degrees } from '@/data/educationData';

export default function DegreeSelectionPage() {
  const [selectedDegree, setSelectedDegree] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [filteredDegrees, setFilteredDegrees] = useState(degrees);
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
      
      // If user already has a selected degree, pre-select it
      if (data?.selectedDegree) {
        setSelectedDegree(data.selectedDegree);
      }
      
      // Filter degrees based on educational background
      if (data?.educationalBackground) {
        const filtered = degrees.filter(degree => 
          degree.suitableFor.includes(data.educationalBackground)
        );
        setFilteredDegrees(filtered);
      }
    };

    fetchUserData();
  }, [user, getUserData, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDegree) {
      setError('Please select a degree program');
      return;
    }

    if (!user) {
      router.push('/login');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // Update user document with selected degree
      await updateDoc(doc(db, 'users', user.uid), {
        selectedDegree: selectedDegree
      });
      
      // Redirect to aptitude test page
      router.push(`/aptitude-test/${selectedDegree}`);
    } catch (error) {
      console.error('Error updating selected degree:', error);
      setError('Failed to update your degree selection. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Select Your Preferred Degree Program</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {userData?.educationalBackground ? (
        <>
          <p className="text-center mb-6 text-gray-600">
            Based on your {userData.educationalBackground.replace('-', ' ')} background, 
            here are some suitable degree programs:
          </p>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {filteredDegrees.map((degree) => (
                <div 
                  key={degree.id}
                  className={`border rounded-lg p-6 cursor-pointer transition-all ${
                    selectedDegree === degree.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
                  }`}
                  onClick={() => setSelectedDegree(degree.id)}
                >
                  <div className="flex items-start">
                    <input
                      type="radio"
                      id={degree.id}
                      name="degreeProgram"
                      value={degree.id}
                      checked={selectedDegree === degree.id}
                      onChange={() => setSelectedDegree(degree.id)}
                      className="mt-1"
                    />
                    <label htmlFor={degree.id} className="ml-3 cursor-pointer">
                      <div className="font-medium text-lg">{degree.name}</div>
                      <p className="text-gray-600 mt-1">{degree.description}</p>
                    </label>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredDegrees.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No suitable degree programs found for your educational background.
                Please go back and select a different educational background.
              </div>
            )}
            
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading || !selectedDegree || filteredDegrees.length === 0}
                className="px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Continue to Aptitude Test'}
              </button>
            </div>
          </form>
        </>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">
            Please select your educational background first.
          </p>
          <button
            onClick={() => router.push('/educational-background')}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700"
          >
            Select Educational Background
          </button>
        </div>
      )}
    </div>
  );
}