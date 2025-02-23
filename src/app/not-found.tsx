import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">404 - Page Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400">Sorry, we couldn't find the page you're looking for.</p>
        <Link 
          href="/"
          className="inline-block px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
} 