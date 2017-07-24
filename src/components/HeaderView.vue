<template>
  <div id="headerView">
    <div class="row align-items-center">
      <banner banner-class="col-5"></banner>
      <navigation navigation-class="row align-items-center offset-3 col-4"></navigation>
    </div>
  </div>
</template>

<script>
import Banner from './Banner'
import Navigation from './Navigation'

export default {
  name: 'headerView',
  components: {
    Banner,
    Navigation
  }
}
</script>
