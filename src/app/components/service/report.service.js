import { reqHeader } from "../../utils/header.config";
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";

export const getAllReport = async (token) => {
    const header = await reqHeader(token);
    try {

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/getAllIssue`, {
            headers: header,
            cache: "force-cache",
            next: { tag: ["getAllReport"] },
        });
        console.log("res", res)
        const {payload} = await res.json();
        console.log("data",payload)
        return Array.isArray(payload) ? payload : [];
    } catch (error) {
        console.error("Error in getAllReport:", error);
        return [];
    }
}


export const updateReport = async (token, data, reportId) => {
    const header = await reqHeader(token);
    const updateReport = {
        assetName: data?.assetName,
        problem: data?.problem,
        attachment: data?.attachment,
    };
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/updateIssue/${reportId}`, {
        headers: header,
        method: "PUT",
        body: JSON.stringify(updateReport),
        next: { tag: ["updateReport"] },
    });
    const {payload} = await res.json();
    return payload;
}

export const createReport = async (token, data) => {
    const header = await reqHeader(token);
    const { assetName, problem, attachment } = data;
    console.log("jffa", data)
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/createIssue`,
        {
            method: "POST",
            headers: header,
            body: JSON.stringify({
                assetName,
                problem,
                attachment
            }),
        },
        {
            next: { tag: ["createReport"] },
        }
    );
    console.log("Raw",res)
    const payload = await res.json();
    if(payload.payload == false){
        Toastify({
            text: "You don't own this asset",
            className: "error-toast",
        }).showToast(); 
    }else{
        Toastify({
            text: "Create report successfull!!!",
            className: "success-toast",
        }).showToast();
    }
    console.log("payload", payload)
    return payload;
}


export const deleteReport = async (token, reportId) => {
    const header = await reqHeader(token);
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/deleteIssue/${reportId}`,
        {
            method: "DELETE",
            headers: header,
        },
        {
            next: {
                tag: ["deleteReport"],
            },
        }
    );
    console.log("raw",res)
    const payload = await res.json();

    return payload;
}