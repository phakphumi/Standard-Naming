<template>
    <div id="app">
      <show-header></show-header>
      <show-table></show-table>
    </div>
</template>

<script>
  import ShowHeader from './components/ShowHeader'
  import ShowTable from './components/ShowTable'

  export default {
    name: 'app',
    components: {
      ShowHeader,
      ShowTable
    }
  }
</script>
