<template>
  <div id="homeHeader">
    <div class="row align-items-center">
      <banner banner-class="col-5"></banner>
      <home-navigation navigation-class="row align-items-center offset-3 col-4"></home-navigation>
    </div>
  </div>
</template>

<script>
import Banner from './Banner'
import HomeNavigation from './HomeNavigation'

export default {
  name: 'homeHeader',
  components: {
    Banner,
    HomeNavigation
  }
}
</script>
