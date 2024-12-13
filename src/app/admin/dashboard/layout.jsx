"use client"
import { Header, ThemedLayoutV2, ThemedTitleV2 } from "@refinedev/antd";
import React from "react";

// eslint-disable-next-line @next/next/no-async-client-component
export default async function Layout({ children }) {
  return <ThemedLayoutV2>{children}</ThemedLayoutV2>;
}
