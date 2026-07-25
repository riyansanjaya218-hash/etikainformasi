import React from 'react';
import { FileText, ArrowRight, CheckCircle2, Users, Building2 } from 'lucide-react';
import { SectionId } from '../types';

interface KataPengantarProps {
  onSelectSection: (sectionId: SectionId) => void;
}

export const KataPengantarView: React.FC<KataPengantarProps> = ({ onSelectSection }) => {
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
          <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          Kata Pengantar
        </h1>
      </div>

      {/* Content Card */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-xs space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
        
        <p className="text-base sm:text-lg font-medium text-slate-800 dark:text-slate-200">
          Puji syukur ke hadirat Tuhan Yang Maha Esa karena atas rahmat-Nya, E-Modul <span className="font-bold text-blue-600 dark:text-blue-400">“Jelajah Digital: Etika Informasi untuk Generasi Kritis”</span> dapat diselesaikan dengan baik.
        </p>

        <p>
          E-modul ini merupakan hasil dari pengembangan <span className="font-semibold italic">“E-Modul Etika Informasi Berbasis Literasi Digital”</span> Tahun 2026. Pengembangan ini lahir dari keprihatinan terhadap masih maraknya fenomena hoaks, plagiarisme, pelanggaran hak cipta, dan rendahnya kesadaran etika digital di kalangan masyarakat, khususnya generasi muda.
        </p>

        {/* Survey Box */}
        <div className="bg-blue-50 dark:bg-blue-950/50 rounded-xl p-5 border border-blue-200 dark:border-blue-800 space-y-3">
          <div className="flex items-center gap-2 text-blue-900 dark:text-blue-200 font-bold text-sm">
            <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span>Hasil Survei Kebutuhan 100+ Responden (Siswa, Mahasiswa, Pendidik & Masyarakat Umum)</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Hasil survei kebutuhan menunjukkan bahwa responden sangat membutuhkan panduan praktis untuk:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Mengidentifikasi hoaks & informasi palsu</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Menjaga privasi & keamanan data pribadi</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Memahami hak cipta & plagiarisme</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Menggunakan AI (Kecerdasan Buatan) secara etis</span>
            </li>
            <li className="flex items-center gap-2 sm:col-span-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Bebas berkomentar & berbagi informasi secara bijak di media sosial</span>
            </li>
          </ul>
        </div>

        <p>
          E-modul ini hadir untuk menjawab kebutuhan tersebut. Disajikan dengan pendekatan interaktif, studi kasus nyata, dan desain yang menarik, kami berharap e-modul ini dapat menjadi sahabat belajar bagi siapa pun yang ingin menjadi warga digital yang cerdas, kritis, dan bertanggung jawab.
        </p>

        <p className="font-semibold italic text-blue-700 dark:text-blue-300 text-center py-2 bg-blue-50/50 dark:bg-blue-900/20 rounded-xl">
          “Selamat belajar dan jelajahi dunia digital dengan bijak!”
        </p>

        {/* Signature */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded-xl text-slate-700 dark:text-slate-200">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-slate-900 dark:text-white text-sm">Tim Dosen Prodi Perpustakaan dan Sains Informasi FIP UNJ</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Penyusun & Pengembang E-Modul Etika Informasi</p>
              <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">Riyan Sanjaya, M.Hum.</p>
            </div>
          </div>

          <button
            onClick={() => onSelectSection('petunjuk')}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs shadow-md transition-all flex items-center gap-2"
          >
            <span>Petunjuk Penggunaan</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
