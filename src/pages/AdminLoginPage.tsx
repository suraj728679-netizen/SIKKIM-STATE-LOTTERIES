import React, { useState } from 'react';
import { adminLogin, setAdminSession } from '../services/api';
import { AdminUser, PageView } from '../types/lottery';
import {
  Lock,
  User,
  Key,
  ShieldCheck,
  ArrowLeft,
  AlertCircle,
  Trophy,
  CheckCircle2,
} from 'lucide-react';

interface AdminLoginPageProps {
  onLoginSuccess: (user: AdminUser) => void;
  setCurrentPage: (page: PageView) => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({
  onLoginSuccess,
  setCurrentPage,
}) => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('punjab@lottery2026');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const data = await adminLogin(username, password);
      onLoginSuccess(data.user);
      setCurrentPage('admin-dashboard');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Login failed. Please check credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Back to Public Site */}
        <button
          onClick={() => setCurrentPage('home')}
          className="mb-6 inline-flex items-center gap-2 text-xs font-semibold text-emerald-300 hover:text-amber-300 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Punjab Public Portal</span>
        </button>

        {/* Card */}
        <div className="rounded-3xl bg-gradient-to-b from-[#09351a] via-[#062412] to-[#03150a] border-2 border-amber-500/40 p-8 shadow-2xl relative overflow-hidden">
          {/* Top Emblem */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-600 p-0.5 mx-auto mb-4 shadow-xl">
              <div className="w-full h-full bg-[#051c0e] rounded-2xl flex items-center justify-center">
                <Lock className="w-8 h-8 text-amber-400" />
              </div>
            </div>
            <h1 className="text-2xl font-black text-white font-heading uppercase tracking-wide">
              Punjab Admin Console
            </h1>
            <p className="text-xs text-emerald-200/70 mt-1 uppercase tracking-widest font-medium">
              Directorate Result Management & Database Control
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-800 text-xs text-red-200 flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-amber-300 uppercase tracking-wider mb-2">
                Administrator Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <User className="w-4 h-4 text-amber-400" />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter admin username"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/60 border border-amber-500/40 text-white placeholder-emerald-300/30 text-sm font-medium focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-amber-300 uppercase tracking-wider mb-2">
                Secure Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Key className="w-4 h-4 text-amber-400" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter security password"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/60 border border-amber-500/40 text-white placeholder-emerald-300/30 text-sm font-medium focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-stone-950 font-black uppercase tracking-wider text-sm shadow-lg shadow-amber-500/20 active:scale-98 transition-all cursor-pointer disabled:opacity-60"
            >
              {loading ? 'Authenticating...' : 'Secure Admin Login'}
            </button>
          </form>

          {/* Quick Demo Helper for User */}
          <div className="mt-8 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-2">
            <div className="flex items-center gap-2 text-amber-300 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Default Authorized Credentials:</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-emerald-100/90 pt-1">
              <div className="bg-black/40 p-2 rounded border border-emerald-900">
                <span className="text-amber-400 block text-[10px]">Username:</span>
                admin
              </div>
              <div className="bg-black/40 p-2 rounded border border-emerald-900">
                <span className="text-amber-400 block text-[10px]">Password:</span>
                punjab@lottery2026
              </div>
            </div>
            <p className="text-[10px] text-emerald-200/60 pt-1">
              Pre-filled for your immediate evaluation. You can change these inside the dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
