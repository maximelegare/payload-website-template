import Link from 'next/link'
import React from 'react'

import { Button } from '@@/shared/ui/button'

export default function UnderConstruction() {
  return (
    <div className="container py-28 flex justify-center">
      <div className="flex items-center flex-col">
        <div className="prose max-w-none">
          <h1 style={{ marginBottom: 0 }}>⚠️Under Construction⚠️</h1>
          <p className="mb-14 text-center">Sorry for the inconvenience.</p>
        </div>
        <Button asChild variant="default">
          <Link href="/admin/login">Login</Link>
        </Button>
      </div>
    </div>
  )
}
