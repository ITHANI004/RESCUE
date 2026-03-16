import { createBrowserClient } from '@supabase/ssr'

function parseCookies(str: string) {
  if (!str) return {}
  return str.split(';').reduce((acc: any, cookieString) => {
    const [key, val] = cookieString.split('=').map(c => c.trim())
    if (key && val !== undefined) {
      acc[key] = decodeURIComponent(val)
    }
    return acc
  }, {})
}

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          if (typeof document === 'undefined') return []
          const parsed = parseCookies(document.cookie)
          return Object.keys(parsed).map((name) => ({
            name,
            value: parsed[name],
          }))
        },
        setAll(cookiesToSet) {
          if (typeof document === 'undefined') return
          cookiesToSet.forEach(({ name, value, options }) => {
            const domain = options.domain ? `; domain=${options.domain}` : ''
            const path = options.path ? `; path=${options.path}` : '; path=/'
            const secure = options.secure ? '; secure' : ''
            const sameSite = options.sameSite ? `; samesite=${options.sameSite}` : ''
            
            let expires = ''
            if (!value) {
                expires = '; expires=Thu, 01 Jan 1970 00:00:00 GMT'
            }

            document.cookie = `${name}=${encodeURIComponent(value)}${domain}${path}${sameSite}${secure}${expires}`
          })
        },
      },
    }
  )
}
