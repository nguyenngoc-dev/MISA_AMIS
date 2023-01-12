import {baseAPI} from "./ConnectApi.js"
//Lấy toàn bộ dữ liệu
const url="/Employees";
const urlId="/Employees/NewEmployeeCode";
const urlExport="/Employees/exportv2";
export async function getEmployee(){
    var result = baseAPI.get(url);
    return result;
}
// Thêm nhân viên
export  async function insertEmployee(data){
    var result =  baseAPI.post(url, data);
    return result;
    
}
// Lấy mã nhân viên mới
export async function getEmployeeId(){
    var result=await baseAPI.getNewId(urlId);
    return result;
}
// Sửa thông tin nhân viên
export async function updateEmployee(data){
    var result=await baseAPI.put(url,data);
    return result;
}
// Xoa nha vien
export async function deleteEmployee(id){
    var result=await baseAPI.delete(url,id);
    return result;
}
// tim kieem , phan trang
export async function seachData(pageSize,pageNumber,employeeFilter){
    const urlSearch=`/Employees/fillter?employeeFilter=${employeeFilter}&pageSize=${pageSize}&pageNumber=${pageNumber}`
    var result=await baseAPI.get(urlSearch);
    return result;
}
// Xóa nhiều nhân viên
export async function deleteEmployees(data){
    var result=await baseAPI.deletes(url,data);
    return result;
}
//Export file nhaan viên
export  function exportFile(){
    var result= baseAPI.exportExcel(urlExport);
    return result;
}
export default {
    getEmployee,
    insertEmployee,
    getEmployeeId,
    updateEmployee,
    deleteEmployee,
    seachData,
    deleteEmployees,
    exportFile
}