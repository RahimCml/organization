import Vue from 'vue'
import App from './app.vue'
import './register-service-worker'
import router from './router'
import store from './store'
import 'normalize.css'
import 'ant-design-vue/dist/antd.css'
import { Button, Input, Row, Col, Form, Card } from 'ant-design-vue'
const components = [Button, Input, Row, Col, Form, Card]

components.forEach(c => Vue.use(c))

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
