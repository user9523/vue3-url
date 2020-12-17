
import { createStore } from 'vuex'
import { updatelocal } from '../utils/utils'
import moduleSearch from './module/moduleSearch'
 
 
// 创建 store 容器实例.
const store = createStore({
    state: {
        navName: '',
        catalogue: null
    },
    mutations: {
        // 更新网页标题
       update(state,changename){
        const {key,value} = changename
        if(key === 'navname') state.navName = value
        else if(key === 'catalogue'){
            const catalogue = state.catalogue
            let length1 = catalogue.length
            for (let i = 0; i < length1; i++) {
                let currennt  = catalogue[i]
                if(currennt.id == value.id.split('.')[0]){
                    // 修改的是标签信息
                    if(currennt.id == value.id){
                        currennt.name = value.name
                        currennt.icon = value.icon
                        updatelocal(store)
                    } else {
                        let URLS =  currennt.URLS
                        let length2 = currennt.length
                        for (let j = 0; j < length2; j++) {
                            const URL = URLS[j];
                            if(URL.id == value.id){
                                URL.url = value.url
                                URL.name = value.name
                                URL.icon = value.icon
                                updatelocal(store)
                                break
                            }
                        }
                    }
                    break
                }
                
            }
        }
       },
       // 移除(根据id来移除)
       remove(state,playlod){
            const catalogue = state.catalogue
            let length1 = catalogue.length
            let iid = playlod.split('.') 
            for (let i = 0; i < length1; i++) {
                const currennt = catalogue[i]
                if(currennt.id === iid[0]){
                    // 删除标签内以及所有网址
                    catalogue.splice(i,1)
                    updatelocal(store)
                    break;
                } else {
                  // 删除标签内的某个网址  
                  let URLS = currennt.URLS
                  let length2 = URLS.length
                  for (let j = 0; j < length2; j++) {
                      let URL = URLS[j]
                      if(URL.id === playlod){
                          URLS.splice(j,1)
                          updatelocal(store)
                          break;
                      }
                      
                  }
                }
                
            }
        },
        //添加
        /**
         * store.commit('add', {
            key: '2',
            value: {
                name: state.name,
                icon: state.icon,
                url: state.url,
                whichTag: state.whichTag
            }
         */
        add(state,playlod){
            let{key,value} = playlod
            const catalogue = state.catalogue
            let length1 = catalogue.length
            // 添加标签
            if(key == '1'){
                let _id = length1 == 0 ? '1' : (+catalogue[length1 - 1].id +1).toString
                catalogue.push({
                    id: _id,
                    name: value.name,
                    icon: value.icon,
                    URLS: []
                })
                updatelocal(store)
            }
            // 添加网址 
            else if (key == '2'){
                let id = value.whichTag
                for (let i = 0; i < length1; i++) {
                    let currennt = catalogue[i]
                    if(id == currennt.id){
                       let URLS = currennt.URLS
                       let length2 = URLS.length
                       let trueId
                       if (length2 == 0) {
                           trueId = `${id}.1`
                       }else{
                        let lastId = URLS[length2 - 1].id.split('.')
                            lastId[1] = (+lastId[1] + 1).toString()
                            trueId = lastId.join('.')
                       }
                       URLS.push({
                        id: trueId,
                        url: value.url,
                        icon: value.icon,
                        name: value.name
                       })
                       updatelocal(store)
                       break
                    } 
                }
            }
        }
    },
    modules: {
        // moduleTab,
        // moduleUrl,
        moduleSearch
    }
})
 
 
export default store
// const app = createApp({ /* your root component */ })
 
 
// // 通过 use 注册插件
// app.use(store)