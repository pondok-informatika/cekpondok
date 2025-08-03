import React from 'react';
import useApi from '../../hooks/useApi';
import { InventoryHumData } from '../../types';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { ErrorMessage } from '../ui/ErrorMessage';
import { Card } from '../ui/Card';
import { User } from 'lucide-react';

export const DormitoryManagement: React.FC = () => {
  const { data: inventhumData, loading: inventhumLoading, error: inventhumError, refetch: refetchInventhum } = useApi<InventoryHumData>('https://pesantrenteknologi.id/system/api/inventhum');

  const formatRupiah = (amount: string | number): string => {
    const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    if (isNaN(numericAmount)) {
      return amount.toString(); // Return original if not a valid number
    }
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numericAmount).replace(',00', ',-');
  };

  if (inventhumLoading) return <LoadingSpinner className="py-12" />;
  if (inventhumError) return <ErrorMessage message={inventhumError} onRetry={refetchInventhum} />;

  const waka2 = inventhumData?.data?.pimpinan?.waka2;
  const umum = inventhumData?.data?.pimpinan?.umum;
  const humas = inventhumData?.data?.pimpinan?.humas;
  const jumlah_inventaris = inventhumData?.data?.jumlah_inventaris;
  const jumlah_kas = inventhumData?.data?.jumlah_kas;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Manajemen Asrama</h2>

      {/* Leadership Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <User className="h-5 w-5 mr-2" />
            Wakil Ketua Harian II
          </h3>
          <div className="flex items-center space-x-3">
            {waka2?.foto_santri && (
              <img 
                src={`https://pesantrenteknologi.id/system//assets/uploads/fotosantri/${waka2.foto_santri}`}
                alt="Wakil Ketua Harian II"
                className="w-12 h-12 rounded-full object-cover border-2 border-purple-200"
              />
            )}
            <div>
              <p className="text-purple-100 text-sm">{waka2?.nama_jabatan || 'N/A'}</p>
              <p className="text-lg font-bold">{waka2?.nama_lengkap_santri || 'N/A'}</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <User className="h-5 w-5 mr-2" />
            Umum (Koordinator)
          </h3>
          <div className="flex items-center space-x-3">
            {umum?.foto_santri && (
              <img 
                src={`https://pesantrenteknologi.id/system//assets/uploads/fotosantri/${umum.foto_santri}`}
                alt="Umum (Koordinator)"
                className="w-12 h-12 rounded-full object-cover border-2 border-orange-200"
              />
            )}
            <div>
              <p className="text-orange-100 text-sm">{umum?.nama_jabatan || 'N/A'}</p>
              <p className="text-lg font-bold">{umum?.nama_lengkap_santri || 'N/A'}</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <User className="h-5 w-5 mr-2" />
            Humas (Koordinator)
          </h3>
          <div className="flex items-center space-x-3">
            {humas?.foto_santri && (
              <img 
                src={`https://pesantrenteknologi.id/system//assets/uploads/fotosantri/${humas.foto_santri}`}
                alt="Humas (Koordinator)"
                className="w-12 h-12 rounded-full object-cover border-2 border-blue-200"
              />
            )}
            <div>
              <p className="text-blue-100 text-sm">{humas?.nama_jabatan || 'N/A'}</p>
              <p className="text-lg font-bold">{humas?.nama_lengkap_santri || 'N/A'}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Inventaris and Saldo Kas Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <User className="h-5 w-5 mr-2 text-indigo-600" />
            Jumlah Inventaris
          </h3>
          <p className="text-3xl font-bold text-gray-800">{jumlah_inventaris || 0}</p>

        </Card>
        <Card>
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <User className="h-5 w-5 mr-2 text-teal-600" />
            Jumlah Kas
          </h3>
          <p className="text-3xl font-bold text-gray-800">{formatRupiah(jumlah_kas)},-</p>
        </Card>
      </div>

      {/* Laporan Keuangan Terbaru Section (Single Column) */}
      <Card>
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <User className="h-5 w-5 mr-2 text-green-600" />
          Laporan Keuangan Terbaru ({inventhumData?.data?.keuangan_terbaru?.length || 0} Transaksi)
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aktivitas</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nominal</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jenis</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {inventhumData?.data?.keuangan_terbaru?.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(item.tgl_keuangan).toLocaleDateString('id-ID')}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.aktifitas_keuangan}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatRupiah(item.nominal_keuangan)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      item.jenis_keuangan === 'Kredit'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {item.jenis_keuangan}
                    </span>
                  </td>
                </tr>
              )) || (
                <tr>
                  <td colSpan={4} className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                    Belum ada laporan keuangan terbaru
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Perkembangan Saldo & Rekap Keuangan Bulanan Section (Side-by-Side) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <User className="h-5 w-5 mr-2 text-blue-600" />
            Perkembangan Saldo Terbaru ({inventhumData?.data?.saldo_terbaru?.length || 0} Update)
          </h3>
          <div className="space-y-4">
            {inventhumData?.data?.saldo_terbaru?.map((item, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg border">
                <p className="text-sm font-medium text-gray-900 mb-1">Tanggal: {new Date(item.tgl_keuangan).toLocaleDateString('id-ID')}</p>
                <div className="text-sm text-gray-600" dangerouslySetInnerHTML={{ __html: item.keterangan }}></div>
              </div>
            )) || (
              <p className="text-gray-500 text-center py-4">Belum ada perkembangan saldo terbaru</p>
            )}
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <User className="h-5 w-5 mr-2 text-yellow-600" />
            Rekap Keuangan Bulanan ({inventhumData?.data?.rekap_keuangan_bulanan?.length || 0} Bulan)
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bulan</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pemasukan</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pengeluaran</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Selisih</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {inventhumData?.data?.rekap_keuangan_bulanan?.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.Bulan}</td>
                    
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatRupiah(item.Pemasukan)}
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatRupiah(item.Pengeluaran)}
                    </td>

                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${parseFloat(item.Selisih) < 0 ? 'text-red-500' : 'text-gray-500'}`}>
                      {formatRupiah(item.Selisih)}
                    </td>
                  </tr>
                )) || (
                  <tr>
                    <td colSpan={4} className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                      Belum ada rekap keuangan bulanan
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};
