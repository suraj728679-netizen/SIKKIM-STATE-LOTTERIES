import React, { useState } from 'react';
import { MobileResultChecker } from '../components/MobileResultChecker';
import { LotteryResultRecord, PageView } from '../types/lottery';
import { searchResults, formatINR } from '../services/api';
import {
  Search,
  Ticket,
  Trophy,
  Calendar,
  Clock,
  User,
  MapPin,
  FileCheck2,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

interface CheckResultPageProps {
  onViewCertificate: (record: LotteryResultRecord) => void;
  setCurrentPage: (page: PageView) => void;
}

export const CheckResultPage: React.FC<CheckResultPageProps> = ({
  onViewCertificate,
  setCurrentPage,
}) => {
  const [activeMode, setActiveMode] = useState<'mobile' | 'ticket'>('mobile');
  const [ticketQuery, setTicketQuery] = useState('');
  const [ticketLoading, setTicketLoading] = useState(false);
  const [ticketResults, setTicketResults] = useState<LotteryResultRecord[]>([]);
  const [hasTicketSearched, setHasTicketSearched] = useState(false);
  const [ticketError, setTicketError] = useState<string | null>(null);

  const sampleTickets = ['PB-DWL-882194', 'PB-RKH-441920', 'PB-LBH-109238', 'PB-DR100-776319'];

  const handleTicketSearch = async (e: React.FormEvent, overrideTicket?: string) => {
    if (e) e.preventDefault();
    const query = (overrideTicket !== undefined ? overrideTicket : ticketQuery).trim();

    if (!query) {
      setTicketError('Please enter a ticket number.');
      return;
    }

    setTicketError(null);
    setTicketLoading(true);
    setHasTicketSearched(true);

    try {
      const data = await searchResults({ ticket: query });
      setTicketResults(data.results || []);
    } catch {
      setTicketError('Failed to query database for ticket. Please check your network.');
      setTicketResults([]);
    } finally {
      setTicketLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 pb-20">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
          <Trophy className="w-3.5 h-3.5" />
          <span>OFFICIAL DATABASE VERIFICATION</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-heading uppercase tracking-wide">
          Check Your <span className="gold-gradient-text">Lottery Result</span>
        </h1>
        <p className="text-sm sm:text-base text-emerald-200/80">
          Verify your Punjab State Lottery ticket by registered mobile number or exact ticket number directly against our live database.
        </p>

        {/* Tab switch between Mobile and Ticket */}
        <div className="pt-4 flex items-center justify-center gap-3">
          <button
            onClick={() => setActiveMode('mobile')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeMode === 'mobile'
                ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                : 'bg-emerald-950 text-emerald-300 hover:bg-emerald-900 border border-emerald-800'
            }`}
          >
            Check by Mobile Number
          </button>
          <button
            onClick={() => setActiveMode('ticket')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeMode === 'ticket'
                ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                : 'bg-emerald-950 text-emerald-300 hover:bg-emerald-900 border border-emerald-800'
            }`}
          >
            Check by Ticket Number
          </button>
        </div>
      </div>

      {/* Mode 1: Mobile Checker */}
      {activeMode === 'mobile' && (
        <div className="max-w-4xl mx-auto">
          <MobileResultChecker
            onViewCertificate={onViewCertificate}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}

      {/* Mode 2: Ticket Number Checker */}
      {activeMode === 'ticket' && (
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl bg-gradient-to-b from-[#09351a] via-[#062412] to-[#041a0d] border-2 border-amber-500/40 p-6 sm:p-10 shadow-2xl">
            <div className="text-center max-w-xl mx-auto mb-6">
              <h2 className="text-xl sm:text-2xl font-black text-white font-heading uppercase">
                Search By Ticket Number
              </h2>
              <p className="text-xs sm:text-sm text-emerald-200/70 mt-1">
                Enter your Punjab lottery ticket serial number (e.g. PB-DWL-882194)
              </p>
            </div>

            <form onSubmit={handleTicketSearch} className="max-w-xl mx-auto space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Ticket className="w-5 h-5 text-amber-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter Ticket (e.g. PB-DWL-882194)"
                    value={ticketQuery}
                    onChange={(e) => {
                      setTicketQuery(e.target.value.toUpperCase());
                      setTicketError(null);
                    }}
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-black/60 border-2 border-amber-500/40 text-white placeholder-emerald-300/40 text-base font-mono uppercase tracking-wider focus:outline-none focus:border-amber-400"
                  />
                </div>

                <button
                  type="submit"
                  disabled={ticketLoading}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-stone-950 font-black text-base uppercase tracking-wider shadow cursor-pointer shrink-0 disabled:opacity-50"
                >
                  {ticketLoading ? 'Searching...' : 'Search Ticket'}
                </button>
              </div>

              {ticketError && (
                <div className="p-3 bg-red-950/60 border border-red-800 rounded-lg text-xs text-red-300">
                  {ticketError}
                </div>
              )}

              {/* Sample Tickets */}
              <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-emerald-200/70 pt-2">
                <span className="font-semibold text-amber-300">Sample Ticket Numbers:</span>
                {sampleTickets.map((t) => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => {
                      setTicketQuery(t);
                      handleTicketSearch(undefined as unknown as React.FormEvent, t);
                    }}
                    className="bg-emerald-950 hover:bg-amber-900/40 text-amber-200 px-2 py-0.5 rounded border border-amber-500/30 font-mono text-[11px] cursor-pointer"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </form>

            {/* Results display */}
            {hasTicketSearched && !ticketLoading && (
              <div className="mt-8 space-y-4">
                {ticketResults.length > 0 ? (
                  ticketResults.map((record) => (
                    <div
                      key={record.id}
                      className="p-6 rounded-2xl bg-[#082a15] border border-amber-400/60 space-y-4 shadow-xl"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-500/30 pb-3">
                        <div>
                          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                            {record.lotteryName}
                          </span>
                          <span className="text-2xl font-black text-white font-ticker">
                            {formatINR(record.winningAmount)} ({record.prizeRank})
                          </span>
                        </div>
                        <span className="text-xs bg-emerald-900 text-emerald-300 font-mono px-3 py-1 rounded-full border border-emerald-700">
                          {record.claimStatus}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-stone-200">
                        <div>
                          <span className="text-stone-400 block">Winner Name:</span>
                          <strong className="text-white text-sm">{record.name}</strong>
                        </div>
                        <div>
                          <span className="text-stone-400 block">Mobile:</span>
                          <strong className="text-amber-300 font-mono">+91 {record.mobileNumber}</strong>
                        </div>
                        <div>
                          <span className="text-stone-400 block">Draw Date & Time:</span>
                          <strong>{record.drawDate} at {record.drawTime}</strong>
                        </div>
                      </div>

                      <div className="pt-2 flex justify-end">
                        <button
                          onClick={() => onViewCertificate(record)}
                          className="flex items-center gap-1.5 text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 px-4 py-2 rounded-lg cursor-pointer uppercase tracking-wider"
                        >
                          <FileCheck2 className="w-4 h-4" />
                          <span>View Official Certificate</span>
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 rounded-2xl bg-red-950/20 border border-red-900 text-center space-y-2">
                    <p className="font-bold text-red-200">
                      No winning record found for ticket: {ticketQuery}
                    </p>
                    <p className="text-xs text-stone-300">
                      Please double-check the ticket series and number printed on your original ticket.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
