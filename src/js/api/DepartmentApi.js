import {baseAPI} from "./ConnectApi.js"

const url = "https://amis.manhnv.net/api/v1/Departments";
export async function getDepartment(){
    var result = await baseAPI.get("/Departments");
    return result;
}

export async function insertDepartment(data){
    var result = await baseAPI.post("/Employees", data);
    return result;
}

export default{
    getDepartment,
    insertDepartment
}
