import RESOURCES from "./resouce";
import {regexConstants} from "./constants"
import { ref } from "vue";
/**
 *Format Date
    * createBy: NvNgoc - (26/12/2022)
*/
export function formatDate (dateTime)  {
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
 *Format tình trạng đơn hàng
    * createBy: NvNgoc - (26/12/2022)
*/
export function formatStatus (status)  {
 if(status == 0) {
  return "Đang chuẩn bị hàng"
 }
 else if(status == 1) {
  return "Đang giao hàng"
 }
 else if(status == 2) {
  return "Giao thành công"
 }
 else if(status == 3) {
  return "Đơn hàng bị hủy"

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
 * Validate input
 * * createBy: NvNgoc - (26/12/2022)
 */
export function inputValidation (rules,name,value) {
    const FORM_FIELD = RESOURCES.FORM_FIELD;
    const {NOT_EMPTY,ADULT,HAS_FORMAT,MAX_LENGTH} = RESOURCES.FORM_RULES;

    const ERROR = RESOURCES.ERROR;
    const regexConstant = regexConstants;
    for (const rule of rules) {
      var arrRule = rule.split("|");
      var nameRule = arrRule[0];
      var keyRule = arrRule[1];
      switch (nameRule) {
        case NOT_EMPTY:{
          if(!value.trim()) return ERROR[rule](FORM_FIELD[name]);
          break;
        }
        case ADULT:{
          if (value) {
            const date = new Date(value).getTime();
            const dateNow = new Date().getTime();
            if (date > dateNow) {
              return ERROR[rule](FORM_FIELD[name]);
            }
            if(FORM_FIELD[name] == RESOURCES.FORM_FIELD.DateOfBirth) {
              if(new Date().getFullYear() - new Date(value).getFullYear() < 18)
                return ERROR[rule](FORM_FIELD[name]);
            }
          }
          break;
        }
        case HAS_FORMAT:{
          
          if(value.trim() && !regexConstant[name].test(value))
          {
            return ERROR[rule](FORM_FIELD[name]);
          }
          break;
        }
        case MAX_LENGTH: {
          if (value && value.length > keyRule)
          return ERROR[nameRule](FORM_FIELD[name], keyRule);
        break;
        }
        default:
          break;
      }
    }
  }



