"use client"

import React from 'react'
import { SessionProvider } from "next-auth/react"
function SessionProviderWrapper({children}) {
  return (
    <SessionProvider>
        {children}
    </SessionProvider>
  )
}

export default SessionProviderWrapper