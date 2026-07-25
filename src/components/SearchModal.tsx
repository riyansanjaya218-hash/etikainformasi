import React, { useState } from 'react';
import { Search, X, ArrowRight, BookOpen } from 'lucide-react';
import { SectionId, SearchResultItem } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSection: (sectionId: SectionId) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectSection
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const searchableIndex: SearchResultItem[] = [
    { sectionId: 'unit-1', sectionTitle: 'Unit 1: Mengenal Etika Informasi', title: 'Definisi Etika Informasi', snippet: 'Rambu lalu lintas di dunia digital, moralitas penciptaan & penyebaran informasi.' },
    { sectionId: 'unit-1', sectionTitle: 'Unit 1: Mengenal Etika Informasi', title: 'Tantangan Digital Native', snippet: 'Information Overload, Echo Chamber, Filter Bubble, Kecepatan vs Ketepatan.' },
    { sectionId: 'unit-2', sectionTitle: 'Unit 2: Menjadi Detektif Informasi', title: 'Jenis Informasi Palsu', snippet: 'Perbedaan Misinformasi, Disinformasi, dan Malinformasi serta niat penyebar.' },
    { sectionId: 'unit-2', sectionTitle: 'Unit 2: Menjadi Detektif Informasi', title: 'Metode S.I.F.T', snippet: 'Stop, Investigate the source, Find better coverage, Trace claims to original context.' },
    { sectionId: 'unit-2', sectionTitle: 'Unit 2: Menjadi Detektif Informasi', title: 'Alat Cek Fakta', snippet: 'Mafindo, turnbackhoax.id, Kominfo, Tempo CekFakta, Reverse Image Search.' },
    { sectionId: 'unit-2', sectionTitle: 'Unit 2: Menjadi Detektif Informasi', title: 'Bahaya Deepfake & AI', snippet: 'Video/audio rekayasa kecerdasan buatan dan cara mendeteksi ketidakwajaran.' },
    { sectionId: 'unit-3', sectionTitle: 'Unit 3: Menjaga Privasi & Keamanan', title: 'UU PDP No. 27/2022', snippet: 'Klasifikasi Data Pribadi Spesifik (kesehatan, biometrik) vs Data Pribadi Umum.' },
    { sectionId: 'unit-3', sectionTitle: 'Unit 3: Menjaga Privasi & Keamanan', title: 'Ancaman Siber (Phishing)', snippet: 'Pengambilalihan akun, email penipuan kampus, malware, dan social engineering.' },
    { sectionId: 'unit-3', sectionTitle: 'Unit 3: Menjaga Privasi & Keamanan', title: '10 Panduan Praktis Keamanan', snippet: 'Kata sandi 12+ karakter, Otentikasi 2FA, Wi-Fi aman, dan manajemen izin aplikasi.' },
    { sectionId: 'unit-4', sectionTitle: 'Unit 4: Menghargai Karya Orang Lain', title: 'Plagiarisme & Bentuknya', snippet: 'Plagiarisme langsung, parafrase tanpa sumber, ide, dan konsekuensi akademik.' },
    { sectionId: 'unit-4', sectionTitle: 'Unit 4: Menghargai Karya Orang Lain', title: 'Format Sitasi APA 7th', snippet: 'Cara mengutip langsung, memparafrasekan, dan menulis daftar pustaka secara etis.' },
    { sectionId: 'unit-4', sectionTitle: 'Unit 4: Menghargai Karya Orang Lain', title: 'Lisensi Creative Commons', snippet: 'Simbol CC BY, CC BY-SA, CC BY-ND, CC BY-NC, dan lisensi domain publik CC0.' },
    { sectionId: 'unit-4', sectionTitle: 'Unit 4: Menghargai Karya Orang Lain', title: 'Etika Penggunaan AI', snippet: 'Batasan etis penggunaan ChatGPT/Gemini untuk tugas kuliah dan skripsi.' },
    { sectionId: 'unit-5', sectionTitle: 'Unit 5: Bijak Bersosial Media', title: 'Etika Berkomentar', snippet: 'Sopan santun, verifikasi sebelum komentar, dan menghindari trolling.' },
    { sectionId: 'unit-5', sectionTitle: 'Unit 5: Bijak Bersosial Media', title: 'Bentuk Cyberbullying', snippet: 'Penghinaan, pelecehan, doxing, impersonasi, dan cara menghentikan perundungan.' },
    { sectionId: 'unit-5', sectionTitle: 'Unit 5: Bijak Bersosial Media', title: 'Prinsip 5P Saring Sebelum Sharing', snippet: 'Pahami, Periksa, Perhatikan, Pertimbangkan, Putuskan sebelum menyebarkan konten.' },
    { sectionId: 'kuis-akhir', sectionTitle: 'Kuis Akhir', title: 'Evaluasi Pemahaman & Sertifikat', snippet: '10 Soal Pilihan Ganda dan 1 Studi Kasus Essay verifikasi WhatsApp.' }
  ];

  const results = query.trim() === '' 
    ? searchableIndex.slice(0, 5) 
    : searchableIndex.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) || 
        item.snippet.toLowerCase().includes(query.toLowerCase()) ||
        item.sectionTitle.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <div className="fixed inset-0 bg-stone-900/70 backdrop-blur-xs z-50 flex items-start justify-center p-4 pt-20 font-sans">
      <div className="bg-[#F9F7F2] dark:bg-[#1A1A18] w-full max-w-xl border border-stone-300 dark:border-stone-800 shadow-2xl overflow-hidden space-y-4">
        
        {/* Search Input Header */}
        <div className="p-4 border-b border-stone-300 dark:border-stone-800 flex items-center gap-3 bg-[#E9E4DB] dark:bg-[#22211F]">
          <Search className="w-5 h-5 text-amber-700 dark:text-amber-400" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari topik (misal: SIFT, Hoaks, Phishing, APA, 5P, AI)..."
            className="w-full bg-transparent text-xs sm:text-sm font-sans text-stone-900 dark:text-stone-100 focus:outline-none placeholder-stone-500"
          />
          <button
            onClick={onClose}
            className="p-1 text-stone-600 hover:bg-stone-300 dark:hover:bg-stone-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto px-4 pb-4 space-y-2">
          {results.length > 0 ? (
            results.map((item, idx) => (
              <div
                key={idx}
                onClick={() => {
                  onSelectSection(item.sectionId);
                  onClose();
                }}
                className="p-3 bg-white dark:bg-stone-900 hover:bg-[#E9E4DB] dark:hover:bg-stone-800 border border-stone-300 dark:border-stone-800 cursor-pointer transition-colors space-y-1 group"
              >
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-amber-800 dark:text-amber-400 font-serif">
                  <span>{item.sectionTitle}</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h4 className="font-serif font-bold text-xs sm:text-sm text-stone-900 dark:text-stone-100">{item.title}</h4>
                <p className="text-[11px] text-stone-600 dark:text-stone-400 line-clamp-2">{item.snippet}</p>
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-xs font-serif italic text-stone-500">
              Tidak ditemukan topik dengan kata kunci "<span className="font-bold text-stone-800 dark:text-stone-200">{query}</span>"
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
