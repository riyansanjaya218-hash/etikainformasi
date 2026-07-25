import React from 'react';
import { 
  Printer, 
  Download, 
  BookOpen, 
  ExternalLink, 
  QrCode, 
  Video, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Target, 
  HelpCircle, 
  FileText, 
  Award, 
  Layers, 
  Search, 
  Share2, 
  Info, 
  AlertTriangle, 
  Lightbulb,
  Lock,
  ArrowRight
} from 'lucide-react';
import { UNITS_DATA, BADGES_LIST } from '../data/modulData';
import { 
  UNIT_1_QUIZ, 
  UNIT_2_QUIZ, 
  UNIT_3_QUIZ, 
  UNIT_4_QUIZ, 
  UNIT_5_QUIZ, 
  FINAL_QUIZ_QUESTIONS, 
  ETHICS_SURVEY_QUESTIONS, 
  FILTER_SHARE_SCENARIOS 
} from '../data/quizData';
import { SectionId, UserProgress, VideoConfigItem } from '../types';

interface PrintPDFViewProps {
  onSelectSection: (sectionId: SectionId) => void;
  videosConfig?: VideoConfigItem[];
  userProgress?: UserProgress;
}

export const PrintPDFView: React.FC<PrintPDFViewProps> = ({ 
  onSelectSection, 
  videosConfig = [],
  userProgress 
}) => {
  const [currentAppUrl, setCurrentAppUrl] = React.useState('https://ais-dev-vcanqbxwayvohyev3h7oxj-35193670130.asia-southeast1.run.app');
  const [certConfig, setCertConfig] = React.useState<{
    institutionName?: string;
    programTitle?: string;
    certificateTitle?: string;
    subTitle?: string;
    instructorName?: string;
    instructorRole?: string;
    signatureUrl?: string;
    stampUrl?: string;
    issueCity?: string;
    certificatePrefix?: string;
  }>({
    institutionName: 'Tim Dosen Prodi Perpustakaan dan Sains Informasi FIP UNJ',
    instructorName: 'Riyan Sanjaya, M.Hum.',
    instructorRole: 'Tim Dosen Prodi Perpustakaan dan Sains Informasi FIP UNJ'
  });

  React.useEffect(() => {
    if (typeof window !== 'undefined' && window.location.href) {
      setCurrentAppUrl(window.location.href);
    }
    
    fetch('/api/certificate-config')
      .then(res => res.json())
      .then(data => {
        if (data.config) {
          setCertConfig(data.config);
        }
      })
      .catch(err => console.error('Error fetching certificate config in PrintPDFView:', err));
  }, []);

  const isAdmin = typeof window !== 'undefined' && Boolean(localStorage.getItem('admin_token'));
  const isUnlocked = isAdmin || (userProgress?.finalQuizScore !== null && userProgress?.finalQuizScore !== undefined && userProgress.finalQuizScore >= 70);

  const handleTriggerPrint = () => {
    window.print();
  };

  if (!isUnlocked) {
    return (
      <div className="max-w-3xl mx-auto p-6 sm:p-10 my-8 bg-[#F9F7F2] dark:bg-[#1A1A18] border-2 border-stone-300 dark:border-stone-800 text-stone-900 dark:text-stone-100 font-serif space-y-6 shadow-xl">
        <div className="text-center space-y-3 border-b border-stone-300 dark:border-stone-800 pb-6">
          <div className="w-16 h-16 bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 rounded-full flex items-center justify-center mx-auto border-2 border-amber-600 shadow-md">
            <Lock className="w-8 h-8" />
          </div>
          <span className="px-3 py-1 bg-amber-600 text-white font-mono font-bold text-[10px] uppercase tracking-widest inline-block">
            AKSES TERKUNCI &bull; SYARAT KELULUSAN
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-stone-950 dark:text-stone-100 uppercase tracking-tight">
            Download Modul (PDF Luring) Belum Tersedia
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 max-w-xl mx-auto leading-relaxed">
            Sesuai ketentuan pembelajaran, <strong>Modul Cetak PDF Luring beserta Lampiran Sertifikat Kelulusan Peserta</strong> hanya dapat diunduh setelah Anda menyelesaikan Kuis Akhir Evaluasi dengan nilai minimal <strong>70 poin</strong>.
          </p>
        </div>

        {/* Status Box */}
        <div className="bg-white dark:bg-[#22211F] p-5 border border-stone-300 dark:border-stone-800 space-y-3 max-w-md mx-auto font-sans shadow-sm">
          <h3 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 border-b border-stone-200 dark:border-stone-800 pb-2 flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-600" />
            Status Progres Peserta
          </h3>
          <div className="text-xs space-y-2 text-stone-700 dark:text-stone-300">
            <div className="flex justify-between items-center">
              <span>Nama Peserta:</span>
              <span className="font-bold text-stone-900 dark:text-stone-100">{userProgress?.studentName || 'Peserta (Belum diisi)'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Nilai Kuis Akhir:</span>
              <span className={`font-mono font-bold ${userProgress?.finalQuizScore !== null && (userProgress?.finalQuizScore ?? 0) >= 70 ? 'text-emerald-600' : 'text-amber-700'}`}>
                {userProgress?.finalQuizScore !== null && userProgress?.finalQuizScore !== undefined ? `${userProgress.finalQuizScore} / 100 Poin` : 'Belum Dikerjakan'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>Syarat Kelulusan Minimal:</span>
              <span className="font-mono font-bold text-stone-900 dark:text-stone-100">70 Poin</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-stone-200 dark:border-stone-800">
              <span>Akses Modul & Sertifikat PDF:</span>
              <span className="px-2 py-0.5 bg-rose-100 text-rose-800 text-[10px] font-bold uppercase tracking-wider">
                TERKUNCI
              </span>
            </div>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row justify-center items-center gap-3">
          <button
            onClick={() => onSelectSection('kuis-akhir')}
            className="w-full sm:w-auto px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
          >
            <Sparkles className="w-4 h-4 text-amber-200" />
            <span>Kerjakan Kuis Akhir Sekarang</span>
          </button>

          <button
            onClick={() => onSelectSection('cover')}
            className="w-full sm:w-auto px-6 py-3 bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 text-stone-800 dark:text-stone-200 font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <span>Kembali ke Halaman Sampul</span>
          </button>
        </div>
      </div>
    );
  }

  const getVideoForSection = (sectionId: string, defaultPlaceholder: string, defaultTitle: string, defaultDuration: string, defaultSummary: string) => {
    const config = videosConfig.find(v => v.id === sectionId);
    const rawUrl = config?.youtubeUrl || config?.embedUrl || defaultPlaceholder;
    return {
      title: config?.title || defaultTitle,
      url: rawUrl,
      duration: config?.duration || defaultDuration,
      summary: config?.summary || defaultSummary
    };
  };

  const petunjukVideo = getVideoForSection(
    'intro',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'Pengantar Modul Digital: Mengapa Etika Informasi Penting?',
    '3:45 menit',
    'Video pengenalan cara membaca modul digital, pentingnya etika informasi, serta orientasi pembelajaran.'
  );

  const getUnitThemeColor = (unitNum: number) => {
    switch (unitNum) {
      case 1: return { bg: 'bg-emerald-700', border: 'border-emerald-700', text: 'text-emerald-800', lightBg: 'bg-emerald-50', badge: 'bg-emerald-100 text-emerald-900 border-emerald-300' };
      case 2: return { bg: 'bg-amber-700', border: 'border-amber-700', text: 'text-amber-800', lightBg: 'bg-amber-50', badge: 'bg-amber-100 text-amber-900 border-amber-300' };
      case 3: return { bg: 'bg-indigo-700', border: 'border-indigo-700', text: 'text-indigo-800', lightBg: 'bg-indigo-50', badge: 'bg-indigo-100 text-indigo-900 border-indigo-300' };
      case 4: return { bg: 'bg-purple-700', border: 'border-purple-700', text: 'text-purple-800', lightBg: 'bg-purple-50', badge: 'bg-purple-100 text-purple-900 border-purple-300' };
      case 5: return { bg: 'bg-rose-700', border: 'border-rose-700', text: 'text-rose-800', lightBg: 'bg-rose-50', badge: 'bg-rose-100 text-rose-900 border-rose-300' };
      default: return { bg: 'bg-stone-800', border: 'border-stone-800', text: 'text-stone-800', lightBg: 'bg-stone-50', badge: 'bg-stone-100 text-stone-900 border-stone-300' };
    }
  };

  const getUnitQuizQuestions = (unitNum: number) => {
    switch (unitNum) {
      case 1: return UNIT_1_QUIZ;
      case 2: return UNIT_2_QUIZ;
      case 3: return UNIT_3_QUIZ;
      case 4: return UNIT_4_QUIZ;
      case 5: return UNIT_5_QUIZ;
      default: return UNIT_1_QUIZ;
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20 font-sans">
      
      {/* Print CSS Rules */}
      <style>{`
        @media print {
          body { 
            background: white !important; 
            color: black !important; 
            font-family: serif !important;
          }
          .no-print { 
            display: none !important; 
          }
          .page-break { 
            page-break-after: always !important; 
            break-after: page !important; 
          }
          .printable-sheet {
            padding: 0 !important;
            margin: 0 !important;
            border: none !important;
            box-shadow: none !important;
            background: white !important;
          }
          * { 
            -webkit-print-color-adjust: exact !important; 
            print-color-adjust: exact !important; 
          }
        }
      `}</style>

      {/* TOP CONTROL (NO-PRINT) */}
      <div className="bg-[#1A1A1A] text-[#F9F7F2] p-6 sm:p-8 border-l-8 border-amber-500 shadow-xl no-print">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="px-2.5 py-1 bg-amber-500 text-black text-[10px] font-bold uppercase tracking-widest font-mono">
              VERSI LURING & UNDUH MODUL
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif font-black text-white mt-1">
              Modul Cetak / PDF Luring (E-Modul Digital Integratif)
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl font-serif">
              Format di bawah dirancang lengkap dan berwarna seperti modul pembelajaran sekolah. Seluruh materi, video dengan QR Code scanner, lembar kerja interaktif, kuis, dan daftar pustaka tersedia secara utuh untuk langsung dicetak atau diunduh sebagai file PDF.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleTriggerPrint}
              className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold uppercase tracking-widest text-xs shadow-lg flex items-center gap-2 cursor-pointer border border-amber-400 transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Unduh Ke PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* PRINTABLE DOCUMENT BODY (TEXTBOOK / FLIPBOOK FORMAT) */}
      <div className="printable-sheet bg-[#F9F7F2] dark:bg-[#1A1A18] text-stone-900 dark:text-stone-100 p-8 sm:p-14 border-2 border-stone-800 shadow-2xl space-y-14 font-serif leading-relaxed text-sm">
        
        {/* PAGE 1: COVER MODUL DIGITAL (FRONT COVER) */}
        <div className="page-break space-y-8 py-10 text-center border-4 border-amber-600 p-8 sm:p-12 bg-gradient-to-b from-[#F2EFE9] via-[#F9F7F2] to-[#EAE5DB] dark:from-[#242320] dark:to-[#181816] relative overflow-hidden">
          
          {/* Top Banner Badge */}
          <div className="flex justify-between items-center border-b-2 border-amber-600 pb-4">
            <span className="px-3 py-1 bg-amber-600 text-white font-mono font-bold text-xs uppercase tracking-widest">
              MODUL PEMBELAJARAN
            </span>
            <span className="text-xs font-mono font-bold text-stone-600 dark:text-stone-300">
              EDISI SPESIAL 2026
            </span>
          </div>

          <div className="space-y-4 py-8">
            <p className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-amber-700 dark:text-amber-400">
              JELAJAH DIGITAL &bull; ETIKA INFORMASI &bull; LITERASI KRITIS
            </p>
            <h1 className="text-4xl sm:text-6xl font-serif font-black text-stone-950 dark:text-white tracking-tight leading-none uppercase">
              ETIKA INFORMASI
            </h1>
            <p className="text-lg font-serif italic text-stone-700 dark:text-stone-300 max-w-2xl mx-auto">
              E-Modul Interaktif Berbasis Literasi Digital untuk Generasi Kritis, Cerdas, dan Bertanggung Jawab
            </p>
          </div>

          {/* Center Graphic Box */}
          <div className="p-6 bg-white dark:bg-stone-900 border-2 border-stone-800 dark:border-stone-700 max-w-lg mx-auto shadow-md space-y-3">
            <div className="flex justify-center gap-3 text-amber-600">
              <BookOpen className="w-8 h-8" />
              <Video className="w-8 h-8" />
              <ShieldCheck className="w-8 h-8" />
              <Award className="w-8 h-8" />
            </div>
            <p className="text-xs font-serif text-stone-800 dark:text-stone-200 leading-relaxed font-bold">
              Memuat 5 Unit Pembelajaran Utama, Video E-Learning dengan Scan QR Code, Simulasi Kasus Interaktif, Panduan Cek Fakta, Evaluasi Turnitin No-Repo, dan Kuis Akhir.
            </p>
          </div>

          {/* QR Code to Online App */}
          <div className="pt-6 flex flex-col items-center justify-center gap-2">
            <img 
              src={`https://api.qrserver.com/v1/create-qr-code/?size=130x130&data=${encodeURIComponent(currentAppUrl)}`} 
              alt="Scan QR Aplikasi"
              className="w-28 h-28 border-2 border-stone-900 p-1 bg-white"
            />
            <div className="text-center space-y-0.5">
              <span className="text-[10px] font-mono font-bold text-stone-600 dark:text-stone-400 block">
                Scan untuk membuka Versi Interaktif Aplikasi Web
              </span>
              <span className="text-[9px] font-mono text-amber-800 dark:text-amber-400 font-semibold break-all max-w-md block mx-auto">
                {currentAppUrl}
              </span>
            </div>
          </div>

          {/* Bottom Publisher */}
          <div className="pt-8 border-t-2 border-stone-400 dark:border-stone-700 font-serif text-xs space-y-1">
            <p className="font-bold uppercase tracking-wider text-stone-950 dark:text-stone-100">
              {certConfig.institutionName || 'TIM DOSEN PRODI PERPUSTAKAAN DAN SAINS INFORMASI FIP UNJ'}
            </p>
            <p className="text-stone-600 dark:text-stone-400 italic">
              Hak Cipta Dilindungi Undang-Undang &bull; Bebas Digunakan untuk Pendidikan
            </p>
          </div>
        </div>

        {/* PAGE 2: KATA PENGANTAR & PROFIL E-MODUL */}
        <div className="page-break space-y-6 pt-4">
          <div className="border-b-2 border-stone-900 dark:border-stone-100 pb-2 flex justify-between items-center">
            <h2 className="text-2xl font-serif font-black uppercase text-stone-950 dark:text-stone-100">
              Kata Pengantar
            </h2>
            <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400">BAGIAN I</span>
          </div>

          <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-stone-800 dark:text-stone-200 font-serif text-justify">
            <p className="first-letter:text-3xl first-letter:font-bold first-letter:float-left first-letter:mr-2 first-letter:text-amber-700">
              Puji dan syukur kita panjatkan ke hadirat Tuhan Yang Maha Esa atas terwujudnya E-Modul Etika Informasi Berbasis Literasi Digital ini. Di era ledakan informasi dan pesatnya perkembangan teknologi kecerdasan buatan (AI), kemampuan teknis saja tidak lagi cukup. Peserta didik membutuhkan pijakan etis yang kokoh agar tidak tersesat dalam arus informasi yang masif.
            </p>
            <p>
              E-Modul ini disusun dengan pendekatan interaktif terintegrasi yang menggabungkan teori konseptual, analisis kasus nyata di Indonesia, video e-learning berbasis QR Code, hingga simulasi praktis seperti penangkalan hoaks dengan metode S.I.F.T., pengecekan privasi data pribadi (UU PDP No. 27/2022), uji kemiripan Turnitin No-Repo, serta etika berkomentar 5P di media sosial.
            </p>
            <p>
              Diharapkan E-Modul ini dapat menjadi bahan ajar yang menarik, baik digunakan secara daring melalui aplikasi web interaktif, maupun secara luring melalui cetakan PDF dan model Digital Flipbook 3D.
            </p>
          </div>

          <div className="pt-6 flex justify-end font-serif text-xs text-stone-800 dark:text-stone-200">
            <div className="text-center space-y-1">
              <p className="font-bold">Jakarta, Juli 2026</p>
              <p className="italic text-stone-600 dark:text-stone-400">
                {certConfig.instructorRole || 'Tim Dosen Prodi Perpustakaan dan Sains Informasi FIP UNJ'}
              </p>
              <div className="w-24 border-b border-stone-400 my-4 mx-auto" />
              <p className="font-bold">
                {certConfig.instructorName || 'Riyan Sanjaya, M.Hum.'}
              </p>
            </div>
          </div>
        </div>

        {/* PAGE 3: PETUNJUK PENGGUNAAN & VIDEO INTRO */}
        <div className="page-break space-y-6 pt-4">
          <div className="border-b-2 border-stone-900 dark:border-stone-100 pb-2 flex justify-between items-center">
            <h2 className="text-2xl font-serif font-black uppercase text-stone-950 dark:text-stone-100">
              Petunjuk Penggunaan Modul
            </h2>
            <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400">BAGIAN II</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
            <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 space-y-2">
              <h3 className="font-bold font-serif text-amber-900 dark:text-amber-200 uppercase flex items-center gap-2">
                <Target className="w-4 h-4 text-amber-600" /> Alur Pembelajaran Siswa
              </h3>
              <ol className="list-decimal pl-4 space-y-1 text-stone-800 dark:text-stone-200 leading-relaxed">
                <li>Bacalah <strong>Tujuan Pembelajaran</strong> pada setiap Unit.</li>
                <li>Scan <strong>QR Code Video E-Learning</strong> untuk menonton penjelasan visual.</li>
                <li>Pelajari ringkasan materi dan poin-poin penting.</li>
                <li>Selesaikan <strong>Lembar Kerja & Simulasi Kasus</strong>.</li>
                <li>Kerjakan <strong>Soal Latihan Unit</strong> (5 Soal) dan cocokkan dengan Kunci Jawaban.</li>
                <li>Ikuti <strong>Evaluasi Kuis Akhir</strong> untuk mendapatkan Sertifikat.</li>
              </ol>
            </div>

            <div className="p-4 bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-800 space-y-2">
              <h3 className="font-bold font-serif text-stone-900 dark:text-stone-100 uppercase flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-600" /> Glosarium Ikon Modul
              </h3>
              <div className="space-y-1.5 text-stone-700 dark:text-stone-300 text-[11px]">
                <p><strong className="text-stone-900 dark:text-stone-100">🎯 Tujuan:</strong> Target kompetensi yang harus dicapai.</p>
                <p><strong className="text-stone-900 dark:text-stone-100">📹 Video & QR:</strong> Link & scan video e-learning.</p>
                <p><strong className="text-stone-900 dark:text-stone-100">💡 Kasus & Refleksi:</strong> Lembar kerja studi kasus nyata.</p>
                <p><strong className="text-stone-900 dark:text-stone-100">📝 Soal Latihan:</strong> Evaluasi formatif tingkat unit.</p>
                <p><strong className="text-stone-900 dark:text-stone-100">🔍 Cek Fakta & Turnitin:</strong> Alat bantu verifikasi & etika.</p>
              </div>
            </div>
          </div>

          {/* PETUNJUK VIDEO CARD WITH QR CODE */}
          <div className="p-5 bg-white dark:bg-stone-900 border-2 border-stone-800 dark:border-stone-700 space-y-3">
            <div className="flex items-center justify-between border-b border-stone-300 dark:border-stone-800 pb-2">
              <div className="flex items-center gap-2">
                <Video className="w-5 h-5 text-amber-600" />
                <h3 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-sm">
                  {petunjukVideo.title}
                </h3>
              </div>
              <span className="px-2 py-0.5 bg-stone-200 dark:bg-stone-800 text-[10px] font-mono font-bold">
                Durasi: {petunjukVideo.duration}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
              <div className="sm:col-span-3 space-y-2 text-xs">
                <p className="text-stone-700 dark:text-stone-300 italic">
                  "{petunjukVideo.summary}"
                </p>
                <div className="p-2 bg-stone-100 dark:bg-stone-800 font-mono text-[11px] text-amber-800 dark:text-amber-400 break-all border border-stone-300 dark:border-stone-700">
                  Link URL: <a href={petunjukVideo.url} target="_blank" rel="noopener noreferrer" className="underline">{petunjukVideo.url}</a>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center p-2 bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-center space-y-1">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(petunjukVideo.url)}`} 
                  alt="QR Video Intro"
                  className="w-20 h-20 border border-stone-800 bg-white"
                />
                <span className="text-[9px] font-mono font-bold text-amber-900 dark:text-amber-200">
                  SCAN VIDEO INTRO
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* PAGE 4: PETA KONSEPKU (CONCEPT MAP) */}
        <div className="page-break space-y-6 pt-4">
          <div className="border-b-2 border-stone-900 dark:border-stone-100 pb-2 flex justify-between items-center">
            <h2 className="text-2xl font-serif font-black uppercase text-stone-950 dark:text-stone-100">
              Peta Konsep Pembelajaran
            </h2>
            <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400">BAGIAN III</span>
          </div>

          <div className="p-6 bg-[#E9E4DB] dark:bg-[#22211F] border-2 border-stone-800 dark:border-stone-700 space-y-6">
            
            {/* Core Root */}
            <div className="text-center">
              <div className="inline-block px-6 py-2.5 bg-[#1A1A1A] text-white font-serif font-bold text-base uppercase tracking-wider border-2 border-amber-500 shadow-md">
                ETIKA INFORMASI DI ERA DIGITAL
              </div>
            </div>

            {/* 5 Units Flowchart Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs">
              
              <div className="p-3 bg-emerald-100 dark:bg-emerald-950 border border-emerald-400 space-y-1">
                <span className="font-mono font-bold text-emerald-800 dark:text-emerald-300 block text-[10px]">UNIT 1</span>
                <h4 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-xs">Konsep Etika Digital</h4>
                <p className="text-[10px] text-stone-600 dark:text-stone-400">Prinsip Moral & Digital Native</p>
              </div>

              <div className="p-3 bg-amber-100 dark:bg-amber-950 border border-amber-400 space-y-1">
                <span className="font-mono font-bold text-amber-800 dark:text-amber-300 block text-[10px]">UNIT 2</span>
                <h4 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-xs">Detektif Informasi</h4>
                <p className="text-[10px] text-stone-600 dark:text-stone-400">Metode S.I.F.T & Anti-Hoaks</p>
              </div>

              <div className="p-3 bg-indigo-100 dark:bg-indigo-950 border border-indigo-400 space-y-1">
                <span className="font-mono font-bold text-indigo-800 dark:text-indigo-300 block text-[10px]">UNIT 3</span>
                <h4 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-xs">Privasi Data (UU PDP)</h4>
                <p className="text-[10px] text-stone-600 dark:text-stone-400">Keamanan & 10 Langkah Privasi</p>
              </div>

              <div className="p-3 bg-purple-100 dark:bg-purple-950 border border-purple-400 space-y-1">
                <span className="font-mono font-bold text-purple-800 dark:text-purple-300 block text-[10px]">UNIT 4</span>
                <h4 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-xs">Hak Cipta & Etika AI</h4>
                <p className="text-[10px] text-stone-600 dark:text-stone-400">Sitasi APA 7th & Anti-Plagiarisme</p>
              </div>

              <div className="p-3 bg-rose-100 dark:bg-rose-950 border border-rose-400 space-y-1">
                <span className="font-mono font-bold text-rose-800 dark:text-rose-300 block text-[10px]">UNIT 5</span>
                <h4 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-xs">Bijak Bersosial Media</h4>
                <p className="text-[10px] text-stone-600 dark:text-stone-400">Etika 5P & Anti-Cyberbullying</p>
              </div>

            </div>

          </div>
        </div>

        {/* PAGES 5 - 19: ALL 5 UNITS COMPLETE CONTENT */}
        {UNITS_DATA.map((unit) => {
          const theme = getUnitThemeColor(unit.number);
          const unitVideo = getVideoForSection(
            unit.id,
            unit.videoInfo.embedPlaceholder,
            unit.videoInfo.title,
            unit.videoInfo.duration,
            unit.videoInfo.summary
          );
          const quizQuestions = getUnitQuizQuestions(unit.number);

          return (
            <div key={unit.id} className="page-break space-y-8 pt-4">
              
              {/* Unit Header Banner */}
              <div className={`p-6 text-white ${theme.bg} border-l-8 border-stone-900 shadow-lg space-y-3`}>
                <div className="flex items-center justify-between text-xs font-mono font-bold uppercase tracking-widest text-stone-200">
                  <span>UNIT 0{unit.number} &bull; MODUL PEMBELAJARAN</span>
                  <span className="px-3 py-1 bg-white/20 border border-white/30 text-white font-serif">
                    🏆 {unit.badgeName}
                  </span>
                </div>

                <h2 className="text-3xl font-serif font-black tracking-tight uppercase">
                  {unit.title}
                </h2>
                <p className="text-sm font-serif italic text-stone-100">
                  {unit.subtitle}
                </p>
              </div>

              {/* Objectives */}
              <div className="p-4 bg-[#E9E4DB] dark:bg-[#22211F] border border-stone-300 dark:border-stone-800 space-y-2">
                <h3 className="text-xs font-serif font-bold uppercase text-stone-900 dark:text-stone-100 flex items-center gap-2">
                  <Target className="w-4 h-4 text-amber-600" />
                  Tujuan Pembelajaran Unit 0{unit.number}:
                </h3>
                <ul className="list-disc pl-5 space-y-1 text-xs text-stone-800 dark:text-stone-200">
                  {unit.learningGoals.map((g, i) => (
                    <li key={i}>{g}</li>
                  ))}
                </ul>
              </div>

              {/* Unit Video Card with Scan QR Code */}
              <div className="p-5 bg-white dark:bg-stone-900 border-2 border-stone-800 dark:border-stone-700 space-y-3">
                <div className="flex items-center justify-between border-b border-stone-300 dark:border-stone-800 pb-2">
                  <div className="flex items-center gap-2">
                    <Video className="w-5 h-5 text-amber-600" />
                    <h3 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-sm">
                      Video E-Learning: {unitVideo.title}
                    </h3>
                  </div>
                  <span className="px-2 py-0.5 bg-stone-200 dark:bg-stone-800 text-[10px] font-mono font-bold">
                    Durasi: {unitVideo.duration}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
                  <div className="sm:col-span-3 space-y-2 text-xs">
                    <p className="text-stone-700 dark:text-stone-300 italic">
                      "{unitVideo.summary}"
                    </p>
                    <div className="p-2 bg-stone-100 dark:bg-stone-800 font-mono text-[11px] text-amber-800 dark:text-amber-400 break-all border border-stone-300 dark:border-stone-700">
                      Watch URL: <a href={unitVideo.url} target="_blank" rel="noopener noreferrer" className="underline">{unitVideo.url}</a>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center p-2 bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-center space-y-1">
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(unitVideo.url)}`} 
                      alt={`QR Code Video Unit ${unit.number}`}
                      className="w-20 h-20 border border-stone-800 bg-white"
                    />
                    <span className="text-[9px] font-mono font-bold text-amber-900 dark:text-amber-200 uppercase">
                      SCAN VIDEO UNIT 0{unit.number}
                    </span>
                  </div>
                </div>
              </div>

              {/* Material Key Points */}
              <div className="space-y-3">
                <h3 className="font-serif font-bold text-sm uppercase text-stone-900 dark:text-stone-100 border-b border-stone-300 dark:border-stone-800 pb-1">
                  Materi Utama & Poin Penting Unit 0{unit.number}:
                </h3>
                <div className="grid grid-cols-1 gap-2.5 text-xs">
                  {unit.keyPoints.map((pt, i) => (
                    <div key={i} className="p-3 bg-[#E9E4DB]/60 dark:bg-[#22211F]/60 border-l-4 border-amber-600 flex items-start gap-2.5">
                      <span className="font-mono font-bold text-amber-800 dark:text-amber-400 text-xs shrink-0">
                        0{i + 1}.
                      </span>
                      <p className="text-stone-800 dark:text-stone-200">{pt}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Case Study / Worksheet Box */}
              <div className="p-5 bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-600 space-y-3">
                <h4 className="font-serif font-bold text-xs uppercase text-amber-900 dark:text-amber-200 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-600" />
                  Lembar Kerja & Studi Kasus Unit 0{unit.number}:
                </h4>

                {unit.number === 1 && (
                  <div className="space-y-2 text-xs text-stone-800 dark:text-stone-200">
                    <p className="font-bold">Kasus: Batas Etika dan Information Overload</p>
                    <p className="italic">"Seorang siswa menerima pesan berantai tentang kebocoran data ujian nasional di grup chat. Pesan tersebut menyuruh semua orang menyebarkan link tanpa kepastian sumber."</p>
                    <p className="font-mono text-[11px] font-bold">Pertanyaan Refleksi:</p>
                    <ol className="list-decimal pl-4 space-y-1 font-sans">
                      <li>Tindakan etis apa yang seharusnya dilakukan sebelum membagikan link tersebut?</li>
                      <li>Mengapa kepanikan massal bisa terjadi akibat tindakan membagikan tanpa verifikasi?</li>
                    </ol>
                  </div>
                )}

                {unit.number === 2 && (
                  <div className="space-y-2 text-xs text-stone-800 dark:text-stone-200">
                    <p className="font-bold">Kasus: Deteksi Video Deepfake Tokoh Publik</p>
                    <p className="italic">"Beredar video singkat berisi arahan dari seorang menteri yang meminta masyarakat mendaftar bantuan tunai dengan mengirimkan foto KTP."</p>
                    <p className="font-mono text-[11px] font-bold">Panduan Verifikasi S.I.F.T:</p>
                    <ul className="list-disc pl-4 space-y-1 font-sans">
                      <li><strong>S (Stop):</strong> Tahan emosi, jangan terburu-buru mendaftar.</li>
                      <li><strong>I (Investigate):</strong> Periksa apakah akun tersebut resmi atau verified.</li>
                      <li><strong>F (Find):</strong> Cari berita dari portal media nasional terpercaya.</li>
                      <li><strong>T (Trace):</strong> Telusuri konteks asli video di kanal resmi kementerian.</li>
                    </ul>
                  </div>
                )}

                {unit.number === 3 && (
                  <div className="space-y-2 text-xs text-stone-800 dark:text-stone-200">
                    <p className="font-bold">Kasus: Phishing & Kebocoran Data Pribadi (UU PDP)</p>
                    <p className="italic">"Anda menerima SMS berisi pesan 'Selamat! Anda memenangkan hadiah 50 juta rupiah, klik link bit.ly/menang-hadiah untuk klaim'."</p>
                    <p className="font-mono text-[11px] font-bold">Langkah Tindakan:</p>
                    <ol className="list-decimal pl-4 space-y-1 font-sans">
                      <li>Jangan pernah mengklik URL mencurigakan (shortener URL).</li>
                      <li>Laporkan nomor pengirim ke aduannomor.id atau fitur spam HP Anda.</li>
                      <li>Data pribadi Anda (NIK/KTP) dilarang dikirimkan melalui form tidak resmi.</li>
                    </ol>
                  </div>
                )}

                {unit.number === 4 && (
                  <div className="space-y-2 text-xs text-stone-800 dark:text-stone-200">
                    <p className="font-bold">Kasus: Batas Etis Penggunaan AI dalam Tugas Sekolah</p>
                    <p className="italic">"Budi diminta menulis makalah. Budi menyuruh AI (ChatGPT) menulis seluruh isi makalah lalu mengumpulkannya atas namanya sendiri."</p>
                    <p className="font-mono text-[11px] font-bold">Evaluasi Etika:</p>
                    <p className="font-sans">Tindakan Budi termasuk pelanggaran integritas akademik (plagiarisme AI). Seharusnya Budi menggunakan AI hanya sebagai teman diskusi/brainstorming ide, merangkai argumen sendiri, serta mencantumkan atribusi transparansi AI.</p>
                  </div>
                )}

                {unit.number === 5 && (
                  <div className="space-y-2 text-xs text-stone-800 dark:text-stone-200">
                    <p className="font-bold">Kasus: Cyberbullying di Kolom Komentar Media Sosial</p>
                    <p className="italic">"Seorang siswa mengunggah karya lukisannya di Instagram, tetapi beberapa akun anonim menuliskan kata-kata kasar dan menghina karyanya."</p>
                    <p className="font-mono text-[11px] font-bold">Penerapan Prinsip 5P:</p>
                    <p className="font-sans">Pahami perasaan korban &rarr; Periksa pelanggaran &rarr; Perhatikan dampak buruk komentar kasar &rarr; Pertimbangkan konsekuensi hukum &rarr; Putuskan untuk menjadi Upstander (melaporkan akun pemicu bullying).</p>
                  </div>
                )}
              </div>

              {/* Unit Practice Quiz Questions */}
              <div className="space-y-3 pt-2">
                <h4 className="font-serif font-bold text-xs uppercase text-stone-900 dark:text-stone-100 border-b border-stone-300 dark:border-stone-800 pb-1">
                  Soal Latihan Evaluasi Formatif Unit 0{unit.number} (5 Soal Pilihan Ganda):
                </h4>

                <div className="space-y-4 font-sans text-xs">
                  {quizQuestions.map((q, qIdx) => (
                    <div key={q.id} className="p-3 bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-800 space-y-2">
                      <p className="font-bold text-stone-900 dark:text-stone-100">
                        {qIdx + 1}. {q.question}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pl-2 text-stone-700 dark:text-stone-300">
                        {q.options.map((opt, optIdx) => (
                          <div key={optIdx} className="flex items-center gap-1.5">
                            <span className="w-4 h-4 rounded-full border border-stone-400 text-[10px] flex items-center justify-center font-bold">
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span>{opt}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Answer Key & Explanation Box */}
              <div className="p-4 bg-stone-200 dark:bg-stone-800 border border-stone-400 dark:border-stone-700 space-y-2 text-xs font-sans">
                <h5 className="font-serif font-bold text-stone-900 dark:text-stone-100 uppercase">
                  🔑 Kunci Jawaban & Pembahasan Unit 0{unit.number}:
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                  {quizQuestions.map((q, qIdx) => (
                    <div key={q.id} className="p-2 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700">
                      <span className="font-bold text-amber-700 dark:text-amber-400">
                        Soal {qIdx + 1}: Kunci [{String.fromCharCode(65 + q.correctAnswer)}]
                      </span>
                      <p className="text-stone-600 dark:text-stone-400 text-[10px] italic mt-0.5">
                        "{q.explanation}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Unit Quote */}
              <div className="p-3 bg-amber-100 dark:bg-amber-950/60 border-l-4 border-amber-600 font-serif text-xs italic text-amber-900 dark:text-amber-200 text-center">
                “{unit.quote}”
              </div>

            </div>
          );
        })}

        {/* PAGE 20: PANDUAN CEK FAKTA (S.I.F.T.) */}
        <div className="page-break space-y-6 pt-4">
          <div className="border-b-2 border-stone-900 dark:border-stone-100 pb-2 flex justify-between items-center">
            <h2 className="text-2xl font-serif font-black uppercase text-stone-950 dark:text-stone-100">
              Panduan Praktis Cek Fakta (S.I.F.T.)
            </h2>
            <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400">BAGIAN IV</span>
          </div>

          <div className="space-y-4 text-xs font-sans">
            <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-600 space-y-2">
              <h3 className="font-serif font-bold text-sm text-amber-900 dark:text-amber-200 uppercase">
                Metode S.I.F.T (Stop, Investigate, Find, Trace) oleh Michael Caulfield
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-stone-800 dark:text-stone-200">
                <div className="p-2 bg-white dark:bg-stone-900 border border-amber-300">
                  <strong className="text-amber-800 block font-serif">1. S &bull; STOP</strong>
                  Tahan emosi, reaktif, atau dorongan membagikan saat membaca berita provokatif.
                </div>
                <div className="p-2 bg-white dark:bg-stone-900 border border-amber-300">
                  <strong className="text-amber-800 block font-serif">2. I &bull; INVESTIGATE</strong>
                  Selidiki kredibilitas penulis dan domain situs penyebar informasi.
                </div>
                <div className="p-2 bg-white dark:bg-stone-900 border border-amber-300">
                  <strong className="text-amber-800 block font-serif">3. F &bull; FIND</strong>
                  Cari liputan pembanding dari portal media resmi terverifikasi.
                </div>
                <div className="p-2 bg-white dark:bg-stone-900 border border-amber-300">
                  <strong className="text-amber-800 block font-serif">4. T &bull; TRACE</strong>
                  Telusuri klaim, foto, atau video ke konteks publikasi pertamanya.
                </div>
              </div>
            </div>

            <div className="p-4 bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-800 space-y-2">
              <h4 className="font-serif font-bold text-stone-900 dark:text-stone-100 uppercase">
                Operator Pencarian Lanjutan Google (Cheat-Sheet Cek Fakta):
              </h4>
              <ul className="list-disc pl-5 space-y-1 font-mono text-[11px] text-stone-700 dark:text-stone-300">
                <li><strong className="text-amber-700">site:kemenkes.go.id "covid"</strong> &rarr; Mencari informasi khusus dalam domain resmi kementerian.</li>
                <li><strong className="text-amber-700">"klaim persis di sini"</strong> &rarr; Mencari pencocokan kalimat secara eksak.</li>
                <li><strong className="text-amber-700">filetype:pdf "etika informasi"</strong> &rarr; Mencari dokumen ilmiah format PDF.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* PAGE 21: PANDUAN UJI KEMIRIPAN & TURNITIN */}
        <div className="page-break space-y-6 pt-4">
          <div className="border-b-2 border-stone-900 dark:border-stone-100 pb-2 flex justify-between items-center">
            <h2 className="text-2xl font-serif font-black uppercase text-stone-950 dark:text-stone-100">
              Panduan Turnitin & Uji Kemiripan Naskah
            </h2>
            <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400">BAGIAN V</span>
          </div>

          <div className="space-y-4 text-xs font-sans">
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-400 space-y-2">
              <h3 className="font-serif font-bold text-sm text-emerald-900 dark:text-emerald-200 uppercase flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-600" /> Kebijakan No Repository Policy (Non-Archiving)
              </h3>
              <p className="text-stone-800 dark:text-stone-200 leading-relaxed font-serif">
                Sistem penguji kemiripan pada aplikasi dan modul ini menjamin naskah Anda tidak akan diarsipkan ke basis data publik manapun, sehingga tidak akan memicu self-plagiarism saat naskah resmi diserahkan ke institusi.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-emerald-100 dark:bg-emerald-950 border border-emerald-300">
                <strong className="text-emerald-900 dark:text-emerald-200 block font-serif">Skor &lt; 15%: Sangat Baik</strong>
                Naskah orisinal dengan sitasi dan parafrase etis yang sangat kuat.
              </div>
              <div className="p-3 bg-amber-100 dark:bg-amber-950 border border-amber-300">
                <strong className="text-amber-900 dark:text-amber-200 block font-serif">Skor 15-30%: Moderat</strong>
                Perlu penyesuaian klausa dan penyempurnaan atribusi rujukan.
              </div>
              <div className="p-3 bg-rose-100 dark:bg-rose-950 border border-rose-300">
                <strong className="text-rose-900 dark:text-rose-200 block font-serif">Skor &gt; 30%: Indikasi Tinggi</strong>
                Terindikasi plagiarisme langsung/copy-paste tanpa atribusi.
              </div>
            </div>

            <div className="p-4 bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-800 space-y-2">
              <h4 className="font-serif font-bold text-stone-900 dark:text-stone-100 uppercase">
                Standar Sitasi Format APA 7th Edition:
              </h4>
              <p className="text-stone-700 dark:text-stone-300 font-mono text-[11px]">
                <strong>Format Teks:</strong> Menurut Sanjaya (2026), etika informasi merupakan kompas moral...<br/>
                <strong>Format Daftar Pustaka:</strong> Sanjaya, R. (2026). <em>Etika Informasi Berbasis Literasi Digital</em>. Jakarta: Edukasi Press.
              </p>
            </div>
          </div>
        </div>

        {/* PAGE 22: EVALUASI KUIS AKHIR (FINAL EXAM) */}
        <div className="page-break space-y-6 pt-4">
          <div className="border-b-2 border-stone-900 dark:border-stone-100 pb-2 flex justify-between items-center">
            <h2 className="text-2xl font-serif font-black uppercase text-stone-950 dark:text-stone-100">
              Evaluasi Kuis Akhir Pemahaman
            </h2>
            <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400">BAGIAN VI</span>
          </div>

          <div className="space-y-4 font-sans text-xs">
            <p className="font-serif italic text-stone-700 dark:text-stone-300">
              Pilihlah satu jawaban yang paling tepat untuk masing-masing dari 10 soal di bawah ini:
            </p>

            <div className="space-y-3">
              {FINAL_QUIZ_QUESTIONS.map((q, idx) => (
                <div key={q.id} className="p-3 bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-800 space-y-1.5">
                  <p className="font-bold text-stone-900 dark:text-stone-100">
                    {idx + 1}. {q.question}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 pl-2 text-stone-700 dark:text-stone-300">
                    {q.options.map((opt, oIdx) => (
                      <div key={oIdx} className="flex items-center gap-1.5">
                        <span className="w-3.5 h-3.5 rounded-full border border-stone-400 text-[9px] flex items-center justify-center font-bold">
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        <span>{opt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Essay Prompt */}
            <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-400 space-y-2">
              <h4 className="font-serif font-bold text-stone-900 dark:text-stone-100 uppercase">
                Soal Uraian / Esai Reflektif:
              </h4>
              <p className="font-serif italic text-stone-800 dark:text-stone-200">
                "Jelaskan bagaimana Anda akan menerapkan kombinasi etika informasi, verifikasi S.I.F.T., perlindungan data pribadi UU PDP, serta etika 5P saat bersosialisasi di era maraknya teknologi AI di lingkungan sekolah/kampus Anda!"
              </p>
            </div>

            {/* Answer Key Box */}
            <div className="p-4 bg-stone-200 dark:bg-stone-800 border border-stone-400 text-xs">
              <h5 className="font-serif font-bold text-stone-900 dark:text-stone-100 uppercase mb-1">
                🔑 Kunci Jawaban Kuis Akhir:
              </h5>
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-1 font-mono font-bold text-center">
                {FINAL_QUIZ_QUESTIONS.map((q, idx) => (
                  <div key={q.id} className="p-1.5 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700">
                    <span className="text-[10px] text-stone-500 block">S{idx + 1}</span>
                    <span className="text-amber-700 dark:text-amber-400">{String.fromCharCode(65 + q.correctAnswer)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* PAGE 23: GLOSARIUM & DAFTAR PUSTAKA */}
        <div className="page-break space-y-6 pt-4 font-serif">
          <div className="border-b-2 border-stone-900 dark:border-stone-100 pb-2 flex justify-between items-center">
            <h2 className="text-2xl font-serif font-black uppercase text-stone-950 dark:text-stone-100">
              Glosarium & Daftar Pustaka
            </h2>
            <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400">BAGIAN VII</span>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <h3 className="font-bold text-stone-950 dark:text-stone-100 uppercase border-b border-stone-300 pb-1 mb-2">
                Glosarium Istilah Literasi Digital:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-sans">
                <div className="p-2 bg-stone-100 dark:bg-stone-900 border border-stone-300">
                  <strong className="text-amber-800 block">Deepfake:</strong> Rekayasa gambar/video realistis menggunakan AI/Deep Learning.
                </div>
                <div className="p-2 bg-stone-100 dark:bg-stone-900 border border-stone-300">
                  <strong className="text-amber-800 block">Doxing:</strong> Menyebarkan dokumen/data pribadi orang lain secara ilegal.
                </div>
                <div className="p-2 bg-stone-100 dark:bg-stone-900 border border-stone-300">
                  <strong className="text-amber-800 block">Phishing:</strong> Penipuan digital memancing kredensial/data rahasia korban.
                </div>
                <div className="p-2 bg-stone-100 dark:bg-stone-900 border border-stone-300">
                  <strong className="text-amber-800 block">UU PDP:</strong> UU No. 27 Tahun 2022 tentang Perlindungan Data Pribadi.
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-stone-950 dark:text-stone-100 uppercase border-b border-stone-300 pb-1 mb-2">
                Daftar Pustaka Referensi Resmi:
              </h3>
              <ul className="list-disc pl-5 space-y-1.5 text-stone-800 dark:text-stone-200">
                <li>Caulfield, M. (2019). <em>Web Literacy for Student Fact-Checkers</em>. Washington: Pressbooks.</li>
                <li>Palandeng, R. A. C., Setiabudhi, D. O., & Maramis, M. R. (2023). Aspek Hukum Plagiarisme Sebagai Pelanggaran Integritas Akademik Di Perguruan Tinggi. <em>LEX PRIVATUM</em>, 12(1).</li>
                <li>Undang-Undang Republik Indonesia Nomor 27 Tahun 2022 tentang Perlindungan Data Pribadi (PDP).</li>
                <li>Undang-Undang Republik Indonesia Nomor 11 Tahun 2008 tentang Informasi dan Transaksi Elektronik (UU ITE).</li>
                <li>Undang-Undang Republik Indonesia Nomor 28 Tahun 2014 tentang Hak Cipta.</li>
                <li>Undang-Undang Republik Indonesia Nomor 14 Tahun 2008 tentang Keterbukaan Informasi Publik (UU KIP).</li>
              </ul>
            </div>
          </div>
        </div>

        {/* PAGE 24: SERTIFIKAT KELULUSAN TERHUBUNG PESERTA */}
        <div className="space-y-6 pt-4 font-serif text-center border-8 border-amber-600 p-8 sm:p-12 bg-gradient-to-b from-amber-50/50 via-white to-amber-50/50 dark:from-stone-900 dark:to-stone-950">
          <div className="space-y-2">
            <div className="flex justify-center text-amber-600 mb-2">
              <Award className="w-16 h-16" />
            </div>
            <p className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-amber-700">
              {certConfig.institutionName || 'TIM DOSEN PRODI PERPUSTAKAAN DAN SAINS INFORMASI FIP UNJ'}
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-stone-950 dark:text-stone-100 uppercase tracking-tight">
              {certConfig.certificateTitle || 'SERTIFIKAT KELULUSAN E-MODUL'}
            </h2>
            <p className="text-xs italic text-stone-600 dark:text-stone-400">
              {certConfig.subTitle || 'E-Modul Etika Informasi Berbasis Literasi Digital'}
            </p>
          </div>

          <div className="space-y-1 py-4 border-y-2 border-stone-800 dark:border-stone-200 max-w-md mx-auto">
            <p className="text-xs italic text-stone-600 dark:text-stone-400">Diberikan secara resmi kepada:</p>
            <span className="text-2xl font-serif font-bold text-amber-900 dark:text-amber-300 block">
              {userProgress?.studentName || 'Peserta Literasi Digital Indonesia'}
            </span>
            <p className="text-xs font-bold text-stone-600 dark:text-stone-400">
              {userProgress?.studentClass || 'Masyarakat Umum & Pelajar Indonesia'}
            </p>
          </div>

          <p className="text-xs text-stone-800 dark:text-stone-200 max-w-lg mx-auto leading-relaxed">
            Telah menyelesaikan seluruh rangkaian 5 Unit Pembelajaran, Lembar Kerja Studi Kasus, Uji Kemiripan Naskah, dan Lulus Kuis Akhir Evaluasi Etika Informasi Berbasis Literasi Digital.
          </p>

          <div className="inline-block px-5 py-1.5 bg-amber-100 dark:bg-amber-950 border border-amber-600 text-xs font-mono font-bold text-amber-900 dark:text-amber-300">
            SKOR EVALUASI: {userProgress?.finalQuizScore ?? 100} / 100 POIN
          </div>

          <div className="pt-6 flex justify-between items-end text-xs text-stone-700 dark:text-stone-300 font-serif">
            <div className="text-center space-y-1">
              <p className="font-mono text-[10px] font-bold">VERIFIED CERTIFICATE</p>
              <p className="font-mono text-[11px] font-bold">
                ID: {(certConfig.certificatePrefix || 'EMOD-LITDIG')}-2026-{(userProgress?.studentName || 'STD').slice(0,3).toUpperCase()}-77
              </p>
              {certConfig.stampUrl ? (
                <img src={certConfig.stampUrl} alt="Stempel" className="h-12 w-auto mx-auto opacity-80" />
              ) : (
                <div className="w-12 h-12 rounded-full border border-dashed border-amber-700 text-amber-700 flex items-center justify-center text-[7px] font-bold mx-auto">
                  STEMPEL
                </div>
              )}
            </div>

            <div className="text-center space-y-1">
              <p className="text-[10px] text-stone-500 font-sans">
                {certConfig.issueCity || 'Jakarta, Indonesia'}, Juli 2026
              </p>
              {certConfig.signatureUrl ? (
                <img src={certConfig.signatureUrl} alt="Tanda Tangan" className="h-10 w-auto mx-auto" />
              ) : (
                <div className="font-serif italic text-amber-900 dark:text-amber-300 font-bold text-sm border-b border-dashed border-stone-400 px-3 py-0.5 my-1 inline-block">
                  ~ RiyanSanjaya ~
                </div>
              )}
              <p className="font-bold">{certConfig.instructorRole || 'Tim Dosen Prodi Perpustakaan dan Sains Informasi FIP UNJ'}</p>
              <p className="font-bold">{certConfig.instructorName || 'Riyan Sanjaya, M.Hum.'}</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
