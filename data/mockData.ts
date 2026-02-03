
import { Claim, ARRecord, Credit, Wallet, ClaimStatus, WalletAgeTier, ARStatus } from '../types';

const today = new Date();
const formatDate = (date: Date) => date.toISOString().split('T')[0];
const subDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() - days);
  return result;
};

export const mockClaims: Claim[] = [
  { id: 'C001', patientName: 'John Doe', insuranceCompany: 'MetLife', amount: 150.00, status: ClaimStatus.SUBMITTED, submittedDate: formatDate(subDays(today, 5)), lastUpdated: formatDate(subDays(today, 1)) },
  { id: 'C002', patientName: 'Jane Smith', insuranceCompany: 'Aetna', amount: 250.50, status: ClaimStatus.PAID, submittedDate: formatDate(subDays(today, 25)), lastUpdated: formatDate(subDays(today, 10)) },
  { id: 'C003', patientName: 'Peter Jones', insuranceCompany: 'Cigna', amount: 80.00, status: ClaimStatus.DENIED, submittedDate: formatDate(subDays(today, 40)), lastUpdated: formatDate(subDays(today, 15)) },
  { id: 'C004', patientName: 'Mary Johnson', insuranceCompany: 'Delta Dental', amount: 1200.75, status: ClaimStatus.RESUBMITTED_NO_CLAIM, submittedDate: formatDate(subDays(today, 35)), lastUpdated: formatDate(subDays(today, 5)) },
  { id: 'C005', patientName: 'David Williams', insuranceCompany: 'MetLife', amount: 300.00, status: ClaimStatus.PENDING, submittedDate: formatDate(subDays(today, 12)), lastUpdated: formatDate(subDays(today, 2)) },
  { id: 'C006', patientName: 'Sarah Brown', insuranceCompany: 'Aetna', amount: 55.20, status: ClaimStatus.SUBMITTED, submittedDate: formatDate(subDays(today, 28)), lastUpdated: formatDate(subDays(today, 20)) },
  { id: 'C007', patientName: 'Chris Miller', insuranceCompany: 'Guardian', amount: 450.00, status: ClaimStatus.CLAIM_DENIED_PT_RESP, submittedDate: formatDate(subDays(today, 60)), lastUpdated: formatDate(subDays(today, 30)) },
  { id: 'C008', patientName: 'Emily Davis', insuranceCompany: 'Delta Dental', amount: 600.00, status: ClaimStatus.INFO_REQUESTED, submittedDate: formatDate(subDays(today, 18)), lastUpdated: formatDate(subDays(today, 3)) },
];

export const mockARRecords: ARRecord[] = [
  { id: 'AR001', patientName: 'Michael Clark', balance: 75.00, age: 25, status: ARStatus.NONE, lastPaymentDate: null },
  { id: 'AR002', patientName: 'Laura Rodriguez', balance: 150.50, age: 45, status: ARStatus.PAYMENT_PLAN, lastPaymentDate: formatDate(subDays(today, 15)) },
  { id: 'AR003', patientName: 'Robert Lewis', balance: 200.00, age: 75, status: ARStatus.IN_COLLECTIONS, lastPaymentDate: formatDate(subDays(today, 90)) },
  { id: 'AR004', patientName: 'Linda Lee', balance: 35.00, age: 10, status: ARStatus.NONE, lastPaymentDate: null },
  { id: 'AR005', patientName: 'William Walker', balance: 500.00, age: 100, status: ARStatus.PROMISE_TO_PAY, lastPaymentDate: formatDate(subDays(today, 30)) },
  { id: 'AR006', patientName: 'Patricia Hall', balance: 120.00, age: 130, status: ARStatus.IN_COLLECTIONS, lastPaymentDate: formatDate(subDays(today, 150)) },
  { id: 'AR007', patientName: 'James Allen', balance: 90.25, age: 55, status: ARStatus.NONE, lastPaymentDate: formatDate(subDays(today, 20)) },
];

export const mockCredits: Credit[] = [
  { id: 'CR001', patientName: 'Jennifer King', balance: 50.00, status: 'Active', last_appt: formatDate(subDays(today, 20)), next_appt: formatDate(subDays(today, -30)), credit_year: today.getFullYear(), insurance_bal: 0, wallet_balance: 100, outstanding_claim: 0, date_changed: formatDate(subDays(today, 5)), team_member: 'Alice' },
  { id: 'CR002', patientName: 'Charles Wright', balance: 25.50, status: 'Applied', last_appt: formatDate(subDays(today, 40)), next_appt: null, credit_year: today.getFullYear(), insurance_bal: 0, wallet_balance: 0, outstanding_claim: 150, date_changed: formatDate(subDays(today, 10)), team_member: 'Bob' },
  { id: 'CR003', patientName: 'Susan Lopez', balance: 100.00, status: 'Active', last_appt: formatDate(subDays(today, 10)), next_appt: formatDate(subDays(today, -15)), credit_year: today.getFullYear(), insurance_bal: 25, wallet_balance: 50, outstanding_claim: 0, date_changed: formatDate(subDays(today, 2)), team_member: 'Alice' },
];

export const mockWallets: Wallet[] = [
  { id: 'W001', patientName: 'Barbara Scott', balance: 200.00, lastUsedDate: formatDate(subDays(today, 15)), ageTier: WalletAgeTier.ACTIVE },
  { id: 'W002', patientName: 'Daniel Green', balance: 500.00, lastUsedDate: formatDate(subDays(today, 45)), ageTier: WalletAgeTier.RECENT },
  { id: 'W003', patientName: 'Jessica Adams', balance: 150.00, lastUsedDate: formatDate(subDays(today, 75)), ageTier: WalletAgeTier.INACTIVE },
  { id: 'W004', patientName: 'Mark Baker', balance: 300.00, lastUsedDate: formatDate(subDays(today, 100)), ageTier: WalletAgeTier.STALE },
  { id: 'W005', patientName: 'Nancy Gonzalez', balance: 1000.00, lastUsedDate: formatDate(subDays(today, 5)), ageTier: WalletAgeTier.ACTIVE },
];
