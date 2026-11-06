import React, { useState } from 'react';
import { LotteryResultRecord, PageView } from '../types/lottery';
import { searchResults } from '../services/api';
import confetti from 'canvas-confetti';
import {
  Search,
  Phone,
  Calendar,
  Ticket,
  User,
  Award,
  DollarSign,
  Lock,
  FileText,
  Download,
  AlertCircle,
  Trophy,
} from 'lucide-react';

interface MobileResultCheckerProps {
  onViewCertificate?: (record: LotteryResultRecord) => void;
  setCurrentPage?: (page: PageView) => void;
  initialMobile?: string;
}

export const MobileResultChecker: React.FC<MobileResultCheckerProps> = ({
  initialMobile = '9491261107',
}) => {
  const [mobileNumber, setMobileNumber] = useState(initialMobile);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [results, setResults] = useState<LotteryResultRecord[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#eab308', '#22c55e', '#ef4444', '#f59e0b', '#ffffff'],
      });
    } catch {
      // ignore
    }
  };

  const handleCheckResult = async (e?: React.FormEvent, overrideMobile?: string) => {
    if (e) e.preventDefault();
    const queryNum = (overrideMobile !== undefined ? overrideMobile : mobileNumber).trim();

    if (!queryNum) {
      setErrorMsg('Please enter your 10-digit registered mobile number.');
      return;
    }

    const cleanNum = queryNum.replace(/[^0-9]/g, '');
    if (cleanNum.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }

    setErrorMsg(null);
    setLoading(true);
    setHasSearched(true);

    try {
      const data = await searchResults({ mobile: cleanNum });
      setResults(data.results || []);

      if (data.results && data.results.length > 0) {
        triggerConfetti();
      }
    } catch (err: unknown) {
      console.error(err);
      setErrorMsg('Failed to query database. Please check your connection and try again.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const formatAmountINR = (val: string | number): string => {
    const num = typeof val === 'string' ? parseFloat(val.replace(/[^0-9.-]+/g, '')) : val;
    if (isNaN(num)) return `₹ ${val}/-`;
    return `₹ ${num.toLocaleString('en-IN')}/-`;
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <div className="w-full space-y-8">
      {/* RESULT CHECKER TITLE */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#0a381d] border border-emerald-600/40 text-emerald-300 text-xs font-semibold tracking-wider uppercase">
          <Search className="w-3.5 h-3.5 text-emerald-400" />
          <span>RESULT CHECKER</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight font-heading">
          CHECK YOUR <span className="text-[#eab308]">WINNING RESULT</span>
        </h2>

        <p className="max-w-2xl mx-auto text-sm sm:text-base text-emerald-100/80 leading-relaxed">
          Enter your registered mobile number to instantly verify if you are a winner. Check all your Punjab State Lottery results and get your official winning certificate.
        </p>
      </div>

      {/* GREEN RESULT CHECKING CONTAINER (Matching reference image) */}
      <div className="max-w-2xl mx-auto rounded-3xl bg-[#092e18]/90 border border-emerald-600/50 p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Input Card Header */}
        <div className="text-center space-y-1">
          <div className="flex items-center justify-center gap-2 text-red-500 font-bold text-sm tracking-wider uppercase">
            <span className="w-4 h-4 rounded-full bg-red-600 text-white flex items-center justify-center text-[10px]">
              !
            </span>
            <span>ENTER YOUR MOBILE NUMBER</span>
          </div>
          <p className="text-xs text-emerald-200/70">
            Check your results instantly - valid all past winning tickets and download your certificate.
          </p>
        </div>

        {/* Input & Search Button */}
        <form onSubmit={(e) => handleCheckResult(e)} className="space-y-3">
          <div className="flex items-stretch gap-2 bg-[#062413] border border-emerald-500/60 rounded-xl p-1.5 focus-within:border-amber-400 transition-colors">
            <div className="flex items-center pl-3 text-emerald-400">
              <Phone className="w-5 h-5 text-emerald-400 shrink-0" />
              <span className="ml-2 text-white font-mono font-semibold text-base">+91</span>
            </div>

            <input
              type="tel"
              maxLength={10}
              placeholder="9491261107"
              value={mobileNumber}
              onChange={(e) => {
                setMobileNumber(e.target.value.replace(/[^0-9]/g, ''));
                setErrorMsg(null);
              }}
              className="w-full bg-transparent px-2 py-3 text-white placeholder-emerald-400/40 font-mono text-base font-bold tracking-wider focus:outline-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-[#facc15] hover:bg-[#eab308] text-stone-950 font-bold px-6 py-3 rounded-lg text-sm flex items-center gap-1.5 cursor-pointer shadow transition-transform active:scale-95 disabled:opacity-50 shrink-0"
            >
              {loading ? (
                <span>Checking...</span>
              ) : (
                <>
                  <Search className="w-4 h-4 text-stone-950" />
                  <span>Check</span>
                </>
              )}
            </button>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-emerald-300/70">
            <Lock className="w-3 h-3 text-emerald-400" />
            <span>Your information is 100% secured and private.</span>
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-950/80 border border-red-700 rounded-xl text-xs text-red-200 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Quick Click Samples */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] pt-1">
            <span className="text-emerald-300/60">Try sample:</span>
            <button
              type="button"
              onClick={() => {
                setMobileNumber('9815012345');
                handleCheckResult(undefined, '9815012345');
              }}
              className="text-[#facc15] font-bold underline cursor-pointer"
            >
              9815012345 (1st Prize ₹12 Cr)
            </button>
            <span className="text-emerald-400/40">•</span>
            <button
              type="button"
              onClick={() => {
                setMobileNumber('9491261107');
                handleCheckResult(undefined, '9491261107');
              }}
              className="text-[#facc15] underline cursor-pointer"
            >
              9491261107 (4th Prize ₹10 Lakh)
            </button>
            <span className="text-emerald-400/40">•</span>
            <button
              type="button"
              onClick={() => {
                setMobileNumber('9814012345');
                handleCheckResult(undefined, '9814012345');
              }}
              className="text-[#facc15] underline cursor-pointer"
            >
              9814012345 (Gurpreet)
            </button>
          </div>
        </form>

        {/* RESULTS SECTION (Directly matching the screenshot) */}
        {hasSearched && !loading && (
          <div className="space-y-6 pt-2 animate-in fade-in duration-300">
            {results.length > 0 ? (
              results.map((record) => (
                <div key={record.id} className="space-y-8">
                  {/* CONGRATULATIONS WINNER CARD */}
                  <div className="rounded-2xl bg-[#072414] border border-amber-400/60 p-6 sm:p-7 space-y-5 text-center shadow-xl">
                    {/* Yellow Ribbon */}
                    <div className="inline-block bg-[#facc15] text-stone-950 font-black text-xs sm:text-sm px-6 py-1.5 rounded-full uppercase tracking-wider shadow">
                      🎉 YOU ARE A WINNER! 🎉
                    </div>

                    {/* Trophy & Confetti Header */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-center gap-2 text-2xl">
                        <span>🎉</span>
                        <span className="text-3xl">🏆</span>
                        <span>🎉</span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-black text-[#facc15] tracking-wide font-heading uppercase">
                        CONGRATULATIONS!
                      </h3>
                    </div>

                    {/* 2x2 Grid + Rows for the 6 exact fields */}
                    <div className="space-y-2.5 text-left text-xs sm:text-sm">
                      {/* Row 1: Name & Mobile Number */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <div className="bg-[#051c0e] border border-emerald-800/80 rounded-xl p-3">
                          <span className="text-[11px] text-emerald-300/70 flex items-center gap-1.5 uppercase font-medium">
                            <User className="w-3.5 h-3.5 text-amber-400" /> NAME
                          </span>
                          <span className="font-bold text-white text-base block mt-0.5">
                            {record.name}
                          </span>
                        </div>

                        <div className="bg-[#051c0e] border border-emerald-800/80 rounded-xl p-3">
                          <span className="text-[11px] text-emerald-300/70 flex items-center gap-1.5 uppercase font-medium">
                            <Phone className="w-3.5 h-3.5 text-amber-400" /> MOBILE NUMBER
                          </span>
                          <span className="font-bold text-white font-mono text-base block mt-0.5">
                            +91 {record.mobileNumber}
                          </span>
                        </div>
                      </div>

                      {/* Row 2: Ticket Number & Winning Prize */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <div className="bg-[#051c0e] border border-emerald-800/80 rounded-xl p-3">
                          <span className="text-[11px] text-emerald-300/70 flex items-center gap-1.5 uppercase font-medium">
                            <Ticket className="w-3.5 h-3.5 text-amber-400" /> TICKET NUMBER
                          </span>
                          <span className="font-bold text-amber-300 font-mono text-base block mt-0.5">
                            {record.ticketNumber}
                          </span>
                        </div>

                        <div className="bg-[#051c0e] border border-emerald-800/80 rounded-xl p-3">
                          <span className="text-[11px] text-emerald-300/70 flex items-center gap-1.5 uppercase font-medium">
                            <Award className="w-3.5 h-3.5 text-amber-400" /> WINNING PRIZE
                          </span>
                          <span className="font-bold text-white text-base block mt-0.5">
                            {record.prizeRank}
                          </span>
                        </div>
                      </div>

                      {/* Row 3: Winning Amount */}
                      <div className="bg-[#051c0e] border border-emerald-800/80 rounded-xl p-3 text-center">
                        <span className="text-[11px] text-emerald-300/70 flex items-center justify-center gap-1.5 uppercase font-medium">
                          <DollarSign className="w-3.5 h-3.5 text-amber-400" /> WINNING AMOUNT
                        </span>
                        <span className="font-black text-[#facc15] font-ticker text-3xl sm:text-4xl block mt-0.5 tracking-wider">
                          {formatAmountINR(record.winningAmount)}
                        </span>
                      </div>

                      {/* Row 4: Draw Date */}
                      <div className="bg-[#051c0e] border border-emerald-800/80 rounded-xl p-3 text-center">
                        <span className="text-[11px] text-emerald-300/70 flex items-center justify-center gap-1.5 uppercase font-medium">
                          <Calendar className="w-3.5 h-3.5 text-amber-400" /> DRAW DATE
                        </span>
                        <span className="font-bold text-white text-base block mt-0.5 font-mono">
                          {record.drawDate}
                        </span>
                      </div>
                    </div>

                    {/* Notice & Disclaimer */}
                    <div className="space-y-2 pt-2 text-[11px] text-emerald-200/80">
                      <div className="flex items-center justify-center gap-1.5 text-amber-200">
                        <Lock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>
                          Send your account details to claim your winning amount. (Punjab State Lottery official verification only)
                        </span>
                      </div>
                      <div className="flex items-center justify-center gap-1.5 text-emerald-300/70">
                        <FileText className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Ticket issued under: {record.lotteryName}</span>
                      </div>
                    </div>
                  </div>

                  {/* 🏆 YOUR OFFICIAL WINNER CERTIFICATE SECTION (Placed directly below result!) */}
                  <div className="space-y-4 pt-4 text-center">
                    <h3 className="text-xl sm:text-2xl font-black text-[#facc15] uppercase tracking-wider font-heading flex items-center justify-center gap-2">
                      <Trophy className="w-6 h-6 text-[#facc15]" />
                      <span>YOUR OFFICIAL WINNER CERTIFICATE</span>
                    </h3>

                    {/* The Certificate card (styled with pink background and official stamps matching screenshot) */}
                    <div
                      id="certificate-print-area"
                      className="rounded-3xl bg-[#ffe4ec] text-[#2e0827] border-4 border-[#581845] p-6 sm:p-10 shadow-2xl space-y-6 text-center relative overflow-hidden"
                    >
                      {/* Watermark */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none select-none">
                        <div className="w-72 h-72 rounded-full border-8 border-[#581845] flex items-center justify-center">
                          <Trophy className="w-48 h-48 text-[#581845]" />
                        </div>
                      </div>

                      {/* Top Header of Certificate */}
                      <div className="flex items-center justify-between border-b-2 border-[#581845]/20 pb-4 relative z-10">
                        {/* Government Emblem */}
                        <div className="text-left flex items-center gap-2">
                          <div className="w-12 h-12 flex flex-col items-center justify-center">
                            {/* Indian National Emblem Stylized */}
                            <div className="w-10 h-10 rounded-full border-2 border-[#581845] flex items-center justify-center text-[#581845] font-bold text-xs">
                              🦁
                            </div>
                            <span className="text-[9px] font-bold text-[#581845] uppercase tracking-tighter mt-0.5">
                              Government of Punjab
                            </span>
                          </div>
                        </div>

                        {/* Title */}
                        <div className="text-center flex-1">
                          <h4 className="text-2xl sm:text-3xl font-black text-[#4a154b] uppercase tracking-wider font-heading">
                            PUNJAB STATE LOTTERY
                          </h4>
                          <p className="text-xs sm:text-sm font-bold text-[#581845] uppercase tracking-widest mt-0.5">
                            CERTIFICATE OF WINNER
                          </p>
                        </div>

                        {/* Golden Trophy Laurel */}
                        <div className="text-right">
                          <div className="w-12 h-12 rounded-full bg-[#facc15]/30 border border-[#b45309] flex items-center justify-center text-amber-600">
                            <Trophy className="w-7 h-7 text-amber-600" />
                          </div>
                        </div>
                      </div>

                      {/* Certificate Presentation Text */}
                      <div className="space-y-4 relative z-10 py-2">
                        <p className="text-xs sm:text-sm font-bold text-[#581845] uppercase tracking-widest">
                          THIS CERTIFICATE IS PRESENTED TO :
                        </p>

                        <div className="text-3xl sm:text-5xl font-black text-[#2e0827] font-heading tracking-wide">
                          {record.name}
                        </div>

                        <p className="max-w-xl mx-auto text-xs sm:text-sm text-[#4a154b] leading-relaxed font-medium">
                          For the achievement of {record.prizeRank} place in Punjab State Lottery for winning{' '}
                          <strong className="text-[#2e0827] font-bold">{formatAmountINR(record.winningAmount)}</strong>.
                          We appreciate your participation and wish you continued luck.
                        </p>

                        <div className="text-base sm:text-lg font-bold text-[#2e0827] font-mono tracking-wider pt-2">
                          Winner Ticket Number : <span className="font-black text-[#581845]">{record.ticketNumber}</span>
                        </div>
                      </div>

                      {/* Signatures & Date Row */}
                      <div className="pt-6 border-t border-[#581845]/20 flex items-end justify-between gap-4 text-xs relative z-10">
                        {/* Date */}
                        <div className="text-center w-36">
                          <div className="font-bold font-mono text-[#2e0827] text-sm pb-1">
                            {record.drawDate}
                          </div>
                          <div className="border-t border-[#581845] pt-1 text-[10px] font-bold uppercase tracking-wider text-[#581845]">
                            DATE
                          </div>
                        </div>

                        {/* Watermark Seal */}
                        <div className="w-16 h-16 rounded-full border-2 border-dashed border-[#581845]/40 flex flex-col items-center justify-center text-[7px] font-bold uppercase text-[#581845]/70">
                          <span>GOVT OF</span>
                          <span>PUNJAB</span>
                          <span>VERIFIED</span>
                        </div>

                        {/* Signature */}
                        <div className="text-center w-48">
                          <div className="font-serif italic font-bold text-[#4a154b] text-base pb-1">
                            A. Sharma
                          </div>
                          <div className="border-t border-[#581845] pt-1 text-[10px] font-bold uppercase tracking-wider text-[#581845]">
                            AUTHORIZED SIGNATURE
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Download Button right below certificate */}
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={handlePrintCertificate}
                        className="inline-flex items-center gap-2 bg-[#facc15] hover:bg-[#eab308] text-stone-950 font-black px-8 py-3.5 rounded-full text-sm uppercase tracking-wider shadow-lg shadow-amber-500/30 cursor-pointer transform hover:scale-105 active:scale-95 transition-all"
                      >
                        <Download className="w-4 h-4 text-stone-950" />
                        <span>Download Certificate (PDF)</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              /* No Result Found message */
              <div className="rounded-2xl bg-red-950/40 border border-red-800 p-6 text-center space-y-2">
                <h4 className="text-lg font-bold text-red-200">
                  No result found for this mobile number.
                </h4>
                <p className="text-xs text-stone-300">
                  No published winning record was found matching +91 {mobileNumber}.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
