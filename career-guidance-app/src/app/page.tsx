'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="py-12 md:py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Perfect Career Path</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Helping Pakistani students make informed decisions about their future after FSc, ICS, ICom, FA, or A-Levels.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6 mb-16">
          {user ? (
            <Link href="/dashboard" className="px-8 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 text-center">
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link href="/signup" className="px-8 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 text-center">
                Get Started
              </Link>
              <Link href="/login" className="px-8 py-3 border border-blue-600 text-blue-600 rounded-md font-medium hover:bg-blue-50 text-center">
                Log In
              </Link>
            </>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-blue-600 text-4xl font-bold mb-4">1</div>
            <h3 className="text-xl font-semibold mb-2">Create Your Profile</h3>
            <p className="text-gray-600">
              Sign up with your educational background and academic information to get personalized guidance.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-blue-600 text-4xl font-bold mb-4">2</div>
            <h3 className="text-xl font-semibold mb-2">Take Aptitude Tests</h3>
            <p className="text-gray-600">
              Complete field-specific aptitude tests to evaluate your strengths, weaknesses, and natural inclinations.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-blue-600 text-4xl font-bold mb-4">3</div>
            <h3 className="text-xl font-semibold mb-2">Get Personalized Recommendations</h3>
            <p className="text-gray-600">
              Receive AI-powered recommendations for degree programs and universities based on your profile and test results.
            </p>
          </div>
        </div>
        
        <div className="bg-blue-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">Why Choose Our Career Guidance Platform?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex">
              <div className="mr-4 text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium mb-1">Personalized Guidance</h3>
                <p className="text-gray-600">Tailored recommendations based on your academic background and aptitude.</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="mr-4 text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium mb-1">AI-Powered Assessment</h3>
                <p className="text-gray-600">Advanced algorithms analyze your strengths and suggest the best career paths.</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="mr-4 text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium mb-1">Local University Information</h3>
                <p className="text-gray-600">Find programs at universities in your city that match your profile.</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="mr-4 text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium mb-1">Alternative Suggestions</h3>
                <p className="text-gray-600">Discover alternative career paths that might better match your natural aptitudes.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
