<template>
  <div id="showHeader">
    <div class="row align-items-center">
      <banner banner-class="col-5"></banner>
      <show-navigation navigation-class="row align-items-center offset-3 col-4"></show-navigation>
    </div>
  </div>
</template>

<script>
import Banner from './Banner'
import ShowNavigation from './ShowNavigation'

export default {
  name: 'showHeader',
  components: {
    Banner,
    ShowNavigation
  }
}
</script>
