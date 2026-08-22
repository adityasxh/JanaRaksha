import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nkoqxkiitecrhgbnbvxp.supabase.co'
const supabaseAnonKey = 'sb_publishable_q8pUPLR27Slqhs6N2vPjdQ_d8OsjmoE'

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
)