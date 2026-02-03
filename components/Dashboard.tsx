
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Card from './shared/Card';
import { mockClaims } from '../data/mockData';

const chartData = [
  { name: 'Jan', submitted: 4000, paid: 2400 },
  { name: 'Feb', submitted: 3000, paid: 1398 },
  { name: 'Mar', submitted: 2000, paid: 9800 },
  { name: 'Apr', submitted: 2780, paid: 3908 },
  { name: 'May', submitted: 1890, paid: 4800 },
  { name: 'Jun', submitted: 2390, paid: 3800 },
];

const Dashboard: React.FC = () => {
  const totalOwed = mockClaims.reduce((acc, claim) => acc + claim.amount, 0);
  const overdueClaims = mockClaims.filter(claim => new Date(claim.submittedDate) < new Date(new Date().setDate(new Date().getDate() - 30))).length;

  return (
    <div className="space-y-8">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card
          title="Total Claims Value"
          value={`$${totalOwed.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.826-1.106-2.303 0-3.128C10.463 7.22 11.232 7 12 7s1.536.22 2.092.659c1.106.826 1.106 2.303 0 3.128a3.375 3.375 0 01-4.242 0L12 12" /></svg>}
          change="+5.4%"
          changeType="increase"
        />
        <Card
          title="Claims Submitted"
          value={mockClaims.length.toString()}
          icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>}
          change="+12"
          changeType="increase"
        />
        <Card
          title="Overdue Claims"
          value={overdueClaims.toString()}
          icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z" /></svg>}
          change="-2"
          changeType="decrease"
        />
        <Card
          title="Success Rate"
          value="92.1%"
          icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          change="+1.2%"
          changeType="increase"
        />
      </div>

      {/* Main Chart */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium text-clarte-gray-900 mb-4">Claims Trends</h3>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748B' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #E2E8F0',
                  borderRadius: '0.5rem',
                }}
              />
              <Legend iconType="circle" iconSize={10} />
              <Line type="monotone" dataKey="submitted" stroke="#F97316" strokeWidth={2} name="Submitted" />
              <Line type="monotone" dataKey="paid" stroke="#10B981" strokeWidth={2} name="Paid" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

       {/* Alerts Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium text-clarte-gray-900 mb-4">Action Items</h3>
        <ul className="divide-y divide-clarte-gray-200">
          <li className="py-3 flex items-center justify-between">
            <p className="text-sm text-clarte-gray-700">Claim <span className="font-medium text-clarte-orange-600">#C007</span> for Chris Miller was denied.</p>
            <button className="text-sm font-medium text-clarte-orange-600 hover:text-clarte-orange-500">Review</button>
          </li>
          <li className="py-3 flex items-center justify-between">
            <p className="text-sm text-clarte-gray-700">Information requested for Claim <span className="font-medium text-clarte-orange-600">#C008</span> (Emily Davis).</p>
            <button className="text-sm font-medium text-clarte-orange-600 hover:text-clarte-orange-500">View</button>
          </li>
          <li className="py-3 flex items-center justify-between">
            <p className="text-sm text-clarte-gray-700">AR for Robert Lewis is over 90 days.</p>
            <button className="text-sm font-medium text-clarte-orange-600 hover:text-clarte-orange-500">Follow Up</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
