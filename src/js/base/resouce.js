/**
 * Chứa các thông báo về các lỗi
 * Author: Nguyễn Văn Ngọc(10/1/2023)
 */

//Thông báo text khi muốn đóng popupEmployeeDetail
const closePopupEmployeeMsg = {
    text: "Dữ liệu đã bị thay đổi. Bạn có muốn cất không ?",
  };
  
  //Thông báo text khi xảy ra lỗi phía server
  const errorException500 = {
    text: "Có lỗi xảy ra vui lòng liên hệ MISA",
  };
  
  //Thông báo khi các ô input dữ liệu trong popup EmployeeDetail không hợp lệ
  const validateEmployeeMsg = {
    //Khi giá trị của mã nhân viên có ký tự cuối không phải là số
    validateCodeValue: "Ký tự cuối cùng của mã nhân viên phải là số",
    //Khi giá trị của mã nhân viên trống
    validateCodeNull: "Mã nhân viên không được phép để trống.",
    //Khi giá trị của tên nhân viên trống
    validateNameNull: "Tên nhân viên không được phép để trống.",
    //khi giá trị của dơn vị trống
    validateDepartmentNull: "Đơn vị không được phép để trống.",
    //Khi giá trị của vị trí trống
    validatePositonNull: "Vị trí không được phép để trống.",
    //Khi giá trị của email trống hoặc không đúng với biểu thức chính quy
    validateEmail: "Email không hợp lệ.",
    //Khi giá trị nhập vào của ngày sinh và ngày cấp lớn hơn ngày hiện tại
    validateDateOfBirth: "Ngày sinh không được lớn hơn ngày hiện tại.",
    validateIdentityDate: "Ngày cấp không được lớn hơn ngày hiện tại.",
    //Khi giá trị số điện thoại trống
    validatePhoneNumberNull: "Số điện thoại di động không được để trống",
    //Khi giá trị số điện thoại không phải là số
    validatePhoneNumberValue: "Số điện thoại không được có ký tự chữ.",
  };
  
  //Thông báo toast
  const toastMsgText = {
    successAdd: "Thêm mới thành công",
    successEdit: "Sửa thành công",
    successClone: "Nhân bản thành công",
    successDelete: "Xoá thành công",
    successExport: "Xuất ra Excel thành công",
  };
  
  //Title cho các input bắt buộc phải nhập
  const titleInput = {
    titleCodeValue: "Ký tự cuối của mã phải là số",
    titleCode: "Mã không được phép để trống.",
    titleName: "Tên không được phép để trống.",
    titleDepartment: "Đơn vị không được phép để trống.",
    titlePosition: "Vị trí không được phép để trống",
    tiltleEmail: "Email không hợp lệ.",
    titlePhoneValue: "Bạn phải nhập số.",
    titlePhone: "Số diện thoại không được phép để trống.",
  };
  
  //Thông báo khi Export ra file Excel
  const NoticeExport = {
    dataNull: "Không có dữ liệu để xuất ra file Excel.",
  };
  
  const noticeCheckAll = {
    deleteAll: "Bạn có thực sự muốn xoá những nhân viên đã chọn không?",
  };
  export default {
    errorException500,
    closePopupEmployeeMsg,
    validateEmployeeMsg,
    toastMsgText,
    titleInput,
    NoticeExport,
    noticeCheckAll,
  };
  