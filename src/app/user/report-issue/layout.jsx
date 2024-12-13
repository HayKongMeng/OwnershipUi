"use client"
import {List, ThemedLayoutV2} from "@refinedev/antd";
import React from "react";
import { Space } from "antd";
import ProfileDropdown from "../../components/components/ProfileDropdown"
export default async function Layout({ children, userId }) {
  return (
    <>
      
        <ThemedLayoutV2>
        <List title={<span style={{ fontSize: '27px', color: '#151D48', fontWeight: '600' }}>Report Issue</span>} canCreate={false}
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
