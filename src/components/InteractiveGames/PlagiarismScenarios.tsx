import React, { useState } from 'react';
import { BookOpen, CheckCircle, AlertCircle, HelpCircle } from 'lucide-react';

export const PlagiarismScenarios: React.FC = () => {
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});

  const scenarios = [
    {
      id: 1,
      title: 'Kasus 1: Copy-Paste Paragraf',
      caseText: 'Maya mengambil paragraf dari buku teks dan menempelkannya ke tugasnya tanpa tanda kutip. Dia hanya mengganti 2-3 kata saja.',
      isPlagiarism: true,
      explanation: 'YA (PLAGIARISME LANGSUNG). Mengubah sedikit kata tanpa tanda kutip dan tanpa mencantumkan sumber sitasi tetap dikategorikan sebagai plagiarisme.'
    },
    {
      id: 2,
      title: 'Kasus 2: Parafrase Tanpa Sumber',
      caseText: 'Budi membaca ide menarik dari sebuah artikel ilmiah lalu menuliskannya ulang dengan kata-kata sendiri secara lengkap, namun tidak mencantumkan nama penulis sumbernya.',
      isPlagiarism: true,
      explanation: 'YA (PLAGIARISME IDE). Meskipun struktur kalimat diganti (parafrase), ide pokok tersebut tetap karya intelektual orang lain dan wajib diberi sitasi (misal: Sanjaya, 2026).'
    },
    {
      id: 3,
      title: 'Kasus 3: Menggunakan AI dengan Transparan',
      caseText: 'Siti menggunakan ChatGPT/Gemini untuk mencari ide awal judul makalah. Dia mendapatkan beberapa saran ide, lalu mengembangkannya secara mandiri dan mencantumkan dalam lampiran bahwa AI digunakan untuk perancangan awal (brainstorming).',
      isPlagiarism: false,
      explanation: 'TIDAK (ETIS DENGAN TRANSPARANSI). Memanfaatkan AI sebagai alat bantu pemicu ide awal yang kemudian dikembangkan sendiri dan dideklarasikan secara jujur adalah praktik akademis yang etis.'
    }
  ];

  const toggleReveal = (id: number) => {
    setRevealed(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-xs space-y-6">
      
      <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-700 pb-3">
        <div className="p-2.5 bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 rounded-xl">
          <BookOpen className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
            Skenario Interaktif: Plagiarisme atau Bukan? ⚖️
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Uji pemahamanmu dengan menganalisis 3 skenario nyata akademik di bawah ini!
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {scenarios.map((sc) => {
          const isOpen = revealed[sc.id];
          return (
            <div key={sc.id} className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                  {sc.title}
                </span>
                <span className="text-xs text-slate-400 font-medium">Klik untuk Cek Jawaban</span>
              </div>

              <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                {sc.caseText}
              </p>

              <button
                type="button"
                onClick={() => toggleReveal(sc.id)}
                className={`w-full py-2 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  isOpen
                    ? sc.isPlagiarism 
                      ? 'bg-rose-600 text-white' 
                      : 'bg-emerald-600 text-white'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-purple-400'
                }`}
              >
                <HelpCircle className="w-4 h-4" />
                <span>{isOpen ? (sc.isPlagiarism ? 'Ternyata: PLAGIARISME!' : 'Ternyata: BUKAN PLAGIARISME (ETIS)') : 'Apakah Ini Tindakan Plagiarisme?'}</span>
              </button>

              {isOpen && (
                <div className={`p-3.5 rounded-xl text-xs leading-relaxed font-medium animate-fade-in ${
                  sc.isPlagiarism
                    ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-900 dark:text-rose-200 border border-rose-200'
                    : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 border border-emerald-200'
                }`}>
                  {sc.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
