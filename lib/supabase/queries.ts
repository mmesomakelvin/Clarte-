import { createClient } from './client'

// Get user's office (first one they belong to)
export async function getUserOffice() {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: membership } = await supabase
    .from('office_memberships')
    .select('office_id, role, offices(id, name)')
    .eq('user_id', user.id)
    .single()

  return membership
}

// Get claims for the user's office
export async function getClaims(officeId: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('claims')
    .select('*')
    .eq('office_id', officeId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

// Get AR records for the user's office
export async function getARRecords(officeId: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('ar_records')
    .select('*')
    .eq('office_id', officeId)
    .order('balance', { ascending: false })

  if (error) throw error
  return data
}

// Get credits for the user's office
export async function getCredits(officeId: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('credits')
    .select('*')
    .eq('office_id', officeId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

// Get wallets for the user's office
export async function getWallets(officeId: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('wallets')
    .select('*')
    .eq('office_id', officeId)
    .order('balance', { ascending: false })

  if (error) throw error
  return data
}

// Get dashboard stats
export async function getDashboardStats(officeId: string) {
  const supabase = createClient()

  // Get claims stats
  const { data: claims } = await supabase
    .from('claims')
    .select('claim_amount, status')
    .eq('office_id', officeId)

  // Get AR stats
  const { data: arRecords } = await supabase
    .from('ar_records')
    .select('balance, aging_bucket')
    .eq('office_id', officeId)

  // Get credits stats
  const { data: credits } = await supabase
    .from('credits')
    .select('credit_amount, status')
    .eq('office_id', officeId)

  // Get wallets stats
  const { data: wallets } = await supabase
    .from('wallets')
    .select('balance')
    .eq('office_id', officeId)

  // Calculate totals
  const totalClaims = claims?.reduce((sum, c) => sum + Number(c.claim_amount), 0) || 0
  const pendingClaims = claims?.filter(c => c.status === 'pending' || c.status === 'submitted').length || 0

  const totalAR = arRecords?.reduce((sum, ar) => sum + Number(ar.balance), 0) || 0
  const arByBucket = {
    '0-30': arRecords?.filter(ar => ar.aging_bucket === '0-30').reduce((sum, ar) => sum + Number(ar.balance), 0) || 0,
    '31-60': arRecords?.filter(ar => ar.aging_bucket === '31-60').reduce((sum, ar) => sum + Number(ar.balance), 0) || 0,
    '61-90': arRecords?.filter(ar => ar.aging_bucket === '61-90').reduce((sum, ar) => sum + Number(ar.balance), 0) || 0,
    '90+': arRecords?.filter(ar => ar.aging_bucket === '90+').reduce((sum, ar) => sum + Number(ar.balance), 0) || 0,
  }

  const totalCredits = credits?.reduce((sum, c) => sum + Number(c.credit_amount), 0) || 0
  const unresolvedCredits = credits?.filter(c => c.status === 'unresolved').length || 0

  const totalWallets = wallets?.reduce((sum, w) => sum + Number(w.balance), 0) || 0

  return {
    totalClaims,
    pendingClaims,
    claimsCount: claims?.length || 0,
    totalAR,
    arByBucket,
    arCount: arRecords?.length || 0,
    totalCredits,
    unresolvedCredits,
    creditsCount: credits?.length || 0,
    totalWallets,
    walletsCount: wallets?.length || 0,
  }
}
