<template>
<div
		class="toast"
		:class="{
			'toast--success': true
		}"
	>
		<p class="toast__icon">
			<i class="toast__icon__img"></i>
		</p>
		<div class="toast__content">
			<p class="toast__content__title">
				Thành công!
			</p>
			<p class="toast__content__text">{{toastContent}}</p>
		</div>
		<div class="toast__action">
			<a class="toast__action__main" >Hoàn tác</a>
			<p class="toast__action_close" @click="$emit('closeToast')">
				<i class="toast__action_close__img"></i>
			</p>
		</div>
	</div>
</template>
<script>
export default {
  emits:["closeToast","onhideToast"],
  props:{
    toastContent:String
  },
  mounted() {
	// eslint-disable-next-line
	 setTimeout(() => {
        this.$emit("onhideToast");
    }, 2000);
  }
};
</script>
<style scoped>
</style>