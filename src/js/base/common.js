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
    const {NOT_EMPTY,UNIQUE,ADULT,HAS_FORMAT,MAX_LENGTH} = RESOURCES.FORM_RULES;
    const ERROR = RESOURCES.ERROR;
    const regexConstant = regexConstants;
    for (const rule of rules) {
      console.log(rule)
      switch (rule) {
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
        case MAX_LENGTH: {
          const textLength = 100;
          if(value.length > textLength)
            return ERROR[rule](FORM_FIELD[name],textLength)
          break;
        }
        default:
          break;
      }
    }
  }



