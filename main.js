import Vue from 'vue'
import App from './App'

import store from './store'

// import AppNetWork from './components/simple-network/simple-network.vue'
// Vue.component('plus-network',AppNetWork)

Vue.config.productionTip = false

Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
