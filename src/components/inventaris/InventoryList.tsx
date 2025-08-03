import React, { useState } from 'react';
import useApi from '../../hooks/useApi';
import { InventoryItem } from '../../types';
import { Card } from '../ui/Card';
import { ErrorMessage } from '../ui/ErrorMessage';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { InventoryDetailModal } from './InventoryDetailModal';

interface ApiResponse<T> {
  data: T[];
  total: number;
}

export const InventoryList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 9; // Display 9 items per page

  const { data, error, loading } = useApi<ApiResponse<InventoryItem>>(
    'https://pesantrenteknologi.id/system/api/get/inventaris'
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

  const handleCardClick = (item: InventoryItem) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  const inventoryData = data?.data || [];

  const filteredItems = inventoryData.filter(item =>
    item.nama_inventaris.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.kondisi_inventaris.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.hak_milik.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.deskripsi.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Daftar Inventaris</h1>
        <input
          type="text"
          placeholder="Cari inventaris..."
          className="p-2 border border-gray-300 rounded-md w-1/3"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentItems.map((item) => (
          <Card key={item.id_inventaris} className="p-0 cursor-pointer overflow-hidden group transition-all duration-300 hover:shadow-lg hover:scale-102" onClick={() => handleCardClick(item)}>
            {item.gambar && (
              <div className="relative w-full h-64 overflow-hidden">
                <img
                  src={`https://pesantrenteknologi.id/system/assets/uploads/inventaris/${item.gambar}`}
                  alt={item.nama_inventaris}
                  className="w-full h-full object-cover rounded-t-lg transition-transform duration-300 group-hover:scale-105"
                  loading="lazy" // Lazy loading
                />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h2 className="text-xl font-bold bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent drop-shadow-md">{item.nama_inventaris}</h2>
                </div>
              </div>
            )}
            <div className="p-4 space-y-2">
              <p className="text-sm text-gray-700"><span className="font-semibold">Kondisi:</span> {item.kondisi_inventaris}</p>
              <p className="text-sm text-gray-700"><span className="font-semibold">Hak Milik:</span> {item.hak_milik}</p>
              <p className="text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: item.deskripsi }}></p>
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 border rounded-md ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      <InventoryDetailModal item={selectedItem} onClose={handleCloseModal} />
    </div>
  );
};