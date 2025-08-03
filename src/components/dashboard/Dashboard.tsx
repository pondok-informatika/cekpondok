import React from 'react';
import useApi from '../../hooks/useApi';
import { DashboardData, PresensiHarian } from '../../types';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { ErrorMessage } from '../ui/ErrorMessage';
import { Card } from '../ui/Card';
import { Users, UserCheck, Calendar, Bell, BookOpen, AlertTriangle, DollarSign, Building, MessageCircle, Clock, CheckCircle, XCircle, AlertCircle as AlertCircleIcon, Star, CalendarDays } from 'lucide-react';

interface DashboardProps {
  onTabChange: (tab: string) => void;
}

const renderAttendanceStatus = (status: string, time: string) => {
  const timeInfo = time !== '00:00:00' ? time : 'Tidak ada data';
  switch (status.toLowerCase()) {
    case 'on-time':
      return (
        <div className="flex items-center" title={`On Time: ${timeInfo}`}>
          <CheckCircle className="h-5 w-5 text-green-500" />
          <span className="ml-2 text-sm text-gray-600 sr-only">On Time</span>
        </div>
      );
    case 'telat':
      return (
        <div className="flex items-center" title={`Telat: ${timeInfo}`}>
          <AlertCircleIcon className="h-5 w-5 text-yellow-500" />
           <span className="ml-2 text-sm text-gray-600 sr-only">Telat</span>
        </div>
      );
    case 'pertamax':
      return (
        <div className="flex items-center" title={`Pertamax: ${timeInfo}`}>
          <Star className="h-5 w-5 text-blue-500" />
           <span className="ml-2 text-sm text-gray-600 sr-only">Pertamax</span>
        </div>
      );
    case 'absen':
    default:
      return (
        <div className="flex items-center" title="Absen">
          <XCircle className="h-5 w-5 text-red-500" />
           <span className="ml-2 text-sm text-gray-600 sr-only">Absen</span>
        </div>
      );
  }
};

const getStatusClass = (status: string) => {
  switch (status) {
    case 'Selesai':
      return 'bg-green-100 text-green-800';
    case 'Belum Selesai':
      return 'bg-yellow-100 text-yellow-800';
    case 'Tidak Selesai':
      return 'bg-red-100 text-red-800';
    case 'Pending Besok':
        return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const Dashboard: React.FC<DashboardProps> = ({ onTabChange }) => {
  const { data, loading, error, refetch } = useApi<DashboardData>('https://pesantrenteknologi.id/system/api/dashboard');

  if (loading) return <LoadingSpinner className="py-12" />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;

  const dashboardData = data?.data;
  const today = new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });


  return (
    <div className="space-y-6">
      {/* Leadership Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-r from-primary to-secondary text-white">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Bidang Yayasan Pondok
          </h3>
          <div className="space-y-2">
            <p className="text-blue-100 text-sm">Bidang Yayasan Pondok</p>
            <p className="text-xl font-bold">{dashboardData?.pimpinan?.pimpinan_pondok?.nama || 'N/A'}</p>
            <p className="text-green-200 text-sm">Ketua Yayasan</p>
          </div>
        </Card>

        <Card className="bg-gradient-to-r from-primary to-secondary text-white">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <UserCheck className="h-5 w-5 mr-2" />
            Ketua Harian
          </h3>
          <div className="flex items-center space-x-3">
            {dashboardData?.pimpinan?.ketua_harian?.foto_santri && (
              <img 
                src={`https://pesantrenteknologi.id/system//assets/uploads/fotosantri/${dashboardData.pimpinan.ketua_harian.foto_santri}`}
                alt="Ketua Harian"
                className="w-12 h-12 rounded-full object-cover border-2 border-blue-200"
              />
            )}
            <div>
              <p className="text-blue-100 text-sm">Ketua Harian</p>
              <p className="text-lg font-bold">{dashboardData?.pimpinan?.ketua_harian?.nama_lengkap_santri || 'N/A'}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-primary to-secondary text-white cursor-pointer" onClick={() => onTabChange('santri')}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Santri Aktif</p>
              <p className="text-2xl font-bold">{dashboardData?.statistik_utama?.santri?.aktif || 0}</p>
              <p className="text-green-200 text-xs">dari {dashboardData?.statistik_utama?.santri?.total || 0} total</p>
            </div>
            <Users className="h-8 w-8 text-green-200" />
          </div>
        </Card>

        <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm">Pelanggaran Aktif</p>
              <p className="text-2xl font-bold">{dashboardData?.statistik_utama?.pelanggaran?.aktif || 0}</p>
              <p className="text-red-200 text-xs">dari {dashboardData?.statistik_utama?.pelanggaran?.total || 0} total</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-200" />
          </div>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm">Izin Aktif</p>
              <p className="text-2xl font-bold">{dashboardData?.statistik_utama?.izin?.aktif || 0}</p>
              <p className="text-yellow-200 text-xs">dari {dashboardData?.statistik_utama?.izin?.total || 0} total</p>
            </div>
            <Calendar className="h-8 w-8 text-yellow-200" />
          </div>
        </Card>

        <Card className="bg-gradient-to-r from-primary to-secondary text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Saldo Kas</p>
              <p className="text-2xl font-bold">Rp {(dashboardData?.statistik_utama?.saldo_kas || 0).toLocaleString()}</p>
            </div>
            <DollarSign className="h-8 w-8 text-purple-200" />
          </div>
        </Card>
      </div>

      {/* Additional Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Keluhan Santri</p>
              <p className="text-2xl font-bold text-orange-600">{dashboardData?.statistik_utama?.keluhan_santri?.aktif || 0}</p>
              <p className="text-gray-500 text-xs">dari {dashboardData?.statistik_utama?.keluhan_santri?.total || 0} total</p>
            </div>
            <MessageCircle className="h-8 w-8 text-orange-500" />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Inventaris</p>
              <p className="text-2xl font-bold text-blue-600">{dashboardData?.statistik_utama?.inventaris || 0}</p>
            </div>
            <Building className="h-8 w-8 text-blue-500" />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Relasi Aktif</p>
              <p className="text-2xl font-bold text-blue-600">{dashboardData?.statistik_utama?.relasi?.aktif || 0}</p>
              <p className="text-gray-500 text-xs">dari {dashboardData?.statistik_utama?.relasi?.total || 0} total</p>
            </div>
            <Users className="h-8 w-8 text-green-500" />
          </div>
        </Card>
      </div>

      {/* Hafalan and Laporan Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Hafalan */}
        <div className="space-y-6">
          <Card>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
              Status Hafalan Hari Ini
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg">
                <span className="text-sm font-medium">Sudah Setor</span>
                <span className="text-lg font-bold text-primary">
                  {dashboardData?.hafalan?.setoran_hari_ini?.length || 0}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-secondary/10 rounded-lg">
                <span className="text-sm font-medium">Belum Setor</span>
                <span className="text-lg font-bold text-secondary">
                  {dashboardData?.hafalan?.belum_setor?.length || 0}
                </span>
              </div>
            </div>
          </Card>

          {dashboardData?.hafalan?.setoran_hari_ini && dashboardData.hafalan.setoran_hari_ini.length > 0 && (
            <Card>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
                Santri Sudah Setor ({dashboardData.hafalan.setoran_hari_ini.length})
              </h3>
              <div className="flex flex-wrap gap-1">
                {dashboardData.hafalan.setoran_hari_ini.map((santri: any, index: number) => (
                  <div key={index} className="relative group" title={santri.nama_lengkap_santri || 'Nama tidak tersedia'}>
                    <img
                      src={`https://pesantrenteknologi.id/system//assets/uploads/fotosantri/${santri.foto_santri}`}
                      alt={santri.nama_lengkap_santri || 'Santri'}
                      className="w-10 h-10 rounded-full object-cover border-2 border-blue-200"
                    />
                  </div>
                ))}
              </div>
            </Card>
          )}

          {dashboardData?.hafalan?.belum_setor && dashboardData.hafalan.belum_setor.length > 0 && (
            <Card>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-red-600" />
                Santri Belum Setor ({dashboardData.hafalan.belum_setor.length})
              </h3>
              <div className="flex flex-wrap gap-1">
                {dashboardData.hafalan.belum_setor.map((santri, index) => (
                  <div key={index} className="relative group" title={santri.nama_panggilan_santri || 'Nama tidak tersedia'}>
                    <img
                      src={`https://pesantrenteknologi.id/system//assets/uploads/fotosantri/${santri.foto_santri}`}
                      alt={santri.nama_panggilan_santri}
                      className="w-10 h-10 rounded-full object-cover border-2 border-red-200"
                    />
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* Right Column: Laporan Harian */}
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold flex items-center">
              <Clock className="h-5 w-5 mr-2 text-blue-600" />
              Laporan Harian
            </h3>
            <div className="flex items-center text-sm bg-gray-100 px-3 py-1 rounded-full">
              <CalendarDays className="h-4 w-4 mr-1.5 text-gray-500" />
              <span className="font-medium text-gray-600">{today}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-600">Selesai</p>
              <p className="text-xl font-bold text-blue-600">
                {dashboardData?.laporan_harian?.chart?.selesai || 0}
              </p>
            </div>
            <div className="text-center p-3 bg-yellow-50 rounded-lg">
              <p className="text-sm text-gray-600">Belum Selesai</p>
              <p className="text-xl font-bold text-yellow-600">
                {dashboardData?.laporan_harian?.chart?.belum_selesai || 0}
              </p>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600">Pending Besok</p>
              <p className="text-xl font-bold text-blue-600">
                {dashboardData?.laporan_harian?.chart?.pending_besok || 0}
              </p>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <p className="text-sm text-gray-600">Tidak Selesai</p>
              <p className="text-xl font-bold text-red-600">
                {dashboardData?.laporan_harian?.chart?.tidak_selesai || 0}
              </p>
            </div>
          </div>

          <h4 className="text-md font-semibold mb-3 text-gray-700">Laporan Produktif Hari Ini</h4>
          <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
            {dashboardData?.laporan_harian?.laporan?.map((laporan, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg border flex items-start space-x-3">
                <img
                  src={`https://pesantrenteknologi.id/system//assets/uploads/fotosantri/${laporan.foto_santri}`}
                  alt={laporan.nama_lengkap_santri}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-sm text-gray-800">{laporan.nama_lengkap_santri}</p>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusClass(laporan.status)}`}>
                      {laporan.status}
                    </span>
                  </div>
                  <div 
                    className="text-xs text-gray-600 mt-1 prose prose-sm"
                    dangerouslySetInnerHTML={{ __html: laporan.target_daily }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Projects Section */}
      <Card>
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Building className="h-5 w-5 mr-2 text-purple-600" />
          Proyek Aktif ({dashboardData?.proyek?.length || 0})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dashboardData?.proyek?.map((project) => (
            <div key={project.id_project} className="p-4 bg-gray-50 rounded-lg border">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-sm">{project.nama_project}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  project.progress_project === 'Work in Progress' 
                    ? 'bg-yellow-100 text-yellow-800'
                    : project.progress_project === 'Completed'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {project.progress_project}
                </span>
              </div>
              <p className="text-xs text-gray-600 mb-2">{project.jenis_project}</p>
              <p className="text-xs text-gray-500 mb-3">
                {project.start_project} - {project.deadline_project}
              </p>
              <div className="flex items-center space-x-1">
                {project.team?.slice(0, 3).map((member, index) => (
                  <img
                    key={index}
                    src={`https://pesantrenteknologi.id/system//assets/uploads/fotosantri/${member.foto}`}
                    alt={member.nama}
                    className="w-6 h-6 rounded-full object-cover border border-white"
                    title={member.nama}
                  />
                ))}
                {project.team?.length > 3 && (
                  <span className="text-xs text-gray-500 ml-1">
                    +{project.team.length - 3} lainnya
                  </span>
                )}
              </div>
            </div>
          )) || (
            <p className="text-gray-500 text-center py-4 col-span-full">Tidak ada proyek aktif</p>
          )}
        </div>
      </Card>

      {/* Presensi Harian Section */}
      <Card>
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-indigo-600" />
          Presensi Harian
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Santri</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shubuh</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Waktu Produktif</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dzuhur</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ashar</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Maghrib-Isya</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dashboardData?.presensi_harian?.map((presensi, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{presensi.nama_santri}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{renderAttendanceStatus(presensi.Shubuh, presensi.waktu_shubuh)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{renderAttendanceStatus(presensi['Waktu Produktif'], presensi.waktu_produktif)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{renderAttendanceStatus(presensi.Dzuhur, presensi.waktu_dzuhur)}</td>
                  <td className="px-6 py-4 whitespace-nowrDateap text-sm text-gray-500">{renderAttendanceStatus(presensi.Ashar, presensi.waktu_ashar)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{renderAttendanceStatus(presensi['Maghrib-Isya'], presensi.waktu_maghrib_isya)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
