import React, { useState } from 'react';
import { Star, Award, RotateCcw, CheckCircle2 } from 'lucide-react';
import { ETHICS_SURVEY_QUESTIONS } from '../../data/quizData';
import confetti from 'canvas-confetti';

interface EthicsSurveyProps {
  onSaveScore: (score: number) => void;
  savedScore: number | null;
}

export const EthicsSurvey: React.FC<EthicsSurveyProps> = ({ onSaveScore, savedScore }) => {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState<boolean>(savedScore !== null);

  const handleSelect = (questionId: number, rating: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: rating }));
  };

  const totalScore = (Object.values(answers) as number[]).reduce((a: number, b: number) => a + b, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.keys(answers).length < ETHICS_SURVEY_QUESTIONS.length) {
      alert('Mohon jawab seluruh 8 pertanyaan refleksi.');
      return;
    }
    setSubmitted(true);
    onSaveScore(totalScore);

    if (totalScore >= 24) {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    }
  };

  const getInterpretation = (score: number) => {
    if (score >= 32) return {
      title: '🌟 Warga Digital Sangat Bertanggung Jawab!',
      desc: 'Wah, kamu adalah warga digital yang sangat bertanggung jawab dan kritis dalam mengelola informasi! Pertahankan integritasmu!',
      badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300'
    };
    if (score >= 24) return {
      title: '👍 Kesadaran Cukup Baik',
      desc: 'Kamu sudah cukup baik dalam beretika di dunia maya, namun masih ada beberapa aspek yang perlu terus ditingkatkan.',
      badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border-blue-300'
    };
    if (score >= 16) return {
      title: '⚡ Perlu Tingkatkan Kesadaran',
      desc: 'Ayo tingkatkan kesadaran etis kamu! E-modul ini akan sangat membantumu menjadi pengguna internet yang lebih bijak.',
      badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-300'
    };
    return {
      title: '📚 Waktunya Belajar Etika Informasi',
      desc: 'Saatnya serius belajar etika informasi. Jangan khawatir, kamu berada di tempat yang tepat bersama E-Modul Etika Informasi!',
      badgeColor: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border-rose-300'
    };
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-xs space-y-6">
      
      <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-700 pb-3">
        <div className="p-2.5 bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 rounded-xl">
          <Star className="w-6 h-6 fill-amber-400" />
        </div>
        <div>
          <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
            Kuis Refleksi: Seberapa Etiskah Kamu di Dunia Maya?
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Jawab pertanyaan berikut dengan jujur! (Skor: 1 = Sangat Tidak Setuju, 5 = Sangat Setuju)
          </p>
        </div>
      </div>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-3">
            {ETHICS_SURVEY_QUESTIONS.map((q) => (
              <div key={q.id} className="p-3.5 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-2">
                <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {q.id}. {q.statement}
                </p>
                <div className="flex items-center justify-between gap-1 sm:gap-2 pt-1">
                  <span className="text-[10px] text-slate-400 font-medium">Sangat Tidak Setuju</span>
                  <div className="flex items-center gap-1 sm:gap-2">
                    {[1, 2, 3, 4, 5].map((val) => (
                      <button
                        type="button"
                        key={val}
                        onClick={() => handleSelect(q.id, val)}
                        className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                          answers[q.id] === val
                            ? 'bg-blue-600 text-white shadow-xs scale-105'
                            : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-blue-400'
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium">Sangat Setuju</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={Object.keys(answers).length < ETHICS_SURVEY_QUESTIONS.length}
              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white rounded-xl font-bold text-xs shadow-md transition-all flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Hitung Skor Etikaku</span>
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4 text-center py-4">
          {(() => {
            const scoreToDisplay = savedScore !== null ? savedScore : totalScore;
            const interp = getInterpretation(scoreToDisplay);
            return (
              <div className="space-y-4 max-w-md mx-auto">
                <div className="inline-block p-4 rounded-full bg-amber-50 dark:bg-amber-950 text-amber-500">
                  <Award className="w-12 h-12" />
                </div>
                <div>
                  <span className="text-3xl font-black text-slate-900 dark:text-white">
                    {scoreToDisplay} <span className="text-sm font-semibold text-slate-400">/ 40 poin</span>
                  </span>
                </div>

                <div className={`p-4 rounded-2xl border ${interp.badgeColor} space-y-1 text-left`}>
                  <h4 className="font-bold text-sm">{interp.title}</h4>
                  <p className="text-xs leading-relaxed">{interp.desc}</p>
                </div>

                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-semibold hover:bg-slate-200 transition-colors inline-flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Ulangi Kuis Refleksi</span>
                </button>
              </div>
            );
          })()}
        </div>
      )}

    </div>
  );
};
