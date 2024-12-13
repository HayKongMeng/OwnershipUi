
import { revalidateTag } from "next/cache"
import { deleteDepartment, getDepartment, postEvent, updateDepart } from "../service/department.service"

export async function addDepartment(token,newDepartment) {
    // await postEvent(token,newDepartment)
    return await postEvent(token, newDepartment);
}

export async function updateDepartmentById(token, newDepartment,dep_id){
    console.log("department action", newDepartment)
    await updateDepart(token, newDepartment,dep_id)
    revalidateTag('updateDepartmentById')
}

export async function getDepartmentById(token, dep_id){
    const department = await getDepartment(token, dep_id);  
    // revalidateTag('getDepartment');  
    return department; 
}

export async function deleteDepartmentById(token, dep_id) {
    await deleteDepartment(token, dep_id)
}