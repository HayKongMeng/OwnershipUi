"use client"
import {List, ThemedLayoutV2} from "@refinedev/antd";
import React from "react";
import { Avatar, Button, Dropdown, Space } from "antd";
import { signOut } from "next-auth/react";
import ProfileDropdown from "../../components/components/ProfileDropdown";

export default async function Layout({ children, userId }) {
    return (
        <>

            <ThemedLayoutV2>
                <List   title={<span style={{ fontSize: '27px', color: '#151D48', fontWeight: '600' }}>History Management</span>}
                        canCreate={false}
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
