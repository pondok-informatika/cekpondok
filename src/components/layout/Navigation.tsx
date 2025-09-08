import React, { useState } from 'react';
import { 
  Home, 
  BookOpen, 
  Building, 
  Users, 
  MessageCircle,
  CreditCard,
  Menu,
  X,
  Package
} from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'academic', label: 'Akademik', icon: BookOpen },
    { id: 'dormitory', label: 'Asrama', icon: Building },
    { id: 'santri', label: 'Data Santri', icon: Users },
    // { id: 'masukan', label: 'Masukan', icon: MessageCircle },
    // { id: 'alumni', label: 'Data Alumni', icon: Users },
    { id: 'inventaris', label: 'Inventaris', icon: Package },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center relative">
          <div className="flex space-x-2 md:space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`flex items-center space-x-2 px-3 py-4 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-secondary hover:border-secondary'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden md:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};