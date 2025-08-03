import React from 'react';
import { InventoryItem } from '../../types';

interface InventoryDetailModalProps {
  item: InventoryItem | null;
  onClose: () => void;
}

export const InventoryDetailModal: React.FC<InventoryDetailModalProps> = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-2xl font-bold"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">{item.nama_inventaris}</h2>
        {item.gambar && (
          <img
            src={`https://pesantrenteknologi.id/system/assets/uploads/inventaris/${item.gambar}`}
            alt={item.nama_inventaris}
            className="max-w-full max-h-[70vh] object-contain mx-auto mb-4 rounded-md"
          />
        )}
        <p className="text-gray-700 mb-2"><strong>Kondisi:</strong> {item.kondisi_inventaris}</p>
        <p className="text-gray-700 mb-2"><strong>Hak Milik:</strong> {item.hak_milik}</p>
        <div className="text-gray-700 mb-4">
          <strong>Deskripsi:</strong>
          <div dangerouslySetInnerHTML={{ __html: item.deskripsi }}></div>
        </div>
      </div>
    </div>
  );
};