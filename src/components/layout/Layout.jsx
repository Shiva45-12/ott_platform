import React from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Footer from './Footer';
import MobileNav from './MobileNav';

const Layout = ({ children }) => {
  const location = useLocation();
  const isPlansPage = location.pathname === '/plans';

  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-x-hidden">
      {!isPlansPage && <Sidebar />}
      {!isPlansPage && <MobileNav />}
      <main className={`flex-grow transition-all duration-300 ${!isPlansPage ? 'pt-14 md:pt-0 pl-0 md:pl-20' : ''}`}>
        {children}
      </main>
      {!isPlansPage && (
        <div className="pl-0 md:pl-20 pb-16 md:pb-0">
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Layout;

