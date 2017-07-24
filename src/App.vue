<template>
    <div id="app">
      <header-view></header-view>
      <table-view></table-view>
    </div>
</template>

<script>
  import HeaderView from './components/HeaderView'
  import TableView from './components/TableView'
  import './assets/css/main.css'

  export default {
    name: 'app',
    components: {
      HeaderView,
      TableView
    }
  }
</script>
