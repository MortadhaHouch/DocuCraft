'use client'

import { useMemo } from 'react'
import { useParams, notFound } from 'next/navigation'
import { HocuspocusProvider } from '@hocuspocus/provider'

export default function Page() {
  const { id } = useParams();

  // Always call hooks, don't return early before them
  const provider = useMemo(() => {
    if (!id) return null
    return new HocuspocusProvider({
      url: process.env.NEXT_PUBLIC_SOCKET_URL as string,
      name: id.toString(),
    })
  }, [id])

  // Safe rendering
  if (!id) return notFound()
  if (!provider) return null

  return (
    <div>
      <h1>Document: {id}</h1>
      {/* your content here */}
    </div>
  )
}
