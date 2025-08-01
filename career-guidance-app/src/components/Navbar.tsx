import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="font-bold text-xl">Career Guidance</span>
            </Link>
          </div>
          <div className="flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link href="/dashboard" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                >
                  Logout
                </button>
                <div className="text-sm font-medium">
                  {user.displayName || user.email}
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/login" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                  Login
                </Link>
                <Link href="/signup" className="px-3 py-2 rounded-md text-sm font-medium bg-white text-blue-600 hover:bg-gray-100">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}