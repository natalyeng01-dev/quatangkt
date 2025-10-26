
import React from 'react';
import SearchIcon from './icons/SearchIcon';
import GiftIcon from './icons/GiftIcon';

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const Header: React.FC<HeaderProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-3">
            <GiftIcon className="h-8 w-8 text-pink-500" />
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
              Gemini Gifts
            </h1>
          </div>
          <div className="relative w-full max-w-xs">
            <input
              type="text"
              placeholder="Search for gifts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-colors"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
