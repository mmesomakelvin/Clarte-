'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'

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

const Header: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const pathname = usePathname()
  const title = getPageTitle(pathname)

  return (
    <header className="bg-white border-b border-clarte-gray-200">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold text-clarte-gray-800">{title}</h2>
        <div className="flex items-center space-x-4">
          <div>
            <label htmlFor="office-select" className="sr-only">Select Office</label>
            <select
              id="office-select"
              className="block w-full pl-3 pr-10 py-2 text-base border-clarte-gray-300 focus:outline-none focus:ring-clarte-orange-500 focus:border-clarte-orange-500 sm:text-sm rounded-md"
              defaultValue="main-office"
            >
              <option value="main-office">Main Street Dental</option>
              <option value="second-office">Oak Avenue Clinic</option>
            </select>
          </div>
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <div className="h-9 w-9 rounded-full bg-clarte-orange-500 flex items-center justify-center text-white font-semibold">
                DK
              </div>
              <span className="hidden md:inline text-sm font-medium text-clarte-gray-700">Dr. Kelvin</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-clarte-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            {dropdownOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                <a href="#" className="block px-4 py-2 text-sm text-clarte-gray-700 hover:bg-clarte-gray-100">Your Profile</a>
                <a href="#" className="block px-4 py-2 text-sm text-clarte-gray-700 hover:bg-clarte-gray-100">Sign out</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
