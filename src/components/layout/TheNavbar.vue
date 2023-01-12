<template>
  <div :class="{'navbar':true, 'navbar-collapse': !store.state.sidebar.isOpen}">
    <div class="navbar-header">
      <div @click="store.handleOpenSidebar" class="sidebar-item__icon icon-menu-collapse header__left-three-strips"></div>
      <div class="sidebar-item__icon navbar-header__icon icon-header"></div>
      <img
        src="../../assets/img/Logo_Module_TiengViet_White.66947422.svg"
        alt=""
        class="navbar-header__logo"
      />
    </div>
    <ul class="sidebar-list">
      <li class="sidebar-item" tabindex="0">
        <div class="sidebar-item__icon">
          <div class="icon-sumary"></div>
        </div>
        <div class="slidebar-item-text">Tổng quan</div>
      </li>
      <li class="sidebar-item" tabindex="0">
        <div class="sidebar-item__icon">
          <div class="icon-cash"></div>
        </div>
        <div class="slidebar-item-text">Tiền mặt</div>
      </li>
      <li class="sidebar-item" tabindex="0">
        <div class="sidebar-item__icon">
          <div class="icon-deposits"></div>
        </div>
        <div class="slidebar-item-text">Tiền gửi</div>
      </li>
      <li class="sidebar-item" tabindex="0">
        <div class="sidebar-item__icon">
          <div class="icon-buy"></div>
        </div>
        <div class="slidebar-item-text">Mua hàng</div>
      </li>
      <li class="sidebar-item" tabindex="0">
        <div class="sidebar-item__icon">
          <div class="icon-cart"></div>
        </div>
        <div class="slidebar-item-text">Bán hàng</div>
      </li>
      <li class="sidebar-item" tabindex="0">
        <div class="sidebar-item__icon">
          <div class="icon-manage"></div>
        </div>
        <div class="slidebar-item-text">Quản lý đơn hàng</div>
      </li>
      <li class="sidebar-item" tabindex="0">
        <div class="sidebar-item__icon">
          <div class="icon-warehouse"></div>
        </div>
        <div class="slidebar-item-text">Kho</div>
      </li>
      <li class="sidebar-item" tabindex="0">
        <div class="sidebar-item__icon">
          <div class="icon-tool"></div>
        </div>
        <div class="slidebar-item-text">Công cụ dụng cụ</div>
      </li>
      <li class="sidebar-item" tabindex="0">
        <div class="sidebar-item__icon">
          <div class="icon-oto"></div>
        </div>
        <div class="slidebar-item-text">Tài sản cố định</div>
      </li>
      <li class="sidebar-item" tabindex="0">
        <div class="sidebar-item__icon">
          <div class="icon-tax"></div>
        </div>
        <div class="slidebar-item-text">Thuế</div>
      </li>
      <li class="sidebar-item" tabindex="0">
        <div class="sidebar-item__icon">
          <div class="icon-price"></div>
        </div>
        <div class="slidebar-item-text">Giá thành</div>
      </li>
      <li class="sidebar-item" tabindex="0">
        <div class="sidebar-item__icon">
          <div class="icon-sum"></div>
        </div>
        <div class="slidebar-item-text">Tổng hợp</div>
      </li>
      <li class="sidebar-item" tabindex="0">
        <div class="sidebar-item__icon">
          <div class="icon-budget"></div>
        </div>
        <div class="slidebar-item-text">Ngân sách</div>
      </li>
      <li class="sidebar-item" tabindex="0">
        <div class="sidebar-item__icon">
          <div class="icon-report"></div>
        </div>
        <div class="slidebar-item-text">Báo cáo</div>
      </li>
      <li class="sidebar-item" tabindex="0">
        <div class="sidebar-item__icon">
          <div class="icon-analysis"></div>
        </div>
        <div class="slidebar-item-text">Phân tích tài chính</div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  inject: ["store"],
  name: "TheNavbar",
  props:{
    
  },
  data() {
    return {
      collapse:false
    }
  },
  methods: {
    onCollapse(state) {
      this.collapse = state
    }
  },
 
};
</script>
<style scoped>
</style>
