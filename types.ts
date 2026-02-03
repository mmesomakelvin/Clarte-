
export enum ClaimStatus {
  SUBMITTED = 'Submitted',
  PAID = 'Paid',
  DENIED = 'Denied',
  RESUBMITTED_NO_CLAIM = 'Resubmitted - No Claim on file',
  APPEAL_1_SUBMITTED = 'Appeal 1 Submitted',
  CLAIM_DENIED_PT_RESP = 'Claim Denied - Pt Resp',
  PENDING = 'Pending',
  PRE_AUTHORIZATION = 'Pre-Authorization',
  SECONDARY_CLAIM = 'Secondary Claim',
  INFO_REQUESTED = 'Info Requested',
  CORRECTED_CLAIM = 'Corrected Claim',
  TRACER = 'Tracer',
  EOB_RECEIVED = 'EOB Received',
  IN_REVIEW = 'In Review',
  CLOSED = 'Closed',
  OTHER = 'Other'
}

export enum WalletAgeTier {
  ACTIVE = 'Active (0-29 days)',
  RECENT = 'Recent (30-59 days)',
  INACTIVE = 'Inactive (60-89 days)',
  STALE = 'Stale (90+ days)'
}

export enum ARStatus {
  NONE = 'None',
  IN_COLLECTIONS = 'In Collections',
  PAYMENT_PLAN = 'Payment Plan',
  PROMISE_TO_PAY = 'Promise to Pay',
  PAID_IN_FULL = 'Paid In Full'
}

export interface Claim {
  id: string;
  patientName: string;
  insuranceCompany: string;
  amount: number;
  status: ClaimStatus;
  submittedDate: string;
  lastUpdated: string;
}

export interface ARRecord {
  id: string;
  patientName: string;
  balance: number;
  age: number; // in days
  status: ARStatus;
  lastPaymentDate: string | null;
}

export interface Credit {
  id: string;
  patientName: string;
  balance: number;
  status: 'Active' | 'Applied' | 'Refunded';
  last_appt: string;
  next_appt: string | null;
  credit_year: number;
  insurance_bal: number;
  wallet_balance: number;
  outstanding_claim: number;
  date_changed: string;
  team_member: string;
}

export interface Wallet {
  id: string;
  patientName: string;
  balance: number;
  lastUsedDate: string;
  ageTier: WalletAgeTier;
}
