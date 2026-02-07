'use client'

import { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import Card from './shared/Card'
import { getUserOffice, getDashboardStats } from '@/lib/supabase/queries'

const chartData = [
  { name: 'Jan', submitted: 4000, paid: 2400 },
  { name: 'Feb', submitted: 3000, paid: 1398 },
  { name: 'Mar', submitted: 2000, paid: 9800 },
  { name: 'Apr', submitted: 2780, paid: 3908 },
  { name: 'May', submitted: 1890, paid: 4800 },
  { name: 'Jun', submitted: 2390, paid: 3800 },
]

interface DashboardStats {
  totalClaims: number
  pendingClaims: number
  claimsCount: number
  totalAR: number
  arByBucket: {
    '0-30': number
    '31-60': number
    '61-90': number
    '90+': number
  }
  arCount: number
  totalCredits: number
  unresolvedCredits: number
  creditsCount: number
  totalWallets: number
  walletsCount: number
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [officeName, setOfficeName] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const membership = await getUserOffice()
        if (membership) {
          setOfficeName((membership.offices as { name: string })?.name || 'My Office')
          const dashboardStats = await getDashboardStats(membership.office_id)
          setStats(dashboardStats)
        }
      } catch (error) {
        console.error('Error loading dashboard:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-clarte-gray-500">Loading dashboard...</div>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-clarte-gray-500">No office found. Please contact support.</div>
      </div>
    )
  }

  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  return (
    <div className="space-y-8">
      {/* Office Name */}
      <div>
        <h2 className="text-xl font-semibold text-clarte-gray-900">{officeName}</h2>
        <p className="text-sm text-clarte-gray-500">Dashboard Overview</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card
          title="Total Claims"
          value={formatCurrency(stats.totalClaims)}
          icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.826-1.106-2.303 0-3.128C10.463 7.22 11.232 7 12 7s1.536.22 2.092.659c1.106.826 1.106 2.303 0 3.128a3.375 3.375 0 01-4.242 0L12 12" /></svg>}
          change={`${stats.claimsCount} claims`}
          changeType="neutral"
        />
        <Card
          title="Total AR"
          value={formatCurrency(stats.totalAR)}
          icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>}
          change={`${stats.arCount} records`}
          changeType="neutral"
        />
        <Card
          title="Total Credits"
          value={formatCurrency(stats.totalCredits)}
          icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" /></svg>}
          change={`${stats.unresolvedCredits} unresolved`}
          changeType={stats.unresolvedCredits > 0 ? 'decrease' : 'increase'}
        />
        <Card
          title="Total Wallets"
          value={formatCurrency(stats.totalWallets)}
          icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" /></svg>}
          change={`${stats.walletsCount} patients`}
          changeType="neutral"
        />
      </div>

      {/* AR Aging Breakdown */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium text-clarte-gray-900 mb-4">AR Aging Breakdown</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-green-600 font-medium">0-30 Days</p>
            <p className="text-2xl font-bold text-green-700">{formatCurrency(stats.arByBucket['0-30'])}</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-sm text-yellow-600 font-medium">31-60 Days</p>
            <p className="text-2xl font-bold text-yellow-700">{formatCurrency(stats.arByBucket['31-60'])}</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <p className="text-sm text-orange-600 font-medium">61-90 Days</p>
            <p className="text-2xl font-bold text-orange-700">{formatCurrency(stats.arByBucket['61-90'])}</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <p className="text-sm text-red-600 font-medium">90+ Days</p>
            <p className="text-2xl font-bold text-red-700">{formatCurrency(stats.arByBucket['90+'])}</p>
          </div>
        </div>
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

      {/* Pending Claims */}
      {stats.pendingClaims > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-clarte-gray-900 mb-4">Action Items</h3>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-amber-800">
              <span className="font-semibold">{stats.pendingClaims}</span> claims are pending or awaiting response.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
