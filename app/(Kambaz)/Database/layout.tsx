

'use client'

import React from 'react'

export default function DatabaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <main style={{ padding: '20px', fontFamily: 'system-ui', color: '#222' }}>
      {children}
    </main>
  )
}