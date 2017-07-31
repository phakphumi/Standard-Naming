<template>
    <div id="app">
      <manage-header></manage-header>
      <manage-table></manage-table>
    </div>
</template>

<script>
  import ManageHeader from './components/ManageHeader'
  import ManageTable from './components/ManageTable'
  import Login from './components/login'
  import axios from 'axios'

  export default {
    name: 'app',
    components: {
      ManageHeader,
      ManageTable,
    }
  }
</script>
