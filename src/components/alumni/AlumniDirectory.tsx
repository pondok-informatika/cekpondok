import React, { useState, useEffect } from 'react';
import { SantriDetailView } from '../santri_detail/SantriDetailView';
import useApi from '../../hooks/useApi';
import { SantriApiResponse, KonsentrasiApiResponse, AngkatanApiResponse } from '../../types';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { ErrorMessage } from '../ui/ErrorMessage';
import { Card } from '../ui/Card';
import { Users, Search, Target, Calendar, MapPin, Cake } from 'lucide-react';
import { calculateAge } from '../../utils/dateUtils';

const ITEMS_PER_PAGE = 9; // Define items per page for pagination

export const AlumniDirectory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [alumniPage, setAlumniPage] = useState(1);
  const [selectedSantriId, setSelectedSantriId] = useState<string | null>(null);

  const { data: konsentrasiData, loading: konsentrasiLoading, error: konsentrasiError, refetch: refetchKonsentrasi } = useApi<KonsentrasiApiResponse>('https://pesantrenteknologi.id/system/api/get/konsentrasi');
  const { data: angkatanData, loading: angkatanLoading, error: angkatanError, refetch: refetchAngkatan } = useApi<AngkatanApiResponse>('https://pesantrenteknologi.id/system/api/get/angkatan');

  // Alumni data fetching
  const { data: alumniData, loading: alumniLoading, error: alumniError, refetch: refetchAlumni } = useApi<SantriApiResponse>(
    `https://pesantrenteknologi.id/system/api/get/santri/status_santri/alumni?page=${alumniPage}&limit=${ITEMS_PER_PAGE}`
  );

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

  const filteredAlumni = alumniData?.data ? alumniData.data.filter(alumni =>
    alumni.nama_lengkap_santri.toLowerCase().includes(searchTerm.toLowerCase()) ||
    getKonsentrasiName(alumni.konsentrasi_santri).toLowerCase().includes(searchTerm.toLowerCase()) ||
    getAngkatanName(alumni.angkatan_santri).toLowerCase().includes(searchTerm.toLowerCase()) ||
    alumni.asal_daerah_santri.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alumni.kota_domisili_sekarang_santri.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  const totalAlumniPages = alumniData ? Math.ceil(alumniData.count / ITEMS_PER_PAGE) : 0;

  if (alumniLoading || konsentrasiLoading || angkatanLoading) return <LoadingSpinner className="py-12" />;
  if (alumniError) return <ErrorMessage message={alumniError} onRetry={refetchAlumni} />;
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
          Data Alumni
        </h2>
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Cari alumni..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {filteredAlumni.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAlumni.map((alumni) => (
            <Card key={alumni.id_santri} className="p-6 shadow-lg rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer" onClick={() => setSelectedSantriId(alumni.id_santri)}>
              <div className="flex items-center mb-4">
                {alumni.foto_santri && (
                  <img
                    src={`https://pesantrenteknologi.id/system/assets/uploads/fotosantri/${alumni.foto_santri}`}
                    alt={alumni.nama_lengkap_santri}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                )}
                <div>
                  <h3 className="text-xl font-semibold">{alumni.nama_lengkap_santri}</h3>
                  <p className="text-gray-700 text-sm mt-1 flex items-center"><Target className="h-4 w-4 mr-2 text-gray-600" /> {getKonsentrasiName(alumni.konsentrasi_santri)}</p>
                  <p className="text-gray-700 text-sm mt-1 flex items-center"><Cake className="h-4 w-4 mr-2 text-gray-600" /> {calculateAge(alumni.tanggal_lahir_santri)} Tahun</p>
                </div>
              </div>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="flex items-center"><Calendar className="h-4 w-4 mr-2 text-gray-600" /> {getAngkatanName(alumni.angkatan_santri)}</p>
                <p className="flex items-center"><MapPin className="h-4 w-4 mr-2 text-gray-600" /> {alumni.asal_daerah_santri} / {alumni.kota_domisili_sekarang_santri}</p>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="col-span-full text-center py-12">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Tidak ada data alumni yang ditemukan.</p>
        </div>
      )}

      {/* Pagination Controls */}
      {alumniData && alumniData.count > ITEMS_PER_PAGE && (
        <div className="flex justify-center items-center space-x-4 mt-6">
          <button
            onClick={() => setAlumniPage(prev => Math.max(1, prev - 1))}
            disabled={alumniPage === 1}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
          >
            Previous
          </button>
          <span className="text-gray-700">Page {alumniPage} of {totalAlumniPages}</span>
          <button
            onClick={() => setAlumniPage(prev => Math.min(totalAlumniPages, prev + 1))}
            disabled={alumniPage === totalAlumniPages}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};