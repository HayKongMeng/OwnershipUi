import { revalidateTag } from "next/cache";
import { createAsset, getAsset, updateAsset } from "../service/asset.service";

export async function addAsset(token,data) {
    await createAsset(token, data);
}


export async function updateAssetById(token, data, assetId) {
    await updateAsset(token,data, assetId)   
}