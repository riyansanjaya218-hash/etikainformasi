import React from 'react';
import { Map, CheckCircle2, ArrowRight, Award, Lock, Sparkles } from 'lucide-react';
import { SectionId, UserProgress } from '../types';
import { UNITS_DATA } from '../data/modulData';

interface PetaKonsepViewProps {
  onSelectSection: (sectionId: SectionId) => void;
  userProgress: UserProgress;
}

export const PetaKonsepView: React.FC<PetaKonsepViewProps> = ({
  onSelectSection,
  userProgress
}) => {
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
          <Map className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          Peta Konsep & Alur Pembelajaran
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          Peta konsep struktur kurikulum E-Modul Etika Informasi di Era Digital (Literasi Digital 2026):
        </p>
      </div>

      {/* Main Table View */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs overflow-hidden">
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 p-4 text-white font-bold text-center text-sm tracking-wider uppercase">
          ETIKA INFORMASI DI ERA DIGITAL
        </div>

        <div className="divide-y divide-slate-200 dark:divide-slate-700">
          <div className="grid grid-cols-12 bg-blue-50 dark:bg-slate-900 text-xs font-bold text-slate-700 dark:text-slate-300 p-3">
            <div className="col-span-3 sm:col-span-2">Unit</div>
            <div className="col-span-6 sm:col-span-7">Topik Utama</div>
            <div className="col-span-3 text-right">Status</div>
          </div>

          {UNITS_DATA.map((unit) => {
            const isCompleted = userProgress.completedSections.includes(unit.id as SectionId);
            const score = userProgress.unitQuizScores[unit.id];

            return (
              <div 
                key={unit.id}
                onClick={() => onSelectSection(unit.id as SectionId)}
                className="grid grid-cols-12 items-center p-3.5 hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer transition-colors text-xs sm:text-sm"
              >
                <div className="col-span-3 sm:col-span-2 font-bold text-blue-600 dark:text-blue-400">
                  Unit {unit.number}
                </div>
                <div className="col-span-6 sm:col-span-7 pr-2">
                  <p className="font-semibold text-slate-900 dark:text-white">{unit.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{unit.subtitle}</p>
                </div>
                <div className="col-span-3 text-right flex items-center justify-end gap-1.5">
                  {isCompleted ? (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Selesai</span>
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                      <span>Mulai</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>
              </div>
            );
          })}

          <div 
            onClick={() => onSelectSection('kuis-akhir')}
            className="grid grid-cols-12 items-center p-3.5 bg-amber-50/50 dark:bg-amber-950/20 hover:bg-amber-50 dark:hover:bg-amber-950/40 cursor-pointer transition-colors text-xs sm:text-sm"
          >
            <div className="col-span-3 sm:col-span-2 font-bold text-amber-600 dark:text-amber-400">
              Penutup
            </div>
            <div className="col-span-6 sm:col-span-7">
              <p className="font-semibold text-slate-900 dark:text-white">Kuis Akhir & Evaluasi Pemahaman</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">10 Soal Pilihan Ganda + 1 Studi Kasus Essay</p>
            </div>
            <div className="col-span-3 text-right">
              {userProgress.finalQuizScore !== null ? (
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                  Skor: {userProgress.finalQuizScore}/100
                </span>
              ) : (
                <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 flex items-center justify-end gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Ujian</span>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Visual Roadmap Cards */}
      <div className="space-y-4">
        <h3 className="font-bold text-slate-900 dark:text-white text-base">Roadmap Petualangan Belajar</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {UNITS_DATA.map((unit) => {
            const isCompleted = userProgress.completedSections.includes(unit.id as SectionId);
            return (
              <div 
                key={unit.id}
                onClick={() => onSelectSection(unit.id as SectionId)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                  isCompleted 
                    ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800 hover:shadow-md'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-blue-300 hover:shadow-md'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
                      UNIT {unit.number}
                    </span>
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <span className="text-xs font-semibold text-slate-400">0 / 100 pt</span>
                    )}
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm leading-snug">
                    {unit.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                    {unit.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400">
                  <span>Pelajari Unit {unit.number}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Button */}
      <div className="flex justify-between pt-4">
        <button
          onClick={() => onSelectSection('petunjuk')}
          className="px-5 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-bold text-xs hover:bg-slate-200 transition-colors"
        >
          Kembali ke Petunjuk
        </button>

        <button
          onClick={() => onSelectSection('unit-1')}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-md transition-all flex items-center gap-2"
        >
          <span>Mulai Unit 1</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
