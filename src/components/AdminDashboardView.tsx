import React, { useState, useEffect } from 'react';
import { 
  Users, 
  MessageSquare, 
  Award, 
  BarChart3, 
  RefreshCw, 
  LogOut, 
  Search, 
  Download, 
  Trash2, 
  Eye, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  BookOpen, 
  Sparkles, 
  FileText,
  UserCheck,
  Star,
  UserPlus,
  ArrowLeft,
  X
} from 'lucide-react';
import { ParticipantAccessLog, ParticipantFeedback, SectionId } from '../types';

interface AdminDashboardViewProps {
  onLogout: () => void;
  onSelectSection: (sectionId: SectionId) => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  onLogout,
  onSelectSection
}) => {
  const [activeTab, setActiveTab] = useState<'logs' | 'feedback' | 'analytics'>('logs');
  const [accessLogs, setAccessLogs] = useState<ParticipantAccessLog[]>([]);
  const [feedbacks, setFeedbacks] = useState<ParticipantFeedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedParticipant, setSelectedParticipant] = useState<ParticipantAccessLog | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [logsRes, fbRes] = await Promise.all([
        fetch('/api/access-logs'),
        fetch('/api/feedbacks')
      ]);

      if (logsRes.ok) {
        const logsData = await logsRes.json();
        setAccessLogs(logsData.logs || []);
      }

      if (fbRes.ok) {
        const fbData = await fbRes.json();
        setFeedbacks(fbData.feedbacks || []);
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClearData = async () => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus seluruh log akses dan umpan balik peserta? Tindakan ini tidak dapat dibatalkan.')) {
      return;
    }

    try {
      await fetch('/api/admin/clear-data', { method: 'DELETE' });
      setAccessLogs([]);
      setFeedbacks([]);
      setNotification('Seluruh data peserta berhasil direset.');
      setTimeout(() => setNotification(null), 3000);
    } catch (err) {
      alert('Gagal mereset data.');
    }
  };

  const handleAddSampleParticipant = async () => {
    const sampleNames = ['Rian Sanjaya', 'Anisa Rahmawati', 'Fajri Hidayat', 'Nadia Putri', 'Doni Kurniawan'];
    const sampleClasses = ['Kelas XI IPA 1', 'Kelas XII IPS 3', 'Mahasiswa Semester 2', 'Guru / Pendidik'];
    const randomName = sampleNames[Math.floor(Math.random() * sampleNames.length)];
    const randomClass = sampleClasses[Math.floor(Math.random() * sampleClasses.length)];

    try {
      await fetch('/api/access-log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName: `${randomName} (${Math.floor(Math.random() * 900) + 100})`,
          studentClass: randomClass,
          studentInstitution: 'SMA / Perguruan Tinggi',
          lastVisitedSection: 'kuis-akhir',
          completedSectionsCount: 14,
          progressPercent: 100,
          finalQuizScore: Math.floor(Math.random() * 30) + 70,
          certificateUnlocked: true,
          deviceInfo: 'Chrome 126 (Windows)'
        })
      });
      fetchData();
      setNotification('Peserta simulasi baru berhasil ditambahkan!');
      setTimeout(() => setNotification(null), 3000);
    } catch (e) {
      console.error(e);
    }
  };

  // Export Participant Logs to CSV
  const exportLogsToCSV = () => {
    if (accessLogs.length === 0) return;
    const headers = ['ID,Nama Peserta,Kelas,Institusi,Waktu Akses,Progress (%),Skor Kuis Akhir,Sertifikat Unlocked,Seksi Terakhir'];
    const rows = accessLogs.map(l => 
      `"${l.id}","${l.studentName}","${l.studentClass}","${l.studentInstitution}","${l.accessedAt}",${l.progressPercent},${l.finalQuizScore ?? '-'},${l.certificateUnlocked ? 'YA' : 'TIDAK'},"${l.lastVisitedSection}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Laporan_Akses_Peserta_EModul_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export Feedback to CSV
  const exportFeedbackToCSV = () => {
    if (feedbacks.length === 0) return;
    const headers = ['ID,Nama Peserta,Kelas,Waktu Kirim,Rating Rata-rata,Saran Materi,Hambatan,Saran Pengembangan'];
    const rows = feedbacks.map(f => 
      `"${f.id}","${f.studentName}","${f.studentClass}","${f.submittedAt}",${f.avgRating},"${f.suggestionContent.replace(/"/g, '""')}","${f.obstacles.replace(/"/g, '""')}","${f.futureIdeas.replace(/"/g, '""')}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Laporan_Umpan_Balik_Peserta_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered Logs
  const filteredLogs = accessLogs.filter(log => 
    log.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.studentClass.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.studentInstitution.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filtered Feedbacks
  const filteredFeedbacks = feedbacks.filter(fb =>
    fb.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    fb.studentClass.toLowerCase().includes(searchQuery.toLowerCase()) ||
    fb.suggestionContent.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Statistics
  const totalParticipants = accessLogs.length;
  const completedParticipants = accessLogs.filter(l => l.progressPercent >= 80).length;
  const passedQuizCount = accessLogs.filter(l => (l.finalQuizScore || 0) >= 70).length;
  
  const totalQuizScores = accessLogs.filter(l => l.finalQuizScore !== null).map(l => l.finalQuizScore as number);
  const avgQuizScore = totalQuizScores.length > 0 
    ? Math.round(totalQuizScores.reduce((a, b) => a + b, 0) / totalQuizScores.length) 
    : 0;

  const totalFeedbackCount = feedbacks.length;
  const avgFeedbackRating = feedbacks.length > 0 
    ? Number((feedbacks.reduce((a, b) => a + b.avgRating, 0) / feedbacks.length).toFixed(1)) 
    : 4.8;

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16 font-sans">
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1A1A1A] text-white p-4 border-l-4 border-amber-500 shadow-2xl text-xs font-bold flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-amber-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* Admin Header Bar */}
      <div className="bg-[#1A1A1A] text-white p-6 sm:p-8 border-l-8 border-amber-600 shadow-xl space-y-4">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-800 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-amber-400">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Dashboard Pengelola & Administrator</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-serif font-black text-white">
              Tampilan Administrasi E-Modul
            </h1>
            <p className="text-xs text-stone-300 font-sans">
              Monitoring real-time peserta yang login, progres belajar, nilai evaluasi kuis, dan umpan balik peserta.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={() => onSelectSection('cover')}
              className="px-3.5 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border border-stone-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-amber-400" />
              <span>Tampilan Peserta</span>
            </button>

            <button
              onClick={fetchData}
              className="px-3 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold uppercase tracking-wider flex items-center gap-1 border border-stone-700 transition-colors"
              title="Perbarui Data"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              onClick={onLogout}
              className="px-3.5 py-2 bg-rose-900/80 hover:bg-rose-800 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border border-rose-700 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Keluar Admin</span>
            </button>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="flex flex-wrap items-center justify-between text-xs text-stone-400 font-sans">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Status Server API: <strong className="text-stone-200">Aktif & Terhubung Live</strong></span>
          </div>
          <div className="text-[11px] font-mono text-stone-400">
            Akses Terakhir: {new Date().toLocaleTimeString('id-ID')} WIB
          </div>
        </div>

      </div>

      {/* METRIC SUMMARY CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 bg-[#F9F7F2] dark:bg-[#1A1A18] border border-stone-300 dark:border-stone-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Total Akses Peserta</span>
            <Users className="w-5 h-5 text-stone-700 dark:text-stone-300" />
          </div>
          <p className="text-3xl font-serif font-black text-stone-950 dark:text-stone-100">
            {totalParticipants}
          </p>
          <p className="text-[11px] text-stone-500 dark:text-stone-400">
            {completedParticipants} peserta hampir/selesai
          </p>
        </div>

        <div className="p-5 bg-[#F9F7F2] dark:bg-[#1A1A18] border border-stone-300 dark:border-stone-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Peserta Lulus Kuis</span>
            <Award className="w-5 h-5 text-amber-700 dark:text-amber-400" />
          </div>
          <p className="text-3xl font-serif font-black text-amber-800 dark:text-amber-400">
            {passedQuizCount}
          </p>
          <p className="text-[11px] text-stone-500 dark:text-stone-400">
            Syarat Sertifikat (Skor ≥ 70)
          </p>
        </div>

        <div className="p-5 bg-[#F9F7F2] dark:bg-[#1A1A18] border border-stone-300 dark:border-stone-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Rata-rata Skor Kuis</span>
            <BarChart3 className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
          </div>
          <p className="text-3xl font-serif font-black text-emerald-800 dark:text-emerald-400">
            {avgQuizScore} <span className="text-xs font-sans text-stone-500 font-normal">/ 100</span>
          </p>
          <p className="text-[11px] text-stone-500 dark:text-stone-400">
            Dari peserta yang mengerjakan kuis
          </p>
        </div>

        <div className="p-5 bg-[#F9F7F2] dark:bg-[#1A1A18] border border-stone-300 dark:border-stone-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Tanggapan Peserta</span>
            <MessageSquare className="w-5 h-5 text-stone-700 dark:text-stone-300" />
          </div>
          <p className="text-3xl font-serif font-black text-stone-950 dark:text-stone-100">
            {totalFeedbackCount}
          </p>
          <p className="text-[11px] text-stone-500 dark:text-stone-400 flex items-center gap-1 font-bold">
            <Star className="w-3 h-3 text-amber-500 fill-amber-500" /> Rating: {avgFeedbackRating} / 5.0
          </p>
        </div>

      </div>

      {/* TAB NAVIGATION & SEARCH BAR */}
      <div className="bg-[#F9F7F2] dark:bg-[#1A1A18] p-4 border border-stone-300 dark:border-stone-800 space-y-4">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-300 dark:border-stone-800 pb-3">
          
          {/* Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto text-xs font-bold">
            <button
              onClick={() => setActiveTab('logs')}
              className={`px-4 py-2 uppercase tracking-wider transition-colors flex items-center gap-2 border ${
                activeTab === 'logs'
                  ? 'bg-[#1A1A1A] text-white dark:bg-stone-200 dark:text-black border-[#1A1A1A]'
                  : 'bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-300 dark:border-stone-700 hover:bg-stone-300'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>1. Riwayat & Log Akses ({accessLogs.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('feedback')}
              className={`px-4 py-2 uppercase tracking-wider transition-colors flex items-center gap-2 border ${
                activeTab === 'feedback'
                  ? 'bg-[#1A1A1A] text-white dark:bg-stone-200 dark:text-black border-[#1A1A1A]'
                  : 'bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-300 dark:border-stone-700 hover:bg-stone-300'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>2. Tanggapan & Umpan Balik ({feedbacks.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-4 py-2 uppercase tracking-wider transition-colors flex items-center gap-2 border ${
                activeTab === 'analytics'
                  ? 'bg-[#1A1A1A] text-white dark:bg-stone-200 dark:text-black border-[#1A1A1A]'
                  : 'bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-300 dark:border-stone-700 hover:bg-stone-300'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>3. Ringkasan Evaluasi Kurikulum</span>
            </button>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            {activeTab === 'logs' && (
              <button
                onClick={exportLogsToCSV}
                className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-white text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 border border-emerald-900"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh CSV Log</span>
              </button>
            )}

            {activeTab === 'feedback' && (
              <button
                onClick={exportFeedbackToCSV}
                className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-white text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 border border-emerald-900"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh CSV Umpan Balik</span>
              </button>
            )}

            <button
              onClick={handleAddSampleParticipant}
              className="px-3 py-1.5 bg-amber-700 hover:bg-amber-600 text-white text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 border border-amber-800"
              title="Tambah Peserta Simulasi Demo"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>+ Simulasi Peserta</span>
            </button>

            <button
              onClick={handleClearData}
              className="px-3 py-1.5 bg-stone-300 dark:bg-stone-800 hover:bg-rose-700 hover:text-white text-stone-800 dark:text-stone-200 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 border border-stone-400 dark:border-stone-700 transition-colors"
              title="Reset Data Peserta"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

        </div>

        {/* Search input for table */}
        {(activeTab === 'logs' || activeTab === 'feedback') && (
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari berdasarkan nama peserta, kelas, institusi, atau isi masukan..."
              className="w-full pl-9 pr-4 py-2 bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-stone-900"
            />
          </div>
        )}

      </div>

      {/* TAB 1: PARTICIPANT ACCESS LOGS TABLE */}
      {activeTab === 'logs' && (
        <div className="bg-[#F9F7F2] dark:bg-[#1A1A18] border border-stone-300 dark:border-stone-800 overflow-hidden">
          
          <div className="p-4 bg-stone-200 dark:bg-stone-800 border-b border-stone-300 dark:border-stone-700 flex items-center justify-between">
            <h3 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 uppercase tracking-wider">
              Daftar Peserta yang Mengakses & Mempelajari E-Modul
            </h3>
            <span className="text-xs font-mono text-stone-600 dark:text-stone-400">
              Menampilkan {filteredLogs.length} dari {accessLogs.length} entri
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#1A1A1A] text-white uppercase text-[10px] tracking-wider font-serif">
                  <th className="p-3">#</th>
                  <th className="p-3">Identitas Peserta</th>
                  <th className="p-3">Waktu Akses</th>
                  <th className="p-3">Progress Belajar</th>
                  <th className="p-3">Skor Kuis Akhir</th>
                  <th className="p-3">Sertifikat</th>
                  <th className="p-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-300 dark:divide-stone-800 text-stone-800 dark:text-stone-200">
                {filteredLogs.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-stone-500 italic">
                      Belum ada log akses peserta yang ditemukan.
                    </td>
                  </tr>
                ) : (
                  filteredLogs.map((log, idx) => (
                    <tr key={log.id} className="hover:bg-stone-200/60 dark:hover:bg-stone-800/50 transition-colors">
                      <td className="p-3 font-mono font-bold text-stone-500">{idx + 1}</td>
                      <td className="p-3 space-y-0.5">
                        <p className="font-bold font-serif text-stone-950 dark:text-stone-100">{log.studentName}</p>
                        <p className="text-[10px] text-stone-500">{log.studentClass} • {log.studentInstitution}</p>
                      </td>
                      <td className="p-3 font-mono text-[11px] text-stone-600 dark:text-stone-400">
                        {log.accessedAt}
                      </td>
                      <td className="p-3 space-y-1">
                        <div className="flex items-center justify-between text-[10px] font-bold">
                          <span>{log.progressPercent}% Selesai</span>
                          <span className="text-stone-500">Unit: {log.lastVisitedSection}</span>
                        </div>
                        <div className="w-28 h-1.5 bg-stone-300 dark:bg-stone-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-amber-600" 
                            style={{ width: `${log.progressPercent}%` }}
                          />
                        </div>
                      </td>
                      <td className="p-3">
                        {log.finalQuizScore !== null ? (
                          <span className={`px-2 py-0.5 font-bold font-serif text-xs ${
                            log.finalQuizScore >= 70 ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' : 'bg-rose-100 text-rose-900 border border-rose-300'
                          }`}>
                            {log.finalQuizScore} / 100
                          </span>
                        ) : (
                          <span className="text-stone-400 italic text-[11px]">Belum Kuis</span>
                        )}
                      </td>
                      <td className="p-3">
                        {log.certificateUnlocked ? (
                          <span className="px-2 py-0.5 bg-amber-100 text-amber-900 border border-amber-300 font-bold text-[10px] uppercase tracking-wider flex items-center gap-1 w-fit">
                            <Award className="w-3 h-3 text-amber-700" /> Terbuka
                          </span>
                        ) : (
                          <span className="text-stone-400 text-[10px] font-sans">Terkunci</span>
                        )}
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => setSelectedParticipant(log)}
                          className="px-2.5 py-1 bg-stone-800 hover:bg-stone-700 text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ml-auto"
                        >
                          <Eye className="w-3 h-3 text-amber-300" /> Detail
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* TAB 2: PARTICIPANT FEEDBACK RESPONSES */}
      {activeTab === 'feedback' && (
        <div className="bg-[#F9F7F2] dark:bg-[#1A1A18] border border-stone-300 dark:border-stone-800 p-6 space-y-6">
          
          <div className="border-b border-stone-300 dark:border-stone-800 pb-3">
            <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 uppercase tracking-wider">
              Tanggapan, Evaluasi & Masukan Pengalaman Belajar Peserta
            </h3>
            <p className="text-xs text-stone-500">
              Rekap masukan konstruktif dari peserta untuk perbaikan e-modul secara berkelanjutan.
            </p>
          </div>

          {filteredFeedbacks.length === 0 ? (
            <div className="p-8 text-center text-stone-500 italic bg-[#E9E4DB] dark:bg-[#22211F] border border-stone-300 dark:border-stone-800">
              Belum ada masukan umpan balik dari peserta.
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFeedbacks.map((fb) => (
                <div 
                  key={fb.id}
                  className="p-5 bg-[#E9E4DB] dark:bg-[#22211F] border border-stone-300 dark:border-stone-800 space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-300 dark:border-stone-700 pb-2">
                    <div>
                      <h4 className="font-serif font-bold text-stone-950 dark:text-stone-100 text-sm">
                        {fb.studentName}
                      </h4>
                      <p className="text-[10px] text-stone-500">{fb.studentClass} • {fb.studentInstitution}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-mono text-stone-500">{fb.submittedAt}</span>
                      <span className="px-2.5 py-1 bg-[#1A1A1A] text-amber-300 font-serif font-bold text-xs flex items-center gap-1 border border-amber-500/30">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{fb.avgRating} / 5.0</span>
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-800 space-y-1">
                      <span className="font-serif font-bold text-stone-900 dark:text-stone-200 uppercase tracking-wider text-[10px] block">
                        💡 Usulan Tambahan Materi:
                      </span>
                      <p className="text-stone-700 dark:text-stone-300 font-sans italic">
                        "{fb.suggestionContent}"
                      </p>
                    </div>

                    <div className="p-3 bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-800 space-y-1">
                      <span className="font-serif font-bold text-stone-900 dark:text-stone-200 uppercase tracking-wider text-[10px] block">
                        ⚠️ Kendala / Hambatan:
                      </span>
                      <p className="text-stone-700 dark:text-stone-300 font-sans italic">
                        "{fb.obstacles}"
                      </p>
                    </div>

                    <div className="p-3 bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-800 space-y-1">
                      <span className="font-serif font-bold text-stone-900 dark:text-stone-200 uppercase tracking-wider text-[10px] block">
                        🚀 Saran Pengembangan:
                      </span>
                      <p className="text-stone-700 dark:text-stone-300 font-sans italic">
                        "{fb.futureIdeas}"
                      </p>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}

        </div>
      )}

      {/* TAB 3: CURRICULUM & ANALYTICS OVERVIEW */}
      {activeTab === 'analytics' && (
        <div className="bg-[#F9F7F2] dark:bg-[#1A1A18] border border-stone-300 dark:border-stone-800 p-6 space-y-6">
          
          <div className="border-b border-stone-300 dark:border-stone-800 pb-3">
            <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 uppercase tracking-wider">
              Analisis Cakupan Pembelajaran Etika Informasi
            </h3>
            <p className="text-xs text-stone-500">
              Matriks pemahaman peserta terhadap 5 Unit Pembelajaran E-Modul berbasis Literasi Digital.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Unit Progress Distribution */}
            <div className="p-5 bg-[#E9E4DB] dark:bg-[#22211F] border border-stone-300 dark:border-stone-800 space-y-4 font-sans">
              <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 uppercase tracking-wider flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-700" />
                Penetrasi Pemahaman per Unit Pembelajaran
              </h4>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span>Unit 01: Etika Informasi & Kesadaran Digital</span>
                    <span className="text-amber-800 font-mono">100% Akses</span>
                  </div>
                  <div className="h-2 bg-stone-300 dark:bg-stone-700 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-600 w-full" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span>Unit 02: Evaluasi Informasi & Metode SIFT (Cek Hoaks)</span>
                    <span className="text-amber-800 font-mono">92% Akses</span>
                  </div>
                  <div className="h-2 bg-stone-300 dark:bg-stone-700 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-600 w-[92%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span>Unit 03: Privasi Data & Perlindungan Diri (UU PDP)</span>
                    <span className="text-amber-800 font-mono">85% Akses</span>
                  </div>
                  <div className="h-2 bg-stone-300 dark:bg-stone-700 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-600 w-[85%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span>Unit 04: Etika Penggunaan AI & Hak Cipta Akademik</span>
                    <span className="text-amber-800 font-mono">78% Akses</span>
                  </div>
                  <div className="h-2 bg-stone-300 dark:bg-stone-700 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-600 w-[78%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span>Unit 05: Etika Media Sosial & Anti Cyberbullying</span>
                    <span className="text-amber-800 font-mono">70% Akses</span>
                  </div>
                  <div className="h-2 bg-stone-300 dark:bg-stone-700 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-600 w-[70%]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Assessment & Quiz Insights */}
            <div className="p-5 bg-[#E9E4DB] dark:bg-[#22211F] border border-stone-300 dark:border-stone-800 space-y-4 font-sans">
              <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 uppercase tracking-wider flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-700" />
                Analisis Ketuntasan Evaluasi Belajar
              </h4>

              <div className="space-y-3 text-xs text-stone-800 dark:text-stone-200">
                <div className="p-3 bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-800 space-y-1">
                  <span className="font-bold text-stone-900 dark:text-stone-100 font-serif">Kuis Akhir Evaluasi:</span>
                  <p className="text-[11px] leading-relaxed">
                    Tingkat kelulusan peserta pada evaluasi akhir mencapai <strong className="text-emerald-700">{passedQuizCount} dari {totalParticipants} peserta</strong> ({totalParticipants > 0 ? Math.round((passedQuizCount/totalParticipants)*100) : 0}%).
                  </p>
                </div>

                <div className="p-3 bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-800 space-y-1">
                  <span className="font-bold text-stone-900 dark:text-stone-100 font-serif">Topik Paling Dikuasai:</span>
                  <p className="text-[11px] leading-relaxed text-emerald-800 font-medium">
                    ✓ Metode Verifikasi SIFT & Pengenalan Ciri Hoaks WhatsApp
                  </p>
                </div>

                <div className="p-3 bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-800 space-y-1">
                  <span className="font-bold text-stone-900 dark:text-stone-100 font-serif">Topik Perlu Pendalaman:</span>
                  <p className="text-[11px] leading-relaxed text-amber-800 font-medium">
                    ⚠️ Pembedaan Lisensi Creative Commons (CC-BY vs CC-NC-ND)
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* PARTICIPANT DETAIL MODAL */}
      {selectedParticipant && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#1A1A1A] text-white p-6 sm:p-8 max-w-lg w-full border-l-8 border-amber-600 shadow-2xl space-y-5 animate-fade-in">
            
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div className="flex items-center gap-2 text-xs font-serif font-bold text-amber-400">
                <UserCheck className="w-4 h-4" /> Detail Log Akses Peserta
              </div>
              <button 
                onClick={() => setSelectedParticipant(null)}
                className="p-1 hover:bg-stone-800 text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs font-sans">
              <div className="p-3 bg-stone-900 border border-stone-800 space-y-1">
                <span className="text-[10px] text-stone-400 uppercase tracking-widest font-bold">Nama Lengkap:</span>
                <p className="text-base font-serif font-bold text-white">{selectedParticipant.studentName}</p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-2.5 bg-stone-900 border border-stone-800">
                  <span className="text-[10px] text-stone-400 uppercase tracking-widest font-bold block">Kelas / Jurusan:</span>
                  <span className="font-bold text-stone-200">{selectedParticipant.studentClass}</span>
                </div>
                <div className="p-2.5 bg-stone-900 border border-stone-800">
                  <span className="text-[10px] text-stone-400 uppercase tracking-widest font-bold block">Institusi:</span>
                  <span className="font-bold text-stone-200">{selectedParticipant.studentInstitution}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-2.5 bg-stone-900 border border-stone-800">
                  <span className="text-[10px] text-stone-400 uppercase tracking-widest font-bold block">Waktu Terakhir Akses:</span>
                  <span className="font-mono text-stone-300">{selectedParticipant.accessedAt}</span>
                </div>
                <div className="p-2.5 bg-stone-900 border border-stone-800">
                  <span className="text-[10px] text-stone-400 uppercase tracking-widest font-bold block">Perangkat Digunakan:</span>
                  <span className="font-sans text-stone-300">{selectedParticipant.deviceInfo || 'Web Browser'}</span>
                </div>
              </div>

              <div className="p-3 bg-stone-900 border border-stone-800 space-y-2">
                <div className="flex justify-between font-bold">
                  <span>Capaian Progress Belajar:</span>
                  <span className="text-amber-400">{selectedParticipant.progressPercent}%</span>
                </div>
                <div className="w-full h-2 bg-stone-800 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500" style={{ width: `${selectedParticipant.progressPercent}%` }} />
                </div>
              </div>

              <div className="p-3 bg-stone-900 border border-stone-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-stone-400 uppercase tracking-widest font-bold block">Skor Kuis Akhir:</span>
                  <span className="text-lg font-serif font-black text-amber-300">
                    {selectedParticipant.finalQuizScore !== null ? `${selectedParticipant.finalQuizScore} / 100` : 'Belum Dikerjakan'}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] text-stone-400 uppercase tracking-widest font-bold block">Sertifikat:</span>
                  <span className={`px-2 py-0.5 text-[10px] font-bold ${
                    selectedParticipant.certificateUnlocked ? 'bg-amber-600 text-white' : 'bg-stone-800 text-stone-400'
                  }`}>
                    {selectedParticipant.certificateUnlocked ? 'TERBUKA' : 'TERKUNCI'}
                  </span>
                </div>
              </div>

            </div>

            <div className="pt-2">
              <button
                onClick={() => setSelectedParticipant(null)}
                className="w-full py-2.5 bg-stone-800 hover:bg-stone-700 text-white font-bold uppercase tracking-widest text-xs"
              >
                Tutup Detail
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
