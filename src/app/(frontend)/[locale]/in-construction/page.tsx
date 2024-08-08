import Link from 'next/link'
import React from 'react'

import { Button } from '@@/shared/ui/button'

export default function UnderConstruction() {
  return (
    <div className="container py-28">
      <div className="prose max-w-none">
        <h1 style={{ marginBottom: 0 }}>Sorry for the inconvenience!</h1>
        <p className="mb-4">Website under construction</p>
      </div>
      <Button asChild variant="default">
        <Link href="/admin/login">Login</Link>
      </Button>
    </div>
  )
}
