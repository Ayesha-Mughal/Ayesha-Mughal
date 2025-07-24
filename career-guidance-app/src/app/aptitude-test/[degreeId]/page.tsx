'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { doc, updateDoc } from 'firebase/firestore';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { tests, degrees } from '@/data/educationData';
import { evaluateTest } from '@/utils/evaluateTest';

export default function AptitudeTestPage({ params }: { params: { degreeId: string } }) {
  const { degreeId } = params;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [test, setTest] = useState<any>(null);
  const [degree, setDegree] = useState<any>(null);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    // Find the test for this degree
    const foundTest = tests.find(t => t.forDegree === degreeId);
    const foundDegree = degrees.find(d => d.id === degreeId);
    
    if (!foundTest || !foundDegree) {
      setError('Test not found for this degree program');
      return;
    }
    
    setTest(foundTest);
    setDegree(foundDegree);
    
    // Initialize answers array with -1 (unanswered)
    setAnswers(new Array(foundTest.questions.length).fill(-1));
  }, [degreeId, user, router]);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < test.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    // Check if all questions are answered
    if (answers.includes(-1)) {
      setError('Please answer all questions before submitting');
      return;
    }

    if (!user) {
      router.push('/login');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // Evaluate test results
      const result = evaluateTest({ answers, test });
      
      // Store test results in Firestore
      await updateDoc(doc(db, 'users', user.uid), {
        testResults: {
          degreeId,
          testId: test.id,
          answers,
          result,
          completedAt: new Date().toISOString()
        }
      });
      
      // Redirect to results page
      router.push(`/test-results/${degreeId}`);
    } catch (error) {
      console.error('Error submitting test:', error);
      setError('Failed to submit your test. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!test || !degree) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        {error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        ) : (
          <p className="text-gray-500">Loading test...</p>
        )}
      </div>
    );
  }

  const question = test.questions[currentQuestion];

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-2">{test.name}</h1>
      <p className="text-center text-gray-600 mb-8">{test.description}</p>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-gray-500">
            Question {currentQuestion + 1} of {test.questions.length}
          </span>
          <span className="text-sm font-medium text-gray-500">
            {Math.round((answers.filter(a => a !== -1).length / test.questions.length) * 100)}% Complete
          </span>
        </div>
        
        <div className="mb-6">
          <h2 className="text-xl font-medium mb-4">{question.question}</h2>
          
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <div 
                key={index}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  answers[currentQuestion] === index 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
                }`}
                onClick={() => handleAnswerSelect(index)}
              >
                <div className="flex items-center">
                  <input
                    type="radio"
                    id={`option-${index}`}
                    name={`question-${currentQuestion}`}
                    value={index}
                    checked={answers[currentQuestion] === index}
                    onChange={() => handleAnswerSelect(index)}
                    className="mr-3"
                  />
                  <label htmlFor={`option-${index}`} className="cursor-pointer">
                    {option}
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            Previous
          </button>
          
          {currentQuestion < test.questions.length - 1 ? (
            <button
              onClick={handleNext}
              disabled={answers[currentQuestion] === -1}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading || answers.includes(-1)}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit Test'}
            </button>
          )}
        </div>
      </div>
      
      <div className="flex justify-center">
        <div className="flex space-x-2">
          {test.questions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuestion(index)}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                answers[index] !== -1
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-600'
              } ${currentQuestion === index ? 'ring-2 ring-blue-400' : ''}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}