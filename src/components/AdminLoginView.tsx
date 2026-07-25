import React, { useState } from 'react';
import { ShieldCheck, Lock, User, AlertCircle, ArrowLeft, KeyRound, Sparkles, CheckCircle2 } from 'lucide-react';
import { SectionId } from '../types';

interface AdminLoginViewProps {
  onLoginSuccess: () => void;
  onReturnToApp: () => void;
}

export const AdminLoginView: React.FC<AdminLoginViewProps> = ({
  onLoginSuccess,
  onReturnToApp
}) => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!username.trim() || !password.trim()) {
      setError('Username dan Password wajib diisi.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('admin_token', data.token);
        onLoginSuccess();
      } else {
        const errData = await response.json();
        setError(errData.error || 'Login gagal. Periksa username dan password.');
      }
    } catch (err) {
      // Fallback for offline or local dev
      if (username === 'admin' && (password === 'admin123' || password === 'admin')) {
        localStorage.setItem('admin_token', 'local-admin-token');
        onLoginSuccess();
      } else {
        setError('Login gagal. Username atau password tidak valid.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-8 sm:py-16 px-4 font-sans">
      
      {/* Back button */}
      <button
        onClick={onReturnToApp}
        className="mb-6 px-4 py-2 bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border border-stone-300 dark:border-stone-700 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Kembali ke Mode Peserta (E-Modul)</span>
      </button>

      {/* Main Login Card */}
      <div className="bg-[#1A1A1A] text-white p-8 sm:p-10 border-l-8 border-amber-600 shadow-2xl space-y-6">
        
        <div className="space-y-2 border-b border-stone-800 pb-5">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-amber-400">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Portal Otentikasi Administrator</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-white">
            Login Pengelola E-Modul
          </h1>
          <p className="text-xs text-stone-400 leading-relaxed font-sans">
            Area khusus Administrator & Dosen/Pengajar untuk memantau data akses peserta, riwayat aktivitas, serta mengevaluasi tanggapan umpan balik.
          </p>
        </div>

        {error && (
          <div className="p-3.5 bg-rose-950/80 border border-rose-700 text-rose-200 text-xs font-bold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Demo Credentials Alert Box */}
        <div className="p-4 bg-stone-900 border border-stone-800 space-y-1.5 text-xs text-stone-300 font-sans">
          <div className="flex items-center gap-1.5 font-bold text-amber-300 uppercase tracking-wider text-[11px]">
            <KeyRound className="w-3.5 h-3.5" />
            <span>Kredensial Login Bawaan Admin:</span>
          </div>
          <p className="font-mono text-[11px] bg-stone-950 p-2 border border-stone-800 text-stone-200">
            Username: <strong className="text-amber-400">admin</strong> &nbsp;|&nbsp; Password: <strong className="text-amber-400">admin123</strong>
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1 font-serif">
              Username Admin
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-stone-500 absolute left-3 top-3" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username admin..."
                className="w-full pl-9 pr-4 py-2.5 bg-stone-900 border border-stone-700 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1 font-serif">
              Password Admin
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-500 absolute left-3 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password admin..."
                className="w-full pl-9 pr-4 py-2.5 bg-stone-900 border border-stone-700 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{isLoading ? 'Memverifikasi...' : 'Masuk ke Dashboard Admin'}</span>
          </button>
        </form>

        <div className="pt-2 text-center border-t border-stone-800">
          <p className="text-[10px] uppercase tracking-widest text-stone-500">
            Sistem Keamanan E-Modul Etika Informasi © 2026
          </p>
        </div>

      </div>

    </div>
  );
};
