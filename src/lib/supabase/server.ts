import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    'https://nkoqxkiitecrhgbnbvxp.supabase.co',
    'sb_publishable_q8pUPLR27Slqhs6N2vPjdQ_d8OsjmoE',
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options)
            })
          } catch {
            // Server Components cannot always modify cookies.
          }
        },
      },
    }
  )
}