'use client'

import { useState, useEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { getUserOffices } from '@/lib/supabase/queries'

const getPageTitle = (pathname: string): string => {
  switch (pathname) {
    case '/':
      return 'Dashboard'
    case '/claims':
      return 'Claims Management'
    case '/ar':
      return 'Accounts Receivable'
    case '/credits':
      return 'Credits & Wallets'
    case '/settings':
      return 'Settings'
    default:
      return 'Dashboard'
  }
}

interface Office {
  office_id: string
  role: string
  offices: { id: string; name: string }
}

interface UserInfo {
  fullName: string
  email: string
  initials: string
}

const Header: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [officeDropdownOpen, setOfficeDropdownOpen] = useState(false)
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [allOffices, setAllOffices] = useState<Office[]>([])
  const [selectedOffices, setSelectedOffices] = useState<string[]>([])
  const officeDropdownRef = useRef<HTMLDivElement>(null)
  const userDropdownRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const router = useRouter()
  const title = getPageTitle(pathname)
  const supabase = createClient()

  useEffect(() => {
    async function loadUser() {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const memberships = await getUserOffices()
        const fullName = user.user_metadata?.full_name || user.email || 'User'
        const nameParts = fullName.split(' ')
        const initials = nameParts.length >= 2
          ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase()
          : fullName.slice(0, 2).toUpperCase()

        const offices = (memberships || []).map((m: Record<string, unknown>) => ({
          office_id: m.office_id as string,
          role: m.role as string,
          offices: m.offices as { id: string; name: string },
        }))

        setAllOffices(offices)
        // Select all offices by default
        setSelectedOffices(offices.map((o: Office) => o.office_id))

        setUserInfo({
          fullName,
          email: user.email || '',
          initials,
        })
      }
    }
    loadUser()
  }, [])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (officeDropdownRef.current && !officeDropdownRef.current.contains(e.target as Node)) {
        setOfficeDropdownOpen(false)
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  const toggleOffice = (officeId: string) => {
    setSelectedOffices(prev => {
      if (prev.includes(officeId)) {
        // Don't allow deselecting all
        if (prev.length === 1) return prev
        return prev.filter(id => id !== officeId)
      }
      return [...prev, officeId]
    })
  }

  const selectAll = () => {
    setSelectedOffices(allOffices.map(o => o.office_id))
  }

  const selectedNames = allOffices
    .filter(o => selectedOffices.includes(o.office_id))
    .map(o => o.offices.name)

  const displayText = selectedNames.length === 0
    ? 'Select Office'
    : selectedNames.length === 1
      ? selectedNames[0]
      : selectedNames.length === allOffices.length
        ? 'All Offices'
        : `${selectedNames.length} Offices`

  return (
    <header className="bg-white border-b border-clarte-gray-200">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold text-clarte-gray-800">{title}</h2>
        <div className="flex items-center space-x-4">

          {/* Multi-office selector */}
          <div className="relative" ref={officeDropdownRef}>
            <button
              onClick={() => setOfficeDropdownOpen(!officeDropdownOpen)}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-lg border border-clarte-gray-200 hover:border-clarte-orange-500 hover:bg-clarte-orange-100/30 transition-colors text-sm"
            >
              {/* Building icon */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-clarte-orange-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
              </svg>
              <span className="text-clarte-gray-700 font-medium max-w-[150px] truncate">
                {displayText}
              </span>
              {selectedOffices.length > 1 && selectedOffices.length < allOffices.length && (
                <span className="bg-clarte-orange-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[20px] text-center">
                  {selectedOffices.length}
                </span>
              )}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-4 h-4 text-clarte-gray-400 transition-transform ${officeDropdownOpen ? 'rotate-180' : ''}`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>

            {officeDropdownOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-64 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 overflow-hidden">
                {/* Header */}
                <div className="px-4 py-2.5 border-b border-clarte-gray-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-clarte-gray-500 uppercase tracking-wide">Dental Clinics</span>
                  {allOffices.length > 1 && (
                    <button
                      onClick={selectAll}
                      className="text-xs text-clarte-orange-500 hover:text-clarte-orange-600 font-medium"
                    >
                      Select All
                    </button>
                  )}
                </div>

                {/* Office list */}
                <div className="max-h-60 overflow-y-auto py-1">
                  {allOffices.length === 0 ? (
                    <div className="px-4 py-3 text-sm text-clarte-gray-400">No offices found</div>
                  ) : (
                    allOffices.map((office) => {
                      const isSelected = selectedOffices.includes(office.office_id)
                      return (
                        <button
                          key={office.office_id}
                          onClick={() => toggleOffice(office.office_id)}
                          className={`w-full flex items-center px-4 py-2.5 text-sm hover:bg-clarte-gray-50 transition-colors ${
                            isSelected ? 'bg-clarte-orange-100/40' : ''
                          }`}
                        >
                          {/* Checkbox */}
                          <div className={`w-4 h-4 rounded border-2 mr-3 flex items-center justify-center flex-shrink-0 transition-colors ${
                            isSelected
                              ? 'bg-clarte-orange-500 border-clarte-orange-500'
                              : 'border-clarte-gray-300'
                          }`}>
                            {isSelected && (
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="white" className="w-3 h-3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                              </svg>
                            )}
                          </div>
                          <div className="flex-1 text-left">
                            <span className={`font-medium ${isSelected ? 'text-clarte-gray-900' : 'text-clarte-gray-600'}`}>
                              {office.offices.name}
                            </span>
                          </div>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            office.role === 'owner'
                              ? 'bg-clarte-orange-100 text-clarte-orange-600'
                              : office.role === 'admin'
                                ? 'bg-blue-100 text-blue-600'
                                : 'bg-clarte-gray-100 text-clarte-gray-500'
                          }`}>
                            {office.role}
                          </span>
                        </button>
                      )
                    })
                  )}
                </div>

                {/* Footer showing selection count */}
                {allOffices.length > 0 && (
                  <div className="px-4 py-2 border-t border-clarte-gray-100 bg-clarte-gray-50">
                    <span className="text-xs text-clarte-gray-500">
                      {selectedOffices.length} of {allOffices.length} selected
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* User dropdown */}
          <div className="relative" ref={userDropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <div className="h-9 w-9 rounded-full bg-clarte-orange-500 flex items-center justify-center text-white font-semibold">
                {userInfo?.initials || '...'}
              </div>
              <span className="hidden md:inline text-sm font-medium text-clarte-gray-700">
                {userInfo?.fullName || 'Loading...'}
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-clarte-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            {dropdownOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                <div className="px-4 py-2 border-b border-clarte-gray-100">
                  <p className="text-sm font-medium text-clarte-gray-900">{userInfo?.fullName}</p>
                  <p className="text-xs text-clarte-gray-500">{userInfo?.email}</p>
                </div>
                <button
                  onClick={() => {
                    router.push('/settings')
                    setDropdownOpen(false)
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-clarte-gray-700 hover:bg-clarte-gray-100"
                >
                  Settings
                </button>
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
