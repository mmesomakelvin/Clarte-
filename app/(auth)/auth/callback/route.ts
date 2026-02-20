import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'
  const error = searchParams.get('error')
  const errorDescription = searchParams.get('error_description')

  // Handle error responses from Supabase (e.g., expired links)
  if (error) {
    const message = errorDescription || error
    return NextResponse.redirect(`${origin}/forgot-password?error=${encodeURIComponent(message)}`)
  }

  if (code) {
    const supabase = await createClient()
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
    if (!exchangeError) {
      return NextResponse.redirect(`${origin}${next}`)
    }
    // If code exchange failed, redirect to forgot-password with helpful message
    return NextResponse.redirect(`${origin}/forgot-password?error=${encodeURIComponent('Reset link has expired. Please request a new one.')}`)
  }

  return NextResponse.redirect(`${origin}/login?error=Could not authenticate`)
}
