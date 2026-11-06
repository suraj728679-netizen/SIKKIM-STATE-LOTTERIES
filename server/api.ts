import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

export interface LotteryResultRecord {
  id: string;
  name: string;
  mobileNumber: string;
  ticketNumber: string;
  lotteryName: string;
  city: string;
  winningAmount: string | number;
  drawDate: string;
  drawTime: string;
  resultStatus: 'Published' | 'Draft' | 'Archived';
  prizeRank: string;
  certificateNumber: string;
  certificateInfo: string;
  claimStatus: 'Verified & Approved' | 'Pending Claim' | 'Claim Disbursed';
  agentName?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DatabaseState {
  results: LotteryResultRecord[];
  admin: {
    username: string;
    passwordHash: string;
  };
  supabaseConfig?: {
    enabled: boolean;
    url: string;
    anonKey: string;
  };
  lastUpdated: string;
}

const DATA_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'lottery_results.json');

const INITIAL_SEED_DATA: LotteryResultRecord[] = [
  {
    id: 'pb-res-2026-12cr',
    name: 'Baljit Singh Randhawa',
    mobileNumber: '9815012345',
    ticketNumber: '1:2:0:0:9:9',
    lotteryName: 'Punjab Mega Bumper Dhamaka Draw',
    city: 'Ludhiana',
    winningAmount: '120000000', // ₹12 Crore
    drawDate: '06/11/2026',
    drawTime: '07:00 PM',
    resultStatus: 'Published',
    prizeRank: '1st Prize (₹12 Crore)',
    certificateNumber: 'PB-CERT-MEGA-2026-001',
    certificateInfo: 'Authenticated 1st Prize ₹12 Crore Mega Bumper Winner under Directorate of Punjab State Lotteries inspection guidelines.',
    claimStatus: 'Verified & Approved',
    agentName: 'Authorized Punjab Mega Bumper Counter',
    createdAt: '2026-11-06T12:00:00.000Z',
    updatedAt: '2026-11-06T12:00:00.000Z',
  },
  {
    id: 'pb-res-2026-1cr',
    name: 'Manpreet Kaur Chahal',
    mobileNumber: '9876512340',
    ticketNumber: '2:8:4:1:1:9',
    lotteryName: 'Punjab Mega Bumper Dhamaka Draw',
    city: 'Amritsar',
    winningAmount: '10000000', // ₹1 Crore
    drawDate: '06/11/2026',
    drawTime: '07:00 PM',
    resultStatus: 'Published',
    prizeRank: '2nd Prize (₹1 Crore)',
    certificateNumber: 'PB-CERT-MEGA-2026-002',
    certificateInfo: 'Authenticated 2nd Prize ₹1 Crore Winner under Directorate of Punjab State Lotteries inspection guidelines.',
    claimStatus: 'Verified & Approved',
    agentName: 'Golden Temple Road Lucky Lottery Centre, Amritsar',
    createdAt: '2026-11-06T11:30:00.000Z',
    updatedAt: '2026-11-06T11:30:00.000Z',
  },
  {
    id: 'pb-res-2026-50l',
    name: 'Harvinder Singh Sidhu',
    mobileNumber: '9417088992',
    ticketNumber: '3:9:1:0:4:2',
    lotteryName: 'Punjab Mega Bumper Dhamaka Draw',
    city: 'Patiala',
    winningAmount: '5000000', // ₹50 Lakh
    drawDate: '06/11/2026',
    drawTime: '07:00 PM',
    resultStatus: 'Published',
    prizeRank: '3rd Prize (₹50 Lakh)',
    certificateNumber: 'PB-CERT-MEGA-2026-003',
    certificateInfo: 'Authenticated 3rd Prize ₹50 Lakh Winner under Directorate of Punjab State Lotteries inspection guidelines.',
    claimStatus: 'Verified & Approved',
    agentName: 'Sheranwala Gate Lottery Hub, Patiala',
    createdAt: '2026-11-06T11:00:00.000Z',
    updatedAt: '2026-11-06T11:00:00.000Z',
  },
  {
    id: 'pb-res-2026-srinivas',
    name: 'K V Srinivas',
    mobileNumber: '9491261107',
    ticketNumber: '6:5:2:2:1:1',
    lotteryName: 'Punjab State Lottery Draw 2026',
    city: 'Ludhiana',
    winningAmount: '1000000', // ₹10,00,000/-
    drawDate: '06/11/2026',
    drawTime: '07:00 PM',
    resultStatus: 'Published',
    prizeRank: '4th Prize (₹10 Lakh)',
    certificateNumber: 'PB-CERT-2026-9491',
    certificateInfo: 'Verified under Directorate of Punjab State Lotteries inspection guidelines. 4th Prize confirmed.',
    claimStatus: 'Verified & Approved',
    agentName: 'Authorized Punjab State Lottery Dealer',
    createdAt: '2026-11-06T10:00:00.000Z',
    updatedAt: '2026-11-06T10:00:00.000Z',
  },
  {
    id: 'pb-res-2026-5l',
    name: 'Jaswinder Kaur Brar',
    mobileNumber: '9888123456',
    ticketNumber: '5:4:3:2:1:0',
    lotteryName: 'Punjab Mega Bumper Dhamaka Draw',
    city: 'Bathinda',
    winningAmount: '500000', // ₹5 Lakh
    drawDate: '06/11/2026',
    drawTime: '07:00 PM',
    resultStatus: 'Published',
    prizeRank: '5th Prize (₹5 Lakh)',
    certificateNumber: 'PB-CERT-MEGA-2026-005',
    certificateInfo: 'Verified under Directorate of Punjab State Lotteries inspection guidelines. 5th Prize confirmed.',
    claimStatus: 'Verified & Approved',
    agentName: 'Malwa King Lottery Agency, Mall Road, Bathinda',
    createdAt: '2026-11-06T09:30:00.000Z',
    updatedAt: '2026-11-06T09:30:00.000Z',
  },
  {
    id: 'pb-res-2026-1l',
    name: 'Rajesh Kumar Verma',
    mobileNumber: '9855522334',
    ticketNumber: '4:1:0:9:8:8',
    lotteryName: 'Punjab Mega Bumper Dhamaka Draw',
    city: 'Jalandhar',
    winningAmount: '100000', // ₹1 Lakh
    drawDate: '06/11/2026',
    drawTime: '07:00 PM',
    resultStatus: 'Published',
    prizeRank: '6th Prize (₹1 Lakh)',
    certificateNumber: 'PB-CERT-MEGA-2026-006',
    certificateInfo: 'Verified under Directorate of Punjab State Lotteries inspection guidelines. 6th Prize confirmed.',
    claimStatus: 'Verified & Approved',
    agentName: 'Model Town Lucky Counter, Jalandhar',
    createdAt: '2026-11-06T09:00:00.000Z',
    updatedAt: '2026-11-06T09:00:00.000Z',
  },
  {
    id: 'pb-res-2026-004',
    name: 'Amandeep Singh Gill',
    mobileNumber: '9888123456',
    ticketNumber: 'PB-DR100-776319',
    lotteryName: 'Punjab Dear 100 Weekly Draw',
    city: 'Patiala',
    winningAmount: '500000', // ₹5 Lakh
    drawDate: '2026-11-03',
    drawTime: '08:00 PM',
    resultStatus: 'Published',
    prizeRank: '2nd Prize (₹5 Lakh)',
    certificateNumber: 'PB-CERT-DR-2026-192',
    certificateInfo: 'Claimant documents submitted at District Treasury Patiala.',
    claimStatus: 'Verified & Approved',
    agentName: 'Sheranwala Gate Lottery Hub, Patiala',
    createdAt: '2026-11-03T20:15:00.000Z',
    updatedAt: '2026-11-03T20:15:00.000Z',
  },
  {
    id: 'pb-res-2026-005',
    name: 'Jaswinder Kaur Brar',
    mobileNumber: '9915099881',
    ticketNumber: 'PB-LOH-339182',
    lotteryName: 'Punjab State Lohri Bumper 2026',
    city: 'Bathinda',
    winningAmount: '20000000', // ₹2 Crore
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
  {
    id: 'pb-res-2026-006',
    name: 'Manpreet Singh Cheema',
    mobileNumber: '9855522334',
    ticketNumber: 'PB-BSK-552190',
    lotteryName: 'Punjab State Baisakhi Bumper 2026',
    city: 'Mohali',
    winningAmount: '100000', // ₹1 Lakh
    drawDate: '2026-11-02',
    drawTime: '07:30 PM',
    resultStatus: 'Published',
    prizeRank: '3rd Prize (₹1 Lakh)',
    certificateNumber: 'PB-CERT-BSK-2026-552',
    certificateInfo: 'Official result published under Directorate serial no. 8812.',
    claimStatus: 'Verified & Approved',
    agentName: 'Phase 7 Express Lottery Counter, SAS Nagar Mohali',
    createdAt: '2026-11-02T20:00:00.000Z',
    updatedAt: '2026-11-02T20:00:00.000Z',
  }
];

function initDatabase(): DatabaseState {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (fs.existsSync(DB_FILE)) {
      const content = fs.readFileSync(DB_FILE, 'utf-8');
      const data = JSON.parse(content);
      if (data && Array.isArray(data.results)) {
        return data;
      }
    }
  } catch (err) {
    console.error('Error reading database file, resetting to default:', err);
  }

  const defaultDb: DatabaseState = {
    results: INITIAL_SEED_DATA,
    admin: {
      username: 'admin',
      passwordHash: 'punjab@lottery2026', // Plain for simplicity / salt
    },
    lastUpdated: new Date().toISOString(),
  };

  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(defaultDb, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to write default database:', err);
  }

  return defaultDb;
}

let dbCache: DatabaseState = initDatabase();

function saveDatabase(): boolean {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    dbCache.lastUpdated = new Date().toISOString();
    fs.writeFileSync(DB_FILE, JSON.stringify(dbCache, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Failed to save database:', err);
    return false;
  }
}

// In-memory active admin tokens
const activeSessions = new Set<string>();

export function createApiRouter(): express.Router {
  const router = express.Router();
  router.use(express.json({ limit: '10mb' }));

  // Helper middleware for admin auth
  const requireAdmin = (req: Request, res: Response, next: express.NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized: Admin authentication required' });
    }
    const token = authHeader.split(' ')[1];
    if (!activeSessions.has(token)) {
      return res.status(401).json({ error: 'Session expired or invalid token' });
    }
    next();
  };

  // 1. PUBLIC: Health and Database stats
  router.get('/health', (_req: Request, res: Response) => {
    res.json({
      status: 'ok',
      service: 'Punjab Lottery Result Database Service',
      recordsCount: dbCache.results.length,
      lastUpdated: dbCache.lastUpdated,
    });
  });

  // 2. PUBLIC & ADMIN: Get results
  router.get('/results', (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    const isAdmin = authHeader?.startsWith('Bearer ') && activeSessions.has(authHeader.split(' ')[1]);

    if (isAdmin) {
      // Admin sees all records
      return res.json({ results: dbCache.results });
    }

    // Public only sees 'Published' records
    const published = dbCache.results.filter((r) => r.resultStatus === 'Published');
    res.json({ results: published });
  });

  // 3. PUBLIC: Search by mobile number or ticket number
  router.get('/results/search', (req: Request, res: Response) => {
    const mobile = (req.query.mobile as string || '').trim().replace(/[^0-9]/g, '');
    const ticket = (req.query.ticket as string || '').trim().toLowerCase();

    if (!mobile && !ticket) {
      return res.status(400).json({ error: 'Please provide a mobile number or ticket number' });
    }

    // Public search only returns published results
    const matches = dbCache.results.filter((r) => {
      if (r.resultStatus !== 'Published') return false;

      let matched = false;
      if (mobile) {
        const cleanRecMobile = r.mobileNumber.replace(/[^0-9]/g, '');
        // Match exact or last 10 digits
        if (cleanRecMobile === mobile || cleanRecMobile.endsWith(mobile) || mobile.endsWith(cleanRecMobile)) {
          matched = true;
        }
      }

      if (ticket) {
        const cleanRecTicket = r.ticketNumber.toLowerCase().replace(/[\s-]/g, '');
        const cleanSearchTicket = ticket.replace(/[\s-]/g, '');
        if (cleanRecTicket.includes(cleanSearchTicket) || cleanSearchTicket.includes(cleanRecTicket)) {
          matched = true;
        }
      }

      return matched;
    });

    res.json({
      query: { mobile, ticket },
      found: matches.length > 0,
      count: matches.length,
      results: matches,
    });
  });

  // 4. PUBLIC: Get single result details by ID (for certificate view)
  router.get('/results/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const record = dbCache.results.find((r) => r.id === id);

    if (!record) {
      return res.status(404).json({ error: 'Lottery result record not found' });
    }

    res.json({ result: record });
  });

  // 5. ADMIN LOGIN
  router.post('/admin/login', (req: Request, res: Response) => {
    const { username, password } = req.body || {};

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    if (
      username.trim() === dbCache.admin.username &&
      password === dbCache.admin.passwordHash
    ) {
      // Generate a secure random session token
      const token = `pb_adm_${Date.now()}_${Math.random().toString(36).substring(2, 12)}`;
      activeSessions.add(token);

      return res.json({
        success: true,
        token,
        user: {
          username: dbCache.admin.username,
          role: 'Super Administrator',
        },
      });
    }

    res.status(401).json({ error: 'Invalid username or password' });
  });

  // 6. ADMIN: Verify session
  router.get('/admin/verify', (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ authenticated: false });
    }
    const token = authHeader.split(' ')[1];
    if (activeSessions.has(token)) {
      return res.json({
        authenticated: true,
        user: { username: dbCache.admin.username, role: 'Super Administrator' },
      });
    }
    res.status(401).json({ authenticated: false });
  });

  // 7. ADMIN: Logout
  router.post('/admin/logout', (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      activeSessions.delete(token);
    }
    res.json({ success: true, message: 'Logged out successfully' });
  });

  // 8. ADMIN: Create new result
  router.post('/results', requireAdmin, (req: Request, res: Response) => {
    const body = req.body || {};
    const {
      name,
      mobileNumber,
      ticketNumber,
      lotteryName,
      city,
      winningAmount,
      drawDate,
      drawTime,
      resultStatus,
      prizeRank,
      certificateInfo,
      certificateNumber,
      claimStatus,
      agentName,
    } = body;

    if (!name || !mobileNumber || !ticketNumber || !lotteryName || !city || winningAmount === undefined) {
      return res.status(400).json({
        error: 'Missing required fields: name, mobileNumber, ticketNumber, lotteryName, city, winningAmount are mandatory.',
      });
    }

    const newId = `pb-res-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const certNum =
      certificateNumber ||
      `PB-CERT-${lotteryName.replace(/[^A-Za-z0-9]/g, '').substring(0, 4).toUpperCase()}-${Date.now().toString().slice(-4)}`;

    const newRecord: LotteryResultRecord = {
      id: newId,
      name: String(name).trim(),
      mobileNumber: String(mobileNumber).trim(),
      ticketNumber: String(ticketNumber).trim().toUpperCase(),
      lotteryName: String(lotteryName).trim(),
      city: String(city).trim(),
      winningAmount: String(winningAmount).trim(),
      drawDate: drawDate || new Date().toISOString().split('T')[0],
      drawTime: drawTime || '08:00 PM',
      resultStatus: resultStatus === 'Draft' || resultStatus === 'Archived' ? resultStatus : 'Published',
      prizeRank: prizeRank || '1st Prize',
      certificateNumber: certNum,
      certificateInfo:
        certificateInfo ||
        'Certified & Published under the Directorate of Punjab State Lotteries rules and regulations.',
      claimStatus: claimStatus || 'Verified & Approved',
      agentName: agentName ? String(agentName).trim() : 'Punjab State Authorized Counter',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    dbCache.results.unshift(newRecord);
    saveDatabase();

    res.status(201).json({
      success: true,
      message: 'Lottery result saved successfully',
      result: newRecord,
    });
  });

  // 9. ADMIN: Update existing result
  router.put('/results/:id', requireAdmin, (req: Request, res: Response) => {
    const { id } = req.params;
    const body = req.body || {};

    const index = dbCache.results.findIndex((r) => r.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Record not found' });
    }

    const existing = dbCache.results[index];
    const updatedRecord: LotteryResultRecord = {
      ...existing,
      ...body,
      id: existing.id, // prevent changing ID
      updatedAt: new Date().toISOString(),
    };

    dbCache.results[index] = updatedRecord;
    saveDatabase();

    res.json({
      success: true,
      message: 'Result updated successfully',
      result: updatedRecord,
    });
  });

  // 10. ADMIN: Delete result
  router.delete('/results/:id', requireAdmin, (req: Request, res: Response) => {
    const { id } = req.params;
    const index = dbCache.results.findIndex((r) => r.id === id);

    if (index === -1) {
      return res.status(404).json({ error: 'Record not found' });
    }

    const deleted = dbCache.results.splice(index, 1)[0];
    saveDatabase();

    res.json({
      success: true,
      message: 'Result deleted successfully',
      deleted,
    });
  });

  // 11. ADMIN: Bulk upload / import results
  router.post('/results/bulk', requireAdmin, (req: Request, res: Response) => {
    const { items, replaceAll } = req.body || {};

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'items array is required' });
    }

    const validated: LotteryResultRecord[] = [];
    const timestamp = new Date().toISOString();

    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      if (!it.name || !it.mobileNumber || !it.ticketNumber || !it.lotteryName) {
        continue;
      }

      validated.push({
        id: it.id || `pb-bulk-${Date.now()}-${i}`,
        name: String(it.name).trim(),
        mobileNumber: String(it.mobileNumber).trim(),
        ticketNumber: String(it.ticketNumber).trim().toUpperCase(),
        lotteryName: String(it.lotteryName).trim(),
        city: String(it.city || 'Ludhiana').trim(),
        winningAmount: String(it.winningAmount || '100000').trim(),
        drawDate: it.drawDate || timestamp.split('T')[0],
        drawTime: it.drawTime || '08:00 PM',
        resultStatus: it.resultStatus === 'Draft' || it.resultStatus === 'Archived' ? it.resultStatus : 'Published',
        prizeRank: it.prizeRank || '1st Prize',
        certificateNumber: it.certificateNumber || `PB-CERT-IMP-${Date.now().toString().slice(-4)}-${i + 1}`,
        certificateInfo: it.certificateInfo || 'Verified under Punjab State Lotteries inspection guidelines.',
        claimStatus: it.claimStatus || 'Verified & Approved',
        agentName: it.agentName || 'Authorized Directorate Dealer',
        createdAt: it.createdAt || timestamp,
        updatedAt: timestamp,
      });
    }

    if (replaceAll) {
      dbCache.results = validated;
    } else {
      dbCache.results = [...validated, ...dbCache.results];
    }

    saveDatabase();

    res.json({
      success: true,
      message: `Successfully processed ${validated.length} records`,
      totalRecords: dbCache.results.length,
    });
  });

  // 12. ADMIN: Update credentials or Supabase config
  router.post('/admin/settings', requireAdmin, (req: Request, res: Response) => {
    const { newUsername, newPassword, supabaseConfig } = req.body || {};

    if (newUsername && String(newUsername).trim().length >= 3) {
      dbCache.admin.username = String(newUsername).trim();
    }
    if (newPassword && String(newPassword).length >= 6) {
      dbCache.admin.passwordHash = String(newPassword);
    }
    if (supabaseConfig) {
      dbCache.supabaseConfig = supabaseConfig;
    }

    saveDatabase();

    res.json({
      success: true,
      message: 'Admin settings updated successfully',
      username: dbCache.admin.username,
      supabaseConfig: dbCache.supabaseConfig,
    });
  });

  // 13. ADMIN: Reset to sample initial data if needed
  router.post('/admin/reset-sample-data', requireAdmin, (_req: Request, res: Response) => {
    dbCache.results = [...INITIAL_SEED_DATA];
    saveDatabase();
    res.json({
      success: true,
      message: 'Reset to initial sample Punjab Lottery records',
      count: dbCache.results.length,
    });
  });

  return router;
}
