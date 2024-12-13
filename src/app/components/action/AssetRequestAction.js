import { revalidateTag } from "next/cache"
import { createRequest, deleteRequest, updateRequest } from "../service/assetRequest.service"

export async function updateAssetRequestById(token, data,requestId){
    await updateRequest(token, data,requestId)
    revalidateTag('updateAssetRequest')
}

export async function deleteAsssetRequestById(token, requestId) {
    await deleteRequest(token,requestId)
    revalidateTag('deleteRequest')
}

export async function addAssetRequest(token, data) {
    await createRequest(token, data)
    
}