import React, { useState, useMemo } from 'react';
import { Search, MapPin, Tag } from 'lucide-react';
import { Product, Category } from '../types';
import { MOCK_USERS } from '../constants';

interface Props {
  products: Product[];
}

export const Home: React.FC<Props> = ({ products }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'ALL'>('ALL');

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            p.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'ALL' || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Hero / Search Section */}
      <div className="mb-8 text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">发现校园里的宝藏</h1>
        <p className="text-gray-500">安全、便捷、就在身边的二手交易平台</p>
        
        <div className="max-w-2xl mx-auto relative">
          <input
            type="text"
            placeholder="搜索：二手书、iPad、自行车..."
            className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-shadow"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          <button
            onClick={() => setSelectedCategory('ALL')}
            className={`px-4 py-1.5 rounded-full text-sm transition-colors ${selectedCategory === 'ALL' ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}
          >
            全部
          </button>
          {Object.values(Category).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm transition-colors ${selectedCategory === cat ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => {
          const seller = MOCK_USERS[product.sellerId as any] || MOCK_USERS[102];
          return (
            <div key={product.id} className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col">
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                 <img 
                  src={product.images[0]} 
                  alt={product.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md flex items-center">
                  <MapPin className="w-3 h-3 mr-1" />
                  {product.location}
                </div>
              </div>
              
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex items-start justify-between">
                   <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{product.title}</h3>
                </div>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2 flex-1">{product.description}</p>
                
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <span className="text-xl font-bold text-red-500">¥{product.price}</span>
                    <span className="text-xs text-gray-400 line-through ml-2">¥{product.originalPrice}</span>
                  </div>
                  <div className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded">
                    {product.category}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center">
                  <img src={seller.avatar} alt={seller.username} className="w-6 h-6 rounded-full" />
                  <span className="text-xs text-gray-600 ml-2 font-medium">{seller.username}</span>
                  <span className="text-xs text-gray-400 ml-auto">{product.publishDate}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-20">
          <div className="inline-block p-4 rounded-full bg-gray-50 mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500">没有找到相关商品，换个关键词试试？</p>
        </div>
      )}
    </div>
  );
};