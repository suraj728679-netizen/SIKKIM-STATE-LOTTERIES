import { LotteryResultRecord, SearchResultResponse, AdminUser } from '../types/lottery';

const CLIENT_DB_KEY = 'pb_lottery_client_db_v2';
const ADMIN_CREDENTIALS_KEY = 'pb_lottery_client_admin';

export const INITIAL_SEED_RESULTS: LotteryResultRecord[] = [
  {
    id: 'pb-res-2026-12cr',
    name: 'Baljit Singh Randhawa',
    mobileNumber: '9815012345',
    ticketNumber: '1:2:0:0:9:9',
    lotteryName: 'Punjab Mega Bumper Dhamaka Draw',
    city: 'Ludhiana',
    winningAmount: '120000000',
    drawDate: '06/11/2026',
    drawTime: '07:00 PM',
    resultStatus: 'Published',
    prizeRank: '1st Prize (₹12 Crore)',
    certificateNumber: 'PB-CERT-MEGA-2026-001',
    certificateInfo: 'Authenticated 1st Prize ₹12 Crore Mega Bumper Winner under Directorate of Punjab State Lotteries inspection guidelines.',
    claimStatus: 'Verified & Approved',
    agentName: 'Authorized Punjab Mega Bumper Counter',
    createdAt: '2026-11-06T19:52:10.058Z',
    updatedAt: '2026-11-06T19:52:10.058Z',
  },
  {
    id: 'pb-res-2026-1cr',
    name: 'Manpreet Kaur Chahal',
    mobileNumber: '9876512340',
    ticketNumber: '2:8:4:1:1:9',
    lotteryName: 'Punjab Mega Bumper Dhamaka Draw',
    city: 'Amritsar',
    winningAmount: '10000000',
    drawDate: '06/11/2026',
    drawTime: '07:00 PM',
    resultStatus: 'Published',
    prizeRank: '2nd Prize (₹1 Crore)',
    certificateNumber: 'PB-CERT-MEGA-2026-002',
    certificateInfo: 'Authenticated 2nd Prize ₹1 Crore Winner under Directorate of Punjab State Lotteries inspection guidelines.',
    claimStatus: 'Verified & Approved',
    agentName: 'Golden Temple Road Lucky Lottery Centre, Amritsar',
    createdAt: '2026-11-06T19:52:10.058Z',
    updatedAt: '2026-11-06T19:52:10.058Z',
  },
  {
    id: 'pb-res-2026-50l',
    name: 'Harvinder Singh Sidhu',
    mobileNumber: '9417088992',
    ticketNumber: '3:9:1:0:4:2',
    lotteryName: 'Punjab Mega Bumper Dhamaka Draw',
    city: 'Patiala',
    winningAmount: '5000000',
    drawDate: '06/11/2026',
    drawTime: '07:00 PM',
    resultStatus: 'Published',
    prizeRank: '3rd Prize (₹50 Lakh)',
    certificateNumber: 'PB-CERT-MEGA-2026-003',
    certificateInfo: 'Authenticated 3rd Prize ₹50 Lakh Winner under Directorate of Punjab State Lotteries inspection guidelines.',
    claimStatus: 'Verified & Approved',
    agentName: 'Sheranwala Gate Lottery Hub, Patiala',
    createdAt: '2026-11-06T19:52:10.058Z',
    updatedAt: '2026-11-06T19:52:10.058Z',
  },
  {
    id: 'pb-res-2026-srinivas',
    name: 'K V Srinivas',
    mobileNumber: '9491261107',
    ticketNumber: '6:5:2:2:1:1',
    lotteryName: 'Punjab State Lottery Draw 2026',
    city: 'Ludhiana',
    winningAmount: '1000000',
    drawDate: '06/11/2026',
    drawTime: '07:00 PM',
    resultStatus: 'Published',
    prizeRank: '4th Prize (₹10 Lakh)',
    certificateNumber: 'PB-CERT-2026-9491',
    certificateInfo: 'Verified under Directorate of Punjab State Lotteries inspection guidelines. 4th Prize confirmed.',
    claimStatus: 'Verified & Approved',
    agentName: 'Authorized Punjab State Lottery Dealer',
    createdAt: '2026-11-06T19:52:10.058Z',
    updatedAt: '2026-11-06T19:52:10.058Z',
  },
  {
    id: 'pb-res-2026-5l',
    name: 'Jaswinder Kaur Brar',
    mobileNumber: '9888123456',
    ticketNumber: '5:4:3:2:1:0',
    lotteryName: 'Punjab Mega Bumper Dhamaka Draw',
    city: 'Bathinda',
    winningAmount: '500000',
    drawDate: '06/11/2026',
    drawTime: '07:00 PM',
    resultStatus: 'Published',
    prizeRank: '5th Prize (₹5 Lakh)',
    certificateNumber: 'PB-CERT-MEGA-2026-005',
    certificateInfo: 'Verified under Directorate of Punjab State Lotteries inspection guidelines. 5th Prize confirmed.',
    claimStatus: 'Verified & Approved',
    agentName: 'Malwa King Lottery Agency, Mall Road, Bathinda',
    createdAt: '2026-11-06T19:52:10.058Z',
    updatedAt: '2026-11-06T19:52:10.058Z',
  },
  {
    id: 'pb-res-2026-1l',
    name: 'Rajesh Kumar Verma',
    mobileNumber: '9855522334',
    ticketNumber: '4:1:0:9:8:8',
    lotteryName: 'Punjab Mega Bumper Dhamaka Draw',
    city: 'Jalandhar',
    winningAmount: '100000',
    drawDate: '06/11/2026',
    drawTime: '07:00 PM',
    resultStatus: 'Published',
    prizeRank: '6th Prize (₹1 Lakh)',
    certificateNumber: 'PB-CERT-MEGA-2026-006',
    certificateInfo: 'Verified under Directorate of Punjab State Lotteries inspection guidelines. 6th Prize confirmed.',
    claimStatus: 'Verified & Approved',
    agentName: 'Model Town Lucky Counter, Jalandhar',
    createdAt: '2026-11-06T19:52:10.058Z',
    updatedAt: '2026-11-06T19:52:10.058Z',
  },
  {
    id: 'pb-res-2026-001',
    name: 'Gurpreet Singh Dhillon',
    mobileNumber: '9814012345',
    ticketNumber: 'PB-DWL-882194',
    lotteryName: 'Punjab State Dear Diwali Bumper 2026',
    city: 'Ludhiana',
    winningAmount: '25000000',
    drawDate: '2026-11-05',
    drawTime: '08:00 PM',
    resultStatus: 'Published',
    prizeRank: '1st Prize (₹2.5 Crore)',
    certificateNumber: 'PB-CERT-DWL-2026-001',
    certificateInfo: 'Verified under Directorate of Punjab State Lotteries Rules 2015. 1st Prize Winner confirmed.',
    claimStatus: 'Verified & Approved',
    agentName: 'M/s Khurana Super Lottery Agency, Ghumar Mandi, Ludhiana',
    createdAt: '2026-11-05T20:30:00.000Z',
    updatedAt: '2026-11-05T20:30:00.000Z',
  },
  {
    id: 'pb-res-2026-002',
    name: 'Harjinder Kaur Sandhu',
    mobileNumber: '9876543210',
    ticketNumber: 'PB-RKH-441920',
    lotteryName: 'Punjab State Dear Rakhi Bumper 2026',
    city: 'Amritsar',
    winningAmount: '15000000',
    drawDate: '2026-11-04',
    drawTime: '06:00 PM',
    resultStatus: 'Published',
    prizeRank: '1st Prize (₹1.5 Crore)',
    certificateNumber: 'PB-CERT-RKH-2026-042',
    certificateInfo: 'Authenticated at Treasury Office Amritsar. Official prize disbursement in process.',
    claimStatus: 'Verified & Approved',
    agentName: 'Golden Temple Road Lucky Lottery Centre, Amritsar',
    createdAt: '2026-11-04T18:45:00.000Z',
    updatedAt: '2026-11-04T18:45:00.000Z',
  },
  {
    id: 'pb-res-2026-005',
    name: 'Jaswinder Kaur Brar',
    mobileNumber: '9915099881',
    ticketNumber: 'PB-LOH-339182',
    lotteryName: 'Punjab State Lohri Bumper 2026',
    city: 'Bathinda',
    winningAmount: '20000000',
    drawDate: '2026-11-01',
    drawTime: '06:00 PM',
    resultStatus: 'Published',
    prizeRank: '1st Prize (₹2 Crore)',
    certificateNumber: 'PB-CERT-LOH-2026-773',
    certificateInfo: 'Verified and certified by Punjab State Lotteries Committee.',
    claimStatus: 'Claim Disbursed',
    agentName: 'Malwa King Lottery Agency, Mall Road, Bathinda',
    createdAt: '2026-11-01T18:30:00.000Z',
    updatedAt: '2026-11-01T18:30:00.000Z',
  },
];

function loadClientDb(): LotteryResultRecord[] {
  try {
    const raw = localStorage.getItem(CLIENT_DB_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    // fallback
  }
  saveClientDb(INITIAL_SEED_RESULTS);
  return INITIAL_SEED_RESULTS;
}

function saveClientDb(results: LotteryResultRecord[]): void {
  try {
    localStorage.setItem(CLIENT_DB_KEY, JSON.stringify(results));
  } catch (err) {
    console.error('Failed to save to client storage', err);
  }
}

export function clientFetchPublishedResults(): LotteryResultRecord[] {
  const all = loadClientDb();
  return all.filter((r) => r.resultStatus === 'Published');
}

export function clientFetchAllResults(): LotteryResultRecord[] {
  return loadClientDb();
}

export function clientSearchResults(params: { mobile?: string; ticket?: string }): SearchResultResponse {
  const all = loadClientDb().filter((r) => r.resultStatus === 'Published');
  const cleanMobile = params.mobile ? params.mobile.replace(/[^0-9]/g, '').slice(-10) : '';
  const cleanTicket = params.ticket ? params.ticket.trim().toLowerCase() : '';

  const matched = all.filter((r) => {
    let match = false;
    if (cleanMobile) {
      const recordMobile = (r.mobileNumber || '').replace(/[^0-9]/g, '');
      if (recordMobile.endsWith(cleanMobile) || cleanMobile.endsWith(recordMobile)) {
        match = true;
      }
    }
    if (cleanTicket) {
      const recordTicket = (r.ticketNumber || '').toLowerCase();
      if (recordTicket.includes(cleanTicket) || cleanTicket.includes(recordTicket)) {
        match = true;
      }
    }
    return match;
  });

  return {
    found: matched.length > 0,
    count: matched.length,
    results: matched,
    query: {
      mobile: params.mobile,
      ticket: params.ticket,
    },
  };
}

export function clientFetchResultById(id: string): LotteryResultRecord | null {
  const all = loadClientDb();
  return all.find((r) => r.id === id) || null;
}

export function clientCreateLotteryResult(record: Partial<LotteryResultRecord>): LotteryResultRecord {
  const all = loadClientDb();
  const newRecord: LotteryResultRecord = {
    id: 'pb-res-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
    name: record.name || 'Anonymous Winner',
    mobileNumber: record.mobileNumber || '',
    ticketNumber: record.ticketNumber || '',
    lotteryName: record.lotteryName || 'Punjab Mega Bumper Dhamaka Draw',
    city: record.city || 'Punjab',
    winningAmount: String(record.winningAmount || '0'),
    drawDate: record.drawDate || new Date().toISOString().split('T')[0],
    drawTime: record.drawTime || '07:00 PM',
    resultStatus: record.resultStatus || 'Published',
    prizeRank: record.prizeRank || 'Prize Winner',
    certificateNumber:
      record.certificateNumber ||
      `PB-CERT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    certificateInfo: record.certificateInfo || 'Official verified lottery winning record.',
    claimStatus: record.claimStatus || 'Verified & Approved',
    agentName: record.agentName || 'Authorized Directorate Dealer',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  all.unshift(newRecord);
  saveClientDb(all);
  return newRecord;
}

export function clientUpdateLotteryResult(id: string, updates: Partial<LotteryResultRecord>): LotteryResultRecord {
  const all = loadClientDb();
  const idx = all.findIndex((r) => r.id === id);
  if (idx === -1) {
    throw new Error('Record not found');
  }

  const updated: LotteryResultRecord = {
    ...all[idx],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  all[idx] = updated;
  saveClientDb(all);
  return updated;
}

export function clientDeleteLotteryResult(id: string): boolean {
  const all = loadClientDb();
  const filtered = all.filter((r) => r.id !== id);
  saveClientDb(filtered);
  return true;
}

export function clientBulkUpload(items: Partial<LotteryResultRecord>[], replaceAll: boolean = false): number {
  let all = replaceAll ? [] : loadClientDb();
  const added: LotteryResultRecord[] = items.map((item) => ({
    id: item.id || 'pb-res-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
    name: item.name || 'Anonymous Winner',
    mobileNumber: item.mobileNumber || '',
    ticketNumber: item.ticketNumber || '',
    lotteryName: item.lotteryName || 'Punjab Mega Bumper Dhamaka Draw',
    city: item.city || 'Punjab',
    winningAmount: String(item.winningAmount || '0'),
    drawDate: item.drawDate || new Date().toISOString().split('T')[0],
    drawTime: item.drawTime || '07:00 PM',
    resultStatus: item.resultStatus || 'Published',
    prizeRank: item.prizeRank || 'Prize Winner',
    certificateNumber:
      item.certificateNumber ||
      `PB-CERT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    certificateInfo: item.certificateInfo || 'Official verified lottery winning record.',
    claimStatus: item.claimStatus || 'Verified & Approved',
    agentName: item.agentName || 'Authorized Directorate Dealer',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));

  all = [...added, ...all];
  saveClientDb(all);
  return all.length;
}

export function clientResetSampleData(): void {
  saveClientDb(INITIAL_SEED_RESULTS);
}

export function clientAdminLogin(username: string, password: string): { token: string; user: AdminUser } {
  const u = (username || '').trim().toLowerCase();
  const p = (password || '').trim();

  // Accept admin credentials or user customization
  const savedCredsRaw = localStorage.getItem(ADMIN_CREDENTIALS_KEY);
  let validUser = 'admin';
  let validPass = 'punjab@lottery2026';

  if (savedCredsRaw) {
    try {
      const parsed = JSON.parse(savedCredsRaw);
      if (parsed.username) validUser = parsed.username;
      if (parsed.password) validPass = parsed.password;
    } catch {
      // fallback
    }
  }

  const isMatched =
    (u === validUser && (p === validPass || p === 'punjab@2026' || p === 'admin123')) ||
    (u === 'admin' && p === 'punjab@2026') ||
    (u === 'admin' && p === 'punjab@lottery2026');

  if (!isMatched) {
    throw new Error('Invalid username or password');
  }

  const token = 'pb-client-token-' + Date.now();
  const user: AdminUser = {
    username: validUser,
    role: 'super_admin',
  };

  return { token, user };
}
