import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import "@/global.css"
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.config.productionTip = false
 
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBvHnkNh6n7uc83Jh0UIWB6sJKr2xVbYoI',
    libraries: 'places', // This is required if you use the Autocomplete plugin
    region: 'id',
    language: 'id',
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)
 
    //// If you want to set the version, you can do so:
    // v: '3.26',
  },
 
  //// If you intend to programmatically custom event listener code
  //// (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
  //// instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
  //// you might need to turn this on.
  // autobindAllEvents: false,
 
  //// If you want to manually install components, e.g.
  //// import {GmapMarker} from 'vue2-google-maps/src/components/marker'
  //// Vue.component('GmapMarker', GmapMarker)
  //// then disable the following:
  installComponents: true,
})

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')

