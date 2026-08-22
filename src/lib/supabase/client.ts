import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    'https://nkoqxkiitecrhgbnbvxp.supabase.co',
    'sb_publishable_q8pUPLR27Slqhs6N2vPjdQ_d8OsjmoE',
  )
}