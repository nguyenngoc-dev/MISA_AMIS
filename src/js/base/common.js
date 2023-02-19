import RESOURCES from "./resouce";
import {regexConstants} from "./constants"
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
 * Tranform gender
 * * createBy: NvNgoc - (26/12/2022)
 */
export function GenderTransform(gender) {
    
        if(gender == 0) {
        return "Nam"
        }
        else if(gender == 1) {
            return "Nữ"
        }
        else {
            return "Khác"
        }
   
}
/**
 * Validate input
 * * createBy: NvNgoc - (26/12/2022)
 */
export function inputValidation (rules,name,value) {
    const FORM_FIELD = RESOURCES.FORM_FIELD;
    const {NOT_EMPTY,UNIQUE,ADULT,HAS_FORMAT} = RESOURCES.FORM_RULES;
    const ERROR = RESOURCES.ERROR;
    const regexConstant = regexConstants;
    for (const rule of rules) {
      switch (rule) {
        case NOT_EMPTY:{
          if(!value) return ERROR[rule](FORM_FIELD[name]);
          break;
        }
        case UNIQUE:{
          break;
        }
        case ADULT:{
          if (value) {
            const date = new Date(value).getTime();
            const dateNow = new Date().getTime();
            if (date > dateNow) {
              return ERROR[rule](FORM_FIELD[name]);
            }
          }
          break;
        }
        case HAS_FORMAT:{
          
          if(value && !regexConstant[name].test(value))
          {
            return ERROR[rule](FORM_FIELD[name]);
          }
          break;
        }
        default:
          break;
      }
    }
  }



