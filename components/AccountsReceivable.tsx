'use client'

import { useState, useEffect, useMemo } from 'react'
import Table from './shared/Table'
import Tabs from './shared/Tabs'
import { getUserOffice, getARRecords } from '@/lib/supabase/queries'

interface ARRecordData {
  id: string
  patient_name: string
  patient_id: string | null
  insurance_name: string | null
  balance: number
  aging_bucket: string
  last_activity_date: string | null
  notes: string | null
}

const getAgingColor = (bucket: string) => {
  switch (bucket) {
    case '0-30': return 'bg-green-100 text-green-800'
    case '31-60': return 'bg-yellow-100 text-yellow-800'
    case '61-90': return 'bg-orange-100 text-orange-800'
    case '90+': return 'bg-red-100 text-red-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const formatCurrency = (amount: number) => {
  return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

const formatDate = (dateString: string | null) => {
  if (!dateString) return '-'
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

const AccountsReceivable: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All')
  const [selected, setSelected] = useState<string[]>([])
  const [arRecords, setArRecords] = useState<ARRecordData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadData() {
      try {
        const membership = await getUserOffice()
        if (membership) {
          const records = await getARRecords(membership.office_id)
          setArRecords(records || [])
        }
      } catch (err) {
        console.error('Error loading AR records:', err)
        setError('Failed to load AR records')
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const filteredData = useMemo(() => {
    switch (activeTab) {
      case '0-30 Days': return arRecords.filter(r => r.aging_bucket === '0-30')
      case '31-60 Days': return arRecords.filter(r => r.aging_bucket === '31-60')
      case '61-90 Days': return arRecords.filter(r => r.aging_bucket === '61-90')
      case '90+ Days': return arRecords.filter(r => r.aging_bucket === '90+')
      default: return arRecords
    }
  }, [activeTab, arRecords])

  // Calculate totals for each bucket
  const bucketTotals = useMemo(() => {
    return {
      all: arRecords.reduce((sum, r) => sum + Number(r.balance), 0),
      '0-30': arRecords.filter(r => r.aging_bucket === '0-30').reduce((sum, r) => sum + Number(r.balance), 0),
      '31-60': arRecords.filter(r => r.aging_bucket === '31-60').reduce((sum, r) => sum + Number(r.balance), 0),
      '61-90': arRecords.filter(r => r.aging_bucket === '61-90').reduce((sum, r) => sum + Number(r.balance), 0),
      '90+': arRecords.filter(r => r.aging_bucket === '90+').reduce((sum, r) => sum + Number(r.balance), 0),
    }
  }, [arRecords])

  const columns = [
    {
      header: (
        <input
          type="checkbox"
          className="h-4 w-4 text-clarte-orange-600 border-clarte-gray-300 rounded focus:ring-clarte-orange-500"
          onChange={(e) => {
            if (e.target.checked) {
              setSelected(filteredData.map(r => r.id))
            } else {
              setSelected([])
            }
          }}
          checked={selected.length === filteredData.length && filteredData.length > 0}
        />
      ),
      accessor: (item: ARRecordData) => (
        <input
          type="checkbox"
          className="h-4 w-4 text-clarte-orange-600 border-clarte-gray-300 rounded focus:ring-clarte-orange-500"
          checked={selected.includes(item.id)}
          onChange={() => {
            if (selected.includes(item.id)) {
              setSelected(selected.filter(id => id !== item.id))
            } else {
              setSelected([...selected, item.id])
            }
          }}
        />
      ),
    },
    { header: 'Patient', accessor: (item: ARRecordData) => item.patient_name },
    { header: 'Patient ID', accessor: (item: ARRecordData) => item.patient_id || '-' },
    { header: 'Insurance', accessor: (item: ARRecordData) => item.insurance_name || '-' },
    { header: 'Balance', accessor: (item: ARRecordData) => (
      <span className="font-semibold">{formatCurrency(Number(item.balance))}</span>
    )},
    {
      header: 'Aging',
      accessor: (item: ARRecordData) => (
        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getAgingColor(item.aging_bucket)}`}>
          {item.aging_bucket} days
        </span>
      )
    },
    { header: 'Last Activity', accessor: (item: ARRecordData) => formatDate(item.last_activity_date) },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-clarte-gray-500">Loading AR records...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500">{error}</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-clarte-gray-500">Total AR</p>
          <p className="text-2xl font-bold text-clarte-gray-900">{formatCurrency(bucketTotals.all)}</p>
          <p className="text-xs text-clarte-gray-400">{arRecords.length} records</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-green-600">0-30 Days</p>
          <p className="text-xl font-bold text-green-700">{formatCurrency(bucketTotals['0-30'])}</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <p className="text-sm text-yellow-600">31-60 Days</p>
          <p className="text-xl font-bold text-yellow-700">{formatCurrency(bucketTotals['31-60'])}</p>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg">
          <p className="text-sm text-orange-600">61-90 Days</p>
          <p className="text-xl font-bold text-orange-700">{formatCurrency(bucketTotals['61-90'])}</p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <p className="text-sm text-red-600">90+ Days</p>
          <p className="text-xl font-bold text-red-700">{formatCurrency(bucketTotals['90+'])}</p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        tabs={['All', '0-30 Days', '31-60 Days', '61-90 Days', '90+ Days']}
        activeTab={activeTab}
        onTabClick={setActiveTab}
      />

      {/* Table */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        {selected.length > 0 && (
          <div className="flex items-center justify-between bg-clarte-gray-50 p-4 rounded-md mb-4 border border-clarte-gray-200">
            <span className="text-sm font-medium">{selected.length} item(s) selected</span>
            <div className="flex items-center space-x-2">
              <select className="text-sm rounded-md border-clarte-gray-300 focus:ring-clarte-orange-500 focus:border-clarte-orange-500">
                <option>Bulk Action</option>
                <option>Export Selected</option>
                <option>Update Aging</option>
              </select>
              <button className="px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-clarte-orange-600 hover:bg-clarte-orange-500">
                Apply
              </button>
            </div>
          </div>
        )}

        {filteredData.length === 0 ? (
          <div className="text-center py-12 text-clarte-gray-500">
            No AR records found for this aging bucket.
          </div>
        ) : (
          <Table<ARRecordData> columns={columns} data={filteredData} />
        )}
      </div>
    </div>
  )
}

export default AccountsReceivable
