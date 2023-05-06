<template>
  <div class="header">
    <div @click="onCollapse" class="header__left">
      <div class="sidebar-item__icon icon-menu header__left-three-strips" @click="store.handleCloseSidebar"></div>
      <div class="header__left-text">
        NgocNguyen Store
      </div>
      <div class="header__left-wrapper">
        <div class="sidebar-item__icon icon-down"></div>
      </div>
    </div>

    <div class="header__right">
      <div class="sidebar-item__icon icon-notification tooltip">
        <span class="tooltiptext" style="min-width: 120px;left: -38%;">Đang phát triển</span>
      </div>
      <div class="header__right-box">
        <div class="sidebar-item__icon header__right-avt icon-avatar"></div>
        <div class="header__right-text">Nguyễn Văn Ngọc</div>
        <div class="header__left-wrapper">
          <div class="sidebar-item__icon icon-down"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  inject: ["store"],
  components: {
   
  },
  name: "TheHeader",
  data() {
    return{
      isCollapse:false
    }
  },
  methods: {
    onCollapse() {
      this.isCollapse = true
    }
  },
  
};
</script>
<style scoped>
</style>
