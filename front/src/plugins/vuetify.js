import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@fortawesome/fontawesome-free/css/all.css'
Vue.use(Vuetify)

const opts = {
    icons: {
      iconfont: 'fa',
    },
    theme: {
      themes: {
        light: {
            primary: '#008388',
            secondary: '#C4D600',
            accent: '#8c9eff',
            error: '#b71c1c',
        },
      },
    },
    breakpoint: {
      thresholds: {
        xs: 340,
        sm: 540,
        md: 800,
        lg: 1280,
        xl: 2000,
      },
    },
  }


export default new Vuetify(opts)