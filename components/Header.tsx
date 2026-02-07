'use client'

import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { getUserOffice } from '@/lib/supabase/queries'

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

interface UserInfo {
  fullName: string
  email: string
  initials: string
  officeName: string
}

const Header: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const pathname = usePathname()
  const router = useRouter()
  const title = getPageTitle(pathname)
  const supabase = createClient()

  useEffect(() => {
    async function loadUser() {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const membership = await getUserOffice()
        const fullName = user.user_metadata?.full_name || user.email || 'User'
        const nameParts = fullName.split(' ')
        const initials = nameParts.length >= 2
          ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase()
          : fullName.slice(0, 2).toUpperCase()

        setUserInfo({
          fullName,
          email: user.email || '',
          initials,
          officeName: (membership?.offices as { name: string })?.name || 'My Office',
        })
      }
    }
    loadUser()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <header className="bg-white border-b border-clarte-gray-200">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold text-clarte-gray-800">{title}</h2>
        <div className="flex items-center space-x-4">
          {/* Office name display */}
          <div className="hidden md:block text-sm text-clarte-gray-600">
            {userInfo?.officeName || 'Loading...'}
          </div>

          {/* User dropdown */}
          <div className="relative">
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
