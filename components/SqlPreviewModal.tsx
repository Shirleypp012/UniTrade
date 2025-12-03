import React, { useState } from 'react';
import { Database, X, Terminal, FileCode, Network, Copy, Check } from 'lucide-react';
import { MYSQL_SCHEMA, FULL_INIT_SQL } from '../constants';
import { SqlLog } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  logs: SqlLog[];
}

export const SqlPreviewModal: React.FC<Props> = ({ isOpen, onClose, logs }) => {
  const [activeTab, setActiveTab] = useState<'schema' | 'logs' | 'er'>('schema');
  const [copied, setCopied] = useState(false);

  const handleCopySql = () => {
    navigator.clipboard.writeText(FULL_INIT_SQL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center backdrop-blur-sm p-4">
      <div className="bg-slate-900 text-slate-200 w-full max-w-5xl rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-slate-700 bg-slate-950">
          <div className="flex items-center space-x-2">
            <Database className="w-5 h-5 text-blue-400" />
            <h2 className="font-mono font-bold text-lg">Database Developer Tools</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-slate-800 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-700 bg-slate-900 overflow-x-auto">
          <button 
            onClick={() => setActiveTab('schema')}
            className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'schema' ? 'text-blue-400 border-b-2 border-blue-400 bg-slate-800' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <FileCode className="w-4 h-4" />
            <span>Schema Definitions</span>
          </button>
          <button 
             onClick={() => setActiveTab('er')}
             className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'er' ? 'text-purple-400 border-b-2 border-purple-400 bg-slate-800' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <Network className="w-4 h-4" />
            <span>ER Diagram</span>
          </button>
          <button 
             onClick={() => setActiveTab('logs')}
             className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'logs' ? 'text-green-400 border-b-2 border-green-400 bg-slate-800' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <Terminal className="w-4 h-4" />
            <span>Query Logs</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto bg-[#0d1117] p-6 font-mono text-xs md:text-sm sql-scroll relative">
          
          {/* SQL Schema Tab */}
          {activeTab === 'schema' && (
            <div className="space-y-4">
               <div className="flex justify-between items-center mb-2">
                 <p className="text-slate-400">// Initialization SQL for Navicat/MySQL</p>
                 <button 
                   onClick={handleCopySql}
                   className="flex items-center space-x-2 px-3 py-1 bg-slate-800 hover:bg-slate-700 rounded border border-slate-600 transition-colors text-xs"
                 >
                   {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                   <span>{copied ? 'Copied!' : 'Copy .sql File'}</span>
                 </button>
               </div>
              <pre className="text-pink-300 whitespace-pre-wrap">{FULL_INIT_SQL}</pre>
            </div>
          )}

          {/* ER Diagram Tab */}
          {activeTab === 'er' && (
             <div className="h-full flex flex-col items-center justify-center p-8 bg-slate-900/50 rounded-lg border border-slate-800 relative overflow-hidden">
                {/* Background Grid */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#64748b 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-16 md:gap-32">
                  
                  {/* Users Table Node */}
                  <div className="w-64 bg-slate-800 rounded-lg border-2 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                    <div className="bg-blue-600/20 p-2 border-b border-blue-500/30">
                      <div className="font-bold text-blue-300 flex items-center">
                        <Database className="w-3 h-3 mr-2" />
                        users
                      </div>
                    </div>
                    <div className="p-3 text-slate-300 space-y-1 text-xs">
                      <div className="flex justify-between text-yellow-300"><span className="font-bold">PK</span> id (INT)</div>
                      <div className="flex justify-between"><span>username</span> <span>VARCHAR</span></div>
                      <div className="flex justify-between"><span>student_id</span> <span>VARCHAR</span></div>
                      <div className="flex justify-between"><span>major</span> <span>VARCHAR</span></div>
                      <div className="flex justify-between"><span>avatar</span> <span>VARCHAR</span></div>
                      <div className="flex justify-between"><span>join_date</span> <span>DATETIME</span></div>
                    </div>
                  </div>

                  {/* Connector Line (Simplified for CSS) */}
                  <div className="hidden md:flex flex-col items-center justify-center w-24 relative">
                    <div className="h-[2px] w-full bg-slate-500 relative">
                       <div className="absolute -top-1.5 left-0 text-slate-400 text-[10px]">1</div>
                       <div className="absolute -top-1.5 right-0 text-slate-400 text-[10px]">N</div>
                       <div className="absolute left-1/2 -top-4 -translate-x-1/2 text-slate-500 text-[10px] bg-slate-900 px-1">has many</div>
                    </div>
                  </div>
                  
                  {/* Vertical Connector for Mobile */}
                  <div className="md:hidden h-16 w-[2px] bg-slate-500 relative">
                    <div className="absolute top-0 -left-3 text-slate-400 text-[10px]">1</div>
                    <div className="absolute bottom-0 -left-3 text-slate-400 text-[10px]">N</div>
                  </div>

                  {/* Products Table Node */}
                  <div className="w-64 bg-slate-800 rounded-lg border-2 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                    <div className="bg-emerald-600/20 p-2 border-b border-emerald-500/30">
                      <div className="font-bold text-emerald-300 flex items-center">
                         <Database className="w-3 h-3 mr-2" />
                         products
                      </div>
                    </div>
                    <div className="p-3 text-slate-300 space-y-1 text-xs">
                      <div className="flex justify-between text-yellow-300"><span className="font-bold">PK</span> id (INT)</div>
                      <div className="flex justify-between text-blue-300"><span className="font-bold">FK</span> seller_id (INT)</div>
                      <div className="flex justify-between"><span>title</span> <span>VARCHAR</span></div>
                      <div className="flex justify-between"><span>price</span> <span>DECIMAL</span></div>
                      <div className="flex justify-between"><span>category</span> <span>ENUM</span></div>
                      <div className="flex justify-between"><span>status</span> <span>ENUM</span></div>
                      <div className="flex justify-between"><span>publish_date</span> <span>DATETIME</span></div>
                    </div>
                  </div>
                  
                </div>

                <div className="mt-8 text-slate-500 text-xs text-center border p-2 rounded border-slate-700 bg-slate-800/50">
                   <span className="text-blue-400">users.id</span> connects to <span className="text-emerald-400">products.seller_id</span>
                   <br/>
                   One User can sell Many Products.
                </div>
             </div>
          )}

          {/* Logs Tab */}
          {activeTab === 'logs' && (
            <div className="space-y-4">
               <p className="text-slate-400 mb-4">// Real-time simulated SQL queries based on user actions</p>
              {logs.length === 0 ? (
                <div className="text-slate-600 italic">No queries executed yet...</div>
              ) : (
                logs.map((log, idx) => (
                  <div key={idx} className="mb-6 border-l-2 border-slate-700 pl-4">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-green-400 font-bold">[{log.action}]</span>
                      <span className="text-slate-500 text-xs">{log.timestamp}</span>
                    </div>
                    <code className="block text-blue-300 whitespace-pre-wrap">{log.query}</code>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};