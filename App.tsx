import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Sell } from './pages/Sell';
import { Profile } from './pages/Profile';
import { SqlPreviewModal } from './components/SqlPreviewModal';
import { CURRENT_USER, INITIAL_PRODUCTS } from './constants';
import { Product, SqlLog } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [logs, setLogs] = useState<SqlLog[]>([]);
  const [isSqlModalOpen, setSqlModalOpen] = useState(false);

  // Helper to add SQL Log
  const addLog = (action: string, query: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [{ timestamp, action, query }, ...prev]);
  };

  useEffect(() => {
    // Initial Load Log
    if (logs.length === 0) {
      addLog('INIT', 'SELECT * FROM products WHERE status = "ON_SALE" ORDER BY publish_date DESC;');
    }
  }, []);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
    
    if (page === 'home') {
      addLog('NAVIGATE', 'SELECT * FROM products LIMIT 20;');
    } else if (page === 'profile') {
      addLog('NAVIGATE', `SELECT * FROM users WHERE id = ${CURRENT_USER.id};\nSELECT * FROM products WHERE seller_id = ${CURRENT_USER.id};`);
    }
  };

  const handleAddProduct = (newProductData: Omit<Product, 'id' | 'viewCount' | 'publishDate'>) => {
    const newId = Math.max(...products.map(p => p.id)) + 1;
    const date = new Date().toISOString().split('T')[0];
    
    const newProduct: Product = {
      ...newProductData,
      id: newId,
      viewCount: 0,
      publishDate: date
    };

    setProducts(prev => [newProduct, ...prev]);
    setCurrentPage('home');

    // Simulate SQL Insert
    const sql = `INSERT INTO products (seller_id, title, description, price, original_price, category, status, location, publish_date) 
VALUES (${newProduct.sellerId}, '${newProduct.title}', '${newProduct.description.substring(0, 20)}...', ${newProduct.price}, ${newProduct.originalPrice}, '${newProduct.category}', 'ON_SALE', '${newProduct.location}', NOW());`;
    
    addLog('INSERT_ITEM', sql);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        user={CURRENT_USER} 
        currentPage={currentPage} 
        onNavigate={handleNavigate}
        onOpenSql={() => setSqlModalOpen(true)}
      />
      
      <main className="flex-1 bg-slate-50">
        {currentPage === 'home' && <Home products={products} />}
        {currentPage === 'sell' && <Sell user={CURRENT_USER} onAddProduct={handleAddProduct} />}
        {currentPage === 'profile' && <Profile user={CURRENT_USER} myProducts={products.filter(p => p.sellerId === CURRENT_USER.id)} />}
      </main>

      <footer className="bg-white border-t border-gray-100 py-8 text-center text-sm text-gray-400">
        <p>© 2026 UniTrade Campus Market. Database Project Demo.</p>
      </footer>

      <SqlPreviewModal 
        isOpen={isSqlModalOpen} 
        onClose={() => setSqlModalOpen(false)} 
        logs={logs} 
      />
    </div>
  );
}

export default App;