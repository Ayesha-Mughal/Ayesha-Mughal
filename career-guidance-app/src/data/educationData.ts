export interface EducationalBackground {
  id: string;
  name: string;
  description: string;
}

export interface Degree {
  id: string;
  name: string;
  description: string;
  suitableFor: string[]; // Array of educational background IDs
}

export interface University {
  id: string;
  name: string;
  city: string;
  programs: {
    degreeId: string;
    programName: string;
    duration: string;
    admissionCriteria?: string;
  }[];
}

export interface TestQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer?: number; // Index of the correct answer (for aptitude tests)
}

export interface Test {
  id: string;
  name: string;
  description: string;
  forDegree: string; // Degree ID
  questions: TestQuestion[];
}

// Educational backgrounds in Pakistan
export const educationalBackgrounds: EducationalBackground[] = [
  {
    id: 'fsc-pre-engineering',
    name: 'FSc Pre-Engineering',
    description: 'Faculty of Science with focus on Physics, Chemistry, and Mathematics'
  },
  {
    id: 'fsc-pre-medical',
    name: 'FSc Pre-Medical',
    description: 'Faculty of Science with focus on Biology, Chemistry, and Physics'
  },
  {
    id: 'ics',
    name: 'ICS (Intermediate in Computer Science)',
    description: 'Intermediate level program focusing on Computer Science, Mathematics, and Physics/Statistics'
  },
  {
    id: 'icom',
    name: 'ICom (Intermediate in Commerce)',
    description: 'Intermediate level program focusing on Commerce, Accounting, and Economics'
  },
  {
    id: 'fa',
    name: 'FA (Faculty of Arts)',
    description: 'Intermediate level program focusing on Arts, Languages, and Humanities'
  },
  {
    id: 'a-levels',
    name: 'A-Levels',
    description: 'Cambridge Advanced Level qualifications with various subject combinations'
  }
];

// Degree options
export const degrees: Degree[] = [
  {
    id: 'bscs',
    name: 'BS Computer Science',
    description: 'Bachelor of Science in Computer Science focuses on programming, algorithms, data structures, and software development.',
    suitableFor: ['fsc-pre-engineering', 'ics', 'a-levels']
  },
  {
    id: 'bsse',
    name: 'BS Software Engineering',
    description: 'Bachelor of Science in Software Engineering focuses on software development methodologies, project management, and quality assurance.',
    suitableFor: ['fsc-pre-engineering', 'ics', 'a-levels']
  },
  {
    id: 'bsit',
    name: 'BS Information Technology',
    description: 'Bachelor of Science in Information Technology focuses on IT infrastructure, networking, and system administration.',
    suitableFor: ['fsc-pre-engineering', 'ics', 'a-levels']
  },
  {
    id: 'bba',
    name: 'BBA (Bachelor of Business Administration)',
    description: 'Focuses on business management, marketing, finance, and entrepreneurship.',
    suitableFor: ['icom', 'fa', 'a-levels']
  },
  {
    id: 'mbbs',
    name: 'MBBS (Bachelor of Medicine and Bachelor of Surgery)',
    description: 'Medical degree program focusing on medicine, surgery, and healthcare.',
    suitableFor: ['fsc-pre-medical', 'a-levels']
  },
  {
    id: 'bseng',
    name: 'BS Engineering (Various Fields)',
    description: 'Engineering programs in various disciplines like Electrical, Mechanical, Civil, etc.',
    suitableFor: ['fsc-pre-engineering', 'a-levels']
  }
];

// Sample test for Computer Science aptitude
export const tests: Test[] = [
  {
    id: 'cs-aptitude',
    name: 'Computer Science Aptitude Test',
    description: 'This test evaluates your aptitude for Computer Science and related fields.',
    forDegree: 'bscs',
    questions: [
      {
        id: 'cs1',
        question: 'Which of the following is not a programming language?',
        options: ['Java', 'Python', 'HTML', 'C++'],
        correctAnswer: 2 // HTML is not a programming language
      },
      {
        id: 'cs2',
        question: 'What does CPU stand for?',
        options: ['Central Processing Unit', 'Computer Personal Unit', 'Central Program Utility', 'Central Processor Utility'],
        correctAnswer: 0
      },
      {
        id: 'cs3',
        question: 'Which data structure operates on a Last-In-First-Out (LIFO) principle?',
        options: ['Queue', 'Stack', 'Linked List', 'Array'],
        correctAnswer: 1
      },
      {
        id: 'cs4',
        question: 'Which of the following best describes your approach to solving complex problems?',
        options: [
          'I break down the problem into smaller parts and solve them one by one',
          'I look for patterns and similarities to problems I\'ve solved before',
          'I prefer to collaborate with others to find solutions',
          'I try different approaches until something works'
        ]
      },
      {
        id: 'cs5',
        question: 'How comfortable are you with mathematical concepts?',
        options: [
          'Very comfortable - I enjoy working with math',
          'Somewhat comfortable - I can work with basic concepts',
          'Not very comfortable - I struggle with mathematical thinking',
          'I avoid math whenever possible'
        ]
      },
      {
        id: 'cs6',
        question: 'How do you feel about spending long hours working on a computer?',
        options: [
          'I enjoy it and lose track of time when coding/working on computers',
          'I can do it when necessary but need regular breaks',
          'I prefer to limit my screen time',
          'I find it difficult to focus on computer work for extended periods'
        ]
      },
      {
        id: 'cs7',
        question: 'When learning something new, which approach do you prefer?',
        options: [
          'Reading documentation and following tutorials step by step',
          'Watching video demonstrations',
          'Hands-on experimentation and learning by doing',
          'Learning from a mentor or teacher'
        ]
      },
      {
        id: 'cs8',
        question: 'How would you rate your logical reasoning skills?',
        options: [
          'Excellent - I excel at logical puzzles and reasoning tasks',
          'Good - I can usually work through logical problems',
          'Average - Sometimes I struggle with complex logical reasoning',
          'Below average - Logical reasoning is not my strength'
        ]
      },
      {
        id: 'cs9',
        question: 'How do you handle frustration when technology doesn\'t work as expected?',
        options: [
          'I persist until I solve the problem, seeing it as a challenge',
          'I take a break and return to it later with fresh perspective',
          'I seek help from others or online resources',
          'I get very frustrated and may give up'
        ]
      },
      {
        id: 'cs10',
        question: 'Which aspect of computer science interests you most?',
        options: [
          'Software development and programming',
          'Artificial intelligence and machine learning',
          'Cybersecurity',
          'Data analysis and database management'
        ]
      }
    ]
  },
  {
    id: 'se-aptitude',
    name: 'Software Engineering Aptitude Test',
    description: 'This test evaluates your aptitude for Software Engineering.',
    forDegree: 'bsse',
    questions: [
      {
        id: 'se1',
        question: 'Which of the following is NOT a software development methodology?',
        options: ['Agile', 'Waterfall', 'Scrum', 'Python'],
        correctAnswer: 3
      },
      {
        id: 'se2',
        question: 'What does SDLC stand for?',
        options: ['Software Development Life Cycle', 'System Design Life Cycle', 'Software Design Language Compiler', 'System Development Logic Controller'],
        correctAnswer: 0
      },
      // More questions similar to CS aptitude test...
      {
        id: 'se3',
        question: 'How important do you think teamwork is in software development?',
        options: [
          'Very important - software is built by teams',
          'Somewhat important - but individual skills matter more',
          'Not very important - I prefer to work independently',
          'I have no opinion on this'
        ]
      },
      {
        id: 'se4',
        question: 'How do you feel about meeting deadlines and working under pressure?',
        options: [
          'I thrive under pressure and always meet deadlines',
          'I can handle reasonable deadlines with proper planning',
          'I sometimes struggle with tight deadlines',
          'I prefer to work at my own pace without deadlines'
        ]
      },
      {
        id: 'se5',
        question: 'How would you rate your attention to detail?',
        options: [
          'Excellent - I notice even small inconsistencies',
          'Good - I pay attention to important details',
          'Average - I sometimes miss details',
          'Below average - I focus on the big picture rather than details'
        ]
      }
    ]
  }
];

// Sample universities with programs
export const universities: University[] = [
  {
    id: 'gift-uni',
    name: 'GIFT University',
    city: 'Gujranwala',
    programs: [
      {
        degreeId: 'bscs',
        programName: 'BS Computer Science',
        duration: '4 years',
        admissionCriteria: 'Minimum 60% marks in FSc/ICS or equivalent'
      },
      {
        degreeId: 'bsse',
        programName: 'BS Software Engineering',
        duration: '4 years',
        admissionCriteria: 'Minimum 60% marks in FSc/ICS or equivalent'
      },
      {
        degreeId: 'bba',
        programName: 'BBA',
        duration: '4 years',
        admissionCriteria: 'Minimum 50% marks in Intermediate or equivalent'
      }
    ]
  },
  {
    id: 'uog',
    name: 'University of Gujrat',
    city: 'Gujrat',
    programs: [
      {
        degreeId: 'bscs',
        programName: 'BS Computer Science',
        duration: '4 years',
        admissionCriteria: 'Minimum 60% marks in FSc/ICS or equivalent'
      },
      {
        degreeId: 'bseng',
        programName: 'BS Electrical Engineering',
        duration: '4 years',
        admissionCriteria: 'Minimum 60% marks in FSc Pre-Engineering or equivalent'
      }
    ]
  },
  {
    id: 'ucp',
    name: 'University of Central Punjab',
    city: 'Lahore',
    programs: [
      {
        degreeId: 'bscs',
        programName: 'BS Computer Science',
        duration: '4 years',
        admissionCriteria: 'Minimum 60% marks in FSc/ICS or equivalent'
      },
      {
        degreeId: 'bsse',
        programName: 'BS Software Engineering',
        duration: '4 years',
        admissionCriteria: 'Minimum 60% marks in FSc/ICS or equivalent'
      }
    ]
  }
];