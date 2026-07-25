import React, { useState } from 'react';
import { Sparkles, CheckCircle2, Award, RotateCcw, ArrowRight, HelpCircle, FileText } from 'lucide-react';
import { SectionId, UserProgress } from '../types';
import { FINAL_QUIZ_QUESTIONS } from '../data/quizData';
import confetti from 'canvas-confetti';

interface KuisAkhirViewProps {
  onSelectSection: (sectionId: SectionId) => void;
  userProgress: UserProgress;
  onSaveFinalScore: (pgScore: number, essayScore: number, essayText: string, essayFeedback: string) => void;
}

export const KuisAkhirView: React.FC<KuisAkhirViewProps> = ({
  onSelectSection,
  userProgress,
  onSaveFinalScore
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [essayText, setEssayText] = useState<string>(userProgress.finalEssayAnswer || '');
  const [submitted, setSubmitted] = useState<boolean>(userProgress.finalQuizScore !== null);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);

  const handleSelectOption = (questionId: number, optionIdx: number) => {
    if (submitted) return;
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleSubmitQuiz = async (e: React.FormEvent) => {
    e.preventDefault();

    if (Object.keys(selectedAnswers).length < FINAL_QUIZ_QUESTIONS.length) {
      alert('Mohon jawab seluruh 10 soal pilihan ganda.');
      return;
    }

    if (!essayText.trim() || essayText.trim().length < 20) {
      alert('Mohon jawab pertanyaan studi kasus essay dengan jelas (minimal 20 karakter).');
      return;
    }

    setIsEvaluating(true);

    // Calculate PG score (Max 80 points)
    let pgCorrect = 0;
    FINAL_QUIZ_QUESTIONS.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        pgCorrect += 1;
      }
    });
    const pgScore = Math.round((pgCorrect / FINAL_QUIZ_QUESTIONS.length) * 80);

    // Evaluate Essay score (Max 20 points) based on keywords (verifikasi, SIFT, BMKG/kampus, saring, konfirmasi)
    let essayScore = 12; // Base score
    const textLower = essayText.toLowerCase();
    
    if (textLower.includes('verifikasi') || textLower.includes('cek')) essayScore += 2;
    if (textLower.includes('resmi') || textLower.includes('pengumuman') || textLower.includes('kampus') || textLower.includes('dosen')) essayScore += 2;
    if (textLower.includes('sift') || textLower.includes('stop') || textLower.includes('sumber')) essayScore += 2;
    if (textLower.includes('sebar') || textLower.includes('tanya') || textLower.includes('grup')) essayScore += 2;

    essayScore = Math.min(20, essayScore);
    const totalScore = pgScore + essayScore;

    const feedback = `Analisis Soal Essay: Jawaban Anda mengandung ${essayScore}/20 poin berdasarkan rubrik verifikasi informasi (pengecekan ke pihak resmi kampus, penghentian penyebaran pesan berantai, & penerapan metode SIFT).`;

    setIsEvaluating(false);
    setSubmitted(true);
    onSaveFinalScore(pgScore, essayScore, essayText, feedback);

    if (totalScore >= 70) {
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
    }
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setSubmitted(false);
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
        <h1 className="text-3xl sm:text-4xl font-serif font-black text-stone-900 dark:text-stone-100 tracking-tight flex items-center gap-3">
          <Sparkles className="w-8 h-8 text-amber-600 dark:text-amber-400" />
          Kuis Akhir & Evaluasi Pemahaman Modul
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-1">
          Kerjakan 10 soal pilihan ganda dan 1 studi kasus essay untuk mengukur pemahamanmu secara keseluruhan. Nilai minimal kelulusan sertifikat adalah 70.
        </p>
      </div>

      {/* Submitted Result Scorecard */}
      {submitted && userProgress.finalQuizScore !== null && (
        <div className="bg-[#1A1A1A] text-[#F9F7F2] p-8 space-y-6 border-l-8 border-amber-600 shadow-md">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <span className="px-3 py-1 bg-stone-800 border border-stone-700 text-[10px] uppercase tracking-widest font-bold text-amber-300 font-serif italic">
                HASIL EVALUASI AKHIR
              </span>
              <h2 className="text-3xl font-serif font-black text-white">
                Skor Anda: {userProgress.finalQuizScore} / 100 Poin
              </h2>
              <p className="text-xs text-stone-300 max-w-md">
                {userProgress.finalQuizScore >= 70 
                  ? '🎉 Selamat! Anda dinyatakan LULUS evaluasi Etika Informasi. Sertifikat resmi telah dibuka!'
                  : 'Sikit lagi! Nilai minimal kelulusan adalah 70. Anda dapat mengulangi kuis untuk memperbaiki nilai.'}
              </p>
            </div>

            <div className="flex flex-col items-center gap-3">
              {userProgress.finalQuizScore >= 70 && (
                <button
                  onClick={() => onSelectSection('certificate')}
                  className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-extrabold uppercase tracking-widest text-xs shadow-md transition-all flex items-center gap-2"
                >
                  <Award className="w-5 h-5 text-stone-950" />
                  <span>Klaim Sertifikat Kelulusan</span>
                </button>
              )}

              <button
                type="button"
                onClick={handleResetQuiz}
                className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-white text-xs uppercase tracking-wider font-bold transition-colors flex items-center gap-1.5 border border-stone-700"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Ulangi Kuis Akhir</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Exam Form */}
      <form onSubmit={handleSubmitQuiz} className="space-y-8">
        
        {/* Section A: Multiple Choice (10 Questions) */}
        <div className="bg-[#F9F7F2] dark:bg-[#1A1A18] p-6 border border-stone-300 dark:border-stone-800 space-y-6">
          <div className="flex items-center gap-2 border-b border-stone-300 dark:border-stone-800 pb-3">
            <span className="w-7 h-7 bg-[#1A1A1A] text-white dark:bg-stone-200 dark:text-black font-serif font-bold text-xs flex items-center justify-center">A</span>
            <h3 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-base sm:text-lg">
              Bagian A: Soal Pilihan Ganda (10 Soal - Maks 80 Poin)
            </h3>
          </div>

          <div className="space-y-6">
            {FINAL_QUIZ_QUESTIONS.map((q, idx) => {
              const isSelected = selectedAnswers[q.id] !== undefined;

              return (
                <div key={q.id} className="p-4 bg-[#E9E4DB] dark:bg-[#22211F] border border-stone-300 dark:border-stone-800 space-y-3">
                  <p className="font-serif font-bold text-xs sm:text-sm text-stone-900 dark:text-stone-100">
                    {idx < 9 ? `0${idx + 1}` : idx + 1}. {q.question}
                  </p>

                  <div className="space-y-2">
                    {q.options.map((opt, optIdx) => {
                      const isOptSelected = selectedAnswers[q.id] === optIdx;
                      const isOptCorrect = q.correctAnswer === optIdx;

                      let style = 'bg-[#F9F7F2] dark:bg-[#1A1A18] text-stone-800 dark:text-stone-200 border-stone-300 dark:border-stone-700 hover:border-stone-900 dark:hover:border-stone-100';

                      if (submitted) {
                        if (isOptCorrect) {
                          style = 'bg-emerald-900 text-white border-emerald-700 font-bold';
                        } else if (isOptSelected) {
                          style = 'bg-rose-900 text-white border-rose-700 font-bold';
                        }
                      } else if (isOptSelected) {
                        style = 'bg-[#1A1A1A] text-white dark:bg-stone-100 dark:text-black font-bold border-[#1A1A1A]';
                      }

                      return (
                        <button
                          key={optIdx}
                          type="button"
                          disabled={submitted}
                          onClick={() => handleSelectOption(q.id, optIdx)}
                          className={`w-full p-3 border text-left text-xs font-medium transition-all flex items-center justify-between ${style}`}
                        >
                          <span className="flex items-center gap-2">
                            <span className="font-serif font-bold">{String.fromCharCode(65 + optIdx)}.</span>
                            <span>{opt}</span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section B: Case Study Essay (1 Question) */}
        <div className="bg-[#F9F7F2] dark:bg-[#1A1A18] p-6 border border-stone-300 dark:border-stone-800 space-y-4">
          <div className="flex items-center gap-2 border-b border-stone-300 dark:border-stone-800 pb-3">
            <span className="w-7 h-7 bg-amber-700 text-white font-serif font-bold text-xs flex items-center justify-center">B</span>
            <h3 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-base sm:text-lg">
              Bagian B: Studi Kasus Essay (1 Soal - Maks 20 Poin)
            </h3>
          </div>

          <div className="p-4 bg-[#E9E4DB] dark:bg-[#22211F] border-l-4 border-amber-600 space-y-2 text-xs sm:text-sm text-stone-900 dark:text-stone-100">
            <p className="font-serif font-bold">Skenario Studi Kasus:</p>
            <p className="font-serif italic">
              “Seorang teman mengirimkan pesan WhatsApp di grup kelas yang berisi informasi tentang ‘perubahan jadwal UAS mendadak secara online’. Informasi tersebut tidak disertai pengumuman resmi dari kampus atau dosen pengampu.”
            </p>
            <p className="font-serif font-bold pt-2 text-amber-800 dark:text-amber-400">
              Pertanyaan:
            </p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Apa yang harus kamu lakukan pertama kali ketika menerima pesan tersebut?</li>
              <li>Jelaskan langkah-langkah verifikasi (metode SIFT) yang akan kamu ambil sebelum membagikannya!</li>
            </ol>
          </div>

          <textarea
            rows={5}
            disabled={submitted}
            value={essayText}
            onChange={(e) => setEssayText(e.target.value)}
            placeholder="Tuliskan jawaban analisis essay verifikasimu secara rinci..."
            className="w-full p-3.5 bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs sm:text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:border-stone-900"
          />

          {submitted && userProgress.finalEssayFeedback && (
            <div className="p-4 bg-[#E9E4DB] dark:bg-[#22211F] border-l-4 border-stone-800 text-xs text-stone-900 dark:text-stone-100 space-y-1">
              <span className="font-serif font-bold text-amber-800 dark:text-amber-400">Umpan Balik Evaluasi Essay:</span>
              <p>{userProgress.finalEssayFeedback}</p>
            </div>
          )}
        </div>

        {/* Submit Exam Button */}
        {!submitted && (
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isEvaluating}
              className="px-8 py-3 bg-[#1A1A1A] hover:bg-stone-800 text-white dark:bg-stone-200 dark:text-black dark:hover:bg-white font-bold uppercase tracking-widest text-xs transition-all flex items-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>{isEvaluating ? 'Mengevaluasi Jawaban...' : 'Kirim & Selesaikan Kuis Akhir'}</span>
            </button>
          </div>
        )}

      </form>

    </div>
  );
};
