import React, { useState } from 'react';
import { Search, AlertTriangle, ShieldCheck, CheckSquare, ArrowRight, RotateCcw } from 'lucide-react';

export const DetectiveSim: React.FC = () => {
  const [selectedFlags, setSelectedFlags] = useState<string[]>([]);
  const [chosenAction, setChosenAction] = useState<string | null>(null);
  const [isAnalyzed, setIsAnalyzed] = useState<boolean>(false);

  const redFlags = [
    { id: 'title', label: 'Judul provokatif & menggunakan huruf kapital (JANGAN MINUM AIR...)', isRedFlag: true },
    { id: 'source', label: 'Mengatasnamakan WHO tapi tidak mencantumkan link/sumber lembaga resmi', isRedFlag: true },
    { id: 'date', label: 'Tidak ada tanggal dan waktu pasti terjadinya peristiwa', isRedFlag: true },
    { id: 'language', label: 'Menggunakan bahasa emosional ("Sangat berbahaya", "Share agar semua orang tahu")', isRedFlag: true },
    { id: 'image', label: 'Menggunakan foto botol plastik seram tanpa kejelasan lisensi', isRedFlag: true },
    { id: 'scientific', label: 'Mencantumkan kutipan lengkap dari jurnal PubMed terakreditasi', isRedFlag: false },
  ];

  const toggleFlag = (id: string) => {
    setSelectedFlags(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const handleAnalyze = () => {
    if (selectedFlags.length === 0 || !chosenAction) {
      alert('Pilih minimal ciri yang mencurigakan dan tentukan tindakan verifikasimu.');
      return;
    }
    setIsAnalyzed(true);
  };

  const handleReset = () => {
    setSelectedFlags([]);
    setChosenAction(null);
    setIsAnalyzed(false);
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-xs space-y-6">
      
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-700 pb-3">
        <div className="p-2.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-xl">
          <Search className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
            Simulasi Interaktif: Jadilah Detektif Informasi! 🕵️‍♂️
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Analisis postingan viral di bawah ini dan terapkan teknik deteksi hoaks!
          </p>
        </div>
      </div>

      {/* Mock Social Media Viral Post Box */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:bg-slate-900 border-2 border-red-300 dark:border-red-900 rounded-2xl p-5 space-y-3 shadow-inner">
        <div className="flex items-center justify-between text-xs font-bold text-red-600 dark:text-red-400">
          <span className="flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4" />
            POSTINGAN VIRAL MEDIA SOSIAL
          </span>
          <span className="bg-red-200 dark:bg-red-950 text-red-800 dark:text-red-300 px-2 py-0.5 rounded-md">
            🔥 Trend Hot
          </span>
        </div>

        <div className="space-y-2">
          <h4 className="font-extrabold text-red-700 dark:text-red-400 text-sm sm:text-base leading-snug">
            🔥🔥🔥 JANGAN MINUM AIR DI KEMASAN PLASTIK! 🔥🔥🔥
          </h4>
          <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed italic bg-white/70 dark:bg-slate-800/80 p-3 rounded-xl border border-red-200 dark:border-red-900">
            “Badan Kesehatan Dunia (WHO) telah mengeluarkan peringatan darurat! Semua air minum kemasan plastik mengandung mikroplastik berbahaya yang dapat menyebabkan kanker. Segera hentikan konsumsi air kemasan dan gunakan air keran yang direbus! Share agar semua orang tahu!!!”
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-slate-500 dark:text-slate-400 pt-2 border-t border-red-200 dark:border-red-900/50">
          <div><span className="font-semibold">Sumber:</span> *WHO (tanpa link)</div>
          <div><span className="font-semibold">Foto:</span> Botol Plastik Seram</div>
          <div><span className="font-semibold">Waktu:</span> Tanpa Tanggal</div>
          <div><span className="font-semibold">Gaya:</span> Tanda Seru & Emoji</div>
        </div>
      </div>

      {/* Investigation Tasks */}
      {!isAnalyzed ? (
        <div className="space-y-5">
          
          {/* Step 1: Flag checks */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              Langkah 1: Tandai Ciri-Ciri Mencurigakan (Klik Ciri yang Memuat Red Flag)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {redFlags.map((flag) => {
                const isSelected = selectedFlags.includes(flag.id);
                return (
                  <button
                    key={flag.id}
                    type="button"
                    onClick={() => toggleFlag(flag.id)}
                    className={`p-3 rounded-xl border text-left text-xs font-medium transition-all flex items-start gap-2.5 ${
                      isSelected
                        ? 'bg-red-50 dark:bg-red-950/60 border-red-400 text-red-900 dark:text-red-200 shadow-xs'
                        : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                    }`}
                  >
                    <CheckSquare className={`w-4 h-4 shrink-0 mt-0.5 ${isSelected ? 'text-red-600' : 'text-slate-400'}`} />
                    <span>{flag.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Action step */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              Langkah 2: Pilih Langkah Verifikasi & Keputusan Akhirmu
            </label>
            <div className="space-y-2">
              {[
                { id: 'share', label: 'Langsung klik share ke semua grup WhatsApp agar keluarga aman', isCorrect: false },
                { id: 'verify', label: 'Gunakan metode SIFT: Cek situs resmi WHO (who.int), cari rilis resmi BMKG/Kemenkes, dan periksa gambar dengan Google Reverse Image Search', isCorrect: true },
                { id: 'ignore', label: 'Biarkan saja tanpa memverifikasi dan percaya begitu saja', isCorrect: false }
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setChosenAction(opt.id)}
                  className={`w-full p-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                    chosenAction === opt.id
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-blue-400'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Analyze CTA */}
          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={handleAnalyze}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-md transition-all flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Verifikasi Temuan Detektif</span>
            </button>
          </div>

        </div>
      ) : (
        /* Result Breakdown */
        <div className="bg-emerald-50/60 dark:bg-emerald-950/40 rounded-2xl p-5 border border-emerald-300 dark:border-emerald-800 space-y-4">
          <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-sm">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span>Hasil Analisis Detektif Informasi: VERIFIKASI TEPAT! 🏆</span>
          </div>

          <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-2 leading-relaxed">
            <p>
              <span className="font-bold text-red-600 dark:text-red-400">Diagnosis:</span> Postingan ini memiliki <span className="font-bold text-red-600">5 indikator HOAKS utama</span> (Judul sensasional, tanpa link lembaga resmi, tanpa tanggal, bahasa emosional, & tidak ada bukti klinis yang terlampir).
            </p>
            <p className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-emerald-200 dark:border-emerald-800/80">
              <span className="font-bold text-emerald-700 dark:text-emerald-300">💡 Fakta Sebenarnya:</span> WHO tidak pernah merilis "peringatan darurat" larangan air minum kemasan secara sembarangan melalui pesan sosial media bermodel provokatif. Pengujian mikroplastik dilakukan melalui penelitian resmi berstandar laboratorium.
            </p>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-semibold hover:bg-slate-300 transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Coba Simulasi Lagi</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
