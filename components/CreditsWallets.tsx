'use client'

import { useState } from 'react'
import Table from './shared/Table';
import Tabs from './shared/Tabs';
import { mockCredits, mockWallets } from '../data/mockData';
import { Credit, Wallet, WalletAgeTier } from '../types';

const getWalletTierColor = (tier: WalletAgeTier) => {
  switch (tier) {
    case WalletAgeTier.ACTIVE: return 'bg-green-100 text-green-800';
    case WalletAgeTier.RECENT: return 'bg-blue-100 text-blue-800';
    case WalletAgeTier.INACTIVE: return 'bg-yellow-100 text-yellow-800';
    case WalletAgeTier.STALE: return 'bg-red-100 text-red-800';
    default: return 'bg-clarte-gray-100 text-clarte-gray-800';
  }
};

const creditsColumns = [
  { header: 'Patient', accessor: 'patientName' as keyof Credit },
  { header: 'Balance', accessor: (item: Credit) => `$${item.balance.toFixed(2)}` },
  { 
    header: 'Status',
    accessor: (item: Credit) => (
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-clarte-gray-100 text-clarte-gray-800'}`}>
        {item.status}
      </span>
    )
  },
  { header: 'Last Appointment', accessor: 'last_appt' as keyof Credit },
  { header: 'Team Member', accessor: 'team_member' as keyof Credit },
];

const walletsColumns = [
  { header: 'Patient', accessor: 'patientName' as keyof Wallet },
  { header: 'Balance', accessor: (item: Wallet) => `$${item.balance.toFixed(2)}` },
  { header: 'Last Used', accessor: 'lastUsedDate' as keyof Wallet },
  { 
    header: 'Age Tier', 
    accessor: (item: Wallet) => (
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getWalletTierColor(item.ageTier)}`}>
        {item.ageTier}
      </span>
    ) 
  },
];

const CreditsWallets: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Credits');

  return (
    <div className="space-y-6">
      <Tabs
        tabs={['Credits', 'Wallets']}
        activeTab={activeTab}
        onTabClick={setActiveTab}
      />
      <div className="bg-white p-6 rounded-lg shadow-sm">
        {activeTab === 'Credits' && (
          <Table<Credit> columns={creditsColumns} data={mockCredits} />
        )}
        {activeTab === 'Wallets' && (
          <Table<Wallet> columns={walletsColumns} data={mockWallets} />
        )}
      </div>
    </div>
  );
};

export default CreditsWallets;
