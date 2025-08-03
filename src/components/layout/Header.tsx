import React from 'react';
import { User } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-primary shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img src="https://pesantrenteknologi.id/system/assets/images/logo-sm.png" alt="Pesantren Teknologi Logo" className="h-8 w-8 mr-3" />
            <div>
              <h1 className="text-xl font-bold text-white">Pesantren Teknologi</h1>
              <p className="text-xs text-gray-200">Portal Orang Tua</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-gray-200" />
              <span className="text-sm text-gray-200">Orang Tua Santri</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};