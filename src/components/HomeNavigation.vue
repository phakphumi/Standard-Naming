<template>
  <div id="navigation" v-bind:class="navigationClass" class="navigation">
    <div class="offset-1 col-5">
      <a class="nav-gray" href="/show">Show All</a>
    </div>
    <div class="col-6">
      <a class="nav-blue" href="/manage">Manage Data</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'navigation',
  props: {
    navigationClass: {
      type: String,
      default: 'offset-3 col-4'
    }
  }
}
</script>
