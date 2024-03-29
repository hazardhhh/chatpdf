import Vue from 'vue';
import router from './router'
import App from './App.vue'

import { postRequest } from './utils/api'
import { putRequest } from './utils/api'
import { postExport } from './utils/api'
import { getRequest } from './utils/api'
import { deleteRequest } from './utils/api'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//插件形式使用请求
Vue.prototype.postRequest = postRequest
Vue.prototype.postExport = postExport
Vue.prototype.putRequest = putRequest
Vue.prototype.getRequest = getRequest
Vue.prototype.deleteRequest = deleteRequest
Vue.use(ElementUI);

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
