import React, { useState } from 'react';
import { MessageSquare, Star, CheckCircle2, Send, Loader2 } from 'lucide-react';
import { UserProgress } from '../types';

interface UmpanBalikViewProps {
  userProgress?: UserProgress;
}

export const UmpanBalikView: React.FC<UmpanBalikViewProps> = ({ userProgress }) => {
  const [ratings, setRatings] = useState<Record<number, number>>({});
  const [suggestionContent, setSuggestionContent] = useState('');
  const [obstacles, setObstacles] = useState('');
  const [futureIdeas, setFutureIdeas] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const aspectList = [
    'Materi dalam e-modul mudah dipahami',
    'Desain dan tampilan e-modul menarik dan mudah digunakan',
    'Studi kasus dan simulasi membantu pemahaman konsep',
    'Kuis dan latihan soal sangat bermanfaat',
    'E-modul ini meningkatkan kesadaran etika informasi saya'
  ];

  const handleRating = (index: number, val: number) => {
    setRatings(prev => ({ ...prev, [index]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName: userProgress?.studentName || 'Peserta E-Modul',
          studentClass: userProgress?.studentClass || 'Umum',
          studentInstitution: userProgress?.studentInstitution || 'Literasi Digital',
          ratings,
          suggestionContent,
          obstacles,
          futureIdeas
        })
      });
    } catch (err) {
      console.error('Feedback submit error:', err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16 font-sans">
      
      {/* Header */}
      <div className="border-b border-stone-300 dark:border-stone-800 pb-4">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-stone-500 mb-1">
          <span>Jelajah Digital</span>
          <span>—</span>
          <span>Etika Informasi untuk Generasi Kritis</span>
        </div>
        <h1 className="text-3xl font-serif font-black text-stone-900 dark:text-stone-100 tracking-tight flex items-center gap-3">
          <MessageSquare className="w-8 h-8 text-amber-700 dark:text-amber-400" />
          Umpan Balik & Evaluasi E-Modul
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-1">
          Terima kasih telah menyelesaikan E-Modul "Jelajah Digital"! Bantu kami meningkatkan kualitas e-modul ini dengan mengisi masukan di bawah ini:
        </p>
      </div>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Rating table */}
          <div className="bg-[#F9F7F2] dark:bg-[#1A1A18] p-6 border border-stone-300 dark:border-stone-800 space-y-4">
            <h3 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-base sm:text-lg">
              A. Penilaian Kualitas E-Modul (Skor 1 - 5)
            </h3>

            <div className="space-y-3">
              {aspectList.map((item, idx) => (
                <div key={idx} className="p-3.5 bg-[#E9E4DB] dark:bg-[#22211F] border border-stone-300 dark:border-stone-800 space-y-2">
                  <p className="text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-100 font-serif">
                    0{idx + 1}. {item}
                  </p>
                  <div className="flex items-center justify-end gap-1.5 pt-1">
                    {[1, 2, 3, 4, 5].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => handleRating(idx, val)}
                        className={`w-8 h-8 text-xs font-bold transition-all border ${
                          ratings[idx] === val
                            ? 'bg-[#1A1A1A] text-white dark:bg-stone-200 dark:text-black border-[#1A1A1A]'
                            : 'bg-[#F9F7F2] dark:bg-[#1A1A18] text-stone-800 dark:text-stone-200 border-stone-300 dark:border-stone-700 hover:border-stone-900'
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Open Feedback */}
          <div className="bg-[#F9F7F2] dark:bg-[#1A1A18] p-6 border border-stone-300 dark:border-stone-800 space-y-4">
            <h3 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-base sm:text-lg">
              B. Saran dan Masukan
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-serif font-bold text-stone-900 dark:text-stone-100 mb-1">
                  Materi apa yang perlu ditambahkan?
                </label>
                <textarea
                  rows={2}
                  value={suggestionContent}
                  onChange={(e) => setSuggestionContent(e.target.value)}
                  placeholder="Tuliskan ide materi baru..."
                  className="w-full p-3 bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs sm:text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:border-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-serif font-bold text-stone-900 dark:text-stone-100 mb-1">
                  Apa hambatan yang kamu alami saat menggunakan e-modul ini?
                </label>
                <textarea
                  rows={2}
                  value={obstacles}
                  onChange={(e) => setObstacles(e.target.value)}
                  placeholder="Tuliskan kendala teknis atau materi..."
                  className="w-full p-3 bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs sm:text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:border-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-serif font-bold text-stone-900 dark:text-stone-100 mb-1">
                  Saran untuk pengembangan e-modul selanjutnya:
                </label>
                <textarea
                  rows={2}
                  value={futureIdeas}
                  onChange={(e) => setFutureIdeas(e.target.value)}
                  placeholder="Tuliskan saran untuk Tim Penyusun E-Modul..."
                  className="w-full p-3 bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs sm:text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:border-stone-900"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-[#1A1A1A] hover:bg-stone-800 text-white dark:bg-stone-200 dark:text-black font-bold uppercase tracking-widest text-xs transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                  <span>Mengirim...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Kirim Umpan Balik</span>
                </>
              )}
            </button>
          </div>

        </form>
      ) : (
        <div className="bg-[#E9E4DB] dark:bg-[#22211F] p-8 border-l-8 border-emerald-700 text-center space-y-3 font-serif">
          <CheckCircle2 className="w-12 h-12 text-emerald-800 dark:text-emerald-400 mx-auto" />
          <h3 className="text-xl font-bold text-stone-950 dark:text-stone-100">
            Terima Kasih Atas Umpan Balik Anda!
          </h3>
          <p className="text-xs sm:text-sm text-stone-800 dark:text-stone-300 max-w-md mx-auto font-sans">
            Masukan Anda sangat berharga bagi Tim Penyusun & Pengembang E-Modul dalam menyempurnakan kualitas e-modul ini.
          </p>
        </div>
      )}

    </div>
  );
};
