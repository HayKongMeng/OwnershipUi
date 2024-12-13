import { reqHeader } from "../../utils/header.config";

export const getHistory = async (token) => {
    const header = await reqHeader(token);
    try {

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/getAllHistory`, {
            headers: header,
            cache: "force-cache",
            next: { tag: ["getHistory"] },
        });
        console.log("res", res)
        const {payload} = await res.json();
        console.log("data",payload)
        return Array.isArray(payload) ? payload : [];
    } catch (error) {
        console.error("Error in getHistory:", error);
        return [];
    }
}