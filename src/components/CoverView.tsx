import React, { useState } from 'react';
import { BookOpen, Sparkles, Map, Printer, CheckCircle, ArrowRight, ShieldCheck, Award, User } from 'lucide-react';
import { SectionId, UserProgress } from '../types';

interface CoverViewProps {
  onSelectSection: (sectionId: SectionId) => void;
  userProgress: UserProgress;
  onUpdateProfile: (name: string, studentClass: string) => void;
}

export const CoverView: React.FC<CoverViewProps> = ({
  onSelectSection,
  userProgress,
  onUpdateProfile
}) => {
  const [nameInput, setNameInput] = useState(userProgress.studentName || '');
  const [classInput, setClassInput] = useState(userProgress.studentClass || '');
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(nameInput, classInput);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      
      {/* Top Header info */}
      <div className="flex items-center justify-between text-[11px] uppercase tracking-widest text-stone-500 border-b border-stone-300 dark:border-stone-800 pb-3 font-sans font-bold">
        <span className="text-stone-900 dark:text-stone-100">Jelajah Digital — Etika Informasi</span>
        <span className="font-serif italic capitalize">E-Modul Literasi Digital 2026</span>
      </div>

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

          {/* Digital Graphic Graphic Card */}
          <div className="my-8 p-6 bg-[#242424] border border-stone-800 flex flex-col items-center justify-center gap-3">
            <div className="w-16 h-16 bg-stone-100 text-stone-900 flex items-center justify-center font-serif text-2xl font-black">
              <ShieldCheck className="w-8 h-8 text-stone-900" />
            </div>
            <p className="text-xs text-stone-300 font-sans tracking-wide leading-relaxed text-center max-w-md">
              Generasi muda cerdas, kritis, dan beretika dalam menggunakan smartphone, media sosial, dan kecerdasan buatan (AI)
            </p>
          </div>

          {/* Institution Footer */}
          <div className="pt-4 border-t border-stone-800 text-center space-y-1">
            <h3 className="text-xs font-bold text-stone-100 tracking-[0.3em] uppercase font-sans">
              LITERASI DIGITAL INDONESIA
            </h3>
            <p className="text-[11px] font-serif italic text-stone-400">E-Modul Interaktif — Tahun 2026</p>
          </div>

          {/* Action CTA Buttons */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-3 font-sans">
            <button
              onClick={() => onSelectSection('unit-1')}
              className="px-6 py-3 bg-stone-100 text-stone-900 hover:bg-white font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-2 border border-stone-200"
            >
              <span>Mulai Belajar Unit 1</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onSelectSection('cek-fakta')}
              className="px-5 py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Cek Fakta Online</span>
            </button>

            <button
              onClick={() => onSelectSection('peta-konsep')}
              className="px-5 py-3 bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-2 border border-stone-700"
            >
              <Map className="w-4 h-4 text-amber-400" />
              <span>Peta Konsep</span>
            </button>
          </div>

        </div>
      </div>

      {/* Profile Form Card */}
      <div className="bg-[#F9F7F2] dark:bg-[#1A1A18] p-6 border border-stone-300 dark:border-stone-800 space-y-4">
        <div className="flex items-center gap-3 border-b border-stone-300 dark:border-stone-800 pb-3">
          <div className="p-2 bg-[#1A1A1A] text-white dark:bg-stone-200 dark:text-black">
            <User className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-base">Identitas Siswa / Pembaca</h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">Isi nama untuk sertifikat kelulusan & pencatatan skor kuis</p>
          </div>
        </div>

        <form onSubmit={handleSaveProfile} className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans">
          <div>
            <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 dark:text-stone-300 mb-1">
              Nama Lengkap Siswa / Mahasiswa
            </label>
            <input
              type="text"
              required
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="Contoh: Riyan Sanjaya"
              className="w-full px-3 py-2 bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:border-stone-900 dark:focus:border-stone-200"
            />
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 dark:text-stone-300 mb-1">
              Kelas / Instansi
            </label>
            <input
              type="text"
              value={classInput}
              onChange={(e) => setClassInput(e.target.value)}
              placeholder="Contoh: Kelas XI IPA 2 / Mahasiswa Semester 4"
              className="w-full px-3 py-2 bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:border-stone-900 dark:focus:border-stone-200"
            />
          </div>

          <div className="sm:col-span-2 flex items-center justify-between pt-2">
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#1A1A1A] text-white hover:bg-stone-800 dark:bg-stone-200 dark:text-black dark:hover:bg-white text-xs uppercase tracking-widest font-bold transition-colors flex items-center gap-1.5"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Simpan Identitas</span>
            </button>

            {isSaved && (
              <span className="text-xs font-serif italic font-bold text-emerald-700 dark:text-emerald-400 animate-fade-in">
                ✓ Identitas berhasil disimpan!
              </span>
            )}
          </div>
        </form>
      </div>

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

    </div>
  );
};
