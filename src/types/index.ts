export interface User {
  id: string;
  name: string;
  email: string;
  role: 'parent' | 'admin';
}

export interface Santri {
  id: string;
  name: string;
  status: string;
  class: string;
  dormitory: string;
  parent_name: string;
  phone: string;
  address: string;
  entry_date: string;
  foto_santri?: string; // Assuming this field exists for the photo
  konsentrasi?: string; // Assuming this field exists
  angkatan?: string; // Assuming this field exists
  kondisi_keluarga?: string; // Assuming this field exists
}

export interface SantriDetailData {
  id_santri: string;
  email_santri: string;
  nama_lengkap_santri: string;
  nama_panggilan_santri: string;
  status_santri: string;
  angkatan_santri: string;
  tempat_lahir_santri: string;
  tanggal_lahir_santri: string;
  alamat_lengkap_santri: string;
  asal_daerah_santri: string;
  kota_domisili_sekarang_santri: string;
  kondisi_keluarga_santri: string;
  anak_ke_santri: string;
  jumlah_saudara_santri: string;
  punya_tanggungan_keluarga_santri: string;
  izin_orang_tua_santri: string;
  konsentrasi_santri: string;
  alasan_mendaftar_santri: string;
  target_santri: string;
  hafalan_quran_santri: string;
  skill_kelebihan_santri: string;
  foto_santri: string;
  musyrif: string;
  user: string;
}

export interface SantriApiResponse {
  status: string;
  count: number;
  data: SantriDetailData[];
}

export interface HafalanRecord {
  juz_hafalan: string;
  status: string;
  tgl_tahfidz: string;
  wkt_nyetor: string;
}

export interface KegiatanProduktifRecord {
  id_daily: string;
  santri: string;
  tgl_daily: string;
  target_daily: string;
  link_belajar: string;
  file_daily: string;
  status: string;
  kendala: string;
}

export interface StatistikPresensi {
  on_time: number;
  telat: number;
  pertamax: number;
}

export interface PelanggaranRecord {
  // Define properties based on actual data if available, or leave as any[] for now
  // For example:
  // id_pelanggaran: string;
  // jenis_pelanggaran: string;
  // tanggal: string;
  // deskripsi: string;
}

export interface PerizinanStatistik {
  total_izin: number;
  izin_aktif: number;
  bulan_ini: number;
}

export interface PerizinanRiwayat {
  id_izin: string;
  santri: string;
  keperluan_izin: string;
  waktu_izin: string;
  selesai_izin: string;
  pemberi_izin: string;
  status_izin: string;
  created_at: string;
  updated_at: string;
}

export interface SantriProfile {
  id_santri: string;
  email_santri: string;
  nama_lengkap_santri: string;
  nama_panggilan_santri: string;
  status_santri: string;
  angkatan_santri: string;
  tempat_lahir_santri: string;
  tanggal_lahir_santri: string;
  alamat_lengkap_santri: string;
  asal_daerah_santri: string;
  kota_domisili_sekarang_santri: string;
  kondisi_keluarga_santri: string;
  anak_ke_santri: string;
  jumlah_saudara_santri: string;
  punya_tanggungan_keluarga_santri: string;
  izin_orang_tua_santri: string;
  konsentrasi_santri: string;
  alasan_mendaftar_santri: string;
  target_santri: string;
  hafalan_quran_santri: string;
  skill_kelebihan_santri: string;
  foto_santri: string;
  musyrif: string;
  user: string;
}

export interface SantriDetailResponse {
  status: string;
  data: {
    profile: SantriProfile;
    hafalan: {
      hari_ini: HafalanRecord[];
      pekan_terakhir: HafalanRecord[];
      bulan_ini: HafalanRecord[];
      tahun_ini: HafalanRecord[];
    };
    progres_tahfidz: Array<{
      total_juz_hafalan: string;
      daftar_juz_terhafal: string;
      jumlah_hafalan_baru: string;
      jumlah_murojaah: string;
      tanggal_awal_hafalan: string;
      tanggal_terakhir_hafalan: string;
    }>;
    kegiatan_produktif: KegiatanProduktifRecord[];
    statistik_presensi: StatistikPresensi;
    pelanggaran: PelanggaranRecord[];
    perizinan: {
      statistik: PerizinanStatistik;
      riwayat_terakhir: PerizinanRiwayat[];
    };
  };
}

export interface PresensiHarian {
  nama_santri: string;
  Shubuh: string;
  waktu_shubuh: string;
  "Waktu Produktif": string;
  waktu_produktif: string;
  Dzuhur: string;
  waktu_dzuhur: string;
  Ashar: string;
  waktu_ashar: string;
  "Maghrib-Isya": string;
  waktu_maghrib_isya: string;
}

export interface DashboardData {
  status: string;
  data: {
    pimpinan: {
      pimpinan_pondok: {
        nama: string;
        jabatan: string;
      };
      ketua_harian: {
        nama_lengkap_santri: string;
        foto_santri: string;
      };
    };
    statistik_utama: {
      santri: {
        aktif: number;
        total: number;
      };
      pelanggaran: {
        aktif: number;
        total: number;
      };
      izin: {
        aktif: number;
        total: number;
      };
      saldo_kas: number;
      keluhan_santri: {
        aktif: number;
        total: number;
      };
      inventaris: number;
      relasi: {
        aktif: number;
        total: number;
      };
    };
    hafalan: {
      setoran_hari_ini: any[];
      belum_setor: Array<{
        nama_panggilan_santri: string;
        foto_santri: string;
      }>;
    };
    laporan_harian: {
      laporan: any[];
      chart: {
        selesai: number;
        belum_selesai: number;
        pending_besok: number;
        tidak_selesai: number;
      };
    };
    proyek: Array<{
      id_project: string;
      nama_project: string;
      deskripsi: string;
      jenis_project: string;
      progress_project: string;
      start_project: string;
      deadline_project: string;
      clients: string;
      created_at: string;
      updated_at: string;
      team: Array<{
        nama: string;
        foto: string;
      }>;
    }>;
    presensi_harian: PresensiHarian[];
    jadwal_musyawarah: Array<{
      id_musyawarah: string;
      nama_musyawarah: string;
      tgl_musyawarah: string;
      jenis_musyawarah: string;
      pj_musyawarah: string;
      status_musyawarah: string;
      pembahasan_musyawarah: string;
      created_at: string;
      updated_at: string;
    }>;
  };
}

export interface DailyActivity {
  id: string;
  activity: string;
  time: string;
  status: 'completed' | 'pending' | 'missed';
  description: string;
}

export interface RecentUpdate {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: 'academic' | 'dormitory' | 'financial' | 'complaint';
}

export interface AcademicProgress {
  status: string;
  data: {
    pimpinan_akademik: {
      akademik: {
        nama_lengkap_santri: string;
        foto_santri: string;
        nama_jabatan: string;
      };
      kesantrian: {
        nama_lengkap_santri: string;
        foto_santri: string;
        nama_jabatan: string;
      };
    };
    tahfidz_bulan_ini: Array<{
      nama_lengkap_santri: string;
      foto_santri: string;
      jumlah_setoran_shubuh: string;
      juz_disetor: string;
    }>;
    kinerja_musyrif: Array<{
      nama_musyrif: string;
      hari_ini: string;
      bulan_ini: string;
      tahun_ini: string;
      persentase_kenaikan: string | null;
    }>;
    progres_tahfidz_santri: Array<{
      id_santri: string;
      nama_lengkap_santri: string;
      total_juz_hafalan: string;
      daftar_juz_terhafal: string;
      jumlah_hafalan_baru: string;
      jumlah_murojaah: string;
      tanggal_awal_hafalan: string;
      tanggal_terakhir_hafalan: string;
    }>;
    proyek: {
      daftar_proyek: Array<{
        id_project: string;
        nama_project: string;
        deskripsi: string;
        jenis_project: string;
        progress_project: string;
        start_project: string;
        deadline_project: string;
        clients: string;
        created_at: string;
        updated_at: string;
        team: Array<{
          nama: string;
          foto: string;
        }>;
      }>;
      total_proyek: number;
    };
  };
}

export interface HafalanProgress {
  surah: string;
  ayat_count: number;
  memorized_ayat: number;
  last_review: string;
  status: 'mastering' | 'reviewing' | 'completed';
}

export interface AcademicScore {
  subject: string;
  score: number;
  grade: string;
  semester: string;
}

export interface AttendanceRecord {
  date: string;
  status: 'present' | 'absent' | 'sick' | 'permission';
  activity: string;
}

export interface InventoryHumData {
  status: string;
  data: {
    pimpinan: {
      waka2: {
        nama_lengkap_santri: string;
        foto_santri: string;
        nama_jabatan: string;
      };
      umum: {
        nama_lengkap_santri: string;
        foto_santri: string;
        nama_jabatan: string;
      };
      humas: {
        nama_lengkap_santri: string;
        foto_santri: string;
        nama_jabatan: string;
      };
    };
    keluhan_santri: Complaint[];
    keuangan_terbaru: FinancialActivity[];
    saldo_terbaru: BalanceUpdate[];
    jumlah_inventaris: number;
    rekap_keuangan_bulanan: MonthlyFinancialSummary[];
  };
}

export interface FinancialActivity {
  tgl_keuangan: string;
  aktifitas_keuangan: string;
  nominal_keuangan: string;
  jenis_keuangan: string;
}

export interface BalanceUpdate {
  tgl_keuangan: string;
  keterangan: string;
}

export interface MonthlyFinancialSummary {
  Bulan: string;
  Pemasukan: string;
  Pengeluaran: string;
  Selisih: string;
}

export interface DormitoryCondition {
  room: string;
  condition: 'good' | 'needs_repair' | 'under_maintenance';
  last_cleaned: string;
  occupants: number;
  max_capacity: number;
}

export interface FinancialSummary {
  total_fees: number;
  paid_amount: number;
  outstanding: number;
  last_payment: string;
  payment_history: PaymentHistory[];
}

export interface PaymentHistory {
  date: string;
  amount: number;
  description: string;
  status: 'paid' | 'pending' | 'overdue';
}

export interface Complaint {
  id_masukan: string;
  created_at: string;
  masukan: string;
  status: string;
  nama_lengkap_santri: string;
  bidang_tujuan: string | null;
}

export interface KonsentrasiData {
  id_konsentrasi: string;
  nama_konsentrasi: string;
  deskripsi: string;
}

export interface KonsentrasiApiResponse {
  status: string;
  count: number;
  data: KonsentrasiData[];
}

export interface AngkatanData {
  id_angkatan: string;
  angkatan: string;
}

export interface AngkatanApiResponse {
  status: string;
  count: number;
  data: AngkatanData[];
}

export interface SantriDetail {
  id: string;
  name: string;
  status: string;
  class: string;
  dormitory: string;
  parent_name: string;
  phone: string;
  address: string;
  entry_date: string;
  academic_progress: AcademicProgress;
  financial_summary: FinancialSummary;
  health_records: HealthRecord[];
  disciplinary_records: DisciplinaryRecord[];
}

export interface HealthRecord {
  date: string;
  condition: string;
  treatment: string;
  doctor: string;
  notes: string;
}

export interface DisciplinaryRecord {
  date: string;
  violation: string;
  action: string;
  status: 'resolved' | 'pending';
}

export interface InventoryItem {
  id_inventaris: string;
  nama_inventaris: string;
  gambar: string;
  kondisi_inventaris: string;
  hak_milik: string;
  pj_inventaris: string;
  deskripsi: string;
  created_at: string;
  updated_at: string;
}