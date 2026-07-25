import React, { useRef } from 'react';
import { Award, Printer, Lock, Download, CheckCircle2 } from 'lucide-react';
import { UserProgress } from '../types';

interface CertificateViewProps {
  userProgress: UserProgress;
}

export const CertificateView: React.FC<CertificateViewProps> = ({ userProgress }) => {
  const certRef = useRef<HTMLDivElement>(null);
  const isPassed = userProgress.finalQuizScore !== null && userProgress.finalQuizScore >= 70;

  const handlePrintCertificate = () => {
    window.print();
  };

  if (!isPassed) {
    return (
      <div className="max-w-xl mx-auto my-12 p-8 bg-[#F9F7F2] dark:bg-[#1A1A18] border border-stone-300 dark:border-stone-800 text-center space-y-4 font-sans">
        <div className="w-16 h-16 bg-[#1A1A1A] text-white dark:bg-stone-200 dark:text-black flex items-center justify-center mx-auto">
          <Lock className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-serif font-black text-stone-900 dark:text-stone-100">
          Sertifikat Masih Terkunci 🔒
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed font-sans">
          Sertifikat Kelulusan resmi E-Modul Etika Informasi berbasis Literasi Digital akan terbuka secara otomatis jika Anda telah menyelesaikan Kuis Akhir dengan nilai minimal <span className="font-bold text-amber-700 dark:text-amber-400">70</span>.
        </p>
        <div className="pt-2">
          <p className="text-xs font-serif font-bold text-stone-500">
            Skor Anda Saat Ini: <span className="text-rose-700 font-sans">{userProgress.finalQuizScore ?? 'Belum Ujian'}</span>
          </p>
        </div>
      </div>
    );
  }

  const currentDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16 font-sans">
      
      {/* Top Action Bar */}
      <div className="flex items-center justify-between no-print border-b border-stone-300 dark:border-stone-800 pb-3">
        <div className="flex items-center gap-2">
          <Award className="w-6 h-6 text-amber-600 dark:text-amber-400" />
          <h2 className="text-xl font-serif font-bold text-stone-900 dark:text-stone-100">
            Sertifikat Kelulusan Resmi
          </h2>
        </div>

        <button
          onClick={handlePrintCertificate}
          className="px-5 py-2.5 bg-[#1A1A1A] hover:bg-stone-800 text-white dark:bg-stone-200 dark:text-black font-bold uppercase tracking-widest text-xs shadow-md transition-all flex items-center gap-2"
        >
          <Printer className="w-4 h-4" />
          <span>Cetak / Simpan PDF Sertifikat</span>
        </button>
      </div>

      {/* CERTIFICATE CANVAS (Printable Diploma Editorial Format) */}
      <div 
        ref={certRef}
        className="bg-[#F9F7F2] text-stone-900 p-8 sm:p-14 border-8 border-double border-stone-800 shadow-2xl relative overflow-hidden space-y-8 text-center"
      >
        {/* Certificate Header */}
        <div className="space-y-3">
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 bg-[#1A1A1A] text-white border border-stone-800 flex items-center justify-center font-serif font-black text-xl">
              EM
            </div>
          </div>
          <h3 className="text-xs font-serif font-bold uppercase tracking-[0.25em] text-stone-800">
            LITERASI DIGITAL INDONESIA
          </h3>
          <p className="text-[10px] text-stone-600 font-bold uppercase tracking-widest">
            PROGRAM PEMBELAJARAN ETIKA INFORMASI (2026)
          </p>
        </div>

        <div className="py-3 border-y-2 border-stone-800 space-y-1">
          <h1 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-stone-950 uppercase">
            SERTIFIKAT KELULUSAN
          </h1>
          <p className="text-xs font-serif italic font-bold text-amber-800 tracking-wider uppercase">
            E-Modul Etika Informasi Berbasis Literasi Digital
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-xs text-stone-600 font-serif italic">Diberikan kepada:</p>
          <h2 className="text-2xl sm:text-4xl font-serif font-black text-stone-950 underline decoration-amber-600 decoration-2 underline-offset-8">
            {userProgress.studentName || 'Siswa / Mahasiswa Indonesia'}
          </h2>
          <p className="text-xs font-bold text-stone-600 pt-1">
            {userProgress.studentClass || 'Pendidikan & Literasi Digital Indonesia'}
          </p>
        </div>

        <div className="max-w-xl mx-auto text-xs sm:text-sm text-stone-800 leading-relaxed font-serif">
          Telah berhasil menyelesaikan seluruh rangkaian materi, studi kasus, simulasi verifikasi hoaks, dan dinyatakan <span className="font-bold text-emerald-800">LULUS EVALUASI AKHIR</span> dengan nilai memuaskan:
        </div>

        <div className="inline-block px-6 py-2.5 bg-[#E9E4DB] border-2 border-stone-800 text-base font-serif font-black text-stone-950">
          SKOR EVALUASI: {userProgress.finalQuizScore} / 100 POIN
        </div>

        {/* Footer Signatures */}
        <div className="pt-8 border-t border-stone-300 grid grid-cols-2 gap-8 text-xs font-serif text-stone-800">
          <div className="space-y-1 text-center">
            <p className="text-[11px] text-stone-500 font-sans">Indonesia, {currentDate}</p>
            <div className="h-12 flex items-center justify-center font-serif text-stone-400 italic">
              [ Cap & Tanda Tangan Digital ]
            </div>
            <p className="font-bold text-stone-950">Tim Penyusun & Pengembang</p>
            <p className="text-[10px] text-stone-600">E-Modul Etika Informasi</p>
          </div>

          <div className="space-y-1 text-center">
            <p className="text-[11px] text-stone-500 font-sans">Nomor Sertifikat:</p>
            <p className="font-mono font-bold text-stone-900">EMOD-LITDIG-2026-{(userProgress.studentName || 'STD').slice(0,3).toUpperCase()}-77</p>
            <div className="h-10 flex items-center justify-center font-sans">
              <span className="px-2 py-0.5 border border-emerald-700 bg-emerald-50 text-emerald-800 text-[10px] font-bold tracking-wider">
                ✓ VERIFIED DIGITALLY
              </span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
