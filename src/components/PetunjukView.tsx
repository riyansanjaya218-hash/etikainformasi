import React from 'react';
import { UniversalVideoPlayer } from './UniversalVideoPlayer';
import { 
  HelpCircle, 
  BookOpen, 
  Target, 
  Lightbulb, 
  Edit3, 
  Video, 
  Search, 
  Star, 
  Trophy, 
  ArrowRight,
  PlayCircle
} from 'lucide-react';
import { SectionId } from '../types';

interface PetunjukViewProps {
  onSelectSection: (sectionId: SectionId) => void;
  videoInfo?: {
    embedUrl: string;
    title: string;
    duration: string;
    summary: string;
  };
}

export const PetunjukView: React.FC<PetunjukViewProps> = ({ onSelectSection, videoInfo }) => {
  const video = videoInfo || {
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    title: 'Video Perkenalan E-Modul “Jelajah Digital”',
    duration: '3:45 menit',
    summary: 'Penjelasan latar belakang e-modul, gambaran 5 unit interaktif, serta pesan moral pentingnya generasi kritis di era banjir informasi.'
  };

  const symbols = [
    { icon: BookOpen, symbol: '📖 Materi', color: 'text-blue-600 bg-blue-50', desc: 'Baca dan pahami penjelasan konsep utama' },
    { icon: Target, symbol: '🎯 Tujuan', color: 'text-rose-600 bg-rose-50', desc: 'Tujuan pembelajaran yang akan dicapai' },
    { icon: Lightbulb, symbol: '💡 Info Penting', color: 'text-amber-600 bg-amber-50', desc: 'Informasi penting dan fakta riset yang perlu diingat' },
    { icon: Edit3, symbol: '✏️ Latihan', color: 'text-emerald-600 bg-emerald-50', desc: 'Kerjakan soal dan latihan untuk menguji pemahaman' },
    { icon: Video, symbol: '🎬 Video', color: 'text-purple-600 bg-purple-50', desc: 'Simak video penjelasan pengantar (klik untuk putar)' },
    { icon: Search, symbol: '🔍 Studi Kasus', color: 'text-indigo-600 bg-indigo-50', desc: 'Analisis contoh kasus nyata di masyarakat' },
    { icon: Star, symbol: '⭐ Kuis', color: 'text-yellow-600 bg-yellow-50', desc: 'Uji pemahamanmu secara interaktif & kumpulkan skor' },
    { icon: Trophy, symbol: '🏆 Proyek', color: 'text-amber-600 bg-amber-50', desc: 'Tantangan praktik literasi digital untuk dipraktikkan' }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
          <span>Jelajah Digital</span>
          <span>—</span>
          <span>Etika Informasi untuk Generasi Kritis</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
          <HelpCircle className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          Petunjuk Penggunaan E-Modul
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          Halo, Sobat Digital! Sebelum memulai petualangan belajar etika informasi, yuk pahami dulu simbol dan fitur dalam e-modul ini:
        </p>
      </div>

      {/* Symbol Table */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
        <h3 className="font-bold text-slate-900 dark:text-white text-base">Panduan Simbol & Ikon</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {symbols.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200/80 dark:border-slate-800">
                <div className={`p-2.5 rounded-lg shrink-0 ${item.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white text-xs">{item.symbol}</p>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* How to Access & Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Access Steps */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-3">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">1</span>
            Cara Mengakses E-Modul:
          </h3>
          <ol className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 list-decimal pl-5">
            <li>Baca setiap materi secara berurutan dari Unit 1 sampai Unit 5.</li>
            <li>Klik tombol <span className="font-semibold text-blue-600 dark:text-blue-400">“Selanjutnya”</span> di bagian bawah untuk pindah halaman.</li>
            <li>Kerjakan semua latihan dan kuis untuk mengumpulkan poin & skor.</li>
            <li>Gunakan fitur pencarian (<Search className="w-3.5 h-3.5 inline text-blue-600" />) di pojok kanan atas untuk menemukan topik tertentu.</li>
            <li>Kumpulkan lencana (<Trophy className="w-3.5 h-3.5 inline text-amber-500" />) setiap menyelesaikan satu unit.</li>
          </ol>
        </div>

        {/* Study Tips */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-3">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center">2</span>
            Tips Belajar Efektif:
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 list-disc pl-5">
            <li>Siapkan catatan kecil / fitur catatan untuk menulis poin-poin penting.</li>
            <li>Diskusikan studi kasus dan simulasi bersama teman atau kelas.</li>
            <li>Praktikkan langsung tips verifikasi berita, privasi, dan etika AI dalam kehidupan harianmu.</li>
            <li>Gunakan mode <span className="font-semibold text-emerald-600">PDF Luring</span> jika ingin belajar tanpa internet.</li>
          </ul>
        </div>

      </div>

      {/* Video Intro Section */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 rounded-2xl p-6 sm:p-8 text-white space-y-4 shadow-lg border border-purple-800/50">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl text-yellow-300">
            <Video className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-purple-200 uppercase tracking-wider">Video Pengantar E-Modul</span>
            <h3 className="text-lg font-bold text-white">{video.title}</h3>
          </div>
        </div>

        {/* Responsive Video Container */}
        <div className="aspect-video w-full rounded-xl bg-slate-950 border border-white/10 overflow-hidden flex flex-col items-center justify-center relative group shadow-inner">
          <UniversalVideoPlayer
            url={(video as any).youtubeUrl || video.embedUrl}
            title={video.title}
          />
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10 text-xs sm:text-sm space-y-1">
          <p><span className="font-semibold text-purple-200">Durasi:</span> {video.duration}</p>
          <p><span className="font-semibold text-purple-200">Ringkasan isi video:</span> {video.summary}</p>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="flex justify-end pt-4">
        <button
          onClick={() => onSelectSection('peta-konsep')}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-md transition-all flex items-center gap-2"
        >
          <span>Lihat Peta Konsep</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
