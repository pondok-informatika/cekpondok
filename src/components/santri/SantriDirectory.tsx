import React, { useState } from 'react';
import { SantriDetailView } from '../santri_detail/SantriDetailView';
import useApi from '../../hooks/useApi';
import { SantriApiResponse, KonsentrasiApiResponse, AngkatanApiResponse } from '../../types';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { ErrorMessage } from '../ui/ErrorMessage';
import { Card } from '../ui/Card';
import { Users, Search, Target, Calendar, MapPin, Cake } from 'lucide-react';
import { calculateAge } from '../../utils/dateUtils';

export const SantriDirectory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSantriId, setSelectedSantriId] = useState<string | null>(null);

  const { data: santriMondokData, loading: santriMondokLoading, error: santriMondokError, refetch: refetchSantriMondok } = useApi<SantriApiResponse>('https://pesantrenteknologi.id/system/api/get/santri/status_santri/mondok');
  const { data: konsentrasiData, loading: konsentrasiLoading, error: konsentrasiError, refetch: refetchKonsentrasi } = useApi<KonsentrasiApiResponse>('https://pesantrenteknologi.id/system/api/get/konsentrasi');
  const { data: angkatanData, loading: angkatanLoading, error: angkatanError, refetch: refetchAngkatan } = useApi<AngkatanApiResponse>('https://pesantrenteknologi.id/system/api/get/angkatan');

  const getKonsentrasiName = (id: string): string => {
    if (!konsentrasiData || !konsentrasiData.data) return id;
    const konsentrasi = konsentrasiData.data.find(k => k.id_konsentrasi === id);
    return konsentrasi ? konsentrasi.nama_konsentrasi : id;
  };

  const getAngkatanName = (id: string): string => {
    if (!angkatanData || !angkatanData.data) return id;
    const angkatan = angkatanData.data.find(a => a.id_angkatan === id);
    return angkatan ? angkatan.angkatan : id;
  };

  const filteredSantriMondok = santriMondokData?.data ? santriMondokData.data.filter(santri =>
    santri.nama_lengkap_santri.toLowerCase().includes(searchTerm.toLowerCase()) ||
    getKonsentrasiName(santri.konsentrasi_santri).toLowerCase().includes(searchTerm.toLowerCase()) ||
    getAngkatanName(santri.angkatan_santri).toLowerCase().includes(searchTerm.toLowerCase()) ||
    santri.asal_daerah_santri.toLowerCase().includes(searchTerm.toLowerCase()) ||
    santri.kota_domisili_sekarang_santri.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  if (santriMondokLoading || konsentrasiLoading || angkatanLoading) return <LoadingSpinner className="py-12" />;
  if (santriMondokError) return <ErrorMessage message={santriMondokError} onRetry={refetchSantriMondok} />;
  if (konsentrasiError) return <ErrorMessage message={konsentrasiError} onRetry={refetchKonsentrasi} />;
  if (angkatanError) return <ErrorMessage message={angkatanError} onRetry={refetchAngkatan} />;

  if (selectedSantriId) {
    return <SantriDetailView santriId={selectedSantriId} onClose={() => setSelectedSantriId(null)} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center">
          <Users className="h-6 w-6 mr-2" />
          Data Santri
        </h2>
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Cari santri..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-bold flex items-center">
          <Users className="h-5 w-5 mr-2" />
          Santri Mondok
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSantriMondok.length > 0 ? (
            filteredSantriMondok.map((santri) => (
              <Card key={santri.id_santri} className="p-6 shadow-lg rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer" onClick={() => setSelectedSantriId(santri.id_santri)}>
                <div className="flex items-center mb-4">
                  {santri.foto_santri && (
                    <img
                      src={`https://pesantrenteknologi.id/system/assets/uploads/fotosantri/${santri.foto_santri}`}
                      alt={santri.nama_lengkap_santri}
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                  )}
                  <div>
                    <h3 className="text-xl font-semibold">{santri.nama_lengkap_santri}</h3>
                    <p className="text-gray-700 text-sm mt-1 flex items-center"><Target className="h-4 w-4 mr-2 text-gray-600" /> {getKonsentrasiName(santri.konsentrasi_santri)}</p>
                    <p className="text-gray-700 text-sm mt-1 flex items-center"><Cake className="h-4 w-4 mr-2 text-gray-600" /> {calculateAge(santri.tanggal_lahir_santri)} Tahun</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-gray-700">
                  <p className="flex items-center"><Calendar className="h-4 w-4 mr-2 text-gray-600" /> {getAngkatanName(santri.angkatan_santri)}</p>
                  <p className="flex items-center"><MapPin className="h-4 w-4 mr-2 text-gray-600" /> {santri.asal_daerah_santri} / {santri.kota_domisili_sekarang_santri}</p>
                </div>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Tidak ada data santri mondok yang ditemukan.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
