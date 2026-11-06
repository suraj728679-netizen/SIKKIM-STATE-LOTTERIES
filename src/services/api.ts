import { LotteryResultRecord, SearchResultResponse, AdminUser } from '../types/lottery';
import {
  clientFetchPublishedResults,
  clientFetchAllResults,
  clientSearchResults,
  clientFetchResultById,
  clientCreateLotteryResult,
  clientUpdateLotteryResult,
  clientDeleteLotteryResult,
  clientBulkUpload,
  clientResetSampleData,
  clientAdminLogin,
} from './clientStorage';

const ADMIN_TOKEN_KEY = 'pb_lottery_admin_token';
const ADMIN_USER_KEY = 'pb_lottery_admin_user';

export function getAdminToken(): string | null {
  return localStorage.getItem(ADMIN_TOKEN_KEY);
}

export function setAdminSession(token: string, user: AdminUser): void {
  localStorage.setItem(ADMIN_TOKEN_KEY, token);
  localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(user));
}

export function clearAdminSession(): void {
  localStorage.removeItem(ADMIN_TOKEN_KEY);
  localStorage.removeItem(ADMIN_USER_KEY);
}

export function getCachedAdminUser(): AdminUser | null {
  try {
    const raw = localStorage.getItem(ADMIN_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// Format Indian Rupee currency nicely
export function formatINR(val: string | number): string {
  const num = typeof val === 'string' ? parseFloat(val.replace(/[^0-9.-]+/g, '')) : val;
  if (isNaN(num)) return String(val);

  if (num >= 10000000) {
    const cr = (num / 10000000).toFixed(2).replace(/\.00$/, '');
    return `₹${cr} Crore`;
  }
  if (num >= 100000) {
    const lk = (num / 100000).toFixed(2).replace(/\.00$/, '');
    return `₹${lk} Lakh`;
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(num);
}

export async function fetchPublishedResults(): Promise<LotteryResultRecord[]> {
  try {
    const res = await fetch('/api/results');
    if (!res.ok) throw new Error('API server unavailable');
    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) throw new Error('Non-JSON response');
    const data = await res.json();
    return data.results || [];
  } catch {
    // Transparent fallback for Netlify static deployment
    return clientFetchPublishedResults();
  }
}

export async function searchResults(params: { mobile?: string; ticket?: string }): Promise<SearchResultResponse> {
  const query = new URLSearchParams();
  if (params.mobile) query.set('mobile', params.mobile);
  if (params.ticket) query.set('ticket', params.ticket);

  try {
    const res = await fetch(`/api/results/search?${query.toString()}`);
    if (!res.ok) throw new Error('API server unavailable');
    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) throw new Error('Non-JSON response');
    return await res.json();
  } catch {
    // Transparent fallback for Netlify static deployment
    return clientSearchResults(params);
  }
}

export async function fetchResultById(id: string): Promise<LotteryResultRecord | null> {
  try {
    const res = await fetch(`/api/results/${id}`);
    if (!res.ok) throw new Error('API server unavailable');
    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) throw new Error('Non-JSON response');
    const data = await res.json();
    return data.result || null;
  } catch {
    return clientFetchResultById(id);
  }
}

export async function adminLogin(username: string, password: string): Promise<{ token: string; user: AdminUser }> {
  try {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const data = await res.json();
        setAdminSession(data.token, data.user);
        return data;
      }
    }
    // If invalid response or server 404 on Netlify
    throw new Error('Fallback to client auth');
  } catch {
    // Transparent fallback for Netlify static deployment
    const data = clientAdminLogin(username, password);
    setAdminSession(data.token, data.user);
    return data;
  }
}

export async function verifyAdminSession(): Promise<boolean> {
  const token = getAdminToken();
  if (!token) return false;

  try {
    const res = await fetch('/api/admin/verify', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const data = await res.json();
        return !!data.authenticated;
      }
    }
  } catch {
    // ignore
  }

  // Client session verification
  return token.startsWith('pb-client-token-') || !!getCachedAdminUser();
}

export async function adminLogout(): Promise<void> {
  const token = getAdminToken();
  if (token) {
    try {
      await fetch('/api/admin/logout', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch {
      // ignore
    }
  }
  clearAdminSession();
}

export async function fetchAllResultsAdmin(): Promise<LotteryResultRecord[]> {
  const token = getAdminToken();
  if (!token) throw new Error('Not authenticated');

  try {
    const res = await fetch('/api/results', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const data = await res.json();
        return data.results || [];
      }
    }
  } catch {
    // ignore
  }

  return clientFetchAllResults();
}

export async function createLotteryResult(record: Partial<LotteryResultRecord>): Promise<LotteryResultRecord> {
  const token = getAdminToken();
  if (!token) throw new Error('Not authenticated');

  try {
    const res = await fetch('/api/results', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(record),
    });

    if (res.ok) {
      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const data = await res.json();
        // Also sync client db
        clientCreateLotteryResult(data.result);
        return data.result;
      }
    }
  } catch {
    // ignore
  }

  return clientCreateLotteryResult(record);
}

export async function updateLotteryResult(id: string, updates: Partial<LotteryResultRecord>): Promise<LotteryResultRecord> {
  const token = getAdminToken();
  if (!token) throw new Error('Not authenticated');

  try {
    const res = await fetch(`/api/results/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updates),
    });

    if (res.ok) {
      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const data = await res.json();
        clientUpdateLotteryResult(id, updates);
        return data.result;
      }
    }
  } catch {
    // ignore
  }

  return clientUpdateLotteryResult(id, updates);
}

export async function deleteLotteryResult(id: string): Promise<boolean> {
  const token = getAdminToken();
  if (!token) throw new Error('Not authenticated');

  try {
    const res = await fetch(`/api/results/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      clientDeleteLotteryResult(id);
      return true;
    }
  } catch {
    // ignore
  }

  return clientDeleteLotteryResult(id);
}

export async function bulkUploadResults(items: Partial<LotteryResultRecord>[], replaceAll: boolean = false): Promise<number> {
  const token = getAdminToken();
  if (!token) throw new Error('Not authenticated');

  try {
    const res = await fetch('/api/results/bulk', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ items, replaceAll }),
    });

    if (res.ok) {
      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const data = await res.json();
        clientBulkUpload(items, replaceAll);
        return data.totalRecords;
      }
    }
  } catch {
    // ignore
  }

  return clientBulkUpload(items, replaceAll);
}

export async function resetToSampleData(): Promise<void> {
  const token = getAdminToken();
  if (!token) throw new Error('Not authenticated');

  try {
    await fetch('/api/admin/reset-sample-data', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch {
    // ignore
  }

  clientResetSampleData();
}

export async function updateAdminSettings(settings: {
  newUsername?: string;
  newPassword?: string;
  supabaseConfig?: { enabled: boolean; url: string; anonKey: string };
}): Promise<void> {
  const token = getAdminToken();
  if (!token) throw new Error('Not authenticated');

  try {
    await fetch('/api/admin/settings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(settings),
    });
  } catch {
    // ignore
  }

  if (settings.newUsername || settings.newPassword) {
    try {
      localStorage.setItem(
        'pb_lottery_client_admin',
        JSON.stringify({
          username: settings.newUsername || 'admin',
          password: settings.newPassword || 'punjab@lottery2026',
        })
      );
    } catch {
      // ignore
    }
  }
}
