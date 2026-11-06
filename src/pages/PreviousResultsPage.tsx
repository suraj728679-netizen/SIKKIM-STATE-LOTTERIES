import React, { useState, useEffect } from 'react';
import { LotteryResultRecord, PageView } from '../types/lottery';
import { fetchPublishedResults, formatINR } from '../services/api';
import {
  History,
  Calendar,
  Search,
  Filter,
  Download,
  FileCheck2,
  Trophy,
  Ticket,
  MapPin,
  Clock,
  Printer,
} from 'lucide-react';

interface PreviousResultsPageProps {
  onViewCertificate: (record: LotteryResultRecord) => void;
  setCurrentPage: (page: PageView) => void;
}

export const PreviousResultsPage: React.FC<PreviousResultsPageProps> = ({
  onViewCertificate,
  setCurrentPage,
}) => {
  const [results, setResults] = useState<LotteryResultRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedScheme, setSelectedScheme] = useState('ALL');
  const [selectedCity, setSelectedCity] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchPublishedResults().then((data) => {
      setResults(data);
      setLoading(false);
    });
  }, []);

  const filtered = results.filter((r) => {
    if (selectedScheme !== 'ALL' && !r.lotteryName.includes(selectedScheme)) return false;
    if (selectedCity !== 'ALL' && r.city !== selectedCity) return false;
    if (!searchQuery.trim()) return true;

    const q = searchQuery.toLowerCase();
    return (
      r.name.toLowerCase().includes(q) ||
      r.ticketNumber.toLowerCase().includes(q) ||
      r.mobileNumber.includes(q) ||
      r.lotteryName.toLowerCase().includes(q) ||
      r.city.toLowerCase().includes(q)
    );
  });

  const handleDownloadResultSheet = (schemeName: string, date: string) => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 pb-20">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
          <History className="w-3.5 h-3.5" />
          <span>OFFICIAL ARCHIVES & GAZETTE DRAW RECORDS</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-heading uppercase tracking-wide">
          Previous <span className="gold-gradient-text">Lottery Results</span>
        </h1>
        <p className="text-sm sm:text-base text-emerald-200/80">
          Browse historical Punjab State Lottery results, verified winning tickets, and downloadable draw sheets.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 sm:p-6 rounded-2xl bg-[#062412] border border-amber-500/30 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-amber-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search by winner name, ticket number, mobile, or city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/60 border border-emerald-800 text-white placeholder-emerald-300/40 text-xs sm:text-sm focus:outline-none focus:border-amber-400"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Scheme select */}
          <select
            value={selectedScheme}
            onChange={(e) => setSelectedScheme(e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-black/60 border border-emerald-800 text-xs text-white focus:outline-none focus:border-amber-400"
          >
            <option value="ALL">All Schemes (Bumper & Weekly)</option>
            <option value="Diwali Bumper">Diwali Bumper</option>
            <option value="Rakhi Bumper">Rakhi Bumper</option>
            <option value="Lohri Bumper">Lohri Bumper</option>
            <option value="Baisakhi Bumper">Baisakhi Bumper</option>
            <option value="LabhLaxmi">LabhLaxmi Gold</option>
            <option value="Dear 100">Dear 100 Weekly</option>
          </select>

          {/* City select */}
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-black/60 border border-emerald-800 text-xs text-white focus:outline-none focus:border-amber-400"
          >
            <option value="ALL">All Cities (Punjab)</option>
            <option value="Ludhiana">Ludhiana</option>
            <option value="Amritsar">Amritsar</option>
            <option value="Jalandhar">Jalandhar</option>
            <option value="Patiala">Patiala</option>
            <option value="Bathinda">Bathinda</option>
            <option value="Mohali">Mohali</option>
          </select>
        </div>
      </div>

      {/* Results Table / Cards */}
      <div className="space-y-4">
        {loading ? (
          <div className="py-16 text-center text-emerald-200/60 text-sm">
            Loading previous draws from database...
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl bg-[#072815] border border-amber-500/30 p-6 shadow-xl flex flex-col justify-between space-y-4 hover:border-amber-400 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 border-b border-emerald-950 pb-3">
                    <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                      {item.lotteryName}
                    </span>
                    <span className="text-xs bg-amber-500/20 text-amber-300 font-mono px-2 py-0.5 rounded border border-amber-500/30">
                      {item.drawDate}
                    </span>
                  </div>

                  <div className="mt-4 flex items-baseline justify-between">
                    <div>
                      <span className="text-[11px] text-emerald-300/70 uppercase block font-medium">
                        {item.prizeRank} Winner
                      </span>
                      <span className="text-2xl font-black text-amber-200 font-ticker">
                        {formatINR(item.winningAmount)}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[11px] text-stone-400 block">Winning Ticket:</span>
                      <span className="text-lg font-mono font-bold text-white bg-black/60 px-2.5 py-1 rounded border border-amber-500/30 inline-block">
                        {item.ticketNumber}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 p-3 rounded-xl bg-black/40 border border-emerald-950 space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-stone-400">Winner:</span>
                      <span className="font-bold text-white">{item.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Mobile:</span>
                      <span className="font-mono text-amber-300">+91 {item.mobileNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">City / District:</span>
                      <span className="text-stone-200">{item.city}, Punjab</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Draw Time:</span>
                      <span className="text-stone-200">{item.drawTime}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-emerald-950 flex flex-wrap items-center justify-between gap-2">
                  <button
                    onClick={() => handleDownloadResultSheet(item.lotteryName, item.drawDate)}
                    className="flex items-center gap-1.5 text-xs text-stone-300 hover:text-white bg-emerald-950/80 hover:bg-emerald-900 px-3 py-1.5 rounded-lg border border-emerald-800 transition-colors cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5 text-amber-400" />
                    <span>Print Gazette Slip</span>
                  </button>

                  <button
                    onClick={() => onViewCertificate(item)}
                    className="flex items-center gap-1.5 text-xs font-bold text-stone-950 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 px-3.5 py-1.5 rounded-lg shadow cursor-pointer uppercase tracking-wider"
                  >
                    <FileCheck2 className="w-3.5 h-3.5" />
                    <span>Certificate</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center text-emerald-200/60 text-sm">
            No previous records matched your search filters.
          </div>
        )}
      </div>
    </div>
  );
};
