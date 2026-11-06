import React from 'react';
import { PageView } from '../types/lottery';
import {
  Trophy,
  ShieldCheck,
  MapPin,
  Phone,
  Mail,
  AlertTriangle,
  Lock,
  ExternalLink,
} from 'lucide-react';

interface FooterProps {
  setCurrentPage: (page: PageView) => void;
  isAdminLoggedIn: boolean;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentPage, isAdminLoggedIn }) => {
  return (
    <footer className="bg-[#03150a] text-emerald-100/80 border-t border-amber-500/20 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-emerald-950">
          {/* Col 1: About & Emblem */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-yellow-600 p-0.5 flex items-center justify-center shadow-lg">
                <div className="w-full h-full bg-[#051c0e] rounded-full flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <span className="text-xl font-black uppercase text-amber-300 font-heading tracking-wide">
                Punjab Lottery Result
              </span>
            </div>
            <p className="text-xs leading-relaxed text-emerald-200/70">
              The premier digital result publishing and mobile verification platform for Punjab State Lotteries. Offering instant prize lookups, historical gazettes, and verified winner certificates.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-800/80 text-[11px] text-amber-300 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>SSL Encrypted & Real-time Database Sync</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider font-heading">
              Quick Navigation
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="text-amber-500">›</span> Welcome to Punjab Lottery Result
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('check-result');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer text-amber-200 font-medium"
                >
                  <span className="text-amber-500">›</span> Mobile Number Result Checker
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('previous-results');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="text-amber-500">›</span> Previous Draws & Archive
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('winning-details');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="text-amber-500">›</span> Winning Prize Structure & TDS Rules
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('certificate');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="text-amber-500">›</span> Download Official Winner Certificate
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Punjab Bumper Schemes */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider font-heading">
              Punjab Bumper Schemes
            </h3>
            <ul className="space-y-2 text-xs text-emerald-200/80">
              <li className="flex items-center justify-between">
                <span>Punjab Dear Diwali Bumper</span>
                <span className="text-amber-400 font-semibold">₹2.50 Cr</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Punjab Dear Lohri Bumper</span>
                <span className="text-amber-400 font-semibold">₹2.00 Cr</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Punjab Dear Rakhi Bumper</span>
                <span className="text-amber-400 font-semibold">₹1.50 Cr</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Punjab Dear Baisakhi Bumper</span>
                <span className="text-amber-400 font-semibold">₹1.50 Cr</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Punjab State LabhLaxmi Gold</span>
                <span className="text-amber-400 font-semibold">Daily</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Directorate Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider font-heading">
              Directorate Contact Info
            </h3>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  Vit-te-Yojna Bhawan, Plot No. 2-B, Sector 33-A, Chandigarh, Punjab - 160020
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>0172-2704570 / 0172-2705461</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>punjabstatelotteries@punjab.gov.in</span>
              </div>
              <p className="text-[11px] text-amber-200/60 pt-1">
                Office Hours: Monday to Friday (09:00 AM – 05:00 PM IST)
              </p>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="my-8 p-4 rounded-xl bg-red-950/20 border border-red-900/40 text-xs text-stone-300 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold text-amber-300 uppercase tracking-wide">
              Official Independent Disclaimer & Verification Advisory:
            </p>
            <p className="leading-relaxed text-stone-300/90">
              Punjab Lottery Result is an independent lottery information, verification, and results portal. We do not sell lottery tickets online, promote illegal gambling, or claim direct government authorization. All participants must verify their ticket numbers with the official Government Gazette notifications issued by the Directorate of Punjab State Lotteries before submitting claim documents to the relevant District Treasury or State Director Office.
            </p>
          </div>
        </div>

        {/* Bottom Bar with Admin Link */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-300/50">
          <div>
            © {new Date().getFullYear()} Punjab Lottery Result. All rights reserved. Built for citizens of Punjab and verified participants.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => {
                setCurrentPage('winning-details');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-amber-300 transition-colors cursor-pointer"
            >
              Claim Guidelines
            </button>
            <button
              onClick={() => {
                setCurrentPage('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-amber-300 transition-colors cursor-pointer"
            >
              District Offices
            </button>
            <button
              onClick={() => {
                setCurrentPage(isAdminLoggedIn ? 'admin-dashboard' : 'admin-login');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-1 text-emerald-400/80 hover:text-amber-300 transition-colors py-1 px-2 rounded hover:bg-emerald-950 cursor-pointer"
            >
              <Lock className="w-3 h-3 text-amber-500" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
