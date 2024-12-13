import { revalidateTag } from "next/cache"
import { deleteUser, getProfile, getUser, updateProfile, updateUserProfile } from "../service/user.service"

export const getUserById = async(token, userId) => {
    return await getUser(token, userId)
}

export const getOwnProfile = async(token) => {
    return await getProfile(token)
}

export const updateUserProfileById = async(token, data, user_id) => {
    const res = await updateUserProfile(token, data, user_id)
    revalidateTag('updateUserProfile')
}

export const updateOwnProfile = async(token, data) => {
    await updateProfile(token, data)
}

export const deleteUserAccount = async(token, userId) => {
    const res = await deleteUser(token, userId)
}