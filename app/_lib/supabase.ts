// import { createClient } from '@supabase/supabase-js'
// import { createServerClient, type CookieOptions } from '@supabase/ssr'
// import { cookies } from 'next/headers'
//
// // const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
// // const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY
// // const supabase = createClient(supabaseUrl ?? '', supabaseKey ?? '')
//
// const cookieStore = cookies()
//
// const supabase = createServerClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_KEY!,
//   {
//     cookies: {
//       get(name: string) {
//         return cookieStore.get(name)?.value
//       },
//       set(name: string, value: string, options: CookieOptions) {
//         cookieStore.set({ name, value, ...options })
//       },
//       remove(name: string, options: CookieOptions) {
//         cookieStore.set({ name, value: '', ...options })
//       },
//     },
//   },
// )
//
// export default supabase
