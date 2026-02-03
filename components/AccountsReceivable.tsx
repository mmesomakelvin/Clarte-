
import React, { useState, useMemo } from 'react';
import Table from './shared/Table';
import Tabs from './shared/Tabs';
import { mockARRecords } from '../data/mockData';
import { ARRecord, ARStatus } from '../types';

const getStatusColor = (status: ARStatus) => {
    switch(status) {
        case ARStatus.IN_COLLECTIONS: return 'bg-red-100 text-red-800';
        case ARStatus.PAYMENT_PLAN: return 'bg-blue-100 text-blue-800';
        case ARStatus.PROMISE_TO_PAY: return 'bg-yellow-100 text-yellow-800';
        case ARStatus.PAID_IN_FULL: return 'bg-green-100 text-green-800';
        default: return 'bg-clarte-gray-100 text-clarte-gray-800';
    }
}

const AccountsReceivable: React.FC = () => {
  const [activeTab, setActiveTab] = useState('0-30 days');
  const [selected, setSelected] = useState<string[]>([]);
  
  // FIX: Moved filteredData before columns definition to fix "used before its declaration" error.
  const filteredData = useMemo(() => {
    switch (activeTab) {
      case '0-30 days': return mockARRecords.filter(r => r.age <= 30);
      case '31-60 days': return mockARRecords.filter(r => r.age > 30 && r.age <= 60);
      case '61-90 days': return mockARRecords.filter(r => r.age > 60 && r.age <= 90);
      case '91-120 days': return mockARRecords.filter(r => r.age > 90 && r.age <= 120);
      case '121+ days': return mockARRecords.filter(r => r.age > 120);
      default: return mockARRecords;
    }
  }, [activeTab]);

  const columns = [
    {
      header: (
        <input 
          type="checkbox"
          className="h-4 w-4 text-clarte-orange-600 border-clarte-gray-300 rounded focus:ring-clarte-orange-500"
          onChange={(e) => {
            if (e.target.checked) {
              setSelected(filteredData.map(r => r.id));
            } else {
              setSelected([]);
            }
          }}
          checked={selected.length === filteredData.length && filteredData.length > 0}
        />
      ),
      accessor: (item: ARRecord) => (
        <input
          type="checkbox"
          className="h-4 w-4 text-clarte-orange-600 border-clarte-gray-300 rounded focus:ring-clarte-orange-500"
          checked={selected.includes(item.id)}
          onChange={() => {
            if (selected.includes(item.id)) {
              setSelected(selected.filter(id => id !== item.id));
            } else {
              setSelected([...selected, item.id]);
            }
          }}
        />
      ),
    },
    { header: 'Patient', accessor: 'patientName' as keyof ARRecord },
    { header: 'Balance', accessor: (item: ARRecord) => `$${item.balance.toFixed(2)}` },
    { header: 'Age (days)', accessor: 'age' as keyof ARRecord },
    { 
      header: 'Status', 
      accessor: (item: ARRecord) => (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(item.status)}`}>
          {item.status}
        </span>
      )
    },
    { header: 'Last Payment', accessor: 'lastPaymentDate' as keyof ARRecord },
  ];

  return (
    <div className="space-y-6">
      <Tabs
        tabs={['0-30 days', '31-60 days', '61-90 days', '91-120 days', '121+ days']}
        activeTab={activeTab}
        onTabClick={setActiveTab}
      />
      <div className="bg-white p-6 rounded-lg shadow-sm">
        {selected.length > 0 && (
          <div className="flex items-center justify-between bg-clarte-gray-50 p-4 rounded-md mb-4 border border-clarte-gray-200">
            <span className="text-sm font-medium">{selected.length} item(s) selected</span>
            <div className="flex items-center space-x-2">
                <select className="text-sm rounded-md border-clarte-gray-300 focus:ring-clarte-orange-500 focus:border-clarte-orange-500">
                    <option>Bulk Action</option>
                    <option>Set Status: In Collections</option>
                    <option>Set Status: Payment Plan</option>
                    <option>Export Selected</option>
                </select>
                <button className="px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-clarte-orange-600 hover:bg-clarte-orange-500">Apply</button>
            </div>
          </div>
        )}
        <Table<ARRecord> columns={columns} data={filteredData} />
      </div>
    </div>
  );
};

export default AccountsReceivable;
