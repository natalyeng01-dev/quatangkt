
import React, { useState } from 'react';
import { Product } from '../types';
import { findGifts } from '../services/geminiService';
import SparklesIcon from './icons/SparklesIcon';

interface GiftFinderProps {
  allProducts: Product[];
  onRecommendations: (products: Product[]) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  onClear: () => void;
}

const GiftFinder: React.FC<GiftFinderProps> = ({ allProducts, onRecommendations, setIsLoading, setError, onClear }) => {
  const [userInput, setUserInput] = useState<string>('');
  const [hasSearched, setHasSearched] = useState(false);

  const handleFindGifts = async () => {
    if (!userInput.trim()) {
      setError('Please describe who you are shopping for.');
      return;
    }
    setIsLoading(true);
    setError(null);
    onRecommendations([]);
    setHasSearched(true);
    
    try {
      const recommendedIds = await findGifts(userInput, allProducts);
      const recommendedProducts = allProducts.filter(p => recommendedIds.includes(p.id));
      onRecommendations(recommendedProducts);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleClear = () => {
    setUserInput('');
    setHasSearched(false);
    onClear();
  }

  return (
    <section className="bg-gradient-to-r from-pink-50 to-rose-100 p-8 rounded-2xl shadow-lg text-center">
      <SparklesIcon className="h-12 w-12 text-pink-500 mx-auto mb-4" />
      <h2 className="text-4xl font-bold text-gray-800 mb-2">Find the Perfect Gift</h2>
      <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
        Describe the person you're shopping for, and our AI will suggest the best gifts from our collection.
      </p>
      <div className="max-w-xl mx-auto flex flex-col sm:flex-row gap-4 items-center">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="e.g., 'a gift for my mom who loves gardening'"
          className="w-full px-5 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-colors flex-grow"
        />
        <div className="flex space-x-2">
           <button
             onClick={handleFindGifts}
             className="bg-pink-500 text-white font-bold py-3 px-6 rounded-full hover:bg-pink-600 transition-transform transform hover:scale-105 flex items-center space-x-2 whitespace-nowrap"
           >
             <SparklesIcon className="h-5 w-5" />
             <span>Find Gift</span>
           </button>
           {hasSearched && (
             <button
                onClick={handleClear}
                className="bg-gray-300 text-gray-700 font-bold py-3 px-6 rounded-full hover:bg-gray-400 transition-colors whitespace-nowrap"
             >
                Clear
             </button>
           )}
        </div>
      </div>
    </section>
  );
};

export default GiftFinder;
