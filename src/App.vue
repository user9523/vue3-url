<template>
  <div id="app">
  <tab></tab>
  <mian></mian>
  </div> 
</template>

<script>
import Tab from './view/tab/tab.vue'
import Mian from './view/mian/mian.vue'
import {useStore} from 'vuex'
import {updateTovuex} from './utils/utils'
import {createMessage} from './components/lp-message/lp-message.js'
import {createDialog } from './components/lp-dialog/lp-dialog.js'
import {provide }from 'vue'


export default {
  name: 'App',
  components: {
    Tab,
    Mian
  },
  setup(){
    // 自执行
    (function setInfos(){
      console.log(window.localStorage.navInfos)
      // 清空缓存
      // localStorage.clear()
      const store = useStore()
      if(window.localStorage.isSet === 'true'){
        updateTovuex(store,JSON.parse(window.localStorage.navInfos))
      }         // 自动设置默认信息
        else {
            let obj = {
            navName: "SEO",
            catalogue : [
                {id:'1' , name: "常用网站", icon: "align-justify", URLS: [
                  {id:'1.1' , url: 'http://www.baidu.com', icon: 'http://www.baidu.com/favicon.ico', name: '百度'},
                  {id:'1.3', url: 'https://juejin.im/', icon: 'https://b-gold-cdn.xitu.io/favicons/v2/favicon.ico', name: '掘金'},
                  {id:'1.4', url: 'https://gitee.com/', icon: 'https://gitee.com/assets/favicon.ico', name: '码云'},
                ]},
                {id:'2' , name: "实用工具", icon: "bookmark", URLS: []},
                {id:'3' , name: "娱乐影视", icon: "blog", URLS: []}
            ]
            }
            window.localStorage.navInfos = JSON.stringify(obj)
            window.localStorage.isSet = 'true'
            writeToVuex(store, obj)
        }
    })()
    // 全局注册组件
    provide('message', createMessage)
    provide('confirm', createDialog)
    return{
    }
  }
}

</script>

<style type="module" scoped>

</style>
