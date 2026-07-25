import React, { useState } from 'react';
import { Share2, Filter, CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import { FILTER_SHARE_SCENARIOS } from '../../data/quizData';
import confetti from 'canvas-confetti';

interface FilterShareGameProps {
  onSaveScore: (score: number) => void;
  savedScore: number | null;
}

export const FilterShareGame: React.FC<FilterShareGameProps> = ({ onSaveScore, savedScore }) => {
  const [userChoices, setUserChoices] = useState<Record<number, 'filter' | 'share'>>({});
  const [isFinished, setIsFinished] = useState<boolean>(savedScore !== null);

  const handleChoose = (id: number, choice: 'filter' | 'share') => {
    setUserChoices(prev => ({ ...prev, [id]: choice }));
  };

  const calculateScore = () => {
    let score = 0;
    FILTER_SHARE_SCENARIOS.forEach(sc => {
      if (userChoices[sc.id] === sc.correctAction) {
        score += 1;
      }
    });
    return score;
  };

  const handleFinish = () => {
    if (Object.keys(userChoices).length < FILTER_SHARE_SCENARIOS.length) {
      alert('Pilih keputusan FILTER atau SHARE untuk ketiga skenario.');
      return;
    }
    const score = calculateScore();
    setIsFinished(true);
    onSaveScore(score);

    if (score === 3) {
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.7 } });
    }
  };

  const handleReset = () => {
    setUserChoices({});
    setIsFinished(false);
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-xs space-y-6">
      
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-700 pb-3">
        <div className="p-2.5 bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 rounded-xl">
          <Filter className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
            Game Interaktif: Filter atau Share? 🎮
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Tentukan apakah kamu akan SHARE (Bagikan) atau FILTER (Saring) informasi berikut!
          </p>
        </div>
      </div>

      {!isFinished ? (
        <div className="space-y-4">
          {FILTER_SHARE_SCENARIOS.map((sc) => {
            const currentChoice = userChoices[sc.id];
            return (
              <div key={sc.id} className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
                <h4 className="font-bold text-xs text-rose-600 dark:text-rose-400 uppercase tracking-wider">
                  {sc.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed italic bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                  {sc.description}
                </p>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => handleChoose(sc.id, 'filter')}
                    className={`p-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                      currentChoice === 'filter'
                        ? 'bg-amber-500 text-white shadow-md scale-102'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-amber-400'
                    }`}
                  >
                    <Filter className="w-4 h-4" />
                    <span>FILTER! (Saring/Tahan)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleChoose(sc.id, 'share')}
                    className={`p-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                      currentChoice === 'share'
                        ? 'bg-blue-600 text-white shadow-md scale-102'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-blue-400'
                    }`}
                  >
                    <Share2 className="w-4 h-4" />
                    <span>SHARE! (Bagikan)</span>
                  </button>
                </div>
              </div>
            );
          })}

          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={handleFinish}
              disabled={Object.keys(userChoices).length < FILTER_SHARE_SCENARIOS.length}
              className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white rounded-xl font-bold text-xs shadow-md transition-all flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Periksa Keputusan Game</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-center">
            <span className="text-2xl font-black text-rose-600 dark:text-rose-400">
              Skor Game: {calculateScore()} / 3 Keputusan Tepat!
            </span>
          </div>

          <div className="space-y-3">
            {FILTER_SHARE_SCENARIOS.map((sc) => {
              const isCorrect = userChoices[sc.id] === sc.correctAction;
              return (
                <div key={sc.id} className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                  <div className="flex items-center justify-between font-bold">
                    <span className="text-slate-800 dark:text-slate-200">{sc.title}</span>
                    {isCorrect ? (
                      <span className="text-emerald-600 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Tepat!
                      </span>
                    ) : (
                      <span className="text-rose-600 flex items-center gap-1">
                        <XCircle className="w-4 h-4" /> Kurang Tepat
                      </span>
                    )}
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed bg-white dark:bg-slate-800 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700">
                    {sc.explanation}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-semibold hover:bg-slate-300 transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Mainkan Game Lagi</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
