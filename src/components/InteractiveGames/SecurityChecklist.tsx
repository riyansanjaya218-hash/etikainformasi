import React, { useState } from 'react';
import { Shield, CheckSquare, Square, Award, CheckCircle2 } from 'lucide-react';

interface SecurityChecklistProps {
  onSaveScore: (score: number) => void;
  savedScore: number | null;
}

export const SecurityChecklist: React.FC<SecurityChecklistProps> = ({ onSaveScore, savedScore }) => {
  const items = [
    'Menggunakan kata sandi yang kuat dan berbeda untuk setiap akun',
    'Mengaktifkan Otentikasi Dua Faktor (2FA) di akun-akun penting',
    'Tidak pernah mengklik link atau lampiran dari pengirim tidak dikenal',
    'Mengatur privasi akun media sosial secara berkala',
    'Memeriksa dan mencabut izin aplikasi yang tidak lagi digunakan',
    'Memperbarui sistem operasi dan perangkat lunak aplikasi secara rutin',
    'Hindari Wi-Fi publik tanpa enkripsi saat melakukan transaksi keuangan',
    'Melakukan cadangan data (backup) secara rutin ke cloud/disk eksternal',
    'Tidak membagikan data pribadi sensitif (NIK, alamat, nomor HP) di publik',
    'Waspada terhadap panggilan telepon atau pesan pengambilalihan OTP'
  ];

  const [checkedState, setCheckedState] = useState<boolean[]>(
    new Array(items.length).fill(false)
  );

  const toggleCheck = (index: number) => {
    const updated = [...checkedState];
    updated[index] = !updated[index];
    setCheckedState(updated);

    const count = updated.filter(Boolean).length;
    onSaveScore(count);
  };

  const countChecked = checkedState.filter(Boolean).length;

  const getStatusBadge = (score: number) => {
    if (score >= 8) return {
      label: '🛡️ Keamanan Digital Sangat Baik (8-10)',
      color: 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border-emerald-300'
    };
    if (score >= 5) return {
      label: '⚠️ Cukup Baik, Perlu Peningkatan (5-7)',
      color: 'bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border-blue-300'
    };
    return {
      label: '🚨 Segera Terapkan Keamanan Digital (0-4)',
      color: 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border-amber-300'
    };
  };

  const status = getStatusBadge(countChecked);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-xs space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded-xl">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
              Checklist Keamanan Digital Mandiri
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Berikan tanda centang (✓) pada praktik keamanan yang sudah kamu terapkan sehari-hari:
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-2xl font-black text-blue-600 dark:text-blue-400">{countChecked}</span>
          <span className="text-xs text-slate-400">/ 10</span>
        </div>
      </div>

      {/* Checklist items */}
      <div className="space-y-2">
        {items.map((item, idx) => {
          const isChecked = checkedState[idx];
          return (
            <button
              key={idx}
              type="button"
              onClick={() => toggleCheck(idx)}
              className={`w-full p-3 rounded-xl border text-left text-xs font-semibold transition-all flex items-center gap-3 ${
                isChecked
                  ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-300 text-blue-900 dark:text-blue-200 shadow-xs'
                  : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-blue-300'
              }`}
            >
              <div className={`p-1 rounded-md shrink-0 ${isChecked ? 'bg-blue-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-400'}`}>
                {isChecked ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
              </div>
              <span className="flex-1">{idx + 1}. {item}</span>
            </button>
          );
        })}
      </div>

      {/* Score Badge */}
      <div className={`p-4 rounded-xl border ${status.color} flex items-center justify-between gap-3 text-xs font-bold`}>
        <span>Status Keamanan Akunmu:</span>
        <span className="px-3 py-1 rounded-full bg-white dark:bg-slate-800 shadow-xs">
          {status.label}
        </span>
      </div>

    </div>
  );
};
