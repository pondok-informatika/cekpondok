import React from 'react';
import useApi from '../../hooks/useApi';
import { SantriDetailResponse, KonsentrasiApiResponse, AngkatanApiResponse } from '../../types';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { ErrorMessage } from '../ui/ErrorMessage';
import { Card } from '../ui/Card';
import { Calendar, MapPin, Cake, Home, User, Users, BookOpen, Activity, Shield, Clock, GraduationCap, Award } from 'lucide-react';
import { calculateAge } from '../../utils/dateUtils';

interface SantriDetailViewProps {
  santriId: string;
  onClose: () => void;
}

export const SantriDetailView: React.FC<SantriDetailViewProps> = ({ santriId, onClose }) => {
  const { data: santriDetail, loading: detailLoading, error: detailError, refetch: refetchDetail } = useApi<SantriDetailResponse>(`https://pesantrenteknologi.id/system/api/santri/detail/${santriId}`);
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

  if (detailLoading || konsentrasiLoading || angkatanLoading) return <LoadingSpinner className="py-12" />;
  if (detailError) return <ErrorMessage message={detailError} onRetry={refetchDetail} />;
  if (konsentrasiError) return <ErrorMessage message={konsentrasiError} onRetry={refetchKonsentrasi} />;
  if (angkatanError) return <ErrorMessage message={angkatanError} onRetry={refetchAngkatan} />;

  if (!santriDetail || !santriDetail.data || !santriDetail.data.profile) {
    return <ErrorMessage message="Data detail santri tidak ditemukan." />;
  }

  const profile = santriDetail.data.profile;
  const hafalan = santriDetail.data.hafalan;
  const progresTahfidz = santriDetail.data.progres_tahfidz;
  const kegiatanProduktif = santriDetail.data.kegiatan_produktif;
  const statistikPresensi = santriDetail.data.statistik_presensi;
  const pelanggaran = santriDetail.data.pelanggaran;
  const perizinan = santriDetail.data.perizinan;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h1 className="text-3xl font-extrabold text-gray-800">Profil Santri</h1>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            Kembali
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          {/* Left Column: Personal Information */}
          <div className="md:col-span-1 space-y-6">
            <Card className="p-6 shadow-md rounded-lg bg-gradient-to-br from-blue-50 to-blue-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <User className="h-6 w-6 mr-2 text-blue-600" /> Informasi Pribadi
              </h2>
              <div className="flex flex-col items-center mb-6">
                {profile.foto_santri && (
                  <img
                    src={`https://pesantrenteknologi.id/system/assets/uploads/fotosantri/${profile.foto_santri}`}
                    alt={profile.nama_lengkap_santri}
                    className="w-32 h-32 rounded-full object-cover border-4 border-blue-300 shadow-md"
                  />
                )}
                <h3 className="text-xl font-semibold mt-4 text-gray-900">{profile.nama_lengkap_santri}</h3>
                <p className="text-gray-600 text-sm"><small>{profile.email_santri}</small></p>
                
              </div>

              <div className="space-y-3 text-gray-700">
                <p className="flex items-center text-sm"><GraduationCap className="h-4 w-4 mr-2 text-blue-500" /><span className="font-medium ml-1">{getKonsentrasiName(profile.konsentrasi_santri)}</span></p>
                <p className="flex items-center text-sm"><Calendar className="h-4 w-4 mr-2 text-blue-500" /><span className="font-medium ml-1">{getAngkatanName(profile.angkatan_santri)}</span></p>
                <p className="flex items-center text-sm"><Cake className="h-4 w-4 mr-2 text-blue-500" /><span className="font-medium ml-1">{calculateAge(profile.tanggal_lahir_santri)} Tahun</span></p>
                <p className="flex items-center text-sm"><MapPin className="h-4 w-4 mr-2 text-blue-500" /><span className="font-medium ml-1">{profile.asal_daerah_santri} / {profile.kota_domisili_sekarang_santri}</span></p>
                <p className="flex items-start text-sm"><Home className="h-4 w-4 mr-2 text-blue-500 mt-1" /> <span className="font-medium ml-1" dangerouslySetInnerHTML={{ __html: profile.alamat_lengkap_santri }}></span></p>
                <p className="flex items-center text-sm"><Users className="h-4 w-4 mr-2 text-blue-500" />Keluarga<span className="font-medium ml-1">{profile.kondisi_keluarga_santri}</span></p>
                <p className="flex items-center text-sm"><Users className="h-4 w-4 mr-2 text-blue-500" /> Anak ke: <span className="font-medium ml-1">{profile.anak_ke_santri} dari {profile.jumlah_saudara_santri} bersaudara</span></p>

              </div>
            </Card>
          </div>

          {/* Right Column: Progress, Activities, Reports */}
          <div className="md:col-span-2 space-y-6">
            

          {/* Progress Hafalan Section (Historical) */}
            <Card className="p-6 shadow-md rounded-lg bg-white">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <Award className="h-6 w-6 mr-2 text-green-600" /> Progress Hafalan di Pondok
              </h2>
              {progresTahfidz && progresTahfidz.length > 0 ? (
                <div className="space-y-4">
                  {progresTahfidz.map((progress, index) => (
                    <div key={index} className="p-4 bg-green-50 rounded-md border border-green-200">
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-lg font-semibold text-green-800">Total Juz Hafalan: {progress.total_juz_hafalan}</p>
                        <div className="flex space-x-2">
                          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            Hafalan Baru: {progress.jumlah_hafalan_baru}
                          </span>
                          <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            Murojaah: {progress.jumlah_murojaah}
                          </span>
                        </div>
                      </div>
                      <div className="text-sm text-gray-700 mb-2">
                        Juz Terhafal:
                        <div className="flex flex-wrap gap-1 mt-1">
                          {progress.daftar_juz_terhafal?.split(', ').map((juz, juzIndex) => (
                            <span key={juzIndex} className="px-2 py-1 bg-green-200 text-blue-900 rounded-full text-xs font-medium">
                              {juz}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>Mulai: {new Date(progress.tanggal_awal_hafalan).toLocaleDateString('id-ID')}</span>
                        <span>Terakhir: {new Date(progress.tanggal_terakhir_hafalan).toLocaleDateString('id-ID')}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">Belum ada data progress hafalan di pondok.</p>
              )}
            </Card>


            {/* Perizinan Section */}
            <Card className="p-6 shadow-md rounded-lg bg-white">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <BookOpen className="h-6 w-6 mr-2 text-indigo-600" /> Perizinan
              </h2>
              {perizinan && perizinan.riwayat_terakhir && perizinan.riwayat_terakhir.length > 0 ? (
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  <p className="font-medium text-indigo-800">Total Izin: {perizinan.statistik.total_izin}</p>
                  <p className="font-medium text-indigo-800">Izin Aktif: {perizinan.statistik.izin_aktif}</p>
                  <p className="font-medium text-indigo-800">Izin Bulan Ini: {perizinan.statistik.bulan_ini}</p>
                  {perizinan.riwayat_terakhir.map((i, index) => (
                    <div key={index} className="p-3 bg-indigo-50 rounded-md border border-indigo-200">
                      <p className="font-medium text-indigo-800">Keperluan: <span dangerouslySetInnerHTML={{ __html: i.keperluan_izin }}></span></p>
                      <p className="text-xs text-gray-500">Waktu: {i.waktu_izin} - {i.selesai_izin}</p>
                      <p className="text-xs text-gray-500">Status: {i.status_izin}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">Tidak ada data perizinan.</p>
              )}
            </Card>
                      {/* Statistik Presensi Section */}
          <Card className="p-6 shadow-md rounded-lg bg-white">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <Clock className="h-5 w-5 mr-2 text-teal-600" /> Statistik Presensi
            </h2>
            {statistikPresensi ? (
              <div className="space-y-2 text-sm text-gray-700">
                <p>On Time: <span className="font-semibold text-teal-800">{statistikPresensi.on_time}</span></p>
                <p>Telat: <span className="font-semibold text-red-600">{statistikPresensi.telat}</span></p>
                <p>Pertama X: <span className="font-semibold text-blue-600">{statistikPresensi.pertamax}</span></p>
              </div>
            ) : (
              <p className="text-gray-500 text-sm">Tidak ada data presensi.</p>
            )}
          </Card>

          {/* Pelanggaran Section */}
          <Card className="p-6 shadow-md rounded-lg bg-white">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <Shield className="h-5 w-5 mr-2 text-red-600" /> Pelanggaran
            </h2>
            {pelanggaran && pelanggaran.length > 0 ? (
              <div className="space-y-3 max-h-48 overflow-y-auto text-sm">
                {pelanggaran.map((p, index) => (
                  <div key={index} className="p-3 bg-red-50 rounded-md border border-red-200">
                    <p className="font-medium text-red-800">Detail Pelanggaran: {/* Display violation details here */}</p>
                    <p className="text-xs text-gray-500">Tanggal: {/* Date and other info */}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">Tidak ada data pelanggaran.</p>
            )}
          </Card>
          </div>
        </div>
        {/* New Row for Statistik Presensi and Pelanggaran */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 pt-0">


            {/* Kegiatan Produktif & Laporan Hafalan Terakhir Sections */}
              {/* Kegiatan Produktif Section */}
              <Card className="p-6 shadow-md rounded-lg bg-white">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-orange-600" /> Kegiatan Produktif
                </h2>
                {kegiatanProduktif && kegiatanProduktif.length > 0 ? (
                  <div className="space-y-3 max-h-48 overflow-y-auto text-sm">
                    {kegiatanProduktif.map((k, index) => (
                      <div key={index} className="p-3 bg-orange-50 rounded-md border border-orange-200">
                        <p className="font-semibold text-orange-800 mb-1" dangerouslySetInnerHTML={{ __html: k.target_daily }}></p>
                        <p className="text-xs text-gray-700 mb-1">Status: {k.status} - {new Date(k.tgl_daily).toLocaleDateString('id-ID')}</p>
                        {k.link_belajar && (
                          <p className="text-xs text-blue-600 hover:underline truncate">
                            <a href={k.link_belajar} target="_blank" rel="noopener noreferrer">Link Belajar</a>
                          </p>
                        )}
                        {k.kendala && (
                          <p className="text-xs text-red-600 mt-1">
                            Kendala: <span dangerouslySetInnerHTML={{ __html: k.kendala }}></span>
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">Tidak ada data kegiatan produktif.</p>
                )}
              </Card>

              {/* Laporan Hafalan Terakhir Section */}
              <Card className="p-6 shadow-md rounded-lg bg-white">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-purple-600" /> Laporan Hafalan Terakhir
                </h2>
                {hafalan && hafalan.tahun_ini && hafalan.tahun_ini.length > 0 ? (
                  <div className="space-y-3 max-h-48 overflow-y-auto text-sm">
                    {hafalan.tahun_ini.map((h, index) => (
                      <div key={index} className="p-3 bg-purple-50 rounded-md border border-purple-200">
                        <p className="font-medium text-purple-800">{h.juz_hafalan} - {h.status}</p>
                        <p className="text-xs text-gray-500">Tanggal: {new Date(h.tgl_tahfidz).toLocaleDateString('id-ID')}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">Tidak ada data hafalan terakhir.</p>
                )}
              </Card>


          
        </div>
      </div>
    </div>
  );
};
