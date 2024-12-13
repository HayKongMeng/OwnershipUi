"use client"
import {List, ThemedLayoutV2} from "@refinedev/antd";
import React from "react";
import { Avatar, Button, Dropdown, Space } from "antd";
import ProfileDropdown from "../../components/components/ProfileDropdown";

export default async function Layout({ children, userId }) {
  return (
    <>
      
        <ThemedLayoutV2>
        <List title="User" canCreate={false}
        headerButtons={() => (
          <Space>
            <ProfileDropdown userId={userId}/>
          </Space>
        )}>
      </List>
          {children}</ThemedLayoutV2>;
    </>
  )
}
