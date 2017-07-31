// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import Lodash from 'lodash'
import VueClipboards from 'vue-clipboards'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import DataTables from 'vue-data-tables'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'


import Home from './Home'
import Show from './Show'
import Manage from './Manage'

import './assets/css/main.css'

Vue.use(BootstrapVue)
Vue.use(Lodash)
Vue.use(VueClipboards)
Vue.use(ElementUI)
Vue.use(DataTables)
  
locale.use(lang)

Vue.config.productionTip = false

const notFound = { 
  template: '<p>Page not found</p>' 
}
const home = { 
  template: '<Home/>', 
  components: {
    Home
  }
}
const show = { 
  template: '<Show/>',
  components: {
    Show
  }
}
const manage = { 
  template: '<Manage/>',
  components: {
    Manage
  }
}

const routes = {
  '/': home,
  '/show': show,
  '/manage': manage
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: {
    currentRoute: window.location.pathname
  },
  computed: {
    ViewComponent () {
      return routes[this.currentRoute] || notFound
    }
  },
  render (h) { 
    return h(this.ViewComponent) 
  }
})
