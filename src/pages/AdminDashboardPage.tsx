import React, { useState, useEffect } from 'react';
import { LotteryResultRecord, AdminUser, PageView } from '../types/lottery';
import {
  fetchAllResultsAdmin,
  createLotteryResult,
  updateLotteryResult,
  deleteLotteryResult,
  bulkUploadResults,
  resetToSampleData,
  adminLogout,
  formatINR,
} from '../services/api';
import {
  Trophy,
  PlusCircle,
  List,
  Upload,
  Database,
  Search,
  Edit3,
  Trash2,
  CheckCircle,
  Eye,
  LogOut,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  X,
  FileCheck2,
  Calendar,
  Clock,
  Ticket,
  User,
  Phone,
  MapPin,
  DollarSign,
  HelpCircle,
} from 'lucide-react';

interface AdminDashboardPageProps {
  adminUser: AdminUser | null;
  onLogout: () => void;
  setCurrentPage: (page: PageView) => void;
  onViewCertificate: (record: LotteryResultRecord) => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({
  adminUser,
  onLogout,
  setCurrentPage,
  onViewCertificate,
}) => {
  const [activeTab, setActiveTab] = useState<'records' | 'add' | 'upload' | 'database'>('records');
  const [records, setRecords] = useState<LotteryResultRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [toastMsg, setToastMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Form State for "Add New Result" (10 fields)
  const [formData, setFormData] = useState({
    name: '',
    mobileNumber: '',
    ticketNumber: '',
    lotteryName: 'Punjab State Dear Diwali Bumper 2026',
    city: 'Ludhiana',
    winningAmount: '25000000',
    drawDate: new Date().toISOString().split('T')[0],
    drawTime: '08:00 PM',
    resultStatus: 'Published' as 'Published' | 'Draft' | 'Archived',
    prizeRank: '1st Prize',
    certificateInfo: 'Verified under Directorate of Punjab State Lotteries inspection guidelines. Original ticket submitted.',
    certificateNumber: '',
    agentName: 'M/s Khurana Super Lottery Agency, Ludhiana',
    claimStatus: 'Verified & Approved' as 'Verified & Approved' | 'Pending Claim' | 'Claim Disbursed',
  });

  // State for Edit Modal
  const [editingRecord, setEditingRecord] = useState<LotteryResultRecord | null>(null);
  const [editFormData, setEditFormData] = useState<LotteryResultRecord | null>(null);

  // State for Delete Modal
  const [recordToDelete, setRecordToDelete] = useState<LotteryResultRecord | null>(null);

  // State for Bulk Upload
  const [bulkInput, setBulkInput] = useState('');
  const [bulkLoading, setBulkLoading] = useState(false);

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToastMsg({ text, type });
    setTimeout(() => setToastMsg(null), 4000);
  };

  const loadRecords = async () => {
    setLoading(true);
    try {
      const data = await fetchAllResultsAdmin();
      setRecords(data);
    } catch (err: unknown) {
      console.error(err);
      showToast('Failed to load records from server database.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecords();
  }, []);

  // Handle Add New Result Form Submit
  const handleSaveResult = async (statusOverride?: 'Published' | 'Draft') => {
    if (!formData.name.trim() || !formData.mobileNumber.trim() || !formData.ticketNumber.trim()) {
      showToast('Please fill in Name, Mobile Number, and Ticket Number.', 'error');
      return;
    }

    try {
      const payload = {
        ...formData,
        resultStatus: statusOverride || formData.resultStatus,
      };
      const created = await createLotteryResult(payload);
      showToast(`Result for ${created.name} (${created.ticketNumber}) saved to database successfully!`);
      // Reset form
      setFormData({
        name: '',
        mobileNumber: '',
        ticketNumber: '',
        lotteryName: 'Punjab State Dear Diwali Bumper 2026',
        city: 'Ludhiana',
        winningAmount: '1000000',
        drawDate: new Date().toISOString().split('T')[0],
        drawTime: '08:00 PM',
        resultStatus: 'Published',
        prizeRank: '1st Prize',
        certificateInfo: 'Verified under Directorate of Punjab State Lotteries inspection guidelines.',
        certificateNumber: '',
        agentName: 'Punjab Authorized Directorate Counter',
        claimStatus: 'Verified & Approved',
      });
      await loadRecords();
      setActiveTab('records');
    } catch (err: unknown) {
      if (err instanceof Error) {
        showToast(err.message, 'error');
      } else {
        showToast('Failed to save result to database.', 'error');
      }
    }
  };

  // Handle Update Result
  const handleUpdateRecord = async (statusOverride?: 'Published' | 'Draft') => {
    if (!editFormData) return;

    try {
      const updates = {
        ...editFormData,
        resultStatus: statusOverride || editFormData.resultStatus,
      };
      const updated = await updateLotteryResult(editFormData.id, updates);
      showToast(`Record for ${updated.name} updated successfully in database!`);
      setEditingRecord(null);
      setEditFormData(null);
      await loadRecords();
    } catch (err: unknown) {
      if (err instanceof Error) {
        showToast(err.message, 'error');
      } else {
        showToast('Failed to update record.', 'error');
      }
    }
  };

  // Handle Delete Result
  const handleConfirmDelete = async () => {
    if (!recordToDelete) return;

    try {
      await deleteLotteryResult(recordToDelete.id);
      showToast(`Record for ${recordToDelete.name} deleted from database.`);
      setRecordToDelete(null);
      if (editingRecord && editingRecord.id === recordToDelete.id) {
        setEditingRecord(null);
        setEditFormData(null);
      }
      await loadRecords();
    } catch (err: unknown) {
      if (err instanceof Error) {
        showToast(err.message, 'error');
      } else {
        showToast('Failed to delete record.', 'error');
      }
    }
  };

  // Toggle publish / unpublish status
  const handleTogglePublish = async (record: LotteryResultRecord) => {
    const newStatus = record.resultStatus === 'Published' ? 'Draft' : 'Published';
    try {
      await updateLotteryResult(record.id, { resultStatus: newStatus });
      showToast(`Ticket ${record.ticketNumber} is now ${newStatus}!`);
      await loadRecords();
    } catch {
      showToast('Failed to change status.', 'error');
    }
  };

  // Handle Bulk Upload
  const handleBulkUploadSubmit = async () => {
    if (!bulkInput.trim()) {
      showToast('Please paste JSON or CSV data.', 'error');
      return;
    }

    setBulkLoading(true);
    try {
      let items: Partial<LotteryResultRecord>[] = [];
      const trimmed = bulkInput.trim();

      if (trimmed.startsWith('[') || trimmed.startsWith('{')) {
        // Parse JSON
        const parsed = JSON.parse(trimmed);
        items = Array.isArray(parsed) ? parsed : [parsed];
      } else {
        // Parse CSV (Name,Mobile,Ticket,Lottery,City,Amount,Date,Time,Status,PrizeRank)
        const lines = trimmed.split('\n');
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i].trim();
          if (!line || line.startsWith('Name,') || line.startsWith('name,')) continue;
          const parts = line.split(',').map((p) => p.trim());
          if (parts.length >= 3) {
            items.push({
              name: parts[0],
              mobileNumber: parts[1],
              ticketNumber: parts[2],
              lotteryName: parts[3] || 'Punjab State Dear Bumper',
              city: parts[4] || 'Ludhiana',
              winningAmount: parts[5] || '100000',
              drawDate: parts[6] || new Date().toISOString().split('T')[0],
              drawTime: parts[7] || '08:00 PM',
              resultStatus: (parts[8] as 'Published' | 'Draft') || 'Published',
              prizeRank: parts[9] || '1st Prize',
            });
          }
        }
      }

      if (items.length === 0) {
        showToast('No valid records parsed from input.', 'error');
        return;
      }

      const total = await bulkUploadResults(items);
      showToast(`Bulk upload successful! Total database records: ${total}`);
      setBulkInput('');
      await loadRecords();
      setActiveTab('records');
    } catch (err: unknown) {
      if (err instanceof Error) {
        showToast(`Bulk upload failed: ${err.message}`, 'error');
      } else {
        showToast('Invalid JSON/CSV format.', 'error');
      }
    } finally {
      setBulkLoading(false);
    }
  };

  // Sample CSV generator for user
  const populateSampleBulk = () => {
    const sample = `Gurinder Singh,9814099881,PB-DWL-112233,Punjab State Dear Diwali Bumper 2026,Ludhiana,25000000,2026-11-06,08:00 PM,Published,1st Prize
Simranjeet Kaur,9876500112,PB-RKH-998877,Punjab State Dear Rakhi Bumper 2026,Amritsar,15000000,2026-11-06,06:00 PM,Published,1st Prize
Balwinder Kumar,9417033445,PB-LBH-774411,Punjab State LabhLaxmi Gold,Jalandhar,1000000,2026-11-06,04:00 PM,Published,1st Prize`;
    setBulkInput(sample);
  };

  // Filtered records for table
  const filteredRecords = records.filter((r) => {
    if (filterStatus !== 'ALL' && r.resultStatus !== filterStatus) return false;
    if (!searchQuery.trim()) return true;

    const q = searchQuery.toLowerCase();
    return (
      r.name.toLowerCase().includes(q) ||
      r.mobileNumber.includes(q) ||
      r.ticketNumber.toLowerCase().includes(q) ||
      r.lotteryName.toLowerCase().includes(q) ||
      r.city.toLowerCase().includes(q)
    );
  });

  const totalPrizeDistributed = records
    .filter((r) => r.resultStatus === 'Published')
    .reduce((sum, r) => sum + (parseFloat(String(r.winningAmount)) || 0), 0);

  return (
    <div className="min-h-screen bg-[#04160b] text-stone-100 pb-20">
      {/* Admin Navbar */}
      <div className="bg-[#062412] border-b border-amber-500/30 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-600 p-0.5 flex items-center justify-center shadow">
              <Trophy className="w-5 h-5 text-stone-950" />
            </div>
            <div>
              <h1 className="text-lg font-black text-amber-300 font-heading uppercase tracking-wide">
                Punjab Lottery Admin Dashboard
              </h1>
              <p className="text-xs text-emerald-200/60 font-mono">
                Logged in as: <span className="text-amber-400 font-bold">{adminUser?.username || 'admin'}</span> (Super Administrator)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentPage('home')}
              className="flex items-center gap-1.5 text-xs font-semibold bg-emerald-950/80 hover:bg-emerald-900 text-emerald-200 px-3.5 py-2 rounded-lg border border-emerald-800 transition-colors cursor-pointer"
            >
              <Eye className="w-4 h-4 text-emerald-400" />
              <span>Public Website</span>
            </button>
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 text-xs font-semibold bg-red-950/80 hover:bg-red-900 text-red-200 px-3.5 py-2 rounded-lg border border-red-800 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Toast Notification */}
        {toastMsg && (
          <div
            className={`mb-6 p-4 rounded-xl flex items-center justify-between gap-3 text-sm font-semibold shadow-lg transition-all animate-in fade-in ${
              toastMsg.type === 'success'
                ? 'bg-emerald-950 border border-emerald-500 text-emerald-200'
                : 'bg-red-950 border border-red-500 text-red-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>{toastMsg.text}</span>
            </div>
            <button onClick={() => setToastMsg(null)} className="text-xs opacity-70 hover:opacity-100">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Top Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-2xl bg-[#072a15] border border-amber-500/30">
            <span className="text-xs text-emerald-200/70 font-semibold uppercase tracking-wider block">
              Total Database Records
            </span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-3xl font-black text-white font-ticker tracking-wide">
                {records.length}
              </span>
              <span className="text-xs bg-emerald-900/60 text-emerald-300 px-2 py-0.5 rounded border border-emerald-700 font-mono">
                Persistent DB
              </span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#072a15] border border-amber-500/30">
            <span className="text-xs text-amber-300 font-semibold uppercase tracking-wider block">
              Published on Public Checker
            </span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-3xl font-black text-amber-300 font-ticker tracking-wide">
                {records.filter((r) => r.resultStatus === 'Published').length}
              </span>
              <span className="text-xs text-emerald-400 font-mono">Active Live</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#072a15] border border-amber-500/30">
            <span className="text-xs text-yellow-300 font-semibold uppercase tracking-wider block">
              Drafts / Pending Review
            </span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-3xl font-black text-yellow-400 font-ticker tracking-wide">
                {records.filter((r) => r.resultStatus !== 'Published').length}
              </span>
              <span className="text-xs text-yellow-500/80 font-mono">Hidden</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#072a15] border border-amber-500/30">
            <span className="text-xs text-emerald-200/70 font-semibold uppercase tracking-wider block">
              Published Prize Pool
            </span>
            <div className="mt-2">
              <span className="text-2xl sm:text-3xl font-black text-amber-300 font-ticker tracking-wide">
                {formatINR(totalPrizeDistributed)}
              </span>
            </div>
          </div>
        </div>

        {/* Tabs Bar */}
        <div className="flex flex-wrap items-center gap-2 border-b border-emerald-900 pb-4 mb-6">
          <button
            onClick={() => setActiveTab('records')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'records'
                ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                : 'bg-emerald-950/80 text-emerald-200 hover:bg-emerald-900 hover:text-white'
            }`}
          >
            <List className="w-4 h-4" />
            <span>Manage Results ({records.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('add')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'add'
                ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                : 'bg-emerald-950/80 text-emerald-200 hover:bg-emerald-900 hover:text-white'
            }`}
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add New Result</span>
          </button>

          <button
            onClick={() => setActiveTab('upload')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'upload'
                ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                : 'bg-emerald-950/80 text-emerald-200 hover:bg-emerald-900 hover:text-white'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>Upload / CSV Import</span>
          </button>

          <button
            onClick={() => setActiveTab('database')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'database'
                ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                : 'bg-emerald-950/80 text-emerald-200 hover:bg-emerald-900 hover:text-white'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Database & Supabase Settings</span>
          </button>

          <button
            onClick={loadRecords}
            title="Reload from Server Database"
            className="ml-auto p-2.5 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-amber-300 border border-emerald-800 transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* TAB 1: MANAGE RESULTS TABLE */}
        {activeTab === 'records' && (
          <div className="space-y-4">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 rounded-2xl bg-[#062412] border border-amber-500/20">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-amber-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search by name, mobile, ticket, city..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-lg bg-black/60 border border-emerald-800 text-white placeholder-emerald-300/40 text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-emerald-200/70">Status:</span>
                {(['ALL', 'Published', 'Draft'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setFilterStatus(st)}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                      filterStatus === st
                        ? 'bg-amber-500 text-stone-950'
                        : 'bg-emerald-950 text-emerald-200 hover:bg-emerald-900'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Results Table */}
            <div className="rounded-2xl bg-[#062412] border border-amber-500/20 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-emerald-950/80 border-b border-amber-500/30 text-amber-300 uppercase tracking-wider font-semibold">
                      <th className="py-3 px-4">Winner Name & Mobile</th>
                      <th className="py-3 px-4">Ticket Number</th>
                      <th className="py-3 px-4">Lottery Name</th>
                      <th className="py-3 px-4">Winning Amount</th>
                      <th className="py-3 px-4">Draw Date & Time</th>
                      <th className="py-3 px-4">City</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-emerald-950">
                    {filteredRecords.length > 0 ? (
                      filteredRecords.map((r) => (
                        <tr key={r.id} className="hover:bg-emerald-950/40 transition-colors">
                          <td className="py-3 px-4">
                            <div className="font-bold text-white text-sm">{r.name}</div>
                            <div className="text-emerald-300/80 font-mono text-[11px]">
                              +91 {r.mobileNumber}
                            </div>
                          </td>
                          <td className="py-3 px-4 font-mono font-bold text-amber-200">
                            {r.ticketNumber}
                          </td>
                          <td className="py-3 px-4">
                            <div className="text-white font-medium">{r.lotteryName}</div>
                            <div className="text-[10px] text-amber-400/80">{r.prizeRank}</div>
                          </td>
                          <td className="py-3 px-4 font-bold text-amber-300 text-sm">
                            {formatINR(r.winningAmount)}
                          </td>
                          <td className="py-3 px-4 text-emerald-200/80">
                            <div>{r.drawDate}</div>
                            <div className="text-[10px] text-emerald-400">{r.drawTime}</div>
                          </td>
                          <td className="py-3 px-4 text-white">{r.city}</td>
                          <td className="py-3 px-4">
                            <button
                              onClick={() => handleTogglePublish(r)}
                              title="Click to toggle publish status"
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer border ${
                                r.resultStatus === 'Published'
                                  ? 'bg-emerald-950 text-emerald-300 border-emerald-500 hover:bg-red-950 hover:text-red-300 hover:border-red-500'
                                  : 'bg-yellow-950 text-yellow-300 border-yellow-600 hover:bg-emerald-950 hover:text-emerald-300'
                              }`}
                            >
                              {r.resultStatus === 'Published' ? '✓ Published' : 'Draft'}
                            </button>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => onViewCertificate(r)}
                                title="View Winner Certificate"
                                className="p-1.5 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-800 transition-colors cursor-pointer"
                              >
                                <FileCheck2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => {
                                  setEditingRecord(r);
                                  setEditFormData({ ...r });
                                }}
                                title="Edit Result"
                                className="p-1.5 rounded-lg bg-amber-950 hover:bg-amber-900 text-amber-300 border border-amber-800 transition-colors cursor-pointer"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => setRecordToDelete(r)}
                                title="Delete Result"
                                className="p-1.5 rounded-lg bg-red-950 hover:bg-red-900 text-red-300 border border-red-800 transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={8} className="py-8 text-center text-emerald-200/60">
                          {loading ? 'Loading records from database...' : 'No records match your criteria.'}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ADD NEW RESULT (THE STREAMLINED ADMIN FORM) */}
        {activeTab === 'add' && (
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="rounded-3xl bg-[#062412] border-2 border-amber-500/40 p-6 sm:p-10 shadow-2xl">
              <div className="border-b border-amber-500/30 pb-4 mb-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase mb-2">
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Admin Winner Entry Form</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white font-heading uppercase tracking-wide">
                  Add New Punjab Lottery Winner
                </h2>
                <p className="text-xs text-emerald-200/70 mt-1">
                  Fill in the 6 primary details below. Once saved, it will immediately be searchable by mobile number on the public checker with its official certificate.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Form Columns (7 cols) */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSaveResult();
                  }}
                  className="lg:col-span-7 space-y-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* 1. Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-amber-400" /> 1. Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. K V Srinivas"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-3 rounded-xl bg-black/60 border border-amber-500/40 text-white text-sm font-semibold focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    {/* 2. Mobile Number */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-amber-400" /> 2. Mobile Number *
                      </label>
                      <div className="flex items-center bg-black/60 border border-amber-500/40 rounded-xl px-3 focus-within:border-amber-400">
                        <span className="text-emerald-400 font-mono text-xs mr-1.5">+91</span>
                        <input
                          type="tel"
                          required
                          maxLength={10}
                          placeholder="9491261107"
                          value={formData.mobileNumber}
                          onChange={(e) =>
                            setFormData({ ...formData, mobileNumber: e.target.value.replace(/[^0-9]/g, '') })
                          }
                          className="w-full py-3 bg-transparent text-white font-mono text-sm font-bold focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* 3. Ticket Number */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                        <Ticket className="w-3.5 h-3.5 text-amber-400" /> 3. Ticket Number *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 6:5:2:2:1:1"
                        value={formData.ticketNumber}
                        onChange={(e) => setFormData({ ...formData, ticketNumber: e.target.value.toUpperCase() })}
                        className="w-full px-3.5 py-3 rounded-xl bg-black/60 border border-amber-500/40 text-amber-300 font-mono text-sm font-bold focus:outline-none focus:border-amber-400 uppercase"
                      />
                    </div>

                    {/* Quick Prize Tier Buttons (From Mega Bumper Structure) */}
                    <div className="sm:col-span-2 space-y-1.5 p-3 rounded-xl bg-black/40 border border-emerald-900">
                      <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block">
                        Quick Select Prize Tier (Mega Bumper Scheme):
                      </span>
                      <div className="flex flex-wrap gap-1.5 text-[11px]">
                        {[
                          { rank: '1st Prize', amount: '120000000', label: '1st (₹12 Cr)' },
                          { rank: '2nd Prize', amount: '10000000', label: '2nd (₹1 Cr)' },
                          { rank: '3rd Prize', amount: '5000000', label: '3rd (₹50 L)' },
                          { rank: '4th Prize', amount: '1000000', label: '4th (₹10 L)' },
                          { rank: '5th Prize', amount: '500000', label: '5th (₹5 L)' },
                          { rank: '6th Prize', amount: '100000', label: '6th (₹1 L)' },
                          { rank: '7th Prize', amount: '75000', label: '7th (₹75k)' },
                          { rank: '8th Prize', amount: '25000', label: '8th (₹25k)' },
                          { rank: '9th Prize', amount: '10000', label: '9th (₹10k)' },
                          { rank: '10th Prize', amount: '5000', label: '10th (₹5k)' },
                          { rank: 'Consolation Prize', amount: '2500', label: 'Consolation' },
                        ].map((tier) => (
                          <button
                            type="button"
                            key={tier.rank}
                            onClick={() => {
                              setFormData({
                                ...formData,
                                prizeRank: tier.rank,
                                winningAmount: tier.amount,
                                drawTime: '07:00 PM',
                              });
                            }}
                            className={`px-2 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                              formData.prizeRank === tier.rank
                                ? 'bg-amber-400 text-stone-950 font-bold shadow'
                                : 'bg-emerald-950 text-stone-200 hover:bg-emerald-900 border border-emerald-800'
                            }`}
                          >
                            {tier.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 4. Win Price / Winning Prize */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                        <Trophy className="w-3.5 h-3.5 text-amber-400" /> 4. Win Price (Prize Rank) *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 1st Prize, 4th Prize"
                        value={formData.prizeRank}
                        onChange={(e) => setFormData({ ...formData, prizeRank: e.target.value })}
                        className="w-full px-3.5 py-3 rounded-xl bg-black/60 border border-amber-500/40 text-white text-sm font-semibold focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    {/* 5. Winning Amount */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                        <DollarSign className="w-3.5 h-3.5 text-amber-400" /> 5. Winning Amount (₹) *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 120000000 or 10,00,000"
                        value={formData.winningAmount}
                        onChange={(e) => setFormData({ ...formData, winningAmount: e.target.value })}
                        className="w-full px-3.5 py-3 rounded-xl bg-black/60 border border-amber-500/40 text-[#facc15] font-ticker text-xl font-bold focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    {/* 6. Draw Date */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-amber-400" /> 6. Draw Date *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 06/11/2026"
                        value={formData.drawDate}
                        onChange={(e) => setFormData({ ...formData, drawDate: e.target.value })}
                        className="w-full px-3.5 py-3 rounded-xl bg-black/60 border border-amber-500/40 text-white text-sm font-mono focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  {/* Lottery Scheme selection */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                      Lottery Scheme Name
                    </label>
                    <input
                      type="text"
                      value={formData.lotteryName}
                      onChange={(e) => setFormData({ ...formData, lotteryName: e.target.value })}
                      placeholder="Punjab State Lottery Draw 2026"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-amber-500/40 text-white text-xs"
                    />
                  </div>

                  {/* Buttons: Save Result, Publish Result */}
                  <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-amber-500/30">
                    <button
                      type="button"
                      onClick={() => handleSaveResult('Draft')}
                      className="px-5 py-3 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-stone-200 font-bold uppercase tracking-wider text-xs border border-emerald-800 transition-colors cursor-pointer"
                    >
                      Save as Draft
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSaveResult('Published')}
                      className="px-7 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-stone-950 font-black uppercase tracking-wider text-xs shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
                    >
                      Save & Publish Result
                    </button>
                  </div>
                </form>

                {/* Certificate Live Preview (5 cols) */}
                <div className="lg:col-span-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Trophy className="w-3.5 h-3.5" /> Certificate Live Preview
                    </span>
                    <span className="text-[10px] bg-emerald-900 text-emerald-300 px-2 py-0.5 rounded border border-emerald-700">
                      Auto-Generated
                    </span>
                  </div>

                  <div className="rounded-2xl bg-[#ffe4ec] text-[#2e0827] border-2 border-[#581845] p-5 shadow-xl text-center space-y-3 relative overflow-hidden">
                    <div className="border-b border-[#581845]/20 pb-2">
                      <h4 className="text-base font-black text-[#4a154b] uppercase tracking-wider">
                        PUNJAB STATE LOTTERY
                      </h4>
                      <p className="text-[10px] font-bold text-[#581845] uppercase tracking-widest">
                        CERTIFICATE OF WINNER
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-[#581845] uppercase">
                        THIS CERTIFICATE IS PRESENTED TO :
                      </p>
                      <p className="text-xl font-black text-[#2e0827]">
                        {formData.name || 'Winner Name'}
                      </p>
                      <p className="text-[11px] text-[#4a154b] leading-tight">
                        For the achievement of {formData.prizeRank || 'Prize'} place in Punjab State Lottery for winning ₹{formData.winningAmount || '0'}/-.
                      </p>
                      <p className="text-xs font-bold font-mono text-[#2e0827] pt-1">
                        Winner Ticket Number : <span className="font-black text-[#581845]">{formData.ticketNumber || 'TICKET-NO'}</span>
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#581845]/20 flex items-end justify-between text-[10px]">
                      <div>
                        <div className="font-mono font-bold">{formData.drawDate || '06/11/2026'}</div>
                        <div className="border-t border-[#581845] text-[8px] font-bold text-[#581845]">DATE</div>
                      </div>
                      <div>
                        <div className="font-serif italic font-bold">Authorized</div>
                        <div className="border-t border-[#581845] text-[8px] font-bold text-[#581845]">SIGNATURE</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}



        {/* TAB 3: UPLOAD / CSV IMPORT */}
        {activeTab === 'upload' && (
          <div className="max-w-4xl mx-auto rounded-3xl bg-[#062412] border-2 border-amber-500/40 p-6 sm:p-10 shadow-2xl space-y-6">
            <div className="border-b border-amber-500/30 pb-4">
              <h2 className="text-xl sm:text-2xl font-black text-white font-heading uppercase tracking-wide">
                Bulk Upload Lottery Result Data
              </h2>
              <p className="text-xs text-emerald-200/70 mt-1">
                Import dozens or hundreds of winning records simultaneously using CSV format or JSON array.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                  Paste CSV or JSON Content:
                </label>
                <button
                  type="button"
                  onClick={populateSampleBulk}
                  className="text-xs text-amber-400 hover:text-white underline cursor-pointer"
                >
                  Load Sample CSV Data
                </button>
              </div>

              <textarea
                rows={10}
                value={bulkInput}
                onChange={(e) => setBulkInput(e.target.value)}
                placeholder="Name,Mobile,Ticket,Lottery,City,Amount,Date,Time,Status,PrizeRank&#10;Gurinder Singh,9814099881,PB-DWL-112233,Punjab State Dear Diwali Bumper 2026,Ludhiana,25000000,2026-11-06,08:00 PM,Published,1st Prize"
                className="w-full p-4 rounded-xl bg-black/60 border border-amber-500/40 font-mono text-xs text-emerald-200 focus:outline-none focus:border-amber-400"
              />

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-emerald-200/60">
                  Format: Name, Mobile, Ticket Number, Lottery Name, City, Amount, Date, Time, Status, PrizeRank
                </span>
                <button
                  type="button"
                  disabled={bulkLoading}
                  onClick={handleBulkUploadSubmit}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-stone-950 font-bold uppercase tracking-wider text-xs shadow cursor-pointer disabled:opacity-50"
                >
                  {bulkLoading ? 'Processing...' : 'Import to Database'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: DATABASE & SUPABASE SETTINGS */}
        {activeTab === 'database' && (
          <div className="max-w-4xl mx-auto rounded-3xl bg-[#062412] border-2 border-amber-500/40 p-6 sm:p-10 shadow-2xl space-y-8">
            <div className="border-b border-amber-500/30 pb-4">
              <h2 className="text-xl sm:text-2xl font-black text-white font-heading uppercase tracking-wide flex items-center gap-2">
                <Database className="w-6 h-6 text-amber-400" />
                <span>Database Connection & Cloud Sync Architecture</span>
              </h2>
              <p className="text-xs text-emerald-200/70 mt-1">
                Real-time persistence overview and cloud database synchronization.
              </p>
            </div>

            {/* Current Active Storage Card */}
            <div className="p-6 rounded-2xl bg-black/40 border border-emerald-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex h-3 w-3 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                  <span className="text-sm font-bold text-white uppercase tracking-wider">
                    Primary Database: Server-Side Persistent File Store
                  </span>
                </div>
                <span className="text-xs bg-emerald-900 text-emerald-300 font-mono px-2.5 py-1 rounded">
                  Connected & Active
                </span>
              </div>

              <p className="text-xs text-stone-300 leading-relaxed">
                All records are written to real persistent server storage (<code className="text-amber-300">/data/lottery_results.json</code>) via the Express REST API. They are NOT stored in browser localStorage. Any edit or new record is immediately available to public mobile searches across all devices.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="bg-emerald-950/60 p-3 rounded-lg border border-emerald-900">
                  <span className="text-emerald-400/80 block text-[11px]">Storage Engine:</span>
                  <span className="font-semibold text-white">Node / Express File Database</span>
                </div>
                <div className="bg-emerald-950/60 p-3 rounded-lg border border-emerald-900">
                  <span className="text-emerald-400/80 block text-[11px]">Total Active Records:</span>
                  <span className="font-semibold text-amber-300 font-mono">{records.length} Records</span>
                </div>
                <div className="bg-emerald-950/60 p-3 rounded-lg border border-emerald-900">
                  <span className="text-emerald-400/80 block text-[11px]">Public API Status:</span>
                  <span className="font-semibold text-emerald-300 font-mono">200 OK Live</span>
                </div>
              </div>
            </div>

            {/* Supabase Connection Instructions */}
            <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/30 space-y-4">
              <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Supabase / Cloud Database Connection Instructions</span>
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                To connect Supabase directly to this project, you can provide your project credentials below or set them in your environment variables.
              </p>

              <div className="p-4 rounded-xl bg-black/60 font-mono text-xs text-emerald-300 space-y-2 border border-emerald-900">
                <p className="text-stone-400">// Supabase PostgreSQL schema for Punjab Lottery Results:</p>
                <p>CREATE TABLE punjab_lottery_results (</p>
                <p className="pl-4">id TEXT PRIMARY KEY,</p>
                <p className="pl-4">name TEXT NOT NULL,</p>
                <p className="pl-4">mobile_number TEXT NOT NULL,</p>
                <p className="pl-4">ticket_number TEXT NOT NULL UNIQUE,</p>
                <p className="pl-4">lottery_name TEXT NOT NULL,</p>
                <p className="pl-4">city TEXT NOT NULL,</p>
                <p className="pl-4">winning_amount NUMERIC NOT NULL,</p>
                <p className="pl-4">draw_date DATE NOT NULL,</p>
                <p className="pl-4">draw_time TEXT NOT NULL,</p>
                <p className="pl-4">result_status TEXT DEFAULT 'Published',</p>
                <p className="pl-4">certificate_info TEXT,</p>
                <p className="pl-4">created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()</p>
                <p>);</p>
              </div>
            </div>

            {/* Reset to Seed Data */}
            <div className="p-5 rounded-2xl bg-red-950/20 border border-red-900/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="font-bold text-red-300 text-sm block">
                  Reset Database to Default Punjab Lottery Seed Data
                </span>
                <span className="text-xs text-stone-400">
                  Restores initial Bumper winners across Ludhiana, Amritsar, Jalandhar, Patiala, and Bathinda.
                </span>
              </div>
              <button
                type="button"
                onClick={async () => {
                  if (confirm('Are you sure you want to reset records to default Punjab seed data?')) {
                    await resetToSampleData();
                    await loadRecords();
                    showToast('Database reset to Punjab Lottery sample records.');
                  }
                }}
                className="px-4 py-2 rounded-lg bg-red-950 hover:bg-red-900 text-red-200 border border-red-800 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shrink-0"
              >
                Reset Sample Data
              </button>
            </div>
          </div>
        )}
      </div>

      {/* EDIT MODAL */}
      {editingRecord && editFormData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#072815] border-2 border-amber-400 rounded-3xl w-full max-w-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-amber-500/30 pb-3 mb-5">
              <div>
                <h3 className="text-lg font-bold text-white font-heading uppercase">
                  Edit Lottery Result #{editFormData.ticketNumber}
                </h3>
                <p className="text-xs text-emerald-200/70 font-mono">ID: {editFormData.id}</p>
              </div>
              <button
                onClick={() => {
                  setEditingRecord(null);
                  setEditFormData(null);
                }}
                className="p-1 rounded-lg hover:bg-emerald-950 text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-bold text-amber-300 uppercase block mb-1">Winner Name</label>
                <input
                  type="text"
                  value={editFormData.name}
                  onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-black/60 border border-amber-500/40 text-white text-sm"
                />
              </div>

              <div>
                <label className="font-bold text-amber-300 uppercase block mb-1">Mobile Number</label>
                <input
                  type="tel"
                  maxLength={10}
                  value={editFormData.mobileNumber}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      mobileNumber: e.target.value.replace(/[^0-9]/g, ''),
                    })
                  }
                  className="w-full p-2.5 rounded-lg bg-black/60 border border-amber-500/40 text-white font-mono text-sm"
                />
              </div>

              <div>
                <label className="font-bold text-amber-300 uppercase block mb-1">Ticket Number</label>
                <input
                  type="text"
                  value={editFormData.ticketNumber}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, ticketNumber: e.target.value.toUpperCase() })
                  }
                  className="w-full p-2.5 rounded-lg bg-black/60 border border-amber-500/40 text-amber-300 font-mono text-sm uppercase"
                />
              </div>

              <div>
                <label className="font-bold text-amber-300 uppercase block mb-1">Lottery Name</label>
                <input
                  type="text"
                  value={editFormData.lotteryName}
                  onChange={(e) => setEditFormData({ ...editFormData, lotteryName: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-black/60 border border-amber-500/40 text-white text-sm"
                />
              </div>

              <div>
                <label className="font-bold text-amber-300 uppercase block mb-1">City</label>
                <input
                  type="text"
                  value={editFormData.city}
                  onChange={(e) => setEditFormData({ ...editFormData, city: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-black/60 border border-amber-500/40 text-white text-sm"
                />
              </div>

              <div>
                <label className="font-bold text-amber-300 uppercase block mb-1">Winning Amount (₹)</label>
                <input
                  type="number"
                  value={editFormData.winningAmount}
                  onChange={(e) => setEditFormData({ ...editFormData, winningAmount: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-black/60 border border-amber-500/40 text-amber-300 font-bold text-sm"
                />
              </div>

              <div>
                <label className="font-bold text-amber-300 uppercase block mb-1">Draw Date</label>
                <input
                  type="date"
                  value={editFormData.drawDate}
                  onChange={(e) => setEditFormData({ ...editFormData, drawDate: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-black/60 border border-amber-500/40 text-white text-sm"
                />
              </div>

              <div>
                <label className="font-bold text-amber-300 uppercase block mb-1">Draw Time</label>
                <input
                  type="text"
                  value={editFormData.drawTime}
                  onChange={(e) => setEditFormData({ ...editFormData, drawTime: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-black/60 border border-amber-500/40 text-white text-sm"
                />
              </div>

              <div>
                <label className="font-bold text-amber-300 uppercase block mb-1">Result Status</label>
                <select
                  value={editFormData.resultStatus}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      resultStatus: e.target.value as 'Published' | 'Draft' | 'Archived',
                    })
                  }
                  className="w-full p-2.5 rounded-lg bg-black/60 border border-amber-500/40 text-white text-sm"
                >
                  <option value="Published">Published (Public)</option>
                  <option value="Draft">Draft (Admin Only)</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-amber-300 uppercase block mb-1">Prize Rank</label>
                <input
                  type="text"
                  value={editFormData.prizeRank}
                  onChange={(e) => setEditFormData({ ...editFormData, prizeRank: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-black/60 border border-amber-500/40 text-white text-sm"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="font-bold text-amber-300 uppercase block mb-1">Certificate Information</label>
                <textarea
                  rows={2}
                  value={editFormData.certificateInfo}
                  onChange={(e) => setEditFormData({ ...editFormData, certificateInfo: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-black/60 border border-amber-500/40 text-white text-sm"
                />
              </div>
            </div>

            {/* Buttons: Save Result, Update Result, Delete Result, Publish Result */}
            <div className="mt-6 pt-4 border-t border-amber-500/30 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => {
                  setRecordToDelete(editFormData);
                }}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-red-950 hover:bg-red-900 text-red-200 border border-red-800 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Result</span>
              </button>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleUpdateRecord('Draft')}
                  className="px-4 py-2.5 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-stone-200 text-xs font-bold uppercase tracking-wider border border-emerald-800 transition-colors cursor-pointer"
                >
                  Save as Draft
                </button>

                <button
                  type="button"
                  onClick={() => handleUpdateRecord()}
                  className="px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Update Result
                </button>

                <button
                  type="button"
                  onClick={() => handleUpdateRecord('Published')}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-stone-950 text-xs font-black uppercase tracking-wider shadow cursor-pointer"
                >
                  Publish Result
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {recordToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#091a10] border-2 border-red-700 rounded-3xl w-full max-w-md p-6 shadow-2xl text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-red-950/80 border border-red-700 flex items-center justify-center mx-auto text-red-400">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white font-heading">
              Delete Lottery Result?
            </h3>
            <p className="text-xs text-stone-300">
              Are you sure you want to permanently delete the winning result for{' '}
              <strong className="text-white">{recordToDelete.name}</strong> (Ticket{' '}
              <span className="font-mono text-amber-300">{recordToDelete.ticketNumber}</span>)?
              This action cannot be undone.
            </p>
            <div className="flex items-center justify-center gap-3 pt-3">
              <button
                onClick={() => setRecordToDelete(null)}
                className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider cursor-pointer shadow-lg shadow-red-900/30"
              >
                Yes, Delete Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
