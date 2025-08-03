import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Navigation } from './components/layout/Navigation';
import { Dashboard } from './components/dashboard/Dashboard';
import { AcademicProgress } from './components/academic/AcademicProgress';
import { DormitoryManagement } from './components/dormitory/DormitoryManagement';
import { SantriDirectory } from './components/santri/SantriDirectory';
import { AlumniDirectory } from './components/alumni/AlumniDirectory';
import { InventoryList } from './components/inventaris/InventoryList';
import { MasukanSantri } from './components/masukan/MasukanSantri';
import { IntroModal } from './components/ui/IntroModal';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showIntro, setShowIntro] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    const hasSeenIntro = localStorage.getItem('hasSeenIntro');
    if (hasSeenIntro !== 'true') {
      setShowIntro(true);
    }
  }, []);

  const handleCloseIntro = () => {
    if (dontShowAgain) {
      localStorage.setItem('hasSeenIntro', 'true');
    }
    setShowIntro(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onTabChange={setActiveTab} />;
      case 'academic':
        return <AcademicProgress />;
      case 'dormitory':
        return <DormitoryManagement />;
      case 'masukan':
        return <MasukanSantri />;
      case 'santri':
        return <SantriDirectory />;
      case 'alumni':
        return <AlumniDirectory />;
      case 'inventaris':
        return <InventoryList />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {showIntro && (
        <IntroModal
          onClose={handleCloseIntro}
          dontShowAgain={dontShowAgain}
          onDontShowAgainChange={setDontShowAgain}
        />
      )}
      <Header />
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
