import React, { useState } from 'react';
import { PageView } from '../types/lottery';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Send,
  CheckCircle2,
  Building2,
} from 'lucide-react';

interface ContactPageProps {
  setCurrentPage: (page: PageView) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ setCurrentPage }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    ticketNumber: '',
    district: 'Ludhiana',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const districtTreasuries = [
    { city: 'Chandigarh (Head Office)', address: 'Vit-te-Yojna Bhawan, Sector 33-A, Chandigarh', phone: '0172-2704570' },
    { city: 'Ludhiana District Treasury', address: 'Mini Secretariat, Ferozepur Road, Ludhiana', phone: '0161-2401234' },
    { city: 'Amritsar District Treasury', address: 'District Administrative Complex, Court Road, Amritsar', phone: '0183-2223344' },
    { city: 'Jalandhar District Treasury', address: 'Administrative Complex, Ladowali Road, Jalandhar', phone: '0181-2225566' },
    { city: 'Patiala District Treasury', address: 'Mini Secretariat, Mall Road, Patiala', phone: '0175-2311222' },
    { city: 'Bathinda District Treasury', address: 'District Administrative Complex, Civil Lines, Bathinda', phone: '0164-2212345' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 pb-20">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
          <Building2 className="w-3.5 h-3.5" />
          <span>DIRECTORATE OF PUNJAB STATE LOTTERIES</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-heading uppercase tracking-wide">
          Contact & <span className="gold-gradient-text">Grievance Redressal</span>
        </h1>
        <p className="text-sm sm:text-base text-emerald-200/80">
          Official contact details, claim verification helpline, and authorized District Treasury locations across Punjab.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Contact Information Card */}
        <div className="space-y-6">
          <div className="p-8 rounded-3xl bg-[#062412] border-2 border-amber-500/30 space-y-6 shadow-xl">
            <h2 className="text-xl font-bold text-white font-heading uppercase">
              Headquarters Directorate Office
            </h2>

            <div className="space-y-4 text-sm text-stone-200">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Official Address:</strong>
                  <span>
                    Directorate of Punjab State Lotteries, Vit-te-Yojna Bhawan, Plot No. 2-B, Sector 33-A, Chandigarh, Punjab - 160020
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Official Telephone:</strong>
                  <span>0172-2704570 / 0172-2705461</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Email:</strong>
                  <span>lotterypunjab@gmail.com</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Working Hours:</strong>
                  <span>Monday to Friday (09:00 AM to 05:00 PM IST)</span>
                  <span className="text-xs text-stone-400 block mt-0.5">Closed on Punjab Government gazetted holidays.</span>
                </div>
              </div>
            </div>
          </div>

          {/* District Treasuries List */}
          <div className="p-8 rounded-3xl bg-[#062412] border border-amber-500/20 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-amber-300 uppercase tracking-wider font-heading">
              Authorized District Treasury Claim Counters
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {districtTreasuries.map((dt, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-black/40 border border-emerald-900/60 space-y-1">
                  <span className="font-bold text-white block">{dt.city}</span>
                  <span className="text-stone-300 block">{dt.address}</span>
                  <span className="text-amber-400 font-mono block text-[11px]">Tel: {dt.phone}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Verification Inquiry Form */}
        <div className="p-8 rounded-3xl bg-[#062412] border-2 border-amber-500/30 shadow-xl">
          <h2 className="text-xl font-bold text-white font-heading uppercase mb-1">
            Verification & Claim Inquiry Form
          </h2>
          <p className="text-xs text-emerald-200/70 mb-6">
            Have questions regarding your winning ticket or claim status? Submit your details to receive verification guidance.
          </p>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-emerald-950/60 border border-emerald-500 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="text-lg font-bold text-white">Inquiry Submitted Successfully</h3>
              <p className="text-xs text-stone-300">
                Your ticket verification reference number is{' '}
                <strong className="text-amber-300 font-mono">PB-INQ-2026-{Math.floor(Math.random() * 9000 + 1000)}</strong>.
                Our team will verify your ticket with the Punjab Directorate gazette.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs text-amber-400 underline pt-2 cursor-pointer"
              >
                Submit another inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-amber-300 uppercase tracking-wider block mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jaswinder Singh"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-amber-500/40 text-white text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-amber-300 uppercase tracking-wider block mb-1.5">
                  Registered Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  placeholder="e.g. 9814012345"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value.replace(/[^0-9]/g, '') })}
                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-amber-500/40 text-white font-mono text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-amber-300 uppercase tracking-wider block mb-1.5">
                  Ticket Number (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. PB-DWL-882194"
                  value={formData.ticketNumber}
                  onChange={(e) => setFormData({ ...formData, ticketNumber: e.target.value.toUpperCase() })}
                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-amber-500/40 text-amber-200 font-mono text-sm focus:outline-none focus:border-amber-400 uppercase"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-amber-300 uppercase tracking-wider block mb-1.5">
                  Your District (Punjab)
                </label>
                <select
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-amber-500/40 text-white text-sm focus:outline-none focus:border-amber-400"
                >
                  <option value="Ludhiana">Ludhiana</option>
                  <option value="Amritsar">Amritsar</option>
                  <option value="Jalandhar">Jalandhar</option>
                  <option value="Patiala">Patiala</option>
                  <option value="Bathinda">Bathinda</option>
                  <option value="Mohali">SAS Nagar (Mohali)</option>
                  <option value="Hoshiarpur">Hoshiarpur</option>
                  <option value="Chandigarh">Chandigarh (UT)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-amber-300 uppercase tracking-wider block mb-1.5">
                  Inquiry Details
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe your inquiry or question regarding draw result..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-amber-500/40 text-white text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-stone-950 font-black uppercase tracking-wider text-xs shadow-lg shadow-amber-500/20 cursor-pointer flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Verification Inquiry</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
