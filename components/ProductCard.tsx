
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onSelectProduct }) => {
  return (
    <div 
      onClick={() => onSelectProduct(product)}
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer group flex flex-col"
    >
      <div className="overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-800 truncate">{product.name}</h3>
        <p className="text-gray-500 text-sm mt-1 flex-grow">{product.category}</p>
        <p className="text-xl font-semibold text-pink-600 mt-4">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductCard;
