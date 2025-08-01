'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { degrees, universities } from '@/data/educationData';

export default function TestResultsPage({ params }: { params: { degreeId: string } }) {
  const { degreeId } = params;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [degree, setDegree] = useState<any>(null);
  const [recommendedPrograms, setRecommendedPrograms] = useState<any[]>([]);
  const router = useRouter();
  const { user, getUserData } = useAuth();

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Get user data including test results
        const data = await getUserData();
        setUserData(data);
        
        // Find the degree
        const foundDegree = degrees.find(d => d.id === degreeId);
        if (!foundDegree) {
          setError('Degree program not found');
          return;
        }
        setDegree(foundDegree);
        
        // If test results exist and aptitude is medium or high, find university programs
        if (data?.testResults?.result?.aptitude && ['medium', 'high'].includes(data.testResults.result.aptitude)) {
          // Find programs in the user's city
          const cityPrograms = universities
            .filter(uni => uni.city.toLowerCase() === data.city.toLowerCase())
            .flatMap(uni => uni.programs.filter(prog => prog.degreeId === degreeId)
              .map(prog => ({ university: uni.name, ...prog }))
            );
          
          setRecommendedPrograms(cityPrograms);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load test results. Please try again.');
        setLoading(false);
      }
    };

    fetchData();
  }, [degreeId, user, getUserData, router]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <p className="text-gray-500">Loading your test results...</p>
      </div>
    );
  }

  if (error || !userData?.testResults) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error || 'Test results not found. Please take the test first.'}
        </div>
        <Link href={`/aptitude-test/${degreeId}`} className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-md">
          Take the Test
        </Link>
      </div>
    );
  }

  const { result } = userData.testResults;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-2">Your Test Results</h1>
      <p className="text-center text-gray-600 mb-8">
        Here's an analysis of your aptitude for {degree.name}
      </p>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Overall Aptitude</h2>
            <div className={`px-4 py-1 rounded-full text-white font-medium ${
              result.aptitude === 'high' 
                ? 'bg-green-500' 
                : result.aptitude === 'medium' 
                  ? 'bg-yellow-500' 
                  : 'bg-red-500'
            }`}>
              {result.aptitude.charAt(0).toUpperCase() + result.aptitude.slice(1)}
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Score</span>
              <span className="font-medium">{Math.round(result.score)} / {result.maxScore}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className={`h-2.5 rounded-full ${
                  result.aptitude === 'high' 
                    ? 'bg-green-500' 
                    : result.aptitude === 'medium' 
                      ? 'bg-yellow-500' 
                      : 'bg-red-500'
                }`}
                style={{ width: `${result.percentage}%` }}
              ></div>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="font-medium mb-2">Strengths</h3>
            {result.strengths.length > 0 ? (
              <ul className="list-disc pl-5 space-y-1">
                {result.strengths.map((strength: string, index: number) => (
                  <li key={index} className="text-gray-700">{strength}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No specific strengths identified.</p>
            )}
          </div>
          
          <div className="mb-6">
            <h3 className="font-medium mb-2">Areas for Improvement</h3>
            {result.weaknesses.length > 0 ? (
              <ul className="list-disc pl-5 space-y-1">
                {result.weaknesses.map((weakness: string, index: number) => (
                  <li key={index} className="text-gray-700">{weakness}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No specific areas for improvement identified.</p>
            )}
          </div>
          
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
            <h3 className="font-medium text-blue-800 mb-2">Recommendation</h3>
            <p className="text-gray-700">{result.recommendation}</p>
            
            {result.alternativeDegrees && result.alternativeDegrees.length > 0 && (
              <div className="mt-3">
                <p className="text-gray-700">Alternative degrees to consider:</p>
                <ul className="list-disc pl-5 mt-1">
                  {result.alternativeDegrees.map((altDegree: string, index: number) => (
                    <li key={index} className="text-gray-700">{altDegree}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {['medium', 'high'].includes(result.aptitude) && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Recommended Programs in {userData.city}</h2>
            
            {recommendedPrograms.length > 0 ? (
              <div className="space-y-4">
                {recommendedPrograms.map((program, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h3 className="font-medium text-lg">{program.university}</h3>
                    <p className="text-gray-700">{program.programName}</p>
                    <div className="mt-2 text-sm text-gray-600">
                      <p>Duration: {program.duration}</p>
                      {program.admissionCriteria && (
                        <p>Admission Criteria: {program.admissionCriteria}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">
                No programs found in your city for this degree. Consider exploring programs in nearby cities.
              </p>
            )}
          </div>
        </div>
      )}
      
      <div className="flex justify-center space-x-4">
        <Link href="/dashboard" className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">
          Back to Dashboard
        </Link>
        
        {result.aptitude === 'low' && result.alternativeDegrees && result.alternativeDegrees.length > 0 && (
          <Link href="/degree-selection" className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Explore Other Degrees
          </Link>
        )}
      </div>
    </div>
  );
}