

import { message } from "antd";
import { reqHeader } from "../../utils/header.config";
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";

export const getAllDepartment = async (token, page) => {
    const header = await reqHeader(token);
    try {

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/department?page=${page}`, {
            headers: header,
            cache: "no-store",
            next: { tag: ["getAllDepartment"] },
        });
        console.log("res", res)
        if (!res.ok) {
            throw new Error(`Error fetching departments: ${res.statusText}`);
        }

        const { payload } = await res.json();
        console.log("Full response:", payload);
        return payload;
    } catch (error) {
        console.error("Error in getAllDepartment:", error);
        return [];
    }
};


export const getDashboardCount = async (token) => {
    const header = await reqHeader(token);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/dashboard`, {
        headers: header,
        cache: "no-store",
        next: { tag: ["getDashboardCount"] },
    });
    console.log("shit", res)
    const {payload}  = await res.json();
    return payload;
}


export const postEvent = async (token, new_department_data) => {
    const header = await reqHeader(token);
    const { dep_name, description } = new_department_data;
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/department`,
        {
            method: "POST",
            headers: header,
            body: JSON.stringify({
                dep_name,
                description,
            }),
        },
        {
            next: { tag: ["postDepartment"] },
        }
    );
    const data = await res.json();
    return { success: true, data };
};


export const updateDepart = async (token, data, dep_id) => {
    const header = await reqHeader(token);
    console.log("dep_id", dep_id)
    const updateDepartment = {
        dep_name: data?.dep_name,
        description: data?.description,
    };
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/department/${dep_id}`,
        {
            method: "PUT",
            headers: header,
            cache: "no-store",
            body: JSON.stringify(updateDepartment),
        },
        {
            next: {
                tag: ["updateDepartmentById"],
            },
        }
    );

    console.log("Raw response:", res);

    // Read the response body
    const payload = await res.json();
    console.log("Payload:", payload);

    return payload;
};


export const getDepartment = async (token, dep_id) => {
    const header = await reqHeader(token);
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/department/${dep_id}`,
        {
            method: "GET",
            headers: header,
        },
        {
            next: {
                tag: ["getDepartment"],
            },
        }
    );
    const data = await res.json();

    return data;
}


export const deleteDepartment = async (token, dep_id) => {
    const header = await reqHeader(token);
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/department/${dep_id}`,
        {
            method: "DELETE",
            headers: header,
        },
        {
            next: {
                tag: ["deleteDepartment"],
            },
        }
    );

    console.log("raw", res)
    if(res.status === 200){
        message.success("Delete department successfull!!!")
    }

    const data = await res.json();
console.log("data",data)
    return data;
}