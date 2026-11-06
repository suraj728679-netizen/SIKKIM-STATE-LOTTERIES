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

export interface SearchResultResponse {
  query: {
    mobile?: string;
    ticket?: string;
  };
  found: boolean;
  count: number;
  results: LotteryResultRecord[];
}

export interface AdminUser {
  username: string;
  role: string;
}

export type PageView =
  | 'home'
  | 'check-result'
  | 'previous-results'
  | 'winning-details'
  | 'certificate'
  | 'contact'
  | 'admin-login'
  | 'admin-dashboard';
