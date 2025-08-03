import React from 'react';
import useApi from '../../hooks/useApi';
import { AcademicProgress as AcademicProgressType, SantriApiResponse } from '../../types';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { ErrorMessage } from '../ui/ErrorMessage';
import { Card } from '../ui/Card';
import { BookOpen, Trophy,  TrendingUp, TrendingDown, Building, User, Home } from 'lucide-react';

export const AcademicProgress: React.FC = () => {
  const { data, loading, error, refetch } = useApi<AcademicProgressType>('https://pesantrenteknologi.id/system/api/akademik');
  const { data: santriMondokData, loading: santriMondokLoading, error: santriMondokError, refetch: refetchSantriMondok } = useApi<SantriApiResponse>('https://pesantrenteknologi.id/system/api/get/santri/status_santri/mondok');

  if (loading || santriMondokLoading) return <LoadingSpinner className="py-12" />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;
  if (santriMondokError) return <ErrorMessage message={santriMondokError} onRetry={refetchSantriMondok} />;

  const academicData = data?.data;

  const getSantriDomisili = (namaLengkap: string): string => {
    const santri = santriMondokData?.data.find(s => s.nama_lengkap_santri === namaLengkap);
    return santri ? santri.kota_domisili_sekarang_santri : 'N/A';
  };

  const makassarSantriIzin = academicData?.tahfidz_bulan_ini?.filter(santri => {
    const domisili = getSantriDomisili(santri.nama_lengkap_santri);
    const percentage = (parseFloat(santri.jumlah_setoran_shubuh) / 20) * 100;
    return domisili.toLowerCase() === 'makassar' && percentage >= 100;
  });

  return (
    <div className="space-y-6">
      {/* Leadership Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <User className="h-5 w-5 mr-2" />
            Koordinator Akademik
          </h3>
          <div className="flex items-center space-x-3">
            {academicData?.pimpinan_akademik?.akademik?.foto_santri && (
              <img 
                src={`https://pesantrenteknologi.id/system//assets/uploads/fotosantri/${academicData.pimpinan_akademik.akademik.foto_santri}`}
                alt="Koordinator Akademik"
                className="w-12 h-12 rounded-full object-cover border-2 border-green-200"
              />
            )}
            <div>
              <p className="text-green-100 text-sm">{academicData?.pimpinan_akademik?.akademik?.nama_jabatan || 'N/A'}</p>
              <p className="text-lg font-bold">{academicData?.pimpinan_akademik?.akademik?.nama_lengkap_santri || 'N/A'}</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <User className="h-5 w-5 mr-2" />
            Koordinator Kesantrian
          </h3>
          <div className="flex items-center space-x-3">
            {academicData?.pimpinan_akademik?.kesantrian?.foto_santri && (
              <img 
                src={`https://pesantrenteknologi.id/system//assets/uploads/fotosantri/${academicData.pimpinan_akademik.kesantrian.foto_santri}`}
                alt="Koordinator Kesantrian"
                className="w-12 h-12 rounded-full object-cover border-2 border-blue-200"
              />
            )}
            <div>
              <p className="text-blue-100 text-sm">{academicData?.pimpinan_akademik?.kesantrian?.nama_jabatan || 'N/A'}</p>
              <p className="text-lg font-bold">{academicData?.pimpinan_akademik?.kesantrian?.nama_lengkap_santri || 'N/A'}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Tahfidz This Month */}
      <Card>
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
          Progres Hafalan Santri ({academicData?.tahfidz_bulan_ini?.length || 0} Santri)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {academicData?.tahfidz_bulan_ini?.map((santri, index) => {
            const progressData = academicData.progres_tahfidz_santri.find(p => p.nama_lengkap_santri === santri.nama_lengkap_santri);
            
            return (
              <div key={index} className="p-4 bg-gray-50 rounded-lg border flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <img
                      src={`https://pesantrenteknologi.id/system//assets/uploads/fotosantri/${santri.foto_santri}`}
                      alt={santri.nama_lengkap_santri}
                      className="w-14 h-14 rounded-full object-cover border-2 border-green-200"
                    />
                    <div>
                      <p className="font-bold text-base text-gray-800">{santri.nama_lengkap_santri}</p>
                      <p className="text-xs text-gray-500">Setoran bulan ini: {santri.juz_disetor}</p>
                    </div>
                  </div>

                  {/* Monthly Progress */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Progres Bulan Ini</h4>
                    <div className="flex justify-between w-full text-xs text-gray-600 mb-1">
                      <span>Setoran Shubuh: {santri.jumlah_setoran_shubuh}/20x</span>
                      <span className="font-bold">{((parseFloat(santri.jumlah_setoran_shubuh) / 20) * 100).toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-green-600 h-2.5 rounded-full"
                        style={{ width: `${((parseFloat(santri.jumlah_setoran_shubuh) / 20) * 100).toFixed(0)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Overall Progress */}
                {progressData && (
                  <div className="border-t pt-4 mt-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Progres Selama Mondok</h4>
                    <div className="space-y-2 text-xs text-gray-600">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Total Hafalan:</span>
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-bold">
                          {progressData.total_juz_hafalan} Juz
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Hafalan Baru: <span className="font-semibold">{progressData.jumlah_hafalan_baru}</span></span>
                        <span>Murojaah: <span className="font-semibold">{progressData.jumlah_murojaah}</span></span>
                      </div>
                      <div className="pt-1">
                        <p className="text-xs text-gray-500 mb-1.5">Juz Terhafal:</p>
                        <div className="flex flex-wrap gap-1">
                          {progressData.daftar_juz_terhafal?.split(', ').map((juz, juzIndex) => (
                            <span key={juzIndex} className="px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                              {juz}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          }) || (
            <p className="text-gray-500 text-center py-4 col-span-full">Belum ada data tahfidz bulan ini</p>
          )}
        </div>
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
          <p className="text-gray-700 text-sm">
            <span className="font-semibold">Catatan:</span> Santri yang berhasil menyelesaikan 20x setor hafalan shubuh (100%) tiap bulan akan mendapatkan <span className="text-blue-600 font-semibold">IZIN PULANG KE RUMAH</span>
          </p>
        </div>
      </Card>

      {/* Makassar Santri Izin Pulang Section */}
      {makassarSantriIzin && makassarSantriIzin.length > 0 && (
        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Home className="h-5 w-5 mr-2" />
            Santri Makassar Berhak Izin Pulang
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {makassarSantriIzin.map((santri, index) => (
              <div key={index} className="p-4 bg-purple-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <img
                    src={`https://pesantrenteknologi.id/system//assets/uploads/fotosantri/${santri.foto_santri}`}
                    alt={santri.nama_lengkap_santri}
                    className="w-12 h-12 rounded-full object-cover border-2 border-purple-200"
                  />
                  <div>
                    <p className="font-medium text-sm">{santri.nama_lengkap_santri}</p>
                    <p className="text-xs text-purple-100">{santri.juz_disetor}</p>
                  </div>
                </div>
                <p className="text-xs text-purple-100 mt-2">Setoran Shubuh: {((parseFloat(santri.jumlah_setoran_shubuh) / 20) * 100).toFixed(0)}%</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Musyrif Performance */}
      <Card>
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Trophy className="h-5 w-5 mr-2 text-yellow-600" />
          Kinerja Musyrif
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {academicData?.kinerja_musyrif?.slice(0, 4).map((musyrif, index) => {
            const musyrifSantri = santriMondokData?.data.find(s => s.nama_lengkap_santri === musyrif.nama_musyrif);
            const photoUrl = index === 2 
              ? "https://pesantrenteknologi.id/system//assets/uploads/fotosantri/41d75-pas-foto-santri_20250630_024523_0020.png"
              : musyrifSantri?.foto_santri 
                ? `https://pesantrenteknologi.id/system//assets/uploads/fotosantri/${musyrifSantri.foto_santri}`
                : null;

            return (
              <div key={index} className="bg-gray-50 rounded-lg border overflow-hidden flex shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="w-1/3">
                  {photoUrl ? (
                    <img
                      src={photoUrl}
                      alt={musyrif.nama_musyrif}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <User className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="w-2/3 p-4 flex flex-col justify-between">
                  <div>
                    <p className="font-bold text-gray-800 truncate">{musyrif.nama_musyrif}</p>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      {musyrif.persentase_kenaikan ? (
                        <div className="flex items-center">
                          {parseFloat(musyrif.persentase_kenaikan) >= 0 ? (
                            <TrendingUp className="h-4 w-4 text-blue-500 mr-1" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                          )}
                          <span className={`font-medium ${
                            parseFloat(musyrif.persentase_kenaikan) >= 0 ? 'text-blue-600' : 'text-red-600'
                          }`}>
                            {musyrif.persentase_kenaikan}%
                          </span>
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs mt-3">
                    <div>
                      <p className="font-semibold text-gray-700 text-sm">{musyrif.hari_ini}</p>
                      <p className="text-gray-500">Hari</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-700 text-sm">{musyrif.bulan_ini}</p>
                      <p className="text-gray-500">Bulan</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-700 text-sm">{musyrif.tahun_ini}</p>
                      <p className="text-gray-500">Tahun</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          }) || (
            <p className="text-gray-500 text-center py-4 col-span-full">Belum ada data kinerja musyrif</p>
          )}
        </div>
      </Card>

      {/* Projects Section */}
      <Card>
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Building className="h-5 w-5 mr-2 text-indigo-600" />
          Proyek Akademik ({academicData?.proyek?.total_proyek || 0} Total Proyek)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {academicData?.proyek?.daftar_proyek?.map((project) => (
            <div key={project.id_project} className="p-4 bg-gray-50 rounded-lg border">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">{project.nama_project}</h4>
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
              
              <div className="space-y-2 text-sm text-gray-600 mb-3">
                <div className="flex justify-between">
                  <span>Jenis:</span>
                  <span className="font-medium">{project.jenis_project}</span>
                </div>
                <div className="flex justify-between">
                  <span>Client:</span>
                  <span className="font-medium">{project.clients}</span>
                </div>
                <div className="flex justify-between">
                  <span>Deadline:</span>
                  <span className="font-medium">{new Date(project.deadline_project).toLocaleDateString('id-ID')}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-1">
                <span className="text-xs text-gray-600 mr-2">Tim:</span>
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
            <p className="text-gray-500 text-center py-4 col-span-full">Belum ada proyek akademik</p>
          )}
        </div>
      </Card>
    </div>
  );
};