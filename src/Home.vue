<template>
    <div id="app">
      <home-header></home-header>
      <table-view></table-view>
    </div>
</template>

<script>
  import HomeHeader from './components/HomeHeader'
  import TableView from './components/TableView'

  export default {
    name: 'app',
    components: {
      HomeHeader,
      TableView
    }
  }
</script>
