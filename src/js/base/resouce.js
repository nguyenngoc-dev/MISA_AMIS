const RESOURCES = {
  NOTIFICATION_TYPE: {
    SUCCESS: "SUCCESS",
    ERROR: "ERROR",
    INFO: "INFO",
    WARNING: "WARNING",
  },
  NOTIFICATION_TITLE: {
    SUCCESS: "Thành công",
    ERROR: "Lỗi! ",
    INFO: "Thông tin",
    WARNING: "Cảnh báo",
  },
  FORM_MESSAGE: {
    SUCCESS: {
      ADD: "Thêm mới nhân viên thành công!",
      EDIT: "Sửa nhân viên thành công!",
      DELETE: "Xóa nhân viên thành công",
    },
    ERROR: {
      ERRORSERVER:"Lỗi phía máy chủ",
      INVALID_CODE:"Mã nhân viên không được để trống",
      DUPLICATE_CODE:"Mã hiện tại đang bị trùng",
      INVALID_NAME:"Tên nhân viên không được để trống",
      ERROR_DATE:"Ngày tháng không hợp lệ",
      ERROR_DEPARTMENT:"Đơn vị không hợp lệ",
      ERROR_EMAIL:"Email không đúng định dạng",
      ERROR_PHONENUMBER:"Số điện thoại không đúng định dạng",
      ERROR_BANK_ACCOUNT:"Số tài khoản không đúng định dạng"
    }
  },
  FORM_MODE: {
    ADD: "ADD",
    EDIT: "EDIT",
    DUPLICATE: "DUPLICATE",
    DELETE: "DELETE",
    ERROR:"ERROR"
  },
  FORM_TITLE: {
    ADD:"Thêm nhân viên",
    UPDATE:"Sửa nhân viên",
    DUPLICATE:"Nhân bản"
  },
  MODAL_TITLE: {
    INFO: "Xác nhận",
    WARNING: "Xác nhận xóa",
    ERROR: "Dữ liệu không đúng",
  },
  MODAL_TYPE: {
    INFO: "INFO",
    WARNING: "WARNING",
    ERROR: "ERROR",
  },
  MODAL_MESSAGE: {
    INFO: "Dữ liệu đã bị thay đổi. Bạn có muốn cất không?",
    WARNING:`Bạn có chắc chắn muốn xóa nhân viên không?`,
    EMPTY_EMPLOYEE:"Không có nhân viên nào được chọn"

  },
  PAGINATION: [
    {
      value: 20,
      text: "20 bản ghi trên 1 trang",
    },
    {
      value: 50,
      text: "50 bản ghi trên 1 trang",
    },
    {
      value: 100,
      text: "100 bản ghi trên 1 trang",
    },
    {
      value: 120,
      text: "120 bản ghi trên 1 trang",
    },
  ],

  STATUSCODE: {
    OK: 200,
    Created: 201,
    BadRequest: 400,
    NotFound: 404,
    ServerError: 500,
  },

  ERRORCODE: {
    Exception: 1,
    DuplicateCode: 2,
    EmptyCode: 3,
    InsertFailed: 4,
    UpdateFailed: 5,
    DeleteFailed: 6,
    InvalidInput: 7,
  },
  FORM_RULES: {
    NOT_EMPTY: "NOT_EMPTY",
    HAS_FORMAT: "HAS_FORMAT",
    UNIQUE: "UNIQUE",
    ADULT: "ADULT",
    MAX_LENGTH:"MAX_LENGTH"
  },
  ERROR: {
    NOT_EMPTY: (name) => `${name} không được để trống`,
    ADULT: (name) => `${name} không hợp lệ`,
    HAS_FORMAT: (name) => `${name} chưa đúng định dạng`,
    MAX_LENGTH:(name,value) => `${name} giới hạn ${value} kí tự`
  },
  FORM_FIELD: {
    EmployeeCode: "Mã nhân viên",
    FullName: "Tên nhân viên",
    DepartmentId:"Đơn vị",
    DateOfBirth:"Ngày sinh",
    IdentityNumber:"Số căn cước",
    IdentityDate:"Ngày cấp",
    Position:"Chức danh",
    PhoneNumber: "Số điện thoại",
    LandlineNumber:"Điện thoại cố định",
    Email: "Email",
    BankAccount:"Tài khoản ngân hàng"
  },
  STATUSCODES: {
    Unauthorized: {
      Code: 401,
      Message: "Không được xác thực"
    },
    Not_Found: {
      Code: 404,
      Message: "Không tìm thấy tài nguyên"
    },
    Gateway_Timeout: {
      Code: 504,
      Message:"Không nhận được phản hồi từ máy chủ"
    }
  }
};

export default RESOURCES;
