import React from 'react';
import { PageView } from '../types/lottery';
import {
  Award,
  ShieldCheck,
  FileText,
  DollarSign,
  AlertCircle,
  CheckCircle2,
  MapPin,
  Phone,
  Printer,
  ArrowRight,
} from 'lucide-react';

interface WinningDetailsPageProps {
  setCurrentPage: (page: PageView) => void;
}

export const WinningDetailsPage: React.FC<WinningDetailsPageProps> = ({
  setCurrentPage,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 pb-20">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
          <Award className="w-3.5 h-3.5" />
          <span>PRIZE HIERARCHY & CLAIM PROCEDURE</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-heading uppercase tracking-wide">
          Winning Details & <span className="gold-gradient-text">Prize Structure</span>
        </h1>
        <p className="text-sm sm:text-base text-emerald-200/80">
          Official prize disbursement schedule, documentation requirements, and tax deductions governed by the Punjab State Lotteries (Regulation) Rules.
        </p>
      </div>

      {/* MEGA BUMPER DHAMAKA PRIZE STRUCTURE (From Reference Image) */}
      <div className="rounded-3xl bg-[#062412] border-2 border-amber-500/40 overflow-hidden shadow-2xl">
        {/* Banner Top Strip */}
        <div className="bg-gradient-to-r from-red-800 via-amber-600 to-red-800 p-6 text-center text-white border-b-2 border-amber-400">
          <span className="inline-block px-4 py-1 rounded-full bg-black/40 text-amber-200 text-xs font-black uppercase tracking-widest mb-2 border border-amber-300/40">
            ★ MEGA BUMPER DHAMAKA OFFER ★
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase font-heading tracking-wide text-yellow-300 drop-shadow">
            GOLDEN CHANCE TO WIN ₹12 CRORE
          </h2>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm font-bold">
            <span className="bg-black/50 px-4 py-1.5 rounded-full border border-amber-300/50 text-white">
              MRP: <span className="text-yellow-300 font-extrabold text-base">₹500/-</span> (Per Ticket)
            </span>
            <span className="bg-amber-950/80 px-4 py-1.5 rounded-full border border-yellow-400 text-yellow-200">
              Special Offer: <span className="text-white font-extrabold">3 Tickets for ₹999/-</span>
            </span>
            <span className="bg-black/50 px-4 py-1.5 rounded-full border border-amber-300/50 text-white">
              Draw Time: <span className="text-yellow-300 font-extrabold text-base">7:00 p.m.</span>
            </span>
          </div>
        </div>

        {/* Detailed Prize Table */}
        <div className="p-6 bg-[#072d17] border-b border-amber-500/20 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold text-white uppercase tracking-wider font-heading">
              Official Prize Structure & Winners Breakdown
            </h3>
          </div>
          <span className="text-xs bg-amber-500/20 text-amber-300 font-mono px-3 py-1 rounded-full border border-amber-500/30 font-bold">
            Guaranteed Sold Ticket Draw
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="bg-black/40 text-amber-300 uppercase tracking-wider font-semibold border-b border-emerald-900">
                <th className="py-4 px-6">Prize Tier</th>
                <th className="py-4 px-6">Prize Amount</th>
                <th className="py-4 px-6">Number of Winners</th>
                <th className="py-4 px-6">Claim Disbursement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-950 text-stone-200">
              {/* 1st Prize */}
              <tr className="bg-amber-500/15 hover:bg-amber-500/20 transition-colors">
                <td className="py-4 px-6 font-bold text-amber-300 flex items-center gap-2">
                  <span className="text-base">★</span>
                  <span className="text-sm font-black uppercase">1st Prize</span>
                </td>
                <td className="py-4 px-6 font-black text-yellow-300 text-xl font-ticker tracking-wide">
                  ₹12 Crore (₹12,00,00,000/-)
                </td>
                <td className="py-4 px-6 font-bold text-white">
                  1 Person
                </td>
                <td className="py-4 px-6 text-emerald-300 font-medium">
                  Directorate Head Office, Chandigarh
                </td>
              </tr>

              {/* 2nd Prize */}
              <tr className="hover:bg-emerald-950/40 transition-colors">
                <td className="py-3.5 px-6 font-bold text-amber-300 flex items-center gap-2">
                  <span>★</span>
                  <span>2nd Prize</span>
                </td>
                <td className="py-3.5 px-6 font-bold text-white text-base font-ticker">
                  ₹1 Crore (₹1,00,00,000/-)
                </td>
                <td className="py-3.5 px-6 font-bold text-stone-200">
                  1 Person
                </td>
                <td className="py-3.5 px-6 text-emerald-300 font-medium">
                  Directorate Head Office, Chandigarh
                </td>
              </tr>

              {/* 3rd Prize */}
              <tr className="hover:bg-emerald-950/40 transition-colors">
                <td className="py-3.5 px-6 font-bold text-amber-300 flex items-center gap-2">
                  <span>★</span>
                  <span>3rd Prize</span>
                </td>
                <td className="py-3.5 px-6 font-bold text-white text-base font-ticker">
                  ₹50 Lakh (₹50,00,000/-)
                </td>
                <td className="py-3.5 px-6 font-bold text-stone-200">
                  1 Person
                </td>
                <td className="py-3.5 px-6 text-emerald-300 font-medium">
                  Directorate Head Office / Treasury
                </td>
              </tr>

              {/* 4th Prize */}
              <tr className="hover:bg-emerald-950/40 transition-colors">
                <td className="py-3.5 px-6 font-bold text-amber-300 flex items-center gap-2">
                  <span>★</span>
                  <span>4th Prize</span>
                </td>
                <td className="py-3.5 px-6 font-bold text-white text-base font-ticker">
                  ₹10 Lakh (₹10,00,000/-)
                </td>
                <td className="py-3.5 px-6 font-bold text-stone-200">
                  12 Persons
                </td>
                <td className="py-3.5 px-6 text-emerald-300/90">
                  Directorate / District Treasury
                </td>
              </tr>

              {/* 5th Prize */}
              <tr className="hover:bg-emerald-950/40 transition-colors">
                <td className="py-3.5 px-6 font-bold text-amber-300 flex items-center gap-2">
                  <span>★</span>
                  <span>5th Prize</span>
                </td>
                <td className="py-3.5 px-6 font-bold text-white text-base font-ticker">
                  ₹5 Lakh (₹5,00,000/-)
                </td>
                <td className="py-3.5 px-6 font-bold text-stone-200">
                  36 Persons
                </td>
                <td className="py-3.5 px-6 text-emerald-300/90">
                  District Treasury Office
                </td>
              </tr>

              {/* 6th Prize */}
              <tr className="hover:bg-emerald-950/40 transition-colors">
                <td className="py-3.5 px-6 font-bold text-amber-300 flex items-center gap-2">
                  <span>★</span>
                  <span>6th Prize</span>
                </td>
                <td className="py-3.5 px-6 font-bold text-white text-base font-ticker">
                  ₹1 Lakh (₹1,00,00,000/- / ₹1,00,000/-)
                </td>
                <td className="py-3.5 px-6 font-bold text-stone-200">
                  40 Persons
                </td>
                <td className="py-3.5 px-6 text-emerald-300/90">
                  District Treasury Office
                </td>
              </tr>

              {/* 7th Prize */}
              <tr className="hover:bg-emerald-950/40 transition-colors">
                <td className="py-3.5 px-6 font-bold text-amber-300 flex items-center gap-2">
                  <span>★</span>
                  <span>7th Prize</span>
                </td>
                <td className="py-3.5 px-6 font-bold text-white text-base font-ticker">
                  ₹75,000/-
                </td>
                <td className="py-3.5 px-6 font-bold text-stone-200">
                  99 Persons
                </td>
                <td className="py-3.5 px-6 text-emerald-300/90">
                  District Treasury Office
                </td>
              </tr>

              {/* 8th Prize */}
              <tr className="hover:bg-emerald-950/40 transition-colors">
                <td className="py-3.5 px-6 font-bold text-amber-300 flex items-center gap-2">
                  <span>★</span>
                  <span>8th Prize</span>
                </td>
                <td className="py-3.5 px-6 font-bold text-white text-base font-ticker">
                  ₹25,000/-
                </td>
                <td className="py-3.5 px-6 font-bold text-stone-200">
                  120 Persons
                </td>
                <td className="py-3.5 px-6 text-emerald-200/80">
                  Authorized Banking Counter / Treasury
                </td>
              </tr>

              {/* 9th Prize */}
              <tr className="hover:bg-emerald-950/40 transition-colors">
                <td className="py-3.5 px-6 font-bold text-amber-300 flex items-center gap-2">
                  <span>★</span>
                  <span>9th Prize</span>
                </td>
                <td className="py-3.5 px-6 font-bold text-white text-base font-ticker">
                  ₹10,000/-
                </td>
                <td className="py-3.5 px-6 font-bold text-stone-200">
                  179 Persons
                </td>
                <td className="py-3.5 px-6 text-emerald-200/80">
                  Authorized Agency Counter
                </td>
              </tr>

              {/* 10th Prize */}
              <tr className="hover:bg-emerald-950/40 transition-colors">
                <td className="py-3.5 px-6 font-bold text-amber-300 flex items-center gap-2">
                  <span>★</span>
                  <span>10th Prize</span>
                </td>
                <td className="py-3.5 px-6 font-bold text-white text-base font-ticker">
                  ₹5,000/-
                </td>
                <td className="py-3.5 px-6 font-bold text-stone-200">
                  200 Persons
                </td>
                <td className="py-3.5 px-6 text-emerald-200/80">
                  Authorized Agency Counter
                </td>
              </tr>

              {/* Consolation Prizes */}
              <tr className="bg-amber-950/30 hover:bg-amber-950/50 transition-colors">
                <td className="py-3.5 px-6 font-bold text-amber-300 flex items-center gap-2">
                  <span>★</span>
                  <span className="font-bold">Consolation Prizes</span>
                </td>
                <td className="py-3.5 px-6 font-bold text-amber-200 text-base font-ticker">
                  Guaranteed Series Payout
                </td>
                <td className="py-3.5 px-6 font-bold text-white">
                  665 Winners
                </td>
                <td className="py-3.5 px-6 text-emerald-200/80">
                  Authorized Retail Agency
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Claim Procedures and Tax Guidelines */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Claim Procedure Rules */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#062412] border border-amber-500/30 space-y-4">
          <h3 className="text-lg font-bold text-white font-heading uppercase flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-400" />
            <span>Prize Claim Regulations</span>
          </h3>

          <ul className="space-y-3 text-xs sm:text-sm text-stone-300">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong>30 Days Submission Deadline:</strong> All claims must reach the Directorate or Treasury within 30 days from the date of publication of the draw result in the Punjab Government Gazette.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong>Original Ticket Verification:</strong> Claimants must produce the original ticket signed on reverse. Tickets found torn, forged, or altered shall be rejected without indemnity.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong>Identity Documentation:</strong> 4 recent passport size photographs duly attested by an Executive Magistrate or Notary Public, along with self-attested copies of PAN and Aadhaar Card.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong>Bank Account Details:</strong> Cancelled cheque of Nationalized / Scheduled bank in claimant's name for direct electronic RTGS/NEFT fund transfer.
              </span>
            </li>
          </ul>
        </div>

        {/* Tax Deductions & Legal Info */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#062412] border border-amber-500/30 space-y-4">
          <h3 className="text-lg font-bold text-white font-heading uppercase flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-amber-400" />
            <span>Taxation Rules (TDS under Section 194B)</span>
          </h3>

          <div className="space-y-3 text-xs sm:text-sm text-stone-300">
            <div className="p-4 rounded-xl bg-black/40 border border-emerald-950 space-y-1">
              <span className="text-amber-400 font-bold block text-sm">
                Income Tax Deduction Rate: 31.2%
              </span>
              <p className="text-stone-300 text-xs">
                Under Section 194B of the Income Tax Act 1961, winnings exceeding ₹10,000 are subject to a mandatory 30% TDS deduction at source plus 4% Health & Education cess.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-emerald-950 space-y-1">
              <span className="text-amber-400 font-bold block text-sm">
                Form 16A Issuance
              </span>
              <p className="text-stone-300 text-xs">
                The Directorate of Punjab State Lotteries issues Form 16A TDS certificate to all winners upon disbursement for their income tax returns filing.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setCurrentPage('check-result');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-stone-950 font-black py-3 rounded-xl uppercase tracking-wider text-xs shadow cursor-pointer"
              >
                <span>Check Your Ticket Online Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
