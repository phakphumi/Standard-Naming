<template>
  <div id="banner" v-bind:class="bannerClass">
    <a href="/">
      <img class="col-12" src="../assets/images/logo@2x.png">
    </a>
  </div>
</template>

<script>
export default {
  name: 'banner',
  props: {
    bannerClass: {
      type: String,
      default: 'col-5'
    }
  }
}
</script>
