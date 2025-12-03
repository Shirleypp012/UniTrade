import React from 'react';
import { User, Product } from '../types';
import { Settings, Heart, Box, Clock } from 'lucide-react';

interface Props {
  user: User;
  myProducts: Product[];
}

export const Profile: React.FC<Props> = ({ user, myProducts }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Sidebar Info */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
            <div className="relative inline-block">
              <img src={user.avatar} alt={user.username} className="w-24 h-24 rounded-full mx-auto border-4 border-indigo-50" />
              <div className="absolute bottom-1 right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
            </div>
            <h2 className="mt-4 text-xl font-bold text-gray-900">{user.username}</h2>
            <p className="text-indigo-600 font-medium text-sm mt-1">{user.major}</p>
            <p className="text-gray-400 text-xs mt-1">ID: {user.studentId}</p>

            <div className="mt-6 flex justify-around text-center border-t pt-6 border-gray-50">
              <div>
                <div className="text-lg font-bold text-gray-900">{myProducts.length}</div>
                <div className="text-xs text-gray-500">在售</div>
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900">12</div>
                <div className="text-xs text-gray-500">已售</div>
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900">5</div>
                <div className="text-xs text-gray-500">好评</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mt-6 space-y-1">
            <button className="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg">
              <Box className="w-4 h-4 mr-3" />
              我的发布
            </button>
            <button className="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg">
              <Heart className="w-4 h-4 mr-3" />
              我的收藏
            </button>
            <button className="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg">
              <Settings className="w-4 h-4 mr-3" />
              账号设置
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-900">我的在售 ({myProducts.length})</h3>
            </div>
            
            <div className="divide-y divide-gray-100">
              {myProducts.length === 0 ? (
                <div className="p-8 text-center text-gray-500">暂无发布商品</div>
              ) : (
                myProducts.map(p => (
                  <div key={p.id} className="p-4 flex gap-4 hover:bg-gray-50 transition-colors">
                    <img src={p.images[0]} alt={p.title} className="w-24 h-24 object-cover rounded-lg bg-gray-100" />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                         <div className="flex justify-between items-start">
                            <h4 className="font-semibold text-gray-900">{p.title}</h4>
                            <span className="text-lg font-bold text-red-500">¥{p.price}</span>
                         </div>
                         <p className="text-sm text-gray-500 mt-1 line-clamp-1">{p.description}</p>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                         <div className="flex items-center text-xs text-gray-400">
                           <Clock className="w-3 h-3 mr-1" />
                           {p.publishDate}
                           <span className="mx-2">•</span>
                           浏览 {p.viewCount}
                         </div>
                         <div className="space-x-2">
                            <button className="px-3 py-1 text-xs border border-gray-200 rounded hover:bg-white hover:border-gray-300">编辑</button>
                            <button className="px-3 py-1 text-xs bg-indigo-50 text-indigo-600 rounded hover:bg-indigo-100">擦亮</button>
                         </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};