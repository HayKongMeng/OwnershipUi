import React, { Suspense } from "react"
import { RefineKbarProvider } from "@refinedev/kbar"
import { AntdRegistry } from "@ant-design/nextjs-registry"
import "@refinedev/antd/dist/reset.css"
import "../styles/globals.css"
import SessionProviderWrapper from "./providers/auth-provider/AuthProvider"
import ClientWrapper from "./clientRoot"
import QueryProvider from "./providers/QueryProvider"
// import ClientWrapper from "./ClientWrapper"

export const metadata = {
  title: "OWNERSHIP",
  description: "Ownership can be trust the record",
  icons: {
    icon: "/favicon.ico?v=1"
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="test">
        <SessionProviderWrapper>
          <QueryProvider>
          <Suspense>
            <RefineKbarProvider>
              <AntdRegistry>
                <ClientWrapper>{children}</ClientWrapper>
              </AntdRegistry>
            </RefineKbarProvider>
          </Suspense>
          </QueryProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  )
}
