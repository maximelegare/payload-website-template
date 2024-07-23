'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@@/shared/ui/select'
import React, { useState } from 'react'


import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { useCurrentLocale } from 'next-i18n-router/client'
import  i18nConfig, {locales, defaultLocale}  from 'ROOT/i18nConfig'

export const LocaleSelector: React.FC = () => {
  const currentLocale = useCurrentLocale(i18nConfig)

  const router = useRouter()
  const currentPathname = usePathname()

  const handleChange = (newLocale: string) => {
    // set cookie for next-i18n-router
    const days = 30
    const date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${date.toUTCString()};path=/`

    // redirect to the new locale path
    if (currentLocale === defaultLocale) {
      router.push('/' + newLocale + currentPathname)
    } else {
      router.push(currentPathname.replace(`/${currentLocale}`, `/${newLocale}`))
    }

    router.refresh()
  }

  return (
    <Select onValueChange={handleChange} value={currentLocale}>
      <SelectTrigger className="w-auto bg-transparent gap-2 pl-0 md:pl-3 border-none">
        <SelectValue placeholder="Locale" />
      </SelectTrigger>
      <SelectContent>
        {locales.map((l) => (
          <SelectItem key={l.locale} value={l.locale}>
            {l.flag}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
