<template>
  <div class="copyright">
    Copyright ©
    {{ new Date().getFullYear() + ' ' + $store.state.meta.copyright }}
  </div>
</template>

<script>
export default {
  name: 'copyright'
}
</script>
<style scoped>
.copyright {
  color: rgba(0, 0, 0, 0.45);
  font-size: 14px;
  text-align: center;
  line-height: 50px;
}
</style>
