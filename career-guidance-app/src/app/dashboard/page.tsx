'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { educationalBackgrounds, degrees } from '@/data/educationData';

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);
  const router = useRouter();
  const { user, getUserData } = useAuth();

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    const fetchUserData = async () => {
      try {
        const data = await getUserData();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user, getUserData, router]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <p className="text-gray-500">Loading your dashboard...</p>
      </div>
    );
  }

  // Find educational background and degree names
  const educationalBackground = userData?.educationalBackground 
    ? educationalBackgrounds.find(bg => bg.id === userData.educationalBackground)?.name 
    : null;
    
  const selectedDegree = userData?.selectedDegree 
    ? degrees.find(d => d.id === userData.selectedDegree)?.name 
    : null;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Your Career Guidance Dashboard</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Username</p>
              <p className="font-medium">{userData?.username || user?.displayName}</p>
            </div>
            
            <div>
              <p className="text-gray-600">Email</p>
              <p className="font-medium">{userData?.email || user?.email}</p>
            </div>
            
            <div>
              <p className="text-gray-600">City</p>
              <p className="font-medium">{userData?.city || 'Not specified'}</p>
            </div>
            
            <div>
              <p className="text-gray-600">Matric Marks</p>
              <p className="font-medium">{userData?.matricMarks || 'Not specified'}</p>
            </div>
            
            {userData?.interMarks && (
              <div>
                <p className="text-gray-600">FSc/Inter Marks</p>
                <p className="font-medium">{userData.interMarks}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Your Career Path</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-medium">Educational Background</h3>
              {educationalBackground ? (
                <p className="text-gray-700">{educationalBackground}</p>
              ) : (
                <div className="mt-2">
                  <p className="text-gray-500 mb-2">You haven't selected your educational background yet.</p>
                  <Link href="/educational-background" className="text-blue-600 hover:text-blue-800">
                    Select Educational Background
                  </Link>
                </div>
              )}
            </div>
            
            {educationalBackground && (
              <div>
                <h3 className="font-medium">Selected Degree Program</h3>
                {selectedDegree ? (
                  <p className="text-gray-700">{selectedDegree}</p>
                ) : (
                  <div className="mt-2">
                    <p className="text-gray-500 mb-2">You haven't selected a degree program yet.</p>
                    <Link href="/degree-selection" className="text-blue-600 hover:text-blue-800">
                      Select Degree Program
                    </Link>
                  </div>
                )}
              </div>
            )}
            
            {selectedDegree && (
              <div>
                <h3 className="font-medium">Aptitude Test</h3>
                {userData?.testResults ? (
                  <div className="mt-2">
                    <div className="flex items-center">
                      <span className="text-gray-700 mr-2">Result:</span>
                      <span className={`px-2 py-0.5 rounded-full text-white text-sm ${
                        userData.testResults.result.aptitude === 'high' 
                          ? 'bg-green-500' 
                          : userData.testResults.result.aptitude === 'medium' 
                            ? 'bg-yellow-500' 
                            : 'bg-red-500'
                      }`}>
                        {userData.testResults.result.aptitude.charAt(0).toUpperCase() + userData.testResults.result.aptitude.slice(1)} Aptitude
                      </span>
                    </div>
                    <Link href={`/test-results/${userData.selectedDegree}`} className="text-blue-600 hover:text-blue-800 block mt-2">
                      View Detailed Results
                    </Link>
                  </div>
                ) : (
                  <div className="mt-2">
                    <p className="text-gray-500 mb-2">You haven't taken the aptitude test for this degree yet.</p>
                    <Link href={`/aptitude-test/${userData.selectedDegree}`} className="text-blue-600 hover:text-blue-800">
                      Take Aptitude Test
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Next Steps</h2>
          
          <div className="space-y-4">
            {!educationalBackground && (
              <div className="flex items-center">
                <div className="bg-blue-100 text-blue-800 p-2 rounded-full mr-3">1</div>
                <Link href="/educational-background" className="text-blue-600 hover:text-blue-800">
                  Select your educational background
                </Link>
              </div>
            )}
            
            {educationalBackground && !selectedDegree && (
              <div className="flex items-center">
                <div className="bg-blue-100 text-blue-800 p-2 rounded-full mr-3">2</div>
                <Link href="/degree-selection" className="text-blue-600 hover:text-blue-800">
                  Choose a degree program
                </Link>
              </div>
            )}
            
            {selectedDegree && !userData?.testResults && (
              <div className="flex items-center">
                <div className="bg-blue-100 text-blue-800 p-2 rounded-full mr-3">3</div>
                <Link href={`/aptitude-test/${userData.selectedDegree}`} className="text-blue-600 hover:text-blue-800">
                  Take the aptitude test
                </Link>
              </div>
            )}
            
            {userData?.testResults && (
              <div className="flex items-center">
                <div className="bg-blue-100 text-blue-800 p-2 rounded-full mr-3">4</div>
                <Link href={`/test-results/${userData.selectedDegree}`} className="text-blue-600 hover:text-blue-800">
                  Review your results and recommendations
                </Link>
              </div>
            )}
            
            {userData?.testResults?.result?.aptitude === 'low' && (
              <div className="flex items-center">
                <div className="bg-blue-100 text-blue-800 p-2 rounded-full mr-3">5</div>
                <Link href="/degree-selection" className="text-blue-600 hover:text-blue-800">
                  Explore alternative degree programs
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}