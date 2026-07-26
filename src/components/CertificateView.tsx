import React, { useRef, useState, useEffect } from 'react';
import { Award, Printer, Lock, ShieldCheck, LogOut } from 'lucide-react';
import { UserProgress, CertificateConfig } from '../types';
import { EtikaInformasiLogo } from './EtikaInformasiLogo';
import { OFFICIAL_UNJ_STAMP_SVG } from '../utils/certificateAssets';

interface CertificateViewProps {
  userProgress: UserProgress;
  overrideConfig?: CertificateConfig;
  onParticipantLogout?: () => void;
}

const DEFAULT_CONFIG: CertificateConfig = {
  institutionName: "Tim Dosen Prodi Perpustakaan dan Sains Informasi FIP UNJ",
  programTitle: "PROGRAM PEMBELAJARAN ETIKA INFORMASI",
  certificateTitle: "SERTIFIKAT KELULUSAN",
  subTitle: "E-Modul Etika Informasi Berbasis Literasi Digital",
  logoUrl: "",
  instructorName: "Riyan Sanjaya, M.Hum.",
  instructorRole: "Tim Dosen Prodi Perpustakaan dan Sains Informasi FIP UNJ",
  signatureUrl: "",
  stampUrl: OFFICIAL_UNJ_STAMP_SVG,
  issueCity: "Jakarta, Indonesia",
  certificatePrefix: "EMOD-LITDIG"
};

export const CertificateView: React.FC<CertificateViewProps> = ({ userProgress, overrideConfig, onParticipantLogout }) => {
  const certRef = useRef<HTMLDivElement>(null);
  const [config, setConfig] = useState<CertificateConfig>(overrideConfig || DEFAULT_CONFIG);

  useEffect(() => {
    if (overrideConfig) {
      setConfig(overrideConfig);
      return;
    }

    fetch('/api/certificate-config')
      .then(res => {
        if (res.ok && res.headers.get('content-type')?.includes('application/json')) {
          return res.json();
        }
        throw new Error('Not JSON');
      })
      .then(data => {
        if (data.config) {
          setConfig(data.config);
        }
      })
      .catch(() => {
        const savedCert = localStorage.getItem('etika_cert_config_fallback');
        if (savedCert) {
          try { setConfig(JSON.parse(savedCert)); } catch (e) {}
        }
      });
  }, [overrideConfig]);

  const isPassed = userProgress.finalQuizScore !== null && userProgress.finalQuizScore >= 70;

  const handlePrintCertificate = () => {
    window.print();
  };

  if (!isPassed && !overrideConfig) {
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
      
      {/* Top Action Bar (Hidden when override/preview) */}
      {!overrideConfig && (
        <div className="flex items-center justify-between no-print border-b border-stone-300 dark:border-stone-800 pb-3">
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            <h2 className="text-xl font-serif font-bold text-stone-900 dark:text-stone-100">
              Sertifikat Kelulusan Resmi
            </h2>
          </div>

          <button
            onClick={handlePrintCertificate}
            className="px-5 py-2.5 bg-[#1A1A1A] hover:bg-stone-800 text-white dark:bg-stone-200 dark:text-black font-bold uppercase tracking-widest text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak / Simpan PDF Sertifikat</span>
          </button>
        </div>
      )}

      {/* CERTIFICATE CANVAS (Printable Diploma Editorial Format) */}
      <div 
        ref={certRef}
        className="bg-[#F9F7F2] text-stone-900 p-8 sm:p-12 border-8 border-double border-stone-800 shadow-2xl relative overflow-hidden space-y-6 text-center"
      >
        {/* Certificate Header with Logo */}
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-3 min-h-[64px]">
            {config.logoUrl ? (
              <img 
                src={config.logoUrl} 
                alt="Logo Instansi" 
                className="h-11 sm:h-12 w-auto max-w-[150px] object-contain drop-shadow-xs"
              />
            ) : (
              <EtikaInformasiLogo isDark={false} showBackgroundCircle={false} className="w-32 sm:w-36 h-auto mx-auto" />
            )}
          </div>
          <h3 className="text-xs sm:text-sm font-serif font-bold uppercase tracking-[0.25em] text-stone-800">
            {config.institutionName || 'LITERASI DIGITAL INDONESIA'}
          </h3>
          <p className="text-[10px] sm:text-xs text-stone-600 font-bold uppercase tracking-widest">
            {config.programTitle || 'PROGRAM PEMBELAJARAN ETIKA INFORMASI'}
          </p>
        </div>

        <div className="py-3 border-y-2 border-stone-800 space-y-1">
          <h1 className="text-2xl sm:text-4xl font-serif font-black tracking-tight text-stone-950 uppercase">
            {config.certificateTitle || 'SERTIFIKAT KELULUSAN'}
          </h1>
          <p className="text-xs font-serif italic font-bold text-amber-800 tracking-wider uppercase">
            {config.subTitle || 'E-Modul Etika Informasi Berbasis Literasi Digital'}
          </p>
        </div>

        <div className="space-y-1.5">
          <p className="text-xs text-stone-600 font-serif italic">Diberikan kepada:</p>
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-stone-950 underline decoration-amber-600 decoration-2 underline-offset-8">
            {userProgress.studentName || 'Peserta Literasi Digital Indonesia'}
          </h2>
          <p className="text-xs font-bold text-stone-600 pt-1">
            {userProgress.studentClass || 'Masyarakat Umum & Pelajar Indonesia'}
          </p>
        </div>

        <div className="max-w-xl mx-auto text-xs sm:text-sm text-stone-800 leading-relaxed font-serif">
          Telah berhasil menyelesaikan seluruh rangkaian materi, studi kasus, simulasi verifikasi hoaks, dan dinyatakan <span className="font-bold text-emerald-800">LULUS EVALUASI AKHIR</span> dengan nilai memuaskan:
        </div>

        <div className="inline-block px-6 py-2 bg-[#E9E4DB] border-2 border-stone-800 text-sm sm:text-base font-serif font-black text-stone-950">
          SKOR EVALUASI: {userProgress.finalQuizScore ?? 100} / 100 POIN
        </div>

        {/* Footer Signatures, Stamp & Serial Number */}
        <div className="pt-6 border-t border-stone-300 grid grid-cols-2 gap-6 items-end text-xs font-serif text-stone-800">
          
          {/* Instruktur & Tanda Tangan */}
          <div className="space-y-1 text-center flex flex-col items-center justify-end min-h-[120px]">
            <p className="text-[11px] text-stone-500 font-sans">
              {config.issueCity || 'Indonesia'}, {currentDate}
            </p>
            
            {/* Signature Area */}
            <div className="h-14 flex items-center justify-center my-1">
              {config.signatureUrl ? (
                <img 
                  src={config.signatureUrl} 
                  alt="Tanda Tangan Instruktur" 
                  className="h-14 w-auto max-w-[160px] object-contain"
                />
              ) : (
                <div className="font-serif text-amber-900 italic font-bold text-lg tracking-widest border-b border-dashed border-stone-400 px-4 py-1">
                  ~ RiyanSanjaya ~
                </div>
              )}
            </div>

            <p className="font-bold text-stone-950 text-xs sm:text-sm">{config.instructorName || 'Riyan Sanjaya, M.Hum.'}</p>
            <p className="text-[10px] text-stone-600">{config.instructorRole || 'Tim Dosen Prodi Perpustakaan dan Sains Informasi FIP UNJ'}</p>
          </div>

          {/* Stempel Instansi & Serial Number */}
          <div className="space-y-2 text-center flex flex-col items-center justify-end min-h-[120px]">
            
            {/* Stamp Area */}
            <div className="h-20 flex items-center justify-center">
              <img 
                src={config.stampUrl || OFFICIAL_UNJ_STAMP_SVG} 
                alt="Stempel Resmi FIP UNJ" 
                className="h-20 w-auto max-w-[130px] object-contain opacity-90 rotate-[-4deg]"
              />
            </div>

            <div className="space-y-0.5">
              <p className="text-[10px] text-stone-500 font-sans uppercase tracking-wider">Nomor Sertifikat:</p>
              <p className="font-mono font-bold text-stone-900 text-xs">
                {(config.certificatePrefix || 'EMOD-LITDIG')}-2026-{(userProgress.studentName || 'STD').slice(0,3).toUpperCase()}-77
              </p>
            </div>

            <div className="flex items-center justify-center">
              <span className="px-2 py-0.5 border border-emerald-700 bg-emerald-50 text-emerald-800 text-[9px] font-bold tracking-wider uppercase font-sans">
                ✓ TERVERIFIKASI RESMI
              </span>
            </div>
          </div>

        </div>

      </div>

      {/* Selesai Pembelajaran & Logout Banner */}
      {onParticipantLogout && (
        <div className="p-5 bg-[#F9F7F2] dark:bg-[#1A1A18] border-l-4 border-rose-600 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans shadow-md">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-base flex items-center justify-center sm:justify-start gap-2">
              <LogOut className="w-5 h-5 text-rose-600 dark:text-rose-400" />
              <span>Selesai Mengunduh Sertifikat & Ingin Keluar?</span>
            </h4>
            <p className="text-xs text-stone-600 dark:text-stone-400 max-w-xl">
              Selamat atas kelulusan Anda! Jika Anda telah menyimpan/mencetak sertifikat dan ingin menyelesaikan pembelajaran, klik tombol logout di bawah ini untuk mengakhiri sesi.
            </p>
          </div>

          <button
            onClick={onParticipantLogout}
            className="px-6 py-3 bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2 shrink-0 cursor-pointer shadow-sm"
          >
            <LogOut className="w-4 h-4" />
            <span>Selesai & Logout Peserta</span>
          </button>
        </div>
      )}

    </div>
  );
};

