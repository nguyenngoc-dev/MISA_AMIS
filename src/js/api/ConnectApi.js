import axios from 'axios'

const baseUrl= 'https://cukcuk.manhnv.net/api/v1'

export const baseAPI = {
    // Lấy toàn bộ nhân viên
    async get(url) {
        const result =  axios.get(`${baseUrl}${url}`).then((response) => {
            return response;
        })
        return result
    },
    // lấy mã nhân viên mới
    async getNewId(url) {
      const result = await axios.get(`${baseUrl}${url}`).then((response) => {
          return response;
      })
      return result
    },
    // thêm mới nhân viên
    async post(url, data) {
        const result = await axios({
            method: 'post',
            url: `${baseUrl}${url}`,
            data: data,
            responseType: 'json',
          })
          .then ( function (response){
              return response
          })
          .catch ( function (error){
            console.log('ajaxSearch error'); 
          });
        return result;
    },
    // sửa nhân viên
    async put(url, data) {
        const result = await axios({
            method: 'put',
            url: `${baseUrl}${url}`,
            data: data,
            responseType: 'json',
          })
          .then ( function (response){
              return response;
    
          })
          .catch ( function (error){
            console.log('ajaxSearch error'); 
          });
        return result;
    },
    // Xóa nhân viên
    async delete(url,id) {
      const result = await axios.delete(`${baseUrl}${url}/${id}`).then((response) => {
          return response;
      })
      return result;
    },
    // xóa nhiều nhân viên
    async deletes(url,data) {
      const result = await axios({
        method: 'delete',
        url: `${baseUrl}${url}`,
        data: data,
        responseType: 'json',
      }).then((response) => {
          return response;
      })
      return result;
    },
    // Phân trang tìm kiếm
    async seach(url){
      const result = await axios.get(`${baseUrl}${url}`).then((response) => {
        return response;
    })
    return result;
    },
    // Export file excel
     exportExcel(url){
      return `${baseUrl}${url}`;
    },
}
