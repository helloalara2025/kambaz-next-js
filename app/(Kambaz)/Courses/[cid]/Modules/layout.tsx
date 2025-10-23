

'use client'

/*
  modules layout wrapper
  wraps module page with consistent container + nav
*/

import { ReactNode } from 'react'

export default function ModulesLayout({ children }: { children: ReactNode }) {
  return (
    <div id="wd-modules-layout" className="container-fluid py-3">
      {children}
    </div>
  )
}