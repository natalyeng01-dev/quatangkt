
import React, { useEffect } from 'react';
import { Product } from '../types';
import CloseIcon from './icons/CloseIcon';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col md:flex-row overflow-hidden relative animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors z-10 p-1 bg-white/50 rounded-full"
          aria-label="Close"
        >
          <CloseIcon className="h-6 w-6" />
        </button>
        <div className="md:w-1/2">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-64 md:h-full object-cover" 
          />
        </div>
        <div className="md:w-1/2 p-8 flex flex-col overflow-y-auto">
          <div>
            <span className="text-sm font-semibold text-pink-600 bg-pink-100 px-3 py-1 rounded-full">{product.category}</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-4">{product.name}</h2>
            <p className="text-3xl font-light text-gray-800 mt-4 mb-4">${product.price.toFixed(2)}</p>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </div>
          <div className="mt-auto pt-6">
            <button className="w-full bg-pink-500 text-white font-bold py-3 px-6 rounded-full hover:bg-pink-600 transition-transform transform hover:scale-105">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
       <style>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ProductModal;
