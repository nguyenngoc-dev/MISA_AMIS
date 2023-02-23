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
      <router-link to="/employee" class="sidebar-item" tabindex="0">
        <div class="sidebar-item__icon">
          <div class="icon-sumary"></div>
        </div>
        <div class="slidebar-item-text">Tổng quan</div>
      </router-link>
      <router-link to="/cash" class="sidebar-item" tabindex="0">
        <div class="sidebar-item__icon">
          <div class="icon-cash"></div>
        </div>
        <div class="slidebar-item-text">Tiền mặt</div>
      </router-link>
      <router-link to="/save-money" class="sidebar-item" tabindex="0">
        <div class="sidebar-item__icon">
          <div class="icon-deposits"></div>
        </div>
        <div class="slidebar-item-text">Tiền gửi</div>
      </router-link>
      <router-link to="/purchases" class="sidebar-item" tabindex="0">
        <div class="sidebar-item__icon">
          <div class="icon-buy"></div>
        </div>
        <div class="slidebar-item-text">Mua hàng</div>
      </router-link>
      <router-link to="/sell" class="sidebar-item" tabindex="0">
        <div class="sidebar-item__icon">
          <div class="icon-cart"></div>
        </div>
        <div class="slidebar-item-text">Bán hàng</div>
      </router-link>
      <router-link to="/manage-order" class="sidebar-item" tabindex="0">
        <div class="sidebar-item__icon">
          <div class="icon-manage"></div>
        </div>
        <div class="slidebar-item-text">Quản lý đơn hàng</div>
      </router-link>
      <router-link to="/store" class="sidebar-item" tabindex="0">
        <div class="sidebar-item__icon">
          <div class="icon-warehouse"></div>
        </div>
        <div class="slidebar-item-text">Kho</div>
      </router-link>
      <router-link to="/tool" class="sidebar-item" tabindex="0">
        <div class="sidebar-item__icon">
          <div class="icon-tool"></div>
        </div>
        <div class="slidebar-item-text">Công cụ dụng cụ</div>
      </router-link>
      <router-link to="/assets" class="sidebar-item" tabindex="0">
        <div class="sidebar-item__icon">
          <div class="icon-oto"></div>
        </div>
        <div class="slidebar-item-text">Tài sản cố định</div>
      </router-link>
      <router-link to="/tax" class="sidebar-item" tabindex="0">
        <div class="sidebar-item__icon">
          <div class="icon-tax"></div>
        </div>
        <div class="slidebar-item-text">Thuế</div>
      </router-link>
      <router-link to="/price" class="sidebar-item" tabindex="0">
        <div class="sidebar-item__icon">
          <div class="icon-price"></div>
        </div>
        <div class="slidebar-item-text">Giá thành</div>
      </router-link>
      <router-link to="/sumary" class="sidebar-item" tabindex="0">
        <div class="sidebar-item__icon">
          <div class="icon-sum"></div>
        </div>
        <div class="slidebar-item-text">Tổng hợp</div>
      </router-link>
      <router-link to="/budget" class="sidebar-item" tabindex="0">
        <div class="sidebar-item__icon">
          <div class="icon-budget"></div>
        </div>
        <div class="slidebar-item-text">Ngân sách</div>
      </router-link>
      <router-link to="/report" class="sidebar-item" tabindex="0">
        <div class="sidebar-item__icon">
          <div class="icon-report"></div>
        </div>
        <div class="slidebar-item-text">Báo cáo</div>
      </router-link>
      <router-link to="/financial-analysis" class="sidebar-item" tabindex="0">
        <div class="sidebar-item__icon">
          <div class="icon-analysis"></div>
        </div>
        <div class="slidebar-item-text">Phân tích tài chính</div>
      </router-link>
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
