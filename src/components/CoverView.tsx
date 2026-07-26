import React, { useState, useRef } from 'react';
import { BookOpen, Sparkles, Map, Printer, CheckCircle, ArrowRight, ShieldCheck, Award, User, Lock, AlertTriangle, FileText, ArrowDown, LogOut } from 'lucide-react';
import { SectionId, UserProgress } from '../types';
import { EtikaInformasiLogo } from './EtikaInformasiLogo';

interface CoverViewProps {
  onSelectSection: (sectionId: SectionId) => void;
  userProgress: UserProgress;
  onUpdateProfile: (name: string, studentClass: string, studentEmail?: string) => void;
  identityNotice?: string | null;
  onParticipantLogout?: () => void;
}

export const CoverView: React.FC<CoverViewProps> = ({
  onSelectSection,
  userProgress,
  onUpdateProfile,
  identityNotice,
  onParticipantLogout
}) => {
  const [nameInput, setNameInput] = useState(userProgress.studentName || '');
  const [classInput, setClassInput] = useState(userProgress.studentClass || '');
  const [emailInput, setEmailInput] = useState(userProgress.studentEmail || '');
  const [isSaved, setIsSaved] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const hasIdentity = Boolean(userProgress.studentName && userProgress.studentName.trim().length > 0);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim()) {
      setFormError('Nama lengkap peserta wajib diisi!');
      return;
    }
    setFormError(null);
    onUpdateProfile(nameInput.trim(), classInput.trim(), emailInput.trim());
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 4000);
  };

  const handleProtectedAction = (targetSection: SectionId) => {
    if (!hasIdentity && !nameInput.trim()) {
      setFormError('Harap isi Nama Lengkap Anda di bawah ini dan klik "Simpan Identitas" terlebih dahulu!');
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    onSelectSection(targetSection);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      
      {/* Top Header info */}
      <div className="flex items-center justify-between text-[11px] uppercase tracking-widest text-stone-500 border-b border-stone-300 dark:border-stone-800 pb-3 font-sans font-bold">
        <span className="text-stone-900 dark:text-stone-100">Jelajah Digital — Etika Informasi</span>
        <span className="font-serif italic capitalize">E-Modul Literasi Digital 2026</span>
      </div>

      {/* IDENTITY LOCK WARNING BANNER IF NOT FILLED */}
      {!hasIdentity ? (
        <div className="p-4 bg-amber-500/10 border-2 border-amber-600 text-amber-900 dark:text-amber-200 flex items-start gap-3 shadow-md">
          <Lock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5 animate-bounce" />
          <div className="space-y-1 text-xs sm:text-sm font-sans">
            <p className="font-serif font-bold text-base text-stone-950 dark:text-stone-100 uppercase tracking-wide">
              🔒 WAJIB: AKSI SYARAT MEMBACA & MENGERJAKAN MODUL
            </p>
            <p className="leading-relaxed">
              Sesuai ketentuan pembelajaran e-modul, <strong>peserta tidak akan bisa membaca dan mengerjakan modul</strong> sebelum mengisikan <strong>Identitas Peserta/Pembaca</strong> pada formulir di bawah ini.
            </p>
          </div>
        </div>
      ) : (
        <div className="p-3 bg-emerald-500/10 border border-emerald-600 text-emerald-800 dark:text-emerald-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-sans shadow-xs">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              Identitas Peserta Terdaftar: <strong>{userProgress.studentName}</strong> {userProgress.studentClass ? `(${userProgress.studentClass})` : ''}
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="px-2.5 py-1 bg-emerald-700 text-white font-mono text-[10px] font-bold uppercase tracking-wider">
              AKSES MODUL TERBUKA
            </span>
            {onParticipantLogout && (
              <button
                onClick={onParticipantLogout}
                className="px-2.5 py-1 bg-rose-100 hover:bg-rose-200 text-rose-900 border border-rose-300 dark:bg-rose-950 dark:hover:bg-rose-900 dark:text-rose-200 dark:border-rose-800 font-bold text-[10px] uppercase tracking-wider flex items-center gap-1 transition-colors cursor-pointer"
                title="Keluar dari akun peserta ini"
              >
                <LogOut className="w-3 h-3 text-rose-600 dark:text-rose-400" />
                <span>Logout</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* IDENTITY REQUIRED NOTICE FROM NAVIGATION REDIRECT */}
      {identityNotice && (
        <div className="p-4 bg-rose-500/10 border-2 border-rose-600 text-rose-900 dark:text-rose-200 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm font-sans font-bold">
            {identityNotice}
          </div>
        </div>
      )}

      {/* Main Cover Card - Editorial Style */}
      <div className="bg-[#1A1A1A] text-[#F9F7F2] p-8 sm:p-14 border-l-8 border-amber-600 relative overflow-hidden text-center shadow-lg">
        
        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1 bg-stone-800 border border-stone-700 text-stone-200 text-[10px] uppercase tracking-[0.25em] font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>E-MODUL INTERAKTIF LITERASI DIGITAL</span>
          </div>

          {/* Main Title */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight text-white leading-tight">
              ETIKA INFORMASI
            </h1>
            <p className="text-base sm:text-lg font-serif italic text-amber-300 font-bold">
              E-Modul Etika Informasi berbasis Literasi Digital
            </p>
          </div>

          {/* Official Emblem Logo */}
          <div className="my-5 flex flex-col items-center justify-center gap-2">
            <EtikaInformasiLogo isDark className="w-36 sm:w-44 h-auto" />
            <p className="text-[11px] sm:text-xs text-stone-300 font-sans tracking-wide leading-relaxed text-center max-w-md italic pt-1">
              Membentuk generasi muda yang cerdas, kritis, dan beretika dalam memanfaatkan informasi, smartphone, media sosial, dan kecerdasan buatan (AI).
            </p>
          </div>

          {/* Institution Footer */}
          <div className="pt-4 border-t border-stone-800 text-center space-y-1">
            <h3 className="text-xs font-bold text-stone-100 tracking-[0.2em] uppercase font-sans">
              TIM DOSEN PRODI PERPUSTAKAAN DAN SAINS INFORMASI FIP UNJ
            </h3>
            <p className="text-[11px] font-serif italic text-stone-400">E-Modul Interaktif — Tahun 2026</p>
          </div>

          {/* Action CTA Buttons */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-3 font-sans">
            <button
              onClick={() => handleProtectedAction('unit-1')}
              className={`px-6 py-3 font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-2 border cursor-pointer ${
                hasIdentity 
                  ? 'bg-stone-100 text-stone-900 hover:bg-white border-stone-200' 
                  : 'bg-amber-600 text-white hover:bg-amber-500 border-amber-500'
              }`}
            >
              {!hasIdentity && <Lock className="w-3.5 h-3.5 text-amber-200" />}
              <span>Mulai Belajar Unit 1</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => handleProtectedAction('cek-fakta')}
              className="px-5 py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-2 cursor-pointer"
            >
              {!hasIdentity && <Lock className="w-3.5 h-3.5 text-amber-200" />}
              <Sparkles className="w-4 h-4" />
              <span>Cek Fakta Online</span>
            </button>

            <button
              onClick={() => handleProtectedAction('peta-konsep')}
              className="px-5 py-3 bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-2 border border-stone-700 cursor-pointer"
            >
              {!hasIdentity && <Lock className="w-3.5 h-3.5 text-amber-400" />}
              <Map className="w-4 h-4 text-amber-400" />
              <span>Peta Konsep</span>
            </button>
          </div>

        </div>
      </div>

      {/* Profile Form Card - PROMINENT FORM */}
      <div ref={formRef} className={`p-6 border space-y-4 transition-all ${
        !hasIdentity 
          ? 'bg-amber-50 dark:bg-[#252219] border-amber-500 dark:border-amber-700 shadow-md ring-2 ring-amber-500/30' 
          : 'bg-[#F9F7F2] dark:bg-[#1A1A18] border-stone-300 dark:border-stone-800'
      }`}>
        <div className="flex items-center justify-between border-b border-stone-300 dark:border-stone-800 pb-3">
          <div className="flex items-center gap-3">
            <div className={`p-2 ${!hasIdentity ? 'bg-amber-600 text-white' : 'bg-[#1A1A1A] text-white dark:bg-stone-200 dark:text-black'}`}>
              {hasIdentity ? <User className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            </div>
            <div>
              <h3 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-base flex items-center gap-2">
                Identitas Peserta / Pembaca
                {!hasIdentity && <span className="text-xs text-amber-700 dark:text-amber-400 font-sans font-bold">(Wajib Diisi)</span>}
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400">
                Isi identitas untuk membuka akses membaca dan mengerjakan seluruh unit e-modul
              </p>
            </div>
          </div>

          <span className={`px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider border ${
            hasIdentity 
              ? 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800'
              : 'bg-amber-100 text-amber-900 border-amber-400 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-800'
          }`}>
            {hasIdentity ? 'Terverifikasi' : 'Belum Diisi'}
          </span>
        </div>

        {formError && (
          <div className="p-3 bg-rose-100 dark:bg-rose-950/80 border border-rose-400 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-xs font-bold flex items-center gap-2 font-sans">
            <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{formError}</span>
          </div>
        )}

        <form onSubmit={handleSaveProfile} className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-sans">
          <div>
            <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-800 dark:text-stone-200 mb-1">
              Nama Lengkap Peserta <span className="text-rose-600">*</span>
            </label>
            <input
              type="text"
              required
              value={nameInput}
              onChange={(e) => {
                setNameInput(e.target.value);
                if (formError) setFormError(null);
              }}
              placeholder="Contoh: Aristoteles"
              className="w-full px-3 py-2 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-800 dark:text-stone-200 mb-1">
              Email Peserta
            </label>
            <input
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="Contoh: nama@email.com"
              className="w-full px-3 py-2 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-800 dark:text-stone-200 mb-1">
              Kelas / Pekerjaan / Instansi
            </label>
            <input
              type="text"
              value={classInput}
              onChange={(e) => setClassInput(e.target.value)}
              placeholder="Contoh: Masyarakat Umum / Pendidik"
              className="w-full px-3 py-2 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="sm:col-span-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#1A1A1A] text-white hover:bg-stone-800 dark:bg-stone-200 dark:text-black dark:hover:bg-white text-xs uppercase tracking-widest font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <CheckCircle className="w-4 h-4 text-emerald-400 dark:text-emerald-700" />
                <span>Simpan Identitas & Buka Akses Modul</span>
              </button>

              {hasIdentity && onParticipantLogout && (
                <button
                  type="button"
                  onClick={onParticipantLogout}
                  className="px-4 py-2.5 bg-rose-100 hover:bg-rose-200 text-rose-900 border border-rose-300 dark:bg-rose-950 dark:hover:bg-rose-900 dark:text-rose-200 dark:border-rose-800 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                  <span>Logout / Ganti Peserta</span>
                </button>
              )}
            </div>

            {isSaved && (
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 animate-fade-in">
                <span className="text-xs font-serif italic font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                  ✓ Identitas disimpan!
                </span>
                <button
                  type="button"
                  onClick={() => handleProtectedAction('kata-pengantar')}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all shadow-sm"
                >
                  <span>Lanjut ke Kata Pengantar</span>
                  <ArrowRight className="w-4 h-4 animate-bounce-x" />
                </button>
              </div>
            )}
          </div>
        </form>
      </div>

      {/* Finished Learning Logout Card for Participants */}
      {hasIdentity && onParticipantLogout && (
        <div className="p-5 bg-stone-200/70 dark:bg-stone-900/80 border-l-4 border-rose-600 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-sans">
          <div className="space-y-1">
            <h4 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-sm flex items-center gap-2">
              <LogOut className="w-4 h-4 text-rose-600 dark:text-rose-400" />
              <span>Selesai Pembelajaran & Ingin Keluar?</span>
            </h4>
            <p className="text-xs text-stone-600 dark:text-stone-400">
              Jika Anda telah selesai mempelajari modul atau menggunakan komputer bersama, silakan klik tombol logout untuk mengakhiri sesi peserta <strong>({userProgress.studentName})</strong>.
            </p>
          </div>
          <button
            onClick={onParticipantLogout}
            className="px-5 py-2.5 bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2 shrink-0 cursor-pointer shadow-xs"
          >
            <LogOut className="w-4 h-4" />
            <span>Selesai & Logout Peserta</span>
          </button>
        </div>
      )}

      {/* Features Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans">
        <div className="bg-[#F9F7F2] dark:bg-[#1A1A18] p-5 border border-stone-300 dark:border-stone-800 space-y-2">
          <span className="font-serif italic text-2xl font-bold text-amber-800 dark:text-amber-400 block">
            01
          </span>
          <h4 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-base">5 Unit Interaktif</h4>
          <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
            Dilengkapi simulasi detektif hoaks, game filter/share, checklist privasi, dan studi kasus nyata.
          </p>
        </div>

        <div className="bg-[#F9F7F2] dark:bg-[#1A1A18] p-5 border border-stone-300 dark:border-stone-800 space-y-2">
          <span className="font-serif italic text-2xl font-bold text-amber-800 dark:text-amber-400 block">
            02
          </span>
          <h4 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-base">Kuis & Evaluasi</h4>
          <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
            Latihan di setiap unit + Kuis Akhir dengan sertifikat resmi kelulusan setelah dinyatakan lulus.
          </p>
        </div>

        <div className="bg-[#F9F7F2] dark:bg-[#1A1A18] p-5 border border-stone-300 dark:border-stone-800 space-y-2">
          <span className="font-serif italic text-2xl font-bold text-amber-800 dark:text-amber-400 block">
            03
          </span>
          <h4 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-base">Akses Luring (PDF)</h4>
          <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
            Dapat diunduh dan dicetak lengkap dalam format PDF untuk dibaca tanpa koneksi internet.
          </p>
        </div>
      </div>

      {/* Navigation Arrow Section to Next Page (Kata Pengantar) */}
      <div className="p-6 bg-[#1A1A1A] text-white border-l-4 border-amber-600 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans shadow-md">
        <div className="space-y-1 text-center sm:text-left">
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-amber-500 block">
            Halaman Selanjutnya
          </span>
          <h3 className="font-serif font-bold text-lg text-stone-100 flex items-center justify-center sm:justify-start gap-2">
            <FileText className="w-5 h-5 text-amber-400 shrink-0" />
            <span>Kata Pengantar E-Modul</span>
          </h3>
          <p className="text-xs text-stone-400 max-w-md">
            {hasIdentity 
              ? 'Identitas Anda telah terisi. Silakan berpindah ke halaman Kata Pengantar untuk memulai pembelajaran.'
              : 'Isi identitas Anda pada formulir di atas untuk membuka akses ke Kata Pengantar.'
            }
          </p>
        </div>

        <button
          onClick={() => handleProtectedAction('kata-pengantar')}
          className={`px-7 py-3.5 text-xs uppercase tracking-widest font-bold transition-all flex items-center gap-3 shrink-0 cursor-pointer shadow-sm ${
            hasIdentity 
              ? 'bg-amber-600 hover:bg-amber-500 text-white hover:scale-105' 
              : 'bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700'
          }`}
        >
          {!hasIdentity && <Lock className="w-4 h-4 text-amber-400" />}
          <span>Lanjut ke Kata Pengantar</span>
          <ArrowRight className="w-4 h-4 text-amber-200" />
        </button>
      </div>

    </div>
  );
};

