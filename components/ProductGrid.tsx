
import React from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onSelectProduct }) => {
  if (products.length === 0) {
    return (
        <div className="text-center py-10">
            <p className="text-lg text-gray-500">No products found. Try a different search!</p>
        </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {products.map(product => (
        <ProductCard key={product.id} product={product} onSelectProduct={onSelectProduct} />
      ))}
    </div>
  );
};

export default ProductGrid;
