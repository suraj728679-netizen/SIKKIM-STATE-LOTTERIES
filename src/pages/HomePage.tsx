import React, { useState, useEffect } from 'react';
import { MobileResultChecker } from '../components/MobileResultChecker';
import { LotteryResultRecord, PageView } from '../types/lottery';
import { fetchPublishedResults, formatINR } from '../services/api';
import {
  Trophy,
  Sparkles,
  Award,
  FileCheck2,
  Calendar,
  Clock,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Download,
  AlertCircle,
  HelpCircle,
  Phone,
  Ticket,
  Eye,
  ZoomIn,
  X,
} from 'lucide-react';
import punjabMegaTicketImg from '../assets/images/punjab_lottery_ticket_1793994958141.jpg';
import punjabLohriTicketImg from '../assets/images/punjab_lohri_bumper_ticket_1793994977494.jpg';
import punjabRakhiTicketImg from '../assets/images/punjab_rakhi_bumper_ticket_1793994991476.jpg';
import punjabBaisakhiTicketImg from '../assets/images/punjab_baisakhi_bumper_ticket_1793995005520.jpg';

interface HomePageProps {
  setCurrentPage: (page: PageView) => void;
  onViewCertificate: (record: LotteryResultRecord) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  setCurrentPage,
  onViewCertificate,
}) => {
  const [publishedResults, setPublishedResults] = useState<LotteryResultRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [previewTicket, setPreviewTicket] = useState<{
    title: string;
    image: string;
    prize: string;
    serial: string;
    price: string;
  } | null>(null);

  useEffect(() => {
    fetchPublishedResults().then((res) => {
      setPublishedResults(res);
      setLoading(false);
    });
  }, []);

  const latestWinner = publishedResults[0];

  return (
    <div className="space-y-12 pb-16">
      {/* 4-COLUMN STATS BAR (Matching reference screenshot) */}
      <section className="bg-[#051c0e] border-b border-emerald-900 py-3 sm:py-4 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-emerald-800/60 text-center gap-y-3">
          <div className="px-3">
            <div className="text-2xl sm:text-3xl font-black text-[#facc15] font-ticker tracking-wide">
              50+
            </div>
            <div className="text-[10px] sm:text-xs text-emerald-200/80 uppercase font-semibold tracking-wider">
              LAKH ACTIVE PLAYERS
            </div>
          </div>

          <div className="px-3 pt-2 md:pt-0">
            <div className="text-2xl sm:text-3xl font-black text-[#facc15] font-ticker tracking-wide">
              1000+
            </div>
            <div className="text-[10px] sm:text-xs text-emerald-200/80 uppercase font-semibold tracking-wider">
              CRORE DISTRIBUTED
            </div>
          </div>

          <div className="px-3 pt-2 md:pt-0">
            <div className="text-2xl sm:text-3xl font-black text-[#facc15] font-ticker tracking-wide">
              57+
            </div>
            <div className="text-[10px] sm:text-xs text-emerald-200/80 uppercase font-semibold tracking-wider">
              YEARS OF TRUST
            </div>
          </div>

          <div className="px-3 pt-2 md:pt-0">
            <div className="text-2xl sm:text-3xl font-black text-[#facc15] font-ticker tracking-wide">
              100+
            </div>
            <div className="text-[10px] sm:text-xs text-emerald-200/80 uppercase font-semibold tracking-wider">
              % TRANSPARENT
            </div>
          </div>
        </div>
      </section>

      {/* EMBEDDED RESULT CHECKER & WINNER CARD & CERTIFICATE */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <MobileResultChecker
          onViewCertificate={onViewCertificate}
          setCurrentPage={setCurrentPage}
          initialMobile="9491261107"
        />
      </section>



      {/* MEGA BUMPER DHAMAKA ₹12 CRORE FEATURE SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-red-950 via-[#072d17] to-amber-950 border-2 border-amber-400 p-6 sm:p-8 shadow-2xl overflow-hidden relative">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Left Content */}
            <div className="space-y-4 max-w-xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-600/30 border border-red-500 text-yellow-300 text-xs font-black uppercase tracking-wider">
                <span>★ MEGA BUMPER DHAMAKA OFFER ★</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase font-heading tracking-wide">
                GOLDEN CHANCE TO WIN <br />
                <span className="text-[#facc15] font-ticker text-4xl sm:text-6xl drop-shadow">₹12 CRORE</span>
              </h2>
              <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                Official Mega Bumper Draw with guaranteed 1st prize of ₹12 Crore (1 Person), 2nd Prize ₹1 Crore, 3rd Prize ₹50 Lakh, and over 1,400+ winning places!
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs font-bold pt-1">
                <span className="bg-black/60 px-3.5 py-1.5 rounded-lg border border-amber-500/50 text-white">
                  MRP: <strong className="text-yellow-400">₹500/-</strong> (Per Ticket)
                </span>
                <span className="bg-amber-500/20 px-3.5 py-1.5 rounded-lg border border-yellow-400 text-yellow-200">
                  Offer: <strong className="text-white">3 Tickets for ₹999/-</strong>
                </span>
                <span className="bg-black/60 px-3.5 py-1.5 rounded-lg border border-amber-500/50 text-white">
                  Draw Time: <strong className="text-yellow-400">7:00 p.m.</strong>
                </span>
              </div>
            </div>

            {/* Right Quick Prize Tiers Preview */}
            <div className="w-full lg:w-96 rounded-2xl bg-black/60 border border-amber-500/40 p-4 space-y-2 text-xs">
              <div className="text-center font-bold text-amber-300 uppercase tracking-wider pb-2 border-b border-emerald-900">
                Prize Structure Highlights
              </div>
              <div className="flex justify-between py-1 border-b border-emerald-950 font-bold">
                <span className="text-yellow-300">★ 1st Prize</span>
                <span className="text-white font-ticker text-base">₹12 Crore (1 Person)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-emerald-950">
                <span className="text-amber-200">★ 2nd Prize</span>
                <span className="text-stone-200">₹1 Crore (1 Person)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-emerald-950">
                <span className="text-amber-200">★ 3rd Prize</span>
                <span className="text-stone-200">₹50 Lakh (1 Person)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-emerald-950">
                <span className="text-amber-200">★ 4th Prize</span>
                <span className="text-stone-200">₹10 Lakh (12 Persons)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-emerald-950">
                <span className="text-amber-200">★ 5th Prize</span>
                <span className="text-stone-200">₹5 Lakh (36 Persons)</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-emerald-400 font-semibold">+ 6th to 10th Prizes</span>
                <span className="text-emerald-300">665 Consolation Prizes</span>
              </div>

              <button
                type="button"
                onClick={() => {
                  setCurrentPage('winning-details');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full mt-2 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-stone-950 font-black uppercase tracking-wider text-[11px] shadow cursor-pointer text-center"
              >
                View Full ₹12 Crore Prize Breakdown
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* LATEST LOTTERY RESULTS & LIVE HIGHLIGHTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
              <TrendingUp className="w-4 h-4" />
              <span>Official Gazette Synchronized</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-wide">
              Latest Punjab Lottery Results
            </h2>
          </div>

          <button
            onClick={() => {
              setCurrentPage('previous-results');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-1.5 text-xs font-bold text-amber-300 hover:text-white transition-colors cursor-pointer"
          >
            <span>View All Previous Draws</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Results Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {publishedResults.slice(0, 6).map((r, index) => {
            // Styling customized for each selected prize tier element
            const tierStyles = [
              // Card 1: 1st Prize 12 Crore
              {
                container: 'bg-gradient-to-b from-[#18391d] via-[#092b15] to-[#04190c] border-2 border-yellow-400 shadow-[0_0_30px_rgba(250,204,21,0.25)] hover:border-yellow-300',
                badge: 'bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 text-stone-950 font-black border border-yellow-300 shadow-sm',
                amountColor: 'text-yellow-300 drop-shadow-sm',
                label: '★ 1ST PRIZE (₹12 CRORE)',
                tag: 'BUMPER WINNER',
              },
              // Card 2: 2nd Prize 1 Crore
              {
                container: 'bg-gradient-to-b from-[#143219] via-[#082613] to-[#04170b] border-2 border-amber-300/80 shadow-[0_0_20px_rgba(252,211,77,0.18)] hover:border-amber-300',
                badge: 'bg-gradient-to-r from-amber-200 to-yellow-400 text-stone-950 font-bold border border-amber-300 shadow-sm',
                amountColor: 'text-white',
                label: '★ 2ND PRIZE (₹1 CRORE)',
                tag: 'MEGA WINNER',
              },
              // Card 3: 3rd Prize ₹50 Lakh
              {
                container: 'bg-gradient-to-b from-[#112d16] via-[#072412] to-[#03150a] border-2 border-amber-500/70 shadow-lg shadow-amber-950/40 hover:border-amber-400',
                badge: 'bg-amber-500/30 text-amber-300 border border-amber-500/60 font-bold',
                amountColor: 'text-amber-200',
                label: '★ 3RD PRIZE (₹50 LAKH)',
                tag: 'MAJOR WINNER',
              },
              // Card 4: 4th Prize ₹10 Lakh
              {
                container: 'bg-gradient-to-b from-[#0e2714] via-[#062211] to-[#03150a] border-2 border-emerald-500/70 shadow-lg hover:border-emerald-400',
                badge: 'bg-emerald-500/25 text-emerald-300 border border-emerald-500/50 font-bold',
                amountColor: 'text-white',
                label: '★ 4TH PRIZE (₹10 LAKH)',
                tag: 'VERIFIED',
              },
              // Card 5: 5th Prize 5 Lakh
              {
                container: 'bg-gradient-to-b from-[#0b2413] via-[#051e0f] to-[#03140a] border border-teal-500/60 shadow-md hover:border-teal-400',
                badge: 'bg-teal-500/20 text-teal-200 border border-teal-500/40 font-bold',
                amountColor: 'text-emerald-100',
                label: '★ 5TH PRIZE (₹5 LAKH)',
                tag: 'VERIFIED',
              },
              // Card 6: 6th Prize 1 Lakh
              {
                container: 'bg-gradient-to-b from-[#092211] via-[#051b0e] to-[#031309] border border-emerald-600/60 shadow-md hover:border-emerald-500',
                badge: 'bg-emerald-600/20 text-emerald-300 border border-emerald-600/40 font-bold',
                amountColor: 'text-emerald-200',
                label: '★ 6TH PRIZE (₹1 LAKH)',
                tag: 'VERIFIED',
              },
            ][index] || {
              container: 'bg-[#062412] border border-amber-500/30 hover:border-amber-400/70',
              badge: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
              amountColor: 'text-white',
              label: r.prizeRank,
              tag: 'VERIFIED',
            };

            return (
              <div
                key={r.id}
                className={`rounded-2xl p-6 shadow-xl transition-all duration-300 group flex flex-col justify-between ${tierStyles.container}`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`text-[10px] uppercase px-3 py-1 rounded-full ${tierStyles.badge}`}>
                      {tierStyles.label}
                    </span>
                    <span className="text-xs text-emerald-200/70 font-mono">
                      {r.drawDate} • {r.drawTime}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-amber-200 transition-colors">
                    {r.lotteryName}
                  </h3>

                  <div className="mt-3.5 p-3.5 rounded-xl bg-black/50 border border-emerald-900/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-stone-400">Winning Ticket:</span>
                      <span className="font-mono font-bold text-amber-300 text-sm tracking-wider">
                        {r.ticketNumber}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-stone-400">Prize Amount:</span>
                      <span className={`font-black font-ticker text-2xl tracking-wide ${tierStyles.amountColor}`}>
                        {formatINR(r.winningAmount)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-stone-400">Winner:</span>
                      <span className="text-white font-bold">{r.name}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-stone-400">Location:</span>
                      <span className="text-emerald-200 font-medium">{r.city}, Punjab</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-emerald-950/80 flex items-center justify-between gap-2">
                  <span className="text-[11px] text-emerald-300 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    {tierStyles.tag}
                  </span>

                  <button
                    onClick={() => onViewCertificate(r)}
                    className="flex items-center gap-1 text-xs font-bold text-stone-950 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 px-3.5 py-1.5 rounded-lg shadow cursor-pointer uppercase tracking-wider"
                  >
                    <FileCheck2 className="w-3.5 h-3.5" />
                    <span>View Certificate</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* MAJOR PUNJAB BUMPER SCHEMES */}
      <section className="bg-gradient-to-b from-[#04190c] to-[#062412] py-16 border-y border-amber-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading uppercase tracking-wide">
              Punjab State Bumper Lotteries
            </h2>
            <p className="mt-2 text-sm text-emerald-200/80">
              Punjab State Lotteries are renowned across India for guaranteed 1st prize disbursement strictly to the public from sold tickets only.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Punjab Mega Bumper Dhamaka',
                subtitle: 'Diwali Annual Grand Scheme',
                prize: '₹12.00 Crore',
                prizeNote: '1 Person (Guaranteed)',
                tickets: '₹500 MRP',
                offer: '3 Tickets for ₹999/-',
                draw: 'Draw Time: 7:00 PM',
                tag: 'Mega 1st Prize ₹12 Cr',
                serial: 'PB 120099',
                image: punjabMegaTicketImg,
                badgeBg: 'bg-gradient-to-r from-amber-500 to-yellow-500 text-stone-950',
                borderStyle: 'border-amber-400/50 hover:border-amber-300',
              },
              {
                title: 'Punjab Dear Lohri Bumper',
                subtitle: 'Winter Harvest Festival Draw',
                prize: '₹2.00 Crore',
                prizeNote: '1 Person (Guaranteed)',
                tickets: '₹500 MRP',
                offer: 'Official Sold Tickets Only',
                draw: '17th January Annual Draw',
                tag: 'Grand 1st Prize ₹2 Cr',
                serial: 'PB-LOH-2026 654321',
                image: punjabLohriTicketImg,
                badgeBg: 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white',
                borderStyle: 'border-emerald-500/40 hover:border-emerald-400',
              },
              {
                title: 'Punjab Dear Rakhi Bumper',
                subtitle: 'Royal Festive Annual Draw',
                prize: '₹1.50 Crore',
                prizeNote: '1 Person (Guaranteed)',
                tickets: '₹250 MRP',
                offer: 'State Directorate Verified',
                draw: '29th August Annual Draw',
                tag: 'Festive 1st Prize ₹1.5 Cr',
                serial: 'PB-RKH-2026 A 49372',
                image: punjabRakhiTicketImg,
                badgeBg: 'bg-gradient-to-r from-rose-600 to-amber-500 text-white',
                borderStyle: 'border-rose-500/40 hover:border-rose-400',
              },
              {
                title: 'Punjab Dear Baisakhi Bumper',
                subtitle: 'Punjab State Harvest Festival Draw',
                prize: '₹1.50 Crore',
                prizeNote: '1 Person (Guaranteed)',
                tickets: '₹250 MRP',
                offer: 'Public Sold Tickets Only',
                draw: '18th April Annual Draw',
                tag: 'Baisakhi 1st Prize ₹1.5 Cr',
                serial: 'PB-BSK-2026 349712',
                image: punjabBaisakhiTicketImg,
                badgeBg: 'bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950',
                borderStyle: 'border-amber-500/40 hover:border-amber-400',
              },
            ].map((scheme, idx) => (
              <div
                key={idx}
                className={`rounded-2xl bg-[#062211] border ${scheme.borderStyle} overflow-hidden flex flex-col justify-between shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group`}
              >
                <div>
                  {/* LOTTERY TICKET PHOTO CONTAINER */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-stone-950 border-b border-amber-500/20">
                    <img
                      src={scheme.image}
                      alt={`${scheme.title} Official Ticket`}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                      onClick={() =>
                        setPreviewTicket({
                          title: scheme.title,
                          image: scheme.image,
                          prize: scheme.prize,
                          serial: scheme.serial,
                          price: scheme.tickets,
                        })
                      }
                      loading="lazy"
                    />
                    
                    {/* TOP BADGE */}
                    <div className="absolute top-2 left-2 flex items-center gap-1.5">
                      <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded shadow ${scheme.badgeBg}`}>
                        {scheme.tag}
                      </span>
                    </div>

                    {/* ENLARGE HOVER PROMPT */}
                    <button
                      onClick={() =>
                        setPreviewTicket({
                          title: scheme.title,
                          image: scheme.image,
                          prize: scheme.prize,
                          serial: scheme.serial,
                          price: scheme.tickets,
                        })
                      }
                      className="absolute inset-0 bg-stone-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-bold backdrop-blur-xs cursor-pointer"
                    >
                      <ZoomIn className="w-5 h-5 text-amber-300 animate-pulse" />
                      <span className="bg-stone-900/90 px-2.5 py-1 rounded-full border border-amber-400/50 shadow">
                        Click to Enlarge Ticket Photo
                      </span>
                    </button>

                    {/* SERIAL WATERMARK */}
                    <div className="absolute bottom-1.5 right-2 bg-stone-950/85 backdrop-blur-xs border border-amber-500/40 text-[10px] font-mono text-amber-300 font-bold px-2 py-0.5 rounded">
                      № {scheme.serial}
                    </div>
                  </div>

                  {/* CARD BODY */}
                  <div className="p-5">
                    <div className="flex items-center gap-1 text-[11px] text-emerald-300 font-semibold">
                      <Ticket className="w-3.5 h-3.5 text-amber-400" />
                      <span>Punjab State Official Bumper</span>
                    </div>

                    <h3 className="text-lg font-bold text-white mt-1 font-heading leading-tight group-hover:text-amber-200 transition-colors">
                      {scheme.title}
                    </h3>
                    <p className="text-[11px] text-emerald-200/70">{scheme.subtitle}</p>

                    {/* PRIZE DISPLAY */}
                    <div className="mt-4 p-3 rounded-xl bg-gradient-to-r from-[#04190c] to-[#072d17] border border-amber-500/25">
                      <span className="text-[10px] text-emerald-300 uppercase font-bold tracking-wider block">
                        Guaranteed 1st Prize
                      </span>
                      <div className="flex items-baseline justify-between gap-1 mt-0.5">
                        <span className="text-2xl sm:text-3xl font-black text-amber-300 font-ticker tracking-wide">
                          {scheme.prize}
                        </span>
                        <span className="text-[10px] text-amber-400/90 font-medium bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/30">
                          {scheme.prizeNote}
                        </span>
                      </div>
                    </div>

                    {/* TICKET DETAILS */}
                    <div className="mt-4 space-y-1.5 text-xs text-stone-300">
                      <div className="flex items-center justify-between py-1 border-b border-emerald-950">
                        <span className="text-stone-400">Ticket MRP:</span>
                        <span className="font-bold text-white">{scheme.tickets}</span>
                      </div>
                      <div className="flex items-center justify-between py-1 border-b border-emerald-950">
                        <span className="text-stone-400">Draw Schedule:</span>
                        <span className="font-semibold text-emerald-300">{scheme.draw}</span>
                      </div>
                      <div className="flex items-center justify-between py-1 text-[11px]">
                        <span className="text-stone-400">Special Scheme:</span>
                        <span className="text-amber-300 font-medium">{scheme.offer}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CARD FOOTER BUTTONS */}
                <div className="p-5 pt-0 grid grid-cols-2 gap-2 mt-4">
                  <button
                    onClick={() =>
                      setPreviewTicket({
                        title: scheme.title,
                        image: scheme.image,
                        prize: scheme.prize,
                        serial: scheme.serial,
                        price: scheme.tickets,
                      })
                    }
                    className="flex items-center justify-center gap-1 text-center text-xs font-bold text-amber-300 hover:text-white py-2 px-1 rounded-lg bg-emerald-950 hover:bg-emerald-900 border border-amber-500/30 hover:border-amber-400 transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Ticket</span>
                  </button>

                  <button
                    onClick={() => {
                      setCurrentPage('winning-details');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="flex items-center justify-center gap-1 text-center text-xs font-bold text-stone-950 py-2 px-1 rounded-lg bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 transition-colors shadow cursor-pointer font-sans"
                  >
                    <span>All Prizes</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW TO CLAIM YOUR PRIZE IN PUNJAB */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading uppercase tracking-wide">
            How to Claim Your Winning Prize
          </h2>
          <p className="mt-2 text-sm text-emerald-200/80">
            Official claim verification process under Directorate of Punjab State Lotteries rules.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl bg-[#062412] border border-amber-500/20 space-y-3 relative">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 font-black text-lg flex items-center justify-center font-mono">
              1
            </div>
            <h3 className="text-base font-bold text-white">Preserve Original Ticket</h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              Sign your full name and address on the reverse of the original lottery ticket immediately. Mutilated or forged tickets are strictly invalid.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#062412] border border-amber-500/20 space-y-3 relative">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 font-black text-lg flex items-center justify-center font-mono">
              2
            </div>
            <h3 className="text-base font-bold text-white">Assemble KYC Documents</h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              Prepare 4 passport-size photographs attested by a Gazetted Officer/Notary, self-attested photocopy of PAN Card, and Aadhaar Card identity proof.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#062412] border border-amber-500/20 space-y-3 relative">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 font-black text-lg flex items-center justify-center font-mono">
              3
            </div>
            <h3 className="text-base font-bold text-white">Submit to Directorate / Treasury</h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              Submit claim within 30 days of draw date to Directorate of Punjab State Lotteries, Vit-te-Yojna Bhawan, Chandigarh or district treasury for prize payout.
            </p>
          </div>
        </div>
      </section>

      {/* ENLARGED TICKET PHOTO PREVIEW MODAL */}
      {previewTicket && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setPreviewTicket(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#051c0e] border-2 border-amber-500/50 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* MODAL HEADER */}
            <div className="bg-gradient-to-r from-[#04190c] via-[#072d17] to-[#04190c] p-4 px-6 border-b border-amber-500/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                  <Ticket className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white font-heading">
                    {previewTicket.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-emerald-300">
                    <span className="font-mono font-bold text-amber-300">№ {previewTicket.serial}</span>
                    <span>•</span>
                    <span className="font-bold text-white">{previewTicket.prize} 1st Prize</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setPreviewTicket(null)}
                className="w-8 h-8 rounded-full bg-stone-900/80 hover:bg-stone-800 text-stone-300 hover:text-white flex items-center justify-center border border-emerald-800 transition-colors cursor-pointer"
                title="Close Ticket Preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* FULL TICKET IMAGE DISPLAY */}
            <div className="p-4 sm:p-6 bg-stone-950 flex flex-col items-center justify-center">
              <div className="relative rounded-xl overflow-hidden border border-amber-500/30 shadow-2xl max-h-[70vh]">
                <img
                  src={previewTicket.image}
                  alt={`${previewTicket.title} Full Ticket`}
                  className="w-full h-auto max-h-[70vh] object-contain rounded-xl"
                />
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 w-full text-xs text-stone-300 border-t border-emerald-950 pt-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Official Punjab State Lottery Security Watermarked Ticket Specimen</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-amber-300 font-semibold">{previewTicket.price}</span>
                  <a
                    href={previewTicket.image}
                    download={`${previewTicket.title.replace(/\s+/g, '_')}_Ticket.jpg`}
                    className="flex items-center gap-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 px-3 py-1.5 rounded-lg border border-amber-500/40 font-bold transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Save Ticket Photo</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
