/**
 *Format Date
    * createBy: NvNgoc - (26/12/2022)
*/

export function formatDate  (dateTime)  {
    try {
        if (dateTime) {
            dateTime = new Date(dateTime);
            let date = dateTime.getDate();
            let month = dateTime.getMonth() + 1;
            let year = dateTime.getFullYear();

            date = date < 10 ? `0${date}` : date;
            month = month < 10 ? `0${month}` : month;

            return`${date}/${month}/${year}`;
        } else {
            return "";
        }
    } catch (error) {
        return "";
    }
}
/**
 *Format Tiền 
* createBy: NvNgoc - (26/12/2022)
*/
export function formatMoney (money)  {
    try {
        money = new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
            money
        );
        return money;
    } catch (error) {
        return "";
    }
}

/**
 *2 Hàm validateEmail
* @param {String} emailValue email text
* @returns true - hợp lệ; false- không hợp lệ
* 
*/
// const validateEmail = (emailValue) => {
//     let mailformat =
//     /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
//     if (emailValue.match(mailformat)) {
//     return true;
//     } else {
//     return false;
//     }
// }

