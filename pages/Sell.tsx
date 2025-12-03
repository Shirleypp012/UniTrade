import React, { useState } from 'react';
import { Wand2, Image as ImageIcon, Loader2 } from 'lucide-react';
import { Category, Product, User, ItemStatus } from '../types';
import { generateProductDescription, estimatePrice } from '../services/geminiService';

interface Props {
  user: User;
  onAddProduct: (product: Omit<Product, 'id' | 'viewCount' | 'publishDate'>) => void;
}

export const Sell: React.FC<Props> = ({ user, onAddProduct }) => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [category, setCategory] = useState<Category>(Category.OTHER);
  const [location, setLocation] = useState('');
  const [priceEstimate, setPriceEstimate] = useState('');

  const handleAiAssist = async () => {
    if (!title || !price) {
      alert("请先填写标题和价格，以便AI生成更准确的描述。");
      return;
    }
    setLoading(true);
    const desc = await generateProductDescription(title, category, Number(price));
    setDescription(desc);
    
    // Also try to estimate price if user hasn't set it confidently (optional logic, here just showing feature)
    const estimate = await estimatePrice(title, category);
    if(estimate) setPriceEstimate(estimate);
    
    setLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price || !description) return;

    onAddProduct({
      sellerId: user.id,
      title,
      description,
      price: Number(price),
      originalPrice: Number(originalPrice),
      category,
      images: [`https://picsum.photos/seed/${Math.random()}/400/300`], // Mock image
      status: ItemStatus.AVAILABLE,
      location: location || "校内自提"
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50">
          <h2 className="text-xl font-bold text-gray-900">发布闲置宝贝</h2>
          <p className="text-sm text-gray-500 mt-1">填写商品信息，快速回血</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          {/* Image Placeholder */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
              <ImageIcon className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-sm font-medium text-gray-700">点击上传照片</p>
            <p className="text-xs text-gray-500 mt-1">支持 JPG, PNG (模拟上传)</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">商品标题</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="例如：95成新 iPad Air 5"
                className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">分类</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                {Object.values(Category).map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">出手价 (¥)</label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none font-medium text-red-500"
              />
              {priceEstimate && <p className="text-xs text-green-600">AI建议参考价: {priceEstimate}</p>}
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">原价 (¥)</label>
              <input
                type="number"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none text-gray-500"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">交易地点</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="如：图书馆门口"
                className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700">详细描述</label>
              <button
                type="button"
                onClick={handleAiAssist}
                disabled={loading}
                className="text-xs flex items-center text-indigo-600 hover:text-indigo-700 disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : <Wand2 className="w-3 h-3 mr-1" />}
                AI 一键生成描述
              </button>
            </div>
            <textarea
              required
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="描述一下物品的新旧程度、入手渠道、转手原因..."
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg"
            >
              确认发布
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};