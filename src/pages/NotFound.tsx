import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-background text-white p-6">
    <div className="max-w-xl text-center">
      <h1 className="text-4xl font-bold mb-4">404 — Page not found</h1>
      <p className="mb-6 text-white/80">The page you are looking for does not exist.</p>
      <Link to="/" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md">
        Go back home
      </Link>
    </div>
  </div>
);

export default NotFound;
