
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-gray-500">&copy; {new Date().getFullYear()} Gemini Gifts. All rights reserved.</p>
        <p className="text-sm text-gray-400 mt-1">Discover the perfect gift, powered by AI.</p>
      </div>
    </footer>
  );
};

export default Footer;
