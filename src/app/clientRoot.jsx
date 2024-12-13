"use client"
import React from "react"
import { Refine } from "@refinedev/core"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
// import { useNotificationProvider } from "@refinedev/antd"
import { RefineKbar } from "@refinedev/kbar"
import routerProvider from "@refinedev/nextjs-router"
import { AppIcon } from "./components/app-icon"
import getUserRoleFromToken from "./utils/getUserRole"
import { useSession } from "next-auth/react"

const queryClient = new QueryClient()

const ClientWrapper = ({ children }) => {
  const { data: session } = useSession()
  const token = session?.accessToken
  const roles = getUserRoleFromToken(token)

  const userResources = [
    { name: "asset", list: "/user/asset", meta: { label: "Asset" } , class: "userAsset"},
    {
      name: "asset Request",
      list: "/user/asset-request",
      meta: { label: "Asset Request" }
    },
    {
      name: "report Issue",
      list: "/user/report-issue",
      meta: { label: "Report Issue" }
    },
    { name: "history", list: "/user/history", meta: { label: "History" } }
  ]

  const adminResources = [
    {
      name: "dashboard",
      list: "/admin/dashboard",
      meta: { label: "Dashboard" }
    },
    { name: "asset", list: "/admin/asset", meta: { label: "Asset" } },
    {
      name: "asset Request",
      list: "/admin/asset-request",
      meta: { label: "Asset Request" }
    },
    {
      name: "report Issue",
      list: "/admin/report-issue",
      meta: { label: "Report Issue" }
    },
    { name: "history", list: "/admin/history", meta: { label: "History" } },
    {
      name: "department",
      list: "/admin/department",
      meta: { label: "Department" }
    },
    { name: "user", list: "/admin/user", meta: { label: "Users" } }
  ]

  const resources = roles?.includes("ADMIN") ? adminResources : userResources

  return (
    <QueryClientProvider client={queryClient}>
      <Refine
        routerProvider={routerProvider}
        resources={resources}
        options={{
          syncWithLocation: true,
          warnWhenUnsavedChanges: true,
          projectId: "oLJW1g-oE3QD8-jQUBqS",
          title: {
            text: (
              <div className="w-[215px]">
                <span style={{ color: "#151D48", fontWeight: "bold" }}>
                  OWNER
                </span>
                <span style={{ color: "#4B68FF", fontWeight: "bold" }}>
                  SHIP
                </span>
              </div>
            ),
            icon: <AppIcon />
          }
        }}
      >
        {children}
        <RefineKbar />
      </Refine>
    </QueryClientProvider>
  )
}

export default ClientWrapper
