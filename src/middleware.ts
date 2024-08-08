import { i18nRouter } from 'next-i18n-router'
import i18nConfig from '../i18nConfig'
import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  if (req.url.includes('admin')) {
    return NextResponse.redirect(new URL('/admin', req.url))
  }

  const i18Response = i18nRouter(req, i18nConfig)
  i18Response.headers.set('x-pathname', req.nextUrl.pathname)

  return i18Response
}

// only applies this middleware to files in the app directory
export const config = {
  matcher: '/((?!api|static|.*\\..*|_next|admin).*)',
}
