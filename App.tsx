
import React, { useState, useEffect, useMemo } from 'react';
import { Product } from './types';
import { PRODUCTS } from './constants';
import Header from './components/Header';
import GiftFinder from './components/GiftFinder';
import ProductGrid from './components/ProductGrid';
import ProductModal from './components/ProductModal';
import Footer from './components/Footer';

export default function App(): React.ReactElement {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [aiRecommendedProducts, setAiRecommendedProducts] = useState<Product[]>([]);
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);
  
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleRecommendations = (products: Product[]) => {
    setAiRecommendedProducts(products);
  };
  
  const handleClearRecommendations = () => {
    setAiRecommendedProducts([]);
    setAiError(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-gray-800">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <GiftFinder
          allProducts={PRODUCTS}
          onRecommendations={handleRecommendations}
          setIsLoading={setIsAiLoading}
          setError={setAiError}
          onClear={handleClearRecommendations}
        />

        {isAiLoading ? (
          <div className="text-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
            <p className="mt-4 text-lg text-gray-600">Finding the perfect gift...</p>
          </div>
        ) : aiError ? (
          <div className="text-center py-10 bg-red-50 border border-red-200 rounded-lg">
            <h3 className="text-xl font-bold text-red-700">Oops!</h3>
            <p className="mt-2 text-red-600">{aiError}</p>
          </div>
        ) : aiRecommendedProducts.length > 0 ? (
          <section className="mt-12">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Our AI Recommendations For You</h2>
            <ProductGrid products={aiRecommendedProducts} onSelectProduct={handleSelectProduct} />
          </section>
        ) : (
          <section className="mt-12">
             <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Discover Our Collection</h2>
            <ProductGrid products={filteredProducts} onSelectProduct={handleSelectProduct} />
          </section>
        )}
      </main>
      
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={handleCloseModal} />
      )}
      <Footer />
    </div>
  );
}
