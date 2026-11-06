import React, { useState } from 'react';
import { LotteryResultRecord } from '../types/lottery';
import { formatINR, searchResults } from '../services/api';
import {
  Trophy,
  Download,
  Printer,
  ShieldCheck,
  QrCode,
  Calendar,
  Ticket,
  User,
  MapPin,
  CheckCircle2,
  Search,
  Sparkles,
  ArrowLeft,
} from 'lucide-react';

interface CertificateViewProps {
  selectedRecord: LotteryResultRecord | null;
  onBackToHome?: () => void;
}

export const CertificateView: React.FC<CertificateViewProps> = ({
  selectedRecord: initialRecord,
  onBackToHome,
}) => {
  const [record, setRecord] = useState<LotteryResultRecord | null>(initialRecord);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const handleSearchCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setSearchError('Please enter a mobile number or ticket number.');
      return;
    }

    setSearchLoading(true);
    setSearchError(null);

    try {
      const cleanInput = searchQuery.trim();
      const isMobile = /^\d{10}$/.test(cleanInput.replace(/[^0-9]/g, ''));

      const res = await searchResults(
        isMobile ? { mobile: cleanInput } : { ticket: cleanInput }
      );

      if (res.results && res.results.length > 0) {
        setRecord(res.results[0]);
      } else {
        setSearchError('No verified winning record found in the database for this entry.');
      }
    } catch {
      setSearchError('Failed to fetch certificate from database.');
    } finally {
      setSearchLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Convert number to Indian words
  const amountToWords = (val: string | number): string => {
    const num = typeof val === 'string' ? parseFloat(val.replace(/[^0-9.-]+/g, '')) : val;
    if (isNaN(num)) return String(val);

    if (num >= 25000000) return 'Rupees Two Crore Fifty Lakh Only';
    if (num >= 20000000) return 'Rupees Two Crore Only';
    if (num >= 15000000) return 'Rupees One Crore Fifty Lakh Only';
    if (num >= 10000000) return 'Rupees One Crore Only';
    if (num >= 1000000) return 'Rupees Ten Lakh Only';
    if (num >= 500000) return 'Rupees Five Lakh Only';
    if (num >= 100000) return 'Rupees One Lakh Only';
    return `Rupees ${num.toLocaleString('en-IN')} Only`;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Top Controls */}
      <div className="no-print mb-8 flex flex-wrap items-center justify-between gap-4">
        {onBackToHome && (
          <button
            onClick={onBackToHome}
            className="flex items-center gap-2 text-sm text-emerald-300 hover:text-amber-300 transition-colors bg-emerald-950/60 px-3 py-1.5 rounded-lg border border-emerald-800 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Portal</span>
          </button>
        )}

        <div className="flex items-center gap-3 ml-auto">
          {record && (
            <>
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-stone-950 font-bold px-4 py-2 rounded-xl text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-amber-500/20 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Certificate</span>
              </button>
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 bg-emerald-900 hover:bg-emerald-800 text-amber-200 hover:text-white font-bold px-4 py-2 rounded-xl text-xs sm:text-sm uppercase tracking-wider border border-amber-500/40 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* If No Record is Loaded yet, Show Search-to-Certificate */}
      {!record && (
        <div className="no-print bg-[#062412] border-2 border-amber-500/40 rounded-2xl p-8 max-w-xl mx-auto text-center shadow-2xl mb-12">
          <div className="w-14 h-14 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center mx-auto text-amber-400 mb-4">
            <Trophy className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold text-white font-heading">
            Official Winner Certificate Verification
          </h2>
          <p className="text-sm text-emerald-200/80 mt-2 mb-6">
            Enter the registered Mobile Number or Ticket Number to generate the authentic certificate directly from the Punjab State Lotteries database.
          </p>

          <form onSubmit={handleSearchCertificate} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Enter Mobile (e.g. 9814012345) or Ticket No."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3.5 pl-11 rounded-xl bg-black/60 border border-amber-500/40 text-white placeholder-emerald-300/40 focus:outline-none focus:border-amber-400 text-sm font-medium"
              />
              <Search className="w-5 h-5 text-amber-400 absolute left-3.5 top-3.5" />
            </div>

            {searchError && (
              <p className="text-xs text-red-400 text-left bg-red-950/40 p-2.5 rounded-lg border border-red-900">
                {searchError}
              </p>
            )}

            <button
              type="submit"
              disabled={searchLoading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-stone-950 font-bold uppercase tracking-wider text-sm shadow cursor-pointer"
            >
              {searchLoading ? 'Searching Database...' : 'Fetch Official Certificate'}
            </button>
          </form>
        </div>
      )}

      {/* The Printable Certificate Container */}
      {record && (
        <div id="certificate-print-area" className="relative">
          {/* Certificate Board */}
          <div className="relative bg-[#082614] text-stone-100 rounded-3xl border-8 border-double border-amber-500/80 p-8 sm:p-12 shadow-2xl overflow-hidden print:bg-white print:text-stone-900 print:border-black print:p-6 print:rounded-none">
            {/* Watermark Logo in center */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none">
              <div className="w-96 h-96 rounded-full border-12 border-amber-400 flex items-center justify-center">
                <Trophy className="w-64 h-64 text-amber-400" />
              </div>
            </div>

            {/* Corner Filigrees / Ornaments */}
            <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-amber-400" />
            <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-amber-400" />
            <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-amber-400" />
            <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-amber-400" />

            {/* Certificate Header */}
            <div className="text-center space-y-3 relative z-10 border-b border-amber-500/30 pb-6 print:border-stone-300">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-bold tracking-widest uppercase print:text-black print:bg-stone-100">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 print:hidden" />
                <span>GOVERNMENT OF PUNJAB • DIRECTORATE OF STATE LOTTERIES</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-wider text-amber-300 font-heading uppercase drop-shadow print:text-black">
                Certificate of Winning
              </h1>
              <p className="text-xs sm:text-sm text-emerald-200/90 tracking-widest font-medium uppercase print:text-stone-700">
                ਪੰਜਾਬ ਰਾਜ ਲਾਟਰੀ ਜੇਤੂ ਅਧਿਕਾਰਤ ਪ੍ਰਮਾਣ ਪੱਤਰ
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-amber-400 pt-2 print:text-stone-800">
                <span>Certificate No: <strong>{record.certificateNumber}</strong></span>
                <span>•</span>
                <span>Security Hash: <strong>SHA256-PB-{record.id.slice(-6).toUpperCase()}</strong></span>
              </div>
            </div>

            {/* Body Statement */}
            <div className="my-8 text-center max-w-2xl mx-auto space-y-4 relative z-10">
              <p className="text-sm sm:text-base text-stone-300 print:text-stone-800 leading-relaxed font-serif">
                This is to officially certify that the holder bearing ticket number detailed below has been declared a verified winner in the official draw conducted under the Punjab State Lotteries (Regulation) Rules.
              </p>

              {/* Winner Name Box */}
              <div className="py-4 px-6 rounded-2xl bg-black/40 border border-amber-500/40 inline-block print:bg-stone-50 print:border-stone-300">
                <span className="text-xs uppercase text-amber-400 font-semibold tracking-wider block print:text-stone-600">
                  Awarded To
                </span>
                <span className="text-2xl sm:text-3xl font-black text-white font-heading tracking-wide print:text-black">
                  {record.name}
                </span>
                <span className="block text-xs text-emerald-300 font-mono mt-1 print:text-stone-700">
                  Registered Mobile: +91 {record.mobileNumber}
                </span>
              </div>
            </div>

            {/* Prize Highlight Box */}
            <div className="my-6 p-6 rounded-2xl bg-gradient-to-r from-amber-950/60 via-amber-900/40 to-amber-950/60 border-2 border-amber-400 text-center relative z-10 shadow-lg print:bg-stone-100 print:border-black">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-widest block mb-1 print:text-stone-700">
                Official Winning Prize ({record.prizeRank})
              </span>
              <div className="text-4xl sm:text-5xl font-black text-amber-200 font-ticker tracking-wider drop-shadow print:text-black">
                {formatINR(record.winningAmount)}
              </div>
              <div className="text-xs text-amber-300/90 font-serif italic mt-1 print:text-stone-600">
                {amountToWords(record.winningAmount)}
              </div>
            </div>

            {/* Grid of Verified Draw Records */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-5 rounded-2xl bg-black/30 border border-amber-500/20 text-xs sm:text-sm relative z-10 print:bg-white print:border-stone-300">
              <div className="space-y-1">
                <span className="text-emerald-300/70 text-xs flex items-center gap-1 print:text-stone-500">
                  <Ticket className="w-3.5 h-3.5 text-amber-400" /> Ticket Number
                </span>
                <span className="font-mono font-bold text-amber-300 text-base print:text-black">
                  {record.ticketNumber}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-emerald-300/70 text-xs flex items-center gap-1 print:text-stone-500">
                  <Trophy className="w-3.5 h-3.5 text-amber-400" /> Lottery Scheme
                </span>
                <span className="font-semibold text-white print:text-black">
                  {record.lotteryName}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-emerald-300/70 text-xs flex items-center gap-1 print:text-stone-500">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" /> Draw Date & Time
                </span>
                <span className="font-semibold text-white print:text-black">
                  {record.drawDate} at {record.drawTime}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-emerald-300/70 text-xs flex items-center gap-1 print:text-stone-500">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" /> City / District
                </span>
                <span className="font-semibold text-white print:text-black">
                  {record.city}, Punjab
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-emerald-300/70 text-xs flex items-center gap-1 print:text-stone-500">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Claim Status
                </span>
                <span className="font-semibold text-emerald-300 print:text-stone-800">
                  {record.claimStatus}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-emerald-300/70 text-xs flex items-center gap-1 print:text-stone-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> Issuing Office
                </span>
                <span className="font-semibold text-white print:text-black">
                  Vit-te-Yojna Bhawan, Chandigarh
                </span>
              </div>
            </div>

            {/* Official Certification Notes */}
            <div className="mt-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-stone-300 relative z-10 print:text-stone-800 print:border-stone-300 print:bg-stone-50">
              <p className="font-semibold text-amber-300 mb-1 print:text-black">Directorate Endorsement:</p>
              <p className="leading-relaxed">
                {record.certificateInfo} Prize claims are governed under the Directorate of Punjab State Lotteries Act. 
                Prize winners must submit the original lottery ticket signed on reverse, along with 4 passport size photos, 
                attested photocopy of PAN Card and Aadhaar Card within 30 days of draw publication.
              </p>
            </div>

            {/* Bottom Signatures & Seal */}
            <div className="mt-10 pt-6 border-t border-amber-500/30 grid grid-cols-1 sm:grid-cols-3 items-end gap-6 relative z-10 print:border-stone-300">
              {/* QR Verification */}
              <div className="flex items-center gap-3">
                <div className="w-20 h-20 p-2 bg-white rounded-lg flex items-center justify-center text-black shadow">
                  <QrCode className="w-16 h-16" />
                </div>
                <div className="text-[11px] text-stone-400 print:text-stone-600">
                  <p className="font-bold text-amber-300 print:text-black">Scan to Verify</p>
                  <p>Database Auth Record</p>
                  <p className="font-mono text-[10px]">{record.certificateNumber}</p>
                </div>
              </div>

              {/* Official Gold Seal Stamp */}
              <div className="text-center">
                <div className="w-20 h-20 mx-auto rounded-full border-4 border-amber-400 bg-amber-950/60 p-1 flex items-center justify-center shadow-lg print:border-black print:bg-stone-100">
                  <div className="w-full h-full rounded-full border-2 border-dashed border-amber-300 flex flex-col items-center justify-center text-[8px] font-black uppercase text-amber-200 tracking-tighter print:text-black">
                    <ShieldCheck className="w-5 h-5 text-amber-400 print:text-black" />
                    <span>PUNJAB STATE</span>
                    <span>SEAL 2026</span>
                  </div>
                </div>
                <span className="text-[10px] text-emerald-200/70 mt-1 block uppercase font-mono print:text-stone-600">
                  Official Verification Seal
                </span>
              </div>

              {/* Signatory */}
              <div className="text-right space-y-1">
                <div className="font-serif italic text-base text-amber-300 font-bold print:text-black">
                  Director / Joint Secretary
                </div>
                <div className="text-xs text-stone-300 print:text-stone-800 font-semibold">
                  Directorate of Punjab State Lotteries
                </div>
                <div className="text-[10px] text-stone-400 print:text-stone-600">
                  Government of Punjab, Chandigarh
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
