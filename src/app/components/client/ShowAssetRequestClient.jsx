"use client";

import { Create, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";

export default function CategoryCreateClient() {
    const { formProps, saveButtonProps } = useForm({});

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label={"Title"}
                    name={["title"]}
                    rules={[
                        {
                            required: true,
                            message: "Title is required",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Create>
    );
}
