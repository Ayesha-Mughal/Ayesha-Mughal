# Career Guidance App for Pakistani Students

A Next.js and Firebase application designed to help Pakistani students choose the right career path after completing their FSc, ICS, ICom, FA, or A-Levels education.

## Features

- **User Authentication**: Sign up and login with Firebase Authentication
- **Educational Background Selection**: Students can select their completed educational background
- **Degree Program Recommendations**: Based on educational background, students can explore suitable degree options
- **Aptitude Testing**: Field-specific aptitude tests to evaluate student's suitability for selected degrees
- **AI-Powered Evaluation**: Test results are analyzed to provide personalized recommendations
- **University Program Matching**: Shows relevant university programs in the student's city based on aptitude results
- **Alternative Career Suggestions**: Provides alternative career paths if aptitude results suggest a mismatch

## Tech Stack

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS
- **Backend**: Firebase (Authentication, Firestore)
- **State Management**: React Context API
- **Form Handling**: React Hook Form

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn
- Firebase account

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/career-guidance-app.git
cd career-guidance-app
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory with your Firebase configuration:
```
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

4. Start the development server
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application

## Project Structure

- `/src/app`: Next.js app router pages
- `/src/components`: Reusable UI components
- `/src/contexts`: React context providers (Auth)
- `/src/data`: Static data for educational backgrounds, degrees, tests, etc.
- `/src/lib`: Firebase configuration
- `/src/utils`: Utility functions

## Extending the Application

The application is designed to be modular and extensible:

- Add more educational backgrounds in `/src/data/educationData.ts`
- Create new aptitude tests for different degree programs
- Add more universities and their programs
- Enhance the AI evaluation logic in `/src/utils/evaluateTest.ts`

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Developed for Pakistani students to make informed career decisions
- Inspired by the need for better career guidance in the Pakistani education system
