import React, { useState } from 'react';
import { PageView } from '../types/lottery';
import {
  Trophy,
  Search,
  History,
  Award,
  FileCheck2,
  PhoneCall,
  Lock,
  Menu,
  X,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

interface HeaderProps {
  currentPage: PageView;
  setCurrentPage: (page: PageView) => void;
  isAdminLoggedIn: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  setCurrentPage,
  isAdminLoggedIn,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PageView; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Trophy className="w-4 h-4 text-amber-400" /> },
    { id: 'check-result', label: 'Check Result', icon: <Search className="w-4 h-4 text-emerald-400" /> },
    { id: 'previous-results', label: 'Previous Results', icon: <History className="w-4 h-4 text-amber-300" /> },
    { id: 'winning-details', label: 'Winning Details', icon: <Award className="w-4 h-4 text-amber-400" /> },
    { id: 'certificate', label: 'Download Certificate', icon: <FileCheck2 className="w-4 h-4 text-emerald-300" /> },
    { id: 'contact', label: 'Contact & Claims', icon: <PhoneCall className="w-4 h-4 text-amber-300" /> },
  ];

  const handleNavClick = (page: PageView) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#062412]/95 backdrop-blur-md border-b border-amber-500/20 shadow-xl">
      {/* Top Yellow Notice Bar (Matching screenshot) */}
      <div className="bg-[#facc15] text-stone-950 text-[11px] sm:text-xs py-1.5 px-4 font-bold border-b border-amber-600/40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="truncate">
            <span>★ MEGA BUMPER DHAMAKA: 1st Prize ₹12 Crore (1 Person) | Draw Time: 7:00 PM | MRP ₹500/- (Offer: 3 for ₹999/-) | Check Results Instantly</span>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleNavClick(isAdminLoggedIn ? 'admin-dashboard' : 'admin-login')}
              className="text-stone-950 hover:text-black flex items-center gap-1 transition-colors bg-amber-400 hover:bg-amber-300 px-2.5 py-0.5 rounded border border-amber-600/60 text-[11px] cursor-pointer"
            >
              <Lock className="w-3 h-3 text-stone-950" />
              {isAdminLoggedIn ? 'Admin Dashboard' : 'Admin Login'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Brand & Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Punjab State Branding */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-full border-2 border-[#facc15] bg-[#051c0e] flex items-center justify-center shadow-lg">
              <Trophy className="w-6 h-6 text-[#facc15]" />
            </div>

            <div>
              <h1 className="text-lg sm:text-xl font-black tracking-wider uppercase text-[#facc15] font-heading drop-shadow-sm">
                PUNJAB STATE LOTTERY
              </h1>
              <p className="text-[10px] text-emerald-200/80 tracking-widest font-semibold uppercase">
                GOVERNMENT OF PUNJAB (INDIA)
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-500/20 to-red-500/10 text-amber-300 border border-amber-500/40 shadow-sm shadow-amber-500/10'
                      : 'text-emerald-100/90 hover:text-amber-300 hover:bg-emerald-900/40'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Mobile menu trigger */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => handleNavClick('check-result')}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-950 font-bold px-3 py-1.5 rounded-md text-xs shadow cursor-pointer"
            >
              Check Result
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-emerald-950/80 border border-emerald-800 text-amber-300 hover:text-white cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#072414] border-b border-amber-500/30 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-4 duration-200">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'text-stone-200 hover:bg-emerald-900/50 hover:text-amber-300'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="pt-3 border-t border-emerald-900/80">
            <button
              onClick={() => handleNavClick(isAdminLoggedIn ? 'admin-dashboard' : 'admin-login')}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 to-red-700 text-white font-bold py-2.5 rounded-lg text-sm cursor-pointer shadow-md"
            >
              <Lock className="w-4 h-4" />
              {isAdminLoggedIn ? 'Go to Admin Dashboard' : 'Official Admin Portal'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
