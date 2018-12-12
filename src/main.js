
import Vue from 'vue'
import App from './App'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css';
import httpRequest from '@/utils/httputils.js'

import {
  Input,
  InputNumber,
  Button,
  Loading,
  Checkbox,
  Container,
  Header,
  Aside,
  Main,
  Row,
  Col,
  Table,
  TableColumn,
  Radio,
  RadioGroup,
  Select,
  Option,
  CheckboxGroup,

} from 'element-ui';
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Button);
Vue.use(Loading);
Vue.use(Checkbox);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Row);
Vue.use(Col);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(CheckboxGroup);
Vue.use(Select);
Vue.use(Option);
Vue.config.productionTip = false;
Vue.prototype.$http=httpRequest;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
