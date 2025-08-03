import React from 'react';
import useApi from '../../hooks/useApi';
import { InventoryHumData } from '../../types';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { ErrorMessage } from '../ui/ErrorMessage';
import { Card } from '../ui/Card';
import { User, Calendar } from 'lucide-react';

export const MasukanSantri: React.FC = () => {
  const { data: inventhumData, loading: inventhumLoading, error: inventhumError, refetch: refetchInventhum } = useApi<InventoryHumData>('https://pesantrenteknologi.id/system/api/inventhum');

  if (inventhumLoading) return <LoadingSpinner className="py-12" />;
  if (inventhumError) return <ErrorMessage message={inventhumError} onRetry={refetchInventhum} />;

  return (
    <Card>
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <User className="h-5 w-5 mr-2 text-red-600" />
        Masukan Santri ({inventhumData?.data?.keluhan_santri?.length || 0} Masukan)
      </h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Masukan</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tujuan</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggapan</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {inventhumData?.data?.keluhan_santri?.map((complaint, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1.5 text-gray-400" />
                    {new Date(complaint.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500" dangerouslySetInnerHTML={{ __html: complaint.masukan }}></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{complaint.bidang_tujuan || 'N/A'}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    complaint.status === 'belum diterima'
                      ? 'bg-red-100 text-red-800'
                      : complaint.status === 'dipending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : complaint.status === 'diterima'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {complaint.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500" dangerouslySetInnerHTML={{ __html: complaint.tanggapan || 'Belum ada tanggapan' }}></td>
              </tr>
            )) || (
              <tr>
                <td colSpan={5} className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                  Belum ada masukan santri
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
