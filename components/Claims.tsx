
import React, { useState, useMemo } from 'react';
import Table from './shared/Table';
import Tabs from './shared/Tabs';
import { mockClaims } from '../data/mockData';
import { Claim, ClaimStatus } from '../types';

const getStatusColor = (status: ClaimStatus) => {
  switch (status) {
    case ClaimStatus.PAID: return 'bg-green-100 text-green-800';
    case ClaimStatus.DENIED:
    case ClaimStatus.CLAIM_DENIED_PT_RESP: return 'bg-red-100 text-red-800';
    case ClaimStatus.PENDING:
    case ClaimStatus.INFO_REQUESTED: return 'bg-yellow-100 text-yellow-800';
    case ClaimStatus.SUBMITTED:
    case ClaimStatus.RESUBMITTED_NO_CLAIM: return 'bg-blue-100 text-blue-800';
    default: return 'bg-clarte-gray-100 text-clarte-gray-800';
  }
};

const columns = [
  { header: 'Patient', accessor: 'patientName' as keyof Claim },
  { header: 'Insurance', accessor: 'insuranceCompany' as keyof Claim },
  { header: 'Amount', accessor: (item: Claim) => `$${item.amount.toFixed(2)}` },
  {
    header: 'Status',
    accessor: (item: Claim) => (
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(item.status)}`}>
        {item.status}
      </span>
    ),
  },
  { header: 'Submitted', accessor: 'submittedDate' as keyof Claim },
  { header: 'Last Update', accessor: 'lastUpdated' as keyof Claim },
];

const Claims: React.FC = () => {
  const [activeTab, setActiveTab] = useState('OI 0-30');
  const [filter, setFilter] = useState('');

  const filteredClaims = useMemo(() => {
    const today = new Date();
    const thirtyDaysAgo = new Date(today.setDate(today.getDate() - 30));
    
    let claims = mockClaims;

    if (activeTab === 'OI 0-30') {
      claims = claims.filter(c => new Date(c.submittedDate) >= thirtyDaysAgo);
    } else {
      claims = claims.filter(c => new Date(c.submittedDate) < thirtyDaysAgo);
    }

    if (filter) {
      claims = claims.filter(c => 
        c.patientName.toLowerCase().includes(filter.toLowerCase()) || 
        c.insuranceCompany.toLowerCase().includes(filter.toLowerCase())
      );
    }

    return claims;
  }, [activeTab, filter]);

  return (
    <div className="space-y-6">
      <Tabs
        tabs={['OI 0-30', 'OI 30+']}
        activeTab={activeTab}
        onTabClick={setActiveTab}
      />
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
          <div className="relative w-full md:w-auto">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-clarte-gray-400"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
            </span>
            <input
              type="text"
              placeholder="Search by patient or insurance..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="pl-10 pr-4 py-2 border border-clarte-gray-300 rounded-md w-full md:w-80 focus:ring-clarte-orange-500 focus:border-clarte-orange-500"
            />
          </div>
          <button className="w-full md:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-clarte-orange-600 hover:bg-clarte-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-clarte-orange-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 -ml-1"><path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" /></svg>
            Import CSV
          </button>
        </div>
        <Table<Claim> columns={columns} data={filteredClaims} />
      </div>
    </div>
  );
};

export default Claims;
