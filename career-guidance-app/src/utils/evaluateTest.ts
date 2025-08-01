import { Test, TestQuestion, degrees } from '@/data/educationData';

interface TestResult {
  answers: number[];
  test: Test;
}

interface EvaluationResult {
  score: number;
  maxScore: number;
  percentage: number;
  aptitude: 'high' | 'medium' | 'low';
  strengths: string[];
  weaknesses: string[];
  recommendation: string;
  alternativeDegrees?: string[];
}

// This is a simplified evaluation function that would ideally use a more sophisticated AI model
export function evaluateTest(result: TestResult): EvaluationResult {
  const { answers, test } = result;
  
  // Calculate score for knowledge-based questions (with correctAnswer property)
  let correctAnswers = 0;
  let totalKnowledgeQuestions = 0;
  
  // Track aptitude indicators
  const aptitudeScores = {
    problemSolving: 0,
    mathematical: 0,
    logical: 0,
    persistence: 0,
    teamwork: 0,
    attention: 0
  };
  
  // Process each question and answer
  test.questions.forEach((question, index) => {
    const answer = answers[index];
    
    // For knowledge-based questions with correct answers
    if (question.correctAnswer !== undefined) {
      totalKnowledgeQuestions++;
      if (answer === question.correctAnswer) {
        correctAnswers++;
      }
    } 
    // For aptitude/preference questions
    else {
      // Evaluate based on question ID or content
      // This is a simplified version - a real AI would do more sophisticated analysis
      if (question.id === 'cs4' || question.id === 'se4') { // Problem-solving approach
        aptitudeScores.problemSolving = answer === 0 ? 2 : answer === 1 ? 1 : 0;
      }
      else if (question.id === 'cs5') { // Mathematical comfort
        aptitudeScores.mathematical = answer === 0 ? 2 : answer === 1 ? 1 : 0;
      }
      else if (question.id === 'cs8') { // Logical reasoning
        aptitudeScores.logical = answer === 0 ? 2 : answer === 1 ? 1 : 0;
      }
      else if (question.id === 'cs9') { // Persistence
        aptitudeScores.persistence = answer === 0 ? 2 : answer === 1 ? 1 : 0;
      }
      else if (question.id === 'se3') { // Teamwork
        aptitudeScores.teamwork = answer === 0 ? 2 : answer === 1 ? 1 : 0;
      }
      else if (question.id === 'se5') { // Attention to detail
        aptitudeScores.attention = answer === 0 ? 2 : answer === 1 ? 1 : 0;
      }
    }
  });
  
  // Calculate knowledge score
  const knowledgeScore = totalKnowledgeQuestions > 0 
    ? (correctAnswers / totalKnowledgeQuestions) * 100 
    : 0;
  
  // Calculate aptitude score (simplified)
  const aptitudeTotal = Object.values(aptitudeScores).reduce((sum, score) => sum + score, 0);
  const aptitudeMax = Object.keys(aptitudeScores).length * 2; // Maximum possible score
  const aptitudePercentage = (aptitudeTotal / aptitudeMax) * 100;
  
  // Combined score (weighted)
  const combinedScore = totalKnowledgeQuestions > 0 
    ? (knowledgeScore * 0.6) + (aptitudePercentage * 0.4)
    : aptitudePercentage;
  
  // Determine aptitude level
  let aptitude: 'high' | 'medium' | 'low';
  if (combinedScore >= 70) {
    aptitude = 'high';
  } else if (combinedScore >= 50) {
    aptitude = 'medium';
  } else {
    aptitude = 'low';
  }
  
  // Identify strengths and weaknesses
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  
  if (aptitudeScores.problemSolving >= 1) strengths.push('Problem-solving approach');
  else weaknesses.push('Problem-solving approach');
  
  if (aptitudeScores.mathematical >= 1) strengths.push('Mathematical aptitude');
  else weaknesses.push('Mathematical aptitude');
  
  if (aptitudeScores.logical >= 1) strengths.push('Logical reasoning');
  else weaknesses.push('Logical reasoning');
  
  if (aptitudeScores.persistence >= 1) strengths.push('Persistence and determination');
  else weaknesses.push('Persistence when facing challenges');
  
  if (aptitudeScores.teamwork >= 1) strengths.push('Teamwork and collaboration');
  else weaknesses.push('Teamwork and collaboration');
  
  if (aptitudeScores.attention >= 1) strengths.push('Attention to detail');
  else weaknesses.push('Attention to detail');
  
  // Generate recommendation based on aptitude
  let recommendation = '';
  let alternativeDegrees: string[] = [];
  
  if (aptitude === 'high') {
    recommendation = `Based on your test results, you show a strong aptitude for ${test.name.replace(' Aptitude Test', '')}. You should consider pursuing this field as it aligns well with your strengths.`;
  } else if (aptitude === 'medium') {
    recommendation = `You show moderate aptitude for ${test.name.replace(' Aptitude Test', '')}. You can succeed in this field with dedicated effort and focus on improving your weaker areas.`;
    
    // Suggest related fields
    if (test.forDegree === 'bscs') {
      alternativeDegrees = ['bsit', 'bsse'];
    } else if (test.forDegree === 'bsse') {
      alternativeDegrees = ['bsit', 'bscs'];
    }
  } else {
    recommendation = `Your test results suggest that ${test.name.replace(' Aptitude Test', '')} may not be the best fit for your natural aptitudes. Consider exploring alternative fields that better match your strengths.`;
    
    // Suggest alternative fields based on weaknesses
    if (weaknesses.includes('Logical reasoning') || weaknesses.includes('Mathematical aptitude')) {
      alternativeDegrees = ['bba']; // Business might be better for those with lower math/logic scores
    } else {
      alternativeDegrees = ['bsit']; // IT might be less math-intensive than CS
    }
  }
  
  return {
    score: combinedScore,
    maxScore: 100,
    percentage: combinedScore,
    aptitude,
    strengths,
    weaknesses,
    recommendation,
    alternativeDegrees: alternativeDegrees.map(id => {
      const degree = degrees.find(d => d.id === id);
      return degree ? degree.name : id;
    })
  };
}