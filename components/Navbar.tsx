import React from 'react';
import { ShoppingBag, PlusCircle, User as UserIcon, Database } from 'lucide-react';
import { User } from '../types';

interface Props {
  user: User;
  currentPage: string;
  onNavigate: (page: string) => void;
  onOpenSql: () => void;
}

export const Navbar: React.FC<Props> = ({ user, currentPage, onNavigate, onOpenSql }) => {
  return (
    <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          <div className="flex items-center cursor-pointer" onClick={() => onNavigate('home')}>
            <ShoppingBag className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-bold text-gray-900 hidden md:block">UniTrade</span>
          </div>

          <div className="flex items-center space-x-4 md:space-x-8">
            <button 
              onClick={() => onNavigate('home')}
              className={`px-3 py-2 rounded-md text-sm font-medium ${currentPage === 'home' ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-500'}`}
            >
              逛集市
            </button>
            <button 
              onClick={() => onNavigate('sell')}
              className={`flex items-center px-4 py-2 rounded-full text-sm font-medium text-white transition-all ${currentPage === 'sell' ? 'bg-indigo-700 shadow-lg' : 'bg-indigo-600 hover:bg-indigo-700 shadow-md'}`}
            >
              <PlusCircle className="w-4 h-4 mr-1" />
              发布闲置
            </button>
            <button 
              onClick={() => onNavigate('profile')}
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${currentPage === 'profile' ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-500'}`}
            >
              <img src={user.avatar} alt="Avatar" className="w-6 h-6 rounded-full mr-2" />
              <span className="hidden sm:inline">我的</span>
            </button>
            
            <div className="h-6 w-px bg-gray-300 mx-2"></div>
            
             <button 
              onClick={onOpenSql}
              className="p-2 text-gray-500 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors tooltip-trigger relative group"
              title="View SQL Schema"
            >
              <Database className="w-5 h-5" />
              <span className="absolute hidden group-hover:block top-full right-0 mt-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap">Database Dev</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};