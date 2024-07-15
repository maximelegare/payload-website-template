import { i18nRouter } from 'next-i18n-router'
import i18nConfig from '../i18nConfig'
import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  if (req.url.includes('admin')) {
    return NextResponse.redirect(new URL('/admin', req.url))
  }

  return i18nRouter(req, i18nConfig)
}

// only applies this middleware to files in the app directory
export const config = {
  matcher: '/((?!api|static|.*\\..*|_next|admin).*)',
}
