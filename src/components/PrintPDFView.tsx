import React from 'react';
import { Printer, Download, BookOpen, ArrowLeft } from 'lucide-react';
import { UNITS_DATA } from '../data/modulData';
import { SectionId } from '../types';

interface PrintPDFViewProps {
  onSelectSection: (sectionId: SectionId) => void;
}

export const PrintPDFView: React.FC<PrintPDFViewProps> = ({ onSelectSection }) => {
  
  const handleTriggerPrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16 font-sans">
      
      {/* Top Banner Control */}
      <div className="bg-[#1A1A1A] text-[#F9F7F2] p-6 sm:p-8 space-y-4 border-l-8 border-amber-600 shadow-md no-print">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="px-3 py-1 bg-stone-800 border border-stone-700 text-[10px] uppercase tracking-widest font-bold text-amber-300 font-serif italic">
              AKSES LURING / OFFLINE
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif font-black text-white">
              Cetak & Download Modul (PDF)
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 max-w-lg">
              Format di bawah ini telah dioptimalkan secara khusus untuk dicetak atau disimpan sebagai file PDF lengkap (34 Halaman) agar materi Etika Informasi dapat diakses siswa tanpa internet.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleTriggerPrint}
              className="px-6 py-3 bg-[#F9F7F2] text-stone-950 font-bold uppercase tracking-widest text-xs hover:bg-stone-200 transition-all flex items-center gap-2 shrink-0 border border-stone-300"
            >
              <Printer className="w-5 h-5 text-stone-950" />
              <span>Cetak / Simpan Ke PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* PRINT DOCUMENT WRAPPER (This renders in standard view & print view) */}
      <div className="bg-[#F9F7F2] text-stone-900 p-8 sm:p-12 border border-stone-300 shadow-xl space-y-12 font-serif leading-relaxed text-sm">
        
        {/* Cover Page */}
        <div className="text-center space-y-8 py-12 border-b border-stone-400 page-break-after">
          <p className="text-xs font-sans uppercase tracking-[0.25em] text-stone-500 font-bold">
            Jelajah Digital — Etika Informasi untuk Generasi Kritis
          </p>
          
          <div className="space-y-3 py-8">
            <h2 className="text-xs font-serif font-bold uppercase text-stone-700 tracking-widest">E-MODUL</h2>
            <h1 className="text-4xl sm:text-6xl font-serif font-black text-stone-950 tracking-tight">
              ETIKA INFORMASI
            </h1>
            <p className="text-base font-serif italic text-stone-600">
              E-Modul Etika Informasi Berbasis Literasi Digital
            </p>
          </div>

          <div className="p-6 bg-[#E9E4DB] border border-stone-300 font-serif text-xs text-stone-800 max-w-md mx-auto">
            📱 Panduan Praktis Mengidentifikasi Hoaks, Menjaga Privasi Data, Hak Cipta, Etika AI, dan Bijak Bersosial Media.
          </div>

          <div className="pt-12 font-serif space-y-1">
            <h3 className="text-base font-bold text-stone-950 uppercase">LITERASI DIGITAL INDONESIA</h3>
            <p className="text-xs text-stone-600 font-bold">Tahun 2026</p>
          </div>
        </div>

        {/* Units Content */}
        {UNITS_DATA.map((unit) => (
          <div key={unit.id} className="space-y-6 pt-6 border-b border-stone-300 pb-10 page-break-after">
            <div className="font-serif border-b-2 border-stone-900 pb-2 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800">UNIT 0{unit.number}</span>
                <h2 className="text-2xl font-serif font-black text-stone-950">{unit.title}</h2>
              </div>
              <span className="text-xs text-stone-500 italic">{unit.subtitle}</span>
            </div>

            <div className="space-y-3 font-serif text-xs sm:text-sm">
              <h4 className="font-bold text-stone-950 uppercase text-xs">Tujuan Pembelajaran:</h4>
              <ul className="list-disc pl-5 space-y-1 text-stone-800">
                {unit.learningGoals.map((g, i) => (
                  <li key={i}>{g}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-3 font-serif text-xs sm:text-sm">
              <h4 className="font-bold text-stone-950 uppercase text-xs">Rangkuman Poin Penting Unit 0{unit.number}:</h4>
              <ul className="list-disc pl-5 space-y-1 text-stone-800">
                {unit.keyPoints.map((pt, i) => (
                  <li key={i}>{pt}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-[#E9E4DB] border-l-4 border-amber-600 font-serif text-xs italic text-stone-900 text-center">
              “{unit.quote}”
            </div>
          </div>
        ))}

        {/* References */}
        <div className="font-serif space-y-4 pt-6">
          <h3 className="text-lg font-serif font-bold text-stone-950 border-b border-stone-300 pb-2">Daftar Pustaka</h3>
          <ul className="text-xs text-stone-800 space-y-2 pl-4">
            <li>Mafindo. (2025). Panduan Cek Fakta untuk Masyarakat. Jakarta: Mafindo.</li>
            <li>Palandeng, R. A. C., dkk. (2023). Aspek Hukum Plagiarisme sebagai Pelanggaran Integritas Akademik di Perguruan Tinggi. Jurnal Hukum, 12(2), 45-60.</li>
            <li>Sanjaya, R. (2026). E-Modul Etika Informasi Berbasis Literasi Digital. Literasi Digital Press.</li>
            <li>Undang-Undang No. 27 Tahun 2022 tentang Perlindungan Data Pribadi (PDP).</li>
            <li>Wulandari, F. (2024). Problematika Pelanggaran Hak Cipta di Era Digital. Jurnal Komunikasi, 15(1), 78-95.</li>
          </ul>
        </div>

      </div>

    </div>
  );
};
