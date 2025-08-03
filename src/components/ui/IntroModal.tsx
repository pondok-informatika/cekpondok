import React from 'react';
import { Users, BookOpen, Building, MessageCircle } from 'lucide-react';

interface IntroModalProps {
  onClose: () => void;
  dontShowAgain: boolean;
  onDontShowAgainChange: (checked: boolean) => void;
}

const FeatureCard: React.FC<{ icon: React.ElementType, title: string, children: React.ReactNode }> = ({ icon: Icon, title, children }) => (
  <div className="bg-gray-50 rounded-lg p-4 flex items-start space-x-4">
    <div className="flex-shrink-0 h-10 w-10 bg-secondary text-white rounded-full flex items-center justify-center">
      <Icon className="h-6 w-6" />
    </div>
    <div>
      <h3 className="text-md font-bold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-600">{children}</p>
    </div>
  </div>
);

export const IntroModal: React.FC<IntroModalProps> = ({ onClose, dontShowAgain, onDontShowAgainChange }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 transition-opacity duration-300">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full transform transition-all duration-300 ease-in-out scale-95">
        <div className="flex flex-col items-center text-center mb-6">
          <img src="https://pesantrenteknologi.id/system/assets/images/logo-sm.png" alt="Logo Pesantren" className="h-16 w-16 mb-4" />
          <h2 className="text-3xl font-bold text-gray-900">Selamat Datang di Portal Cek Santri</h2>
          <p className="text-md text-gray-500 mt-2 max-w-md">
            Platform terpusat untuk memantau informasi dan perkembangan santri Pesantren Teknologi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <FeatureCard icon={Users} title="Data Santri">
            Lihat direktori santri yang sedang mondok atau mengabdi.
          </FeatureCard>
          <FeatureCard icon={BookOpen} title="Akademik">
            Pantau perkembangan akademik dan pencapaian santri.
          </FeatureCard>
          <FeatureCard icon={Building} title="Asrama & Keuangan">
            Informasi manajemen asrama dan laporan keuangan.
          </FeatureCard>
          <FeatureCard icon={MessageCircle} title="Masukan Santri">
            Rekapitulasi masukan yang telah diberikan oleh para santri.
          </FeatureCard>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <label className="flex items-center space-x-2 cursor-pointer text-sm text-gray-600 hover:text-gray-800">
            <input
              type="checkbox"
              checked={dontShowAgain}
              onChange={(e) => onDontShowAgainChange(e.target.checked)}
              className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <span>Jangan tampilkan lagi</span>
          </label>
          <button
            onClick={onClose}
            className="w-full md:w-auto bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg hover:shadow-xl"
          >
            Mulai Jelajahi
          </button>
        </div>
      </div>
    </div>
  );
};
