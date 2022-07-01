import Vue from 'vue'
import { formatDate } from 'element-ui/src/utils/date-util'
//  自定义时间过滤器 'yyyy-MM-dd HH:mm:ss'
Vue.filter('dateFormat', value => formatDate(value, 'yyyy-MM-dd'))
Vue.filter('fullDateFormat', value => formatDate(value, 'yyyy-MM-dd HH:mm'))
Vue.filter('urlFormat', value => 'http://localhost:8080' + value)
// Vue.filter('livePushFormat', value => 'rtmp://localhost' + value)
Vue.filter('videoTypeFormat', value => {
  switch (value) {
    case 0:
      return '空类型'
    case 1:
      return '科技'
    case 2:
      return '游戏'
    case 3:
      return '校园'
    case 4:
      return '教育'
    case 5:
      return '动物'
    case 6:
      return '美食'
    case 7:
      return '番剧'
    case 8:
      return '学习'
    case 9:
      return '鬼畜'
    case 10:
      return '影视'
  }
})
