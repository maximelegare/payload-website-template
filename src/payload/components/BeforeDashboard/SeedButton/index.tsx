'use client'

import React, { Fragment, useCallback, useState } from 'react'

export const SeedButton: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [seeded, setSeeded] = useState(false)
  const [error, setError] = useState<any>(null)

  const handleClick = useCallback(
    async (e:any) => {
      e.preventDefault()
      if (loading || seeded) return

      setLoading(true)

      try {
        await fetch('/api/seed')
        setSeeded(true)
      } catch (err) {
        setError(err)
      }
    },
    [loading, seeded],
  )

  let message = ''
  if (loading) message = ' (seeding...)'
  if (seeded) message = ' (done!)'
  if (error) message = ` (error: ${error})`

  return (
    <Fragment>
      <a href="/api/seed" onClick={handleClick} rel="noopener noreferrer" target="_blank">
        Seed your database
      </a>
      {message}
    </Fragment>
  )
}
