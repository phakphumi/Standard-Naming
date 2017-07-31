<template>
  <div id="manageHeader">
    <div class="row align-items-center">
      <banner banner-class="col-5"></banner>
      <manage-navigation navigation-class="row align-items-center offset-3 col-4"></manage-navigation>
    </div>
  </div>
</template>

<script>
import Banner from './Banner'
import ManageNavigation from './ManageNavigation'

export default {
  name: 'manageHeader',
  components: {
    Banner,
    ManageNavigation
  }
}
</script>
