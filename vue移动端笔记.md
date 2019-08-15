

# vue-项目二-笔记



`说明`:vuex铺垫+vue项目讲解

`内容说明`:本文件为vue项目二的所有笔记,包含

1. vuex笔记
2. 项目的笔记

`备注`

1. 授课内容**以笔记为主**,每天的重点都叠加在本文件中
2. 讲义供参考,链接为
   1. [vuex讲义](https://vuejs.lipengzhou.com/12-vuex.html)
   2. [移动端项目讲义](https://vuejs.lipengzhou.com/topline-mobile/)



# vuex-笔记



## 00-基础01-vuex-介绍-特点-场景

`回顾`: 组件通信

1. 父传子 props

2. 子传父 this.$on和this.$emit

3. 不相关组件 eventbus.js

   

[vuex官网](https://vuex.vuejs.org/zh/)

`Vuex是什么和特点`: 

1. Vuex是Vue的插件Vue.user()
2. Vuex作用:状态管理->管理状态->管理数据->声明数据+修改数据
3. 场景:

   1. 一个项目的组件数量很多40+ ,接口数量200+
   2. 如果你用学过的组件通信的方式可以简单的解决问题,那就没必要使用vuex


`注意`: vuex不要随便使用



## 00-基础02-vuex-管理流程

`目的`: 了解指导 vuex插件管理数据的流程是什么?

`组成`

1. state->**声明**多个组件共享使用的响应式**数据**
2. actions->和后台交互,返回新数据
3. mutations->修改state

`注意`: 

1. vuex不要乱用!!
2. 如果使用vuex,那么数据的声明和修改必须按照流程去写
3. 文档中的图非常重要!!!



1. Vuex的核心组成部分:state/actions/mutations
2. state/actions/mutations都是对象
3. vuex的[管理流程](https://vuex.vuejs.org/zh/)非常重要->用自己的语言进行描述

## 00-基础03-vuex-配置

`目的`: 在vue项目中配置vuex插件

`步骤`

1. vue create vuexdemo

2. npm i vuex

3. 配置

   1. 引入和配置插件
   2. 实例化store
   3. 注册store

   ```js
   // main.js
   import Vue from 'vue'
   import App from './App.vue'
   import Vuex from 'vuex'
   Vue.use(Vuex)
   
   const store = new Vuex.Store({
     state: {
       count: 0
     },
     mutations: {
       increment(state) {
         state.count++
       }
     }
   })
   
   Vue.config.productionTip = false
   
   new Vue({
     render: h => h(App),
     store
   }).$mount('#app')
   ```

`注意`: 以上代码不需要关心细节,state/mutations/actions的用法和写法暂时不用管



## 00-基础04-vuex-state和mapState

`目的`:研究vuex中的核心组成部分的state的用法

`代码`

`main.js`

```js
import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    // state是对象
    // 1. state声明数据
    state: {
        count: 100,
        age: 200
    }
})

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    store
}).$mount('#app')
```

`组件中`->使用数据

```js
import { mapState } from 'vuex'

export default {
  name: 'app',
  components: {
    Child
  },
 
  // 把vuex的state的数据映射(改为)为当前组件的computed
  computed: {
    // 简化语法
    ...mapState(['count'])
    // 上面简化语法的编译结果
    // count() {
    //   return this.$store.state.count
    // },
  }
}

```

`注意`

1. state的使用有很多写法,这里推荐使用...mapState(['count'])
2. state中的数据修改为组件的计算属性数据





## 00-基础05-vuex-mutations和mapMutations

`目的`: 研究vuex核心组成部分中mutations的用法

`步骤`

1. mutations中声名方法
2. 在组件中使用mutations里面的方法

`代码`

`main.js`

```js
    // mutations
    // 1. mutations是对象
    // 2. mutations对象中保存的是方法
    // 3.  mutations对象中保存的是方法的作用修改state
    // 4. mutations中的方法默认传递形参state
    mutations: {
        setCount(state, payload) {
            console.log('setCount-------', payload)
            state.count = 300
        }
    }
```

`组件中`

```js
methods: {
    // mutations的用法
    // 1. 映射为组件的methods
    // 2. 可以利用vuex的辅助函数mapMutations简化下面的代码
    ...mapMutations(['setCount'])
    // setCount() {
    // this.$store.commit('setCount')
    // this.$store.commit('setCount', '自己的实参')
    // }
  }
```

`注意`

1. mutations作用写是修改state的方法fn
2. fn有默认形参state
3. fn映射为组件methods
4. ...mapMutations(['fn'])





## 00-基础06-vuex-actions和mapActions

`目的`:研究vuex核心组成部分中actions的用法

`步骤`

1. 在actions中声名方法
2. actions中的方法作用:是和后台交互 把新数据提交给mutations
3. 在组件中使用actions方法

`代码`

`main.js`

```js
 // actions
    // 1. actions是对象
    // 2. acitons里面写的是异步方法
    // 3. actions中的方法写的是和后台交互的请求
    // 3.1 应该写的是ajax -> 测试很麻烦
    // 3.2 ajax是异步的
    // 3.3 常见的异步有?
    //   3.3.1 ajax
    //   3.3.2 定时器
    //   3.3.3 所有事件
    //   3.3.4 操作数据库(增删改查)
    // 4. actions中的方法默认传递store,这里的context形参就是store
    actions: {
        acSetCount(context) {
            console.log('actions中的方法被触发------')

            setTimeout(() => {
                // 1. 新数据
                const newCount = 1000
                    // 2. 把新数据通过commit方式交给mutations中的方法
                context.commit('setCount', newCount)
            }, 1000)
        }
    }
```

`组件中`

```js
import { mapState, mapMutations, mapActions } from 'vuex'
  
methods:{
    ...mapActions(['acSetCount'])
}
```

`注意`

1. actions中写的是异步方法
2. actions中方法作用是获取新数据 commit给mutations
3. mutations写的是同步方法->注意:可以写异步方法,但是有问题!
4. 常见的异步的情况
   1. ajax/axios....
   2. 定时器
   3. 事件
   4. 操作数据库
5. 所有异步特点: 后续代码不等待
6. 解决上述的方法
   1. 回调函数callback->cb
   2. Promise
   3. async+await





## 00-基础07-vuex-总结

`vuex的重点`

1. vuex是vue的插件
2. vuex作用管理状态
3. 场景:复杂的Vue的SPA项目
   1. 40+的组件 || 200+接口
   2. 如果学过的三种通信方式可以解决,就不需要使用vuex
4. 核心组成:state  mutations actions
5. state-> 声明多个组件共享的响应式数据    ------->  组件的computed
6. mutations->修改state的同步方法  --------> 组件的mothods
7. actions->异步获取结果,交给mutations的方法 --------> 组件的methods
8. 利用vuex的辅助函数mapState mapMutations mapActions可以简化代码 ->   ...mapState([''])
9. vuex管理流程->和vue钩子函数一样重要->面试必问!

`提示`: 代码不是重点->代码记忆的过程







# 移动端项目-笔记

## day01

### 01-项目-准备-功能演示

`学习目的`

1. 熟悉使用Vue基础阶段所学知识开发Vue移动端网站
2. 掌握在Vue开发中合理使用Vuex进行状态管理-> 其实这里不适合使用vuex,为了学习,所有使用
3. 熟悉移动端网站开发所需技术 -> rem
   1. 移动端适配:
      1. 系统
         1. 苹果
            1. iOS8/9/10...
               1. 不同浏览器
               2. 浏览器的版本
         2. 安卓
            1. 安卓系统4/5/9+
            2. 厂商
         3. 微软

`技术栈`

Vue+VueRouter+VantUI+Vuex+axios+vue-cli+其他插件

`功能拆分`

1. 登录
2. 首页
   1. 频道
      1. 频道列表
      2. 文章列表
         1. 更多操作
      3. 搜索文章
3. 我的
   1. 信息展示
   2. 头像处理
   3. 上传头像
   4. 编辑头像

`提示`

1. 本项目是所有阶段难度最大的项目
2. 本项目的业务场景贴近实际开发场景
3. 把精力放在业务上,而不是样式和布局上
4. 课后,自己尝试梳理每个业务的逻辑
5. 项目中重复的场景不进行重复讲解

`注意`: 项目的效果参考:头条app / uc头条 / 网易新闻 资讯类的app/网站

### 02-项目-准备-项目准备素材说明

`接口文档`->线上接口->网络原因-可能慢

`UI素材`->设计稿psd文件+交互稿+产品需求文档[prd文件](http://www.woshipm.com/rp/853599.html)

1. 设计稿->静态图(尺寸色号字号等)
2. 交互稿->交互效果(点击 滑动等)
   1. UI->用户页面设计师
   2. UE->用户体验设计师
3. prd->业务逻辑!!!!!!

`组件库`-> [VantUI](https://youzan.github.io/vant/#/zh-CN/intro)

​	[文档的集合链接](https://docschina.org/)



`提示`->02-其他资源

1. 第三方包资源->当前项目编码所需的所有包资源和package.json和package-lock.json
2. topline-mobile压缩包->完整代码



### 03-项目-初始化-vue-cli 创建项目结构

`快速生成项目目录`

`步骤`

1. 前提:安装完毕@vue/cli3+版本

2. 进入到期望项目所在的目录,打开cmd

3. 使用vue脚手架指令创建项目

   ```shell
   vue create hmnewspm
   ```

4. 进入到项目目录

   ```shell
   cd hm news
   ```

5. 启动项目

   ```shell
   npm run serve
   ```

`注意` :项目文件名最好不要有中文,不要有特殊含义,比如不可命名为vue、webpack、npm等

### 04-项目-初始化-项目目录说明和调整

`目的`:删除无用文件和代码并且设计项目的目录结构

`默认生成的项目目录结构`

```t
├── babel.config.js	babel配置文件
├── package-lock.json	npm相关文件
├── package.json	npm相关文件
├── postcss.config.js	postcss配置文件
├── public	静态资源托管目录
│   ├── favicon.ico
│   └── index.html
├── README.md	项目说明文件
└── src	源码
    ├── App.vue	根组件
    ├── assets	资源目录
    ├── components	组件目录
    ├── main.js	入口文件
    ├── router.js	路由模块
    ├── store.js	vuex容器模块
    └── views  视图组件目录
```

`调整之后的项目目录`

```
├── babel.config.js	babel配置文件
├── package-lock.json	npm相关文件
├── package.json	npm相关文件
├── postcss.config.js	postcss配置文件
├── public	静态资源托管目录
│   ├── favicon.ico
│   └── index.html
├── README.md	项目说明文件
└── src	源码
    ├── api	请求接口封装模块
    ├── App.vue	根组件
    ├── assets	资源目录
    ├── main.js	入口文件
    ├── router	路由模块
    ├── store	 Vuex容器模块
    ├── styles 样式目录
    ├── utils  工具模块目录
    └── views  视图组件目录
```

`注意`:

1. 按照专业的做法设置项目的目录结构,暂时不用关心每个文件夹应该放什么文件
2. 运行初始化之后,运行项目,如果直接报错sockio,可以忽略,不影响代码编写!



### 05-项目-初始化-vant-介绍

`前端文档的集合`->[链接](https://docschina.org/)

`使用主流Vue移动端组件库Vant开发项目`->[Vant](https://youzan.github.io/vant/#/zh-CN/intro) 

其他常用的Vue移动端开发UI组件库

1. [Mint-UI](http://mint-ui.github.io/#!/zh-cn)
2. [cube-ui](https://didi.github.io/cube-ui/)
3. [Vux](https://vux.li/)

`注意`: 实际开发时 用什么组件库不一定

### 06-项目-初始化-vant-安装-引入

`目的`:在项目中引入vant组件库

`步骤` 

1. 安装

   ```shell
   npm i vant -S
   ```

2. 完整引入(main.js)

   ```js
   import Vue from 'vue'
   import Vant from 'vant'
   import 'vant/lib/index.css'
   
   Vue.use(Vant)
   ```

3. 测试组件(App.vue)

   ```html
   <template>
     <div id="app">
       <h1>App----</h1>
       <van-button type="default">默认按钮</van-button>
       <router-view />
     </div>
   </template>
   ```

**提示:**vant有多种引入方式,这里采用的是完整引入,比较方便

### 07-项目-初始化-git-版本控制

`目的`:使用版本控制工具git管理项目代码

`步骤`

```shell
git init
git add .
git commit -m "初始化项目"
// 在代码托管平台github新建项目 项目名为hmnewsproject
git remote add origin https://github.com/自己的账号/hmnewsproject.git
git push -u origin master
```

`提示`:之后每次完成一个功能就 git add .和git commit -m "注释",最后git push



### 08-项目-初始化-REM适配-基础配置

`目的`:在布局之前,对REM进行配置,以适配移动端网站

`位置`:Vant文档->快速上手->其他->Rem适配-> 

	1. 转换单位
	2. 设置font-size

`步骤` 

1. [postcss-pxtorem](https://github.com/cuth/postcss-pxtorem) 是一款 postcss 插件，用于将px单位转化为 rem

   1. 安装

      ```shell
      npm install postcss-pxtorem --save-dev
      ```

   2. 配置 postcss.config.js

      ```js
      module.exports = {
        plugins: {
          autoprefixer: {},
          'postcss-pxtorem': {
            rootValue: 37.5,
            propList: ['*']
          }
        }
      }
      
      ```

   `提示`:此时页面的px单位会自动转换成rem单位

2. [lib-flexible](https://github.com/amfe/lib-flexible) 用于设置 rem 基准值 也就是设置font-size

   1. 安装

      ```shell
      npm i -S amfe-flexible
      ```

   2. 引入 main.js

      ```js
      import 'amfe-flexible/index.min.js'
      ```


   `提示`:此时,审查元素会看到切换不同设备时,html的font-size会自动进行设置

### 09-项目-初始化-REM适配-动态rootValue

`目前的问题:`

1. Vant的rootValue为37.5->VantUI的设计稿的参照尺寸是375
2. 设计稿rootValue为75

`解决方案(两种)` 

1. posttorem的rootValue仍然为37.5,设计稿尺寸除以2作为css的px尺寸

   `postcss.config.js` 

   ```js
   module.exports = {
     plugins: {
       autoprefixer: {},
       'postcss-pxtorem': {
         rootValue: 37.5,
         propList: ['*']
       }
     }
   }
   
   ```

   `App.vue->style`

   ```css
   .box {
     // 设计稿尺寸为750,除以2作为px值
     width: 375px;
     height: 200px;
     background-color: yellow;
   }
   ```

2. 将rootValue设置为动态的值->[解决方案链接](https://github.com/youzan/vant/issues) 

   `postcss.config.js` 

   ```js
   const {
     sep
   } = require('path')
   
   module.exports = ({
     file
   }) => {
     let rootValue = file.dirname.indexOf(`node_modules${sep}vant`) !== -1 ?
       37.5 :
       75
   
     return {
       plugins: {
         autoprefixer: {},
         'postcss-pxtorem': {
           rootValue,
           propList: ['*']
         }
       }
     }
   }
   
   ```

`注意` 这里推荐使用第二种解决方案,根据不同情况设置不同的rootValue值

1. 使用Vant组件 不影响
2. 自己的标签使用设计稿尺寸(不用除2)
3. 开发中常用的设计稿的尺寸通常是750





### 10-项目-配置路由-登录和首页

`目的` :把基本的路由配置完毕,将登录login组件和首页home组件进行渲染

`步骤`

1. 新建组件home和login
2. 配置路由
3. 显示组件

`注意`: component的写法

## day02

### 01-项目-登录-页面布局

`目的`

1. 新建组件login和home,配置路由
2. 将登陆组件进行布局 form
3. 提供登录按钮
4. 配置数据mobile和code

`代码`

`login/index.vue`

```vue
<template>
<div class="login-wrap">
    <!--关键字: 导航-->
  <van-nav-bar title="登录" />
  <form action="/" method="POST">
    <van-cell-group>
      <van-field v-model="user.mobile" required clearable label="手机号"  placeholder="请输入手机号"  />
      <van-field v-model="user.code" type="password" label="密码" placeholder="请输入密码" required />
    </van-cell-group>
    <van-button type="info" block>登录</van-button>
  </form>
</div>
</template>

<script>
export default {
  name:'LoginIndex',
  data() {
    return {
      user: {
        mobile: '',
        code: ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>

```

`styles/index.less`

```less
.van-nav-bar {
    background-color: #0096fa;

    .van-nav-bar__title {
        color: white;
    }
}
```



### 02-项目-登录-发送请求

`目的` :使用axios发送登录请求

`步骤`

1. 安装axios
2. 引入axios
3. 为登录按钮绑定事件
4. 发送post请求

`代码`

```js
export default {
  name: 'LoginIndex',
  data() {
    return {
      user: {
        mobile: '18801185985',
        code: '246810'
      }
    }
  },
  methods: {
    async handleLogin() {
      const res = await axios({
        method: 'POST',
        url: `http://ttapi.research.itcast.cn/app/v1_0/authorizations`,
        data: this.user
      })
      console.log(res)
    }
  }
}
```

`注意` 

1. 测试账号用户名为18801185985 密码为246810
2. 不要忘记阻止表单默认行为@click.prevent
3. 看接口文档 判断当前请求是否需要参数this.user



### 03-项目-优化-封装request请求模块

`目的`: 封装请求模块,配置baseURL

`步骤`

1. 新建utils/request.js 导入axios
2. 设置baseURL、请求拦截器、响应拦截器
3. 导出request模块

`代码`

```js
import axios from 'axios'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn''
})

request.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})

request.interceptors.response.use(function (response) {
  // 如果响应结果对象中有 data，则直接返回这个 data 数据
  // 如果响应结果对象中没有 data，则不作任何处理，直接原样返回这个数据
  return response.data.data || response.data
}, function (error) {
  return Promise.reject(error)
})

export default request

```

`注意`:

1. 以上代码不需要编写,因为基本都来源于[axios文档](https://www.kancloud.cn/yunye/axios/234845) ,直接复制
2. 代码中的request对象和axios对象作用一样,都可以用来发送请求

### 04-项目-优化-封装api请求模块

`目的`:把用户相关的数据请求都封装到api模块中

`步骤`

1. 新建api/user.js模块
2. 导入request模块
3. 封装登录请求的方法
4. 导出模块
5. 在login/index.vue发送请求

`代码`

```js
/**
 * 用户相关接口封装模块
 * 最佳实践：建议将所有请求都封装成一个一个的小函数，在需要的时候直接调用
 *   好处：1. 好维护，统一管理 2. 可重用
 * 遵循一个原则：不要直接在组件中发请求，最好都封装成函数进行调用
 */
import request from '@/utils/request.js'

export const login = ({
  mobile,
  code
}) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data: {
      mobile,
      code
    }
  })
}

```

`login/index.vue`->js部分

```js
import { login } from '@/api/user'
```

```js
// 以下代码在methods中 
async handleLogin() {
      try {
        const data = await login(this.user)
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
```



### 05-项目-优化-封装auth模块-本地存储

`目的`: 将登录请求返回的token进行本地存储

`步骤`

1. 新建utils/auth.js模块
2. 实现并导出set/get/remove token 的方法

`代码`

```js
const USER_KEY = 'user'
export const getUser = () => JSON.parse(window.localStorage.getItem(USER_KEY))

export const setUser = (data) => window.localStorage.setItem(USER_KEY, JSON.stringify(data))

export const removeUser = () => window.localStorage.removeItem(USER_KEY)

```

`注意`:

1. 不要忘记JSON.stringfy()和JSON.parse()
2. 原来使用本地持久化->本地存储->localStorage



### 06-项目-登录-配置Vuex

`目的`: 在项目中配置vuex

`步骤`

1. 安装vuex   -> npm i vuex
2. 新建store/index.js
3. 配置Vuex
4. 设置state/mutations/actions
5. 在main.js中导入并且配置store

```js
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {

  }
})
export default store

```

```js
// main.js
import store from './store'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

```

`注意`: 以上代码完成了vuex的配置

### 07-项目-登录-将token进行状态管理

`目的`: 使用Vuex将token保存,方便在多个组件内共享使用

`步骤`

1. 导入auth模块->用于本地存储的模块auth.js
2. 设置state/mutations
3. 登录成功,提交mutations

`代码`

`store.js`

```js
import Vue from 'vue'
import Vuex from 'vuex'
import * as auth from '@/utils/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 初始化的时候从本地存储获取数据，防止刷新丢失 token
    user: auth.getUser()
  },
  mutations: {
    /**
     * 登录成功，调用 mutation 更新容器中的 user 的状态
     */
    setUser(state, data) {
      // 修改state
      state.user = data

      // 将数据放到本地存储
      auth.setUser(state.user)
    }
  }
})

```

`login/index.vue`

```js
async handleLogin() {
      try {
        const data = await login(this.user)
        console.log(data)
        this.$store.commit('setUser', data)
      } catch (error) {
        console.log(error)
      }
    }
```

`注意`: 

1. 调试可以用try--catch--
2. 如果本地存储中有token数据,证明代码没问题



### 08-项目-登录-表单验证-配置和测试

`目的`: 对登录表单数据格式进行验证

`分析`

1. Vant是否有?->没有
2. 自己写->
   1. 自己写Vue插件
   2. 为Vant增加一个插件
   3. 原生js->把js文件变成插件
3. Vue[其他插件](https://github.com/vuejs/awesome-vue#validation)?->[vv验证插件](https://baianat.github.io/vee-validate/guide/) 
   1. vue官网->外联到github->vue开发中常用的插件->validate

`代码`

`main.js`

```js
import VeeValidate, { Validator } from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'

Vue.use(VeeValidate)

Validator.localize('zh_CN', zh_CN)

// 自定义规则
Validator.extend('mobile', {
    getMessage: field => '请输入正确的手机号码',
    validate: value =>
        value.length === 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
})

```

`test/index.vue`

```html
 <div>
    <!--
      1. 使用v-validate指令 值为规则名
      2. 设置name属性
      3. 错误提示 errors.first('name属性值')
     -->
    <!-- <input v-validate="'required|email'" name="aaa" type="text">
    <span>{{ errors.first('aaa') }}</span> -->

    <input v-validate="'required|mobile'" name="phone" type="text">
    <span>{{ errors.first('phone') }}</span>  

  </div>
```

`注意`

1. 找文档->快速找demo
2. 本地化->  把提示换成汉语
3. 注意代码顺序

### 09-项目-登录-表单验证-完成

`目的` :  使用vv插件完成项目中的登录表单验证

`步骤`

1. main.js 引入和配置
2. login/index.vue中配置
3. 点击登录按钮,提交表单[进行验证](https://baianat.github.io/vee-validate/guide/events.html#disabling-events-validation) 

`代码`

`login/index.vue`

```html
<form action="/" method="post">
    <van-cell-group>
        <van-field v-validate="'required|phone'" name="phone" :error-message="errors.first('phone')" v-model="form.mobile" required label="手机号" placeholder="请输入手机号" clearable />
        <van-field v-model="form.code" required label="验证码" placeholder="请输入验证码" type="password" />
    </van-cell-group>
    <van-button type="info" block @click.prevent="handleLogin">登录</van-button>
</form>
```

```js
async handleLogin() {
    try {
        this.$validator.validate().then(async valid => {
            if (!valid) {
                return 
            }
            const data = await login(this.user)
            console.log(data)
            this.$store.commit('setUser', data)
        });

    } catch (error) {
        console.log(error)
    }
}
```

### 10-项目-登录-加载提示

`目的`: 设置登录按钮loading加载动画

`步骤`

1. 为van-button设置loading属性
2. 提供loading属性的数据,默认值为false
3. 在验证前后修改布尔值

`代码`

```js
// login/index.vue/script/methods 
 async handleLogin() {
      this.loading = true
      const valid = await this.$validator.validate()
      if (!valid) {
        this.loading = false
        return
      }
      try {
        const data = await login(this.form)
        console.log(data)
        this.$store.commit('saveUser', data)
        this.$router.push({ path: '/' })
      } catch (error) {
        console.log(error)
      }
      this.loading = false
    }
```

`提示`: 最快的动画方案loading动画->img src="loading.gif"



小结`->点击登录按钮后,做了如下操作

1. 加载提示loading
2. 表单验证->VV插件->是为了告诉你如何使用小插件
   1. 应该达到的能力是: 知道包名等于会用
3. 发送请求
   1. request.js->配置axios
   2. api/user.js->发送请求的api
   3. auth.js->本地存储token
   4. store.js->共享token
4. 处理响应
   1. token持久化
   2. 跳转到首页home



### 11-项目-首页-功能拆分

头部（[NavBar 导航栏](https://youzan.github.io/vant/#/zh-CN/nav-bar)）

底部导航（[Tabbar 标签栏](https://youzan.github.io/vant/#/zh-CN/tabbar)）

频道列表（[Tab 标签页](https://youzan.github.io/vant/#/zh-CN/tab)）

文章列表（[List 列表](https://youzan.github.io/vant/#/zh-CN/list)）

 	1. 滚动
	2. 加载更多
	3. 下拉刷新

文章列表（[PullRefresh 下拉刷新](https://youzan.github.io/vant/#/zh-CN/pull-refresh)）

`js基本功`

1. 冒泡排序
2. 无限滚动轮播图
3. tab切换
4. 分页pagenum pagesize total
5. 分页和下拉刷新|加载更多的逻辑完全一样



### 12-项目-首页-NavBar和TabBar-嵌套路由

`目的`:配置NavBar和TabBar,层级结构为

1. login
2. tabbar
   1. home
      1. navbar导航
      2. tab栏
      3. list列表+下拉刷新+加载更多
   2. mine

`步骤`

1. 新建公共布局组件views/tabbar-layout/index.vue,添加配置tabbar组件
2. router.js配置路由
3. home/index.vue设置navbar

`代码`

`views/tabbar-layout/index.vue`

```vue
<template>
  <div>
    <router-view></router-view>
    <!-- 底部-tabbar
    首页 /
    我的 /mine
     -->
    <van-tabbar active-color="#07c160" inactive-color="#000" v-model="activeIndex" route>
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="search" to="/mine">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
```

`router.js`

```js
routes: [{
            path: '/',
            component: () =>
                import ('@/views/layout/tabbar-layout.vue'),
            children: [{
                path: '/',
                name: 'home',
                component: () =>
                    import ('@/views/home')
            }]
        },
        {
            path: '/login',
            name: 'login',
            component: () =>
                import ('@/views/login')
        }]
```

`home/index.vue`

```vue
<template>
  <div>
    <!-- 导航-navbar -->
    <van-nav-bar title="首页|搜索" />

  </div>
</template>

<script>
export default {
  name: 'HomeIndex',
  components: {},
  data() {
    return {}
  }
}
</script>

<style lang='less' scoped>
</style>

```



### 13-项目-首页-内容布局-标签页列表下拉刷新

`目的`: 完成home/index.vue的内容区域的布局

`步骤`

1. 配置标签页组件van-tab 
2. 配置列表van-list 组件
3. 配置下拉刷新组件
4. 配置数据

`代码`

```vue
<template>
  <div>
    <!-- 导航-navbar -->
    <van-nav-bar title="首页|搜索" />
    <!--
      内容
      1. 标签页
      2. 列表
     -->
    <van-tabs class="channel-tabs" v-model="activeChannelIndex">
      <van-tab title="推荐">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">

          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell v-for="item in list" :key="item" :title="item" />
          </van-list>
        </van-pull-refresh>

      </van-tab>
    </van-tabs>

  </div>
</template>

<script>
export default {
  name: 'HomeIndex',
  components: {},
  data() {
    return {
      activeChannelIndex: 0,
      list: [],
      loading: false,
      finished: false,
      count: 0,
      isLoading: false
    }
  },
  methods: {
      onRefresh() {
        setTimeout(() => {
          this.$toast('刷新成功')
          this.isLoading = false
        }, 500)
      },
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 500)
    }
  }
}
</script>

<style lang='less' scoped>
.channel-tabs {
  margin-bottom: 100px;
}
</style>

```

### 14-项目-首页-内容-样式调整

`目的`:将首页的内容区域进行样式调整

1. 吸顶(导航和标签页固定定位)
2. 底部距离

`代码`

```vue
<template>
  <div>
    <!-- 导航-navbar -->
    <van-nav-bar title="首页|搜索" fixed/>
    <!--
      内容
      1. 标签页
      2. 列表
     -->
    <van-tabs class="channel-tabs" v-model="activeTab">
      <van-tab title="推荐">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell v-for="item in list" :key="item" :title="item" />
          </van-list>
        </van-pull-refresh>

      </van-tab>
    </van-tabs>

  </div>
</template>

<script>
// 省略
</script>

<style lang='less' scoped>
.channel-tabs {
  margin-bottom: 100px;
}
.channel-tabs /deep/ .van-tabs__wrap {
  position: fixed;
  top: 92px;
}
.channel-tabs /deep/ .van-tabs__content {
  margin-top: 92px;
}
</style>

```

`注意`:

1. 这里用到了[深度作用选择器](https://vue-loader.vuejs.org/zh/guide/scoped-css.html#%E6%B7%B1%E5%BA%A6%E4%BD%9C%E7%94%A8%E9%80%89%E6%8B%A9%E5%99%A8)
2. 注意css中的像素值

### 15-项目-首页-频道列表-分析

`分析`

1. 登录与否
   1. 已登录->请求该用户的频道列表数据->发送请求
   2. 未登录->是否有本地数据
      1. 有->加载
      2. 没有->获取推荐的频道列表数据->发送请求

`注意`

发送的请求为同一个请求,区别是在请求头中是否设置token



![5d26caaae4b0d16653fcc22e](/assets/5d26caaae4b0d16653fcc22e.png) 

### 16-项目-首页-频道列表-获取频道数据

`目的`:根据用户是否登录来获取对应的频道数据

`步骤`

1. api/channel.js->根据接口文档封装请求方法
2. home/index.vue->提供频道列表数据的保存容器channels
3. home/index.vue->methods封装方法调用api方法,赋值给channels数据
4. home/index.vue->created中调用methods中的方法

`代码`:

`api/channel.js`

```js
/**
 * 首页频道相关的请求函数
 */
import request from '@/utils/request.js'

/**
 * 获取首页频道资讯列表
 * 已登录(设置请求头 token) 用户关注的频道的列表
 * 未登录 默认列表
 */
export const getChannelsDefaultOrUser = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}

```

`home/index.vue`->script->

1. 新增data中的数据channels
2. 新增methods方法loadChannels
3. 导入api/channels模块
4. created中调用loadChannels方法

```js
// methods中 
async loadChannels() {
      const data = await getChannelsDefaultOrUser()
      this.channels = data.channels
    },
```



## day03

### 01-项目-首页-频道列表-设置请求头

`目的`: 根据请求是否为登录请求而设置请求头

`request.js`

```js
import store from '@/store.js'

request.interceptors.request.use(
    function(config) {
        if (config.url !== '/app/v1_0/authorizations') {
            const { user } = store.state
            user && (config.headers.Authorization = `Bearer ${user.token}`)
        }
        return config
    },
    function(error) {
        return Promise.reject(error)
    }
)
```

`另一种写法`

```js
       // 利用逻辑运算符简化if嵌套
        config.url !== '/app/v1_0/authorizations' &&
            user &&
            (config.headers.Authorization = `Bearer ${user.token}`)

```



### 02-项目-首页-频道列表-设置条件-渲染视图

`目的`:根据用户是否登录和是否有本地存储的数据去给data中的channels赋值

`步骤`

1. 判断用户是否登录
2. 判断是否有本地数据
3. 给this.channels赋值
4. v-for渲染数据

`代码`

```html
      <van-tab v-for="(item) in channels" :key="item.id" :title="item.name">
	<!--其余省略-->
```

```js
// home/index.vue->methods中   
 async loadChannels() {
      const { user } = store.state
      // 如果用户未登录
      if (!user) {
        const localChannels = JSON.parse(
          window.localStorage.getItem('channels')
        )
        // 如果有本地数据
        if (localChannels) {
          this.channels = localChannels
        } else {
          // 如果没有本地数据
          const data = await getChannelsDefaultOrUser()
          this.channels = data.channels
        }
      } else {
        // 如果用户已登录
        const data = await getChannelsDefaultOrUser()
        this.channels = data.channels
      }
    },
```

`另外一种写法`

```js

```

`注意`:利用|| && 可以简化if结构

### 03-项目-首页-文章列表-封装api

`封装获取文章列表数据的请求`->api/article.js

```js
/**
 * 首页频道列表的请求函数
 */
import request from '@/utils/request.js'

/**
 * 获取首页频道文章列表
 */
export const getArticles = ({
  channelId: channel_id,
  timestamp,
  withTop: with_top
}) => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params: {
      channel_id, // 频道ID
      timestamp, // 时间戳整数 单位毫秒 时间戳， 请求新的推荐数据传当前的时间戳， 请求历史推荐传指定的时间戳
      with_top // 0 或1 是否包含置顶， 进入页面第一次请求时要包含置顶文章， 1 - 包含置顶， 0 - 不包含
    }
  })
}

```

`注意`: 

1. 接口为频道新闻推荐V1_1
2. query参数为params
3. 需要仔细研究接口中的返回响应中的参数分别代表什么



### 04-项目-首页-文章列表-获取数据-设计channels结构

`目的`:发送请求获取文章列表数据并且设计channels的数据结构

`步骤`:

1. 导入api模块
2. 定义计算属性获取当前频道的文章信息
3. 定义方法获取当前频道id并且调用api方法
4. onLoad 中调用方法获取数据

`代码`

```js
computed: {
    // 复杂数据-> 如果数据a依赖数据b,此时a写为计算属性
    activeChannel() {
        return this.channels[this.activeChannelIndex]
    }
},
    methods:{
        async loadArticle() {
            const { id: channelId } = this.activeChannel
            const data = await getArticles({
                channelId,
                timestamp: Date.now(),
                withTop: 1
            })
            return data
        },
            async onLoad() {
                const data = await this.loadArticle()
                console.log(data)
            }
    },

```

`设计合理的channels数据结构`->methods的loadChannels 方法

```js
async loadChannels() {
    const { user } = store.state
    const localChannels = JSON.parse(window.localStorage.getItem('channels'))
    // 如果用户未登录且本地有数据
    if (!user && localChannels) this.channels = localChannels
    // 如果用户未登录并且没有本地数据 或者 用户已登录
    if ((!user && !localChannels) || user) {
        const data = await getChannelsDefaultOrUser()
        // 设计符合要求的channels数据结构
        data.channels.forEach(item => {
            item.articles = [] // 当前频道的文章列表数据
            item.downPullLoading = false // 当前频道下拉状态
            item.upPullLoading = false // 当前频道上拉加载更多
            item.upPullFinished = false // 当前频道加载完毕
        })
        this.channels = data.channels
    }
},
```



`注意`

1. 返回数据中的pre_timestamp 是上一次文章数据的时间戳
2. 返回数据中的results是当前频道对应的文章列表数据
3. 请求参数的timestamp是请求数据的时间戳





### 05-项目-首页-文章列表-配置时间戳

`目的`:根据时间戳的设置获取动态的数据

`步骤`

1. 设计channels数据结构时添加item.timestamp 数据为当前时间
2. loadArticle 时 获取item.loadArticle 数据
3. onLoad 中发送两次请求
4. 更新timestamp 时间为响应中的pre_timestamp 

`代码`

```js
methods:{
    // loadChannels中的forEach增加以下代码
    async loadChannels(){
        data.channels.forEach(item => {
            // 其余省略
            item.articles = [] 
            item.timestamp = Date.now()
        })    
    },
    async loadArticle() {
            const { id: channelId, timestamp } = this.activeChannel
            // 其余省略
    },
     async onLoad() {
      let data = []
      data = await this.loadArticle()

      if (data.pre_timestamp && data.results.length === 0) {
        this.activeChannel.timestamp = data.pre_timestamp
        data = await this.loadArticle()
        // console.log(data)
      }
      // 更新时间戳
      this.activeChannel.timestamp = data.pre_timestamp
    }
}
```

`注意`:

1. 仔细看接口文档的请求参数和返回数据的说明

2. 该**业务有难度**,需要自己反复测试 多看几遍

   

### 06-项目-首页-文章列表-渲染视图-上拉加载更多

![5d26cd2ce4b0fdb331daf16c](../../../../%E6%8E%88%E8%AF%BE/vueproject2/73/01-%E6%95%99%E5%AD%A6%E8%B5%84%E6%BA%90/assets/5d26cd2ce4b0fdb331daf16c.png) 

`目的`:把文章列表数据渲染到页面中,实现上拉加载更多的效果

`步骤`

1. v-for 遍历van-cell
2. 设置van-list的v-model 和finished 属性值
3. 追加数据push
4. 取消加载动画

`代码`

```html
<van-list v-model="item.upPullLoading" :finished="item.upPullFinished" finished-text="没有更多了" @load="onLoad">
            <van-cell v-for="item in activeChannel.articles" :key="item.art_id" :title="item.title" />
          </van-list>
```

`methods中`

```js
// 上拉加载更多
async onLoad() {
    let data = []
    data = await this.loadArticle()
    if (data.pre_timestamp && data.results.length === 0) {
        this.activeChannel.timestamp = data.pre_timestamp
        data = await this.loadArticle()
    }
    // 更新时间戳
    this.activeChannel.timestamp = data.pre_timestamp
    // 保存文章数据
    this.activeChannel.articles.push(...data.results)
    // 取消动画
    this.activeChannel.upPullLoading = false

}
```

`注意`

1. 需要用push追加数据
2. van-list的加载动画是自动修改为true的,不需要处理
3. 目前没有处理加载完毕的业务
4. 时间戳相当于分页的页码



### 07-项目-首页-文章列表-延迟加载和加载完毕

`目的`

1. 加载时,给予一定的延迟执行时间,提高用户体验,让数据的加载不是瞬间完成
2. 当所有数据加载完毕后,显示加载完毕->pre_timestamp为null的情况

`代码`

`main.js`

```js
Vue.prototype.$sleep = time => {
    return new Promise((resolve, reject) => {
        window.setTimeout(() => {
            resolve()
        }, time)
    })
}

```

`home/index.vue`->methods->onLoad 中

```js
await this.$sleep(800)
let data = []
data = await this.loadArticles()
// 当没有数据时,显示已加载完毕
if (!data.pre_timestamp && !data.results.length) {
    this.activeChannel.upPullFinished = true
    this.activeChannel.upPullLoading = false
    return
}
```

`注意`:测试数据中id为26的数据比较少,方便测试



### 08-项目-首页-文章列表-路由缓存

`目的`:当文章列表加载完毕,切换到其他组件(比如我的),再回到文章列表组件,此时数据重新重复加载,

​	所以需要将当前组件进行缓存,提高性能

`步骤`

1. App.vue的router-view设置keep-alive
2. tarbar-layout/index.vue的rotuer-view设置keep-alive

`代码`

`App.vue`

```html
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
```

`tabbar-layout/index.vue`

```html
<template>
<div>
  <keep-alive>
  <router-view></router-view>
  </keep-alive>
<!--省略-->
    
 
```

`注意`:

1. 被缓存的组件的生命周期不会重新执行
2. keep-alive->慎用->手动清除被缓存的组件->js!!!!



### 09-项目-首页-文章列表-路由缓存-优化

`目的`: 路由缓存后,当用户没有登录,而直接进入首页,也显示之前缓存的数据,而不是推荐的未登录用户的数据,这样不合理,需要处理

`步骤`

1. 监测用户登录状态的变化
2. 当变化时,重新加载频道列表
3. 当变化时,重新加载当前激活频道的数据

`代码`->home/index.vue->script

```js
  watch: {
    async '$store.state.user'() {
      this.loadChannels()
      this.activeChannel.upPullLoading = true
      await this.onLoad()
      // await this.onLoad()
    }
  },
```

### 10-项目-首页-文章列表-布局处理

`目的`:将文章内容的相关数据进行渲染

`步骤`

1. 准备图片之外的数据渲染
2. 渲染图片

`代码`

`home/index.vue`->template

```html
 <van-cell v-for="item in activeChannel.articles" :key="item.art_id" :title="item.title">
              <div slot="label">
                <template v-show="item.cover.type">
                  <van-grid :border="false" :column-num="3">
                    <van-grid-item v-for="(item,index) in item.cover.images" :key="index">
                      <van-image :src="item" />
                    </van-grid-item>
                  </van-grid>
                </template>

                <p>
                  <span>作者:{{item.aut_name}}</span>
                  &nbsp;
                  <span>评论 :{{item.comm_count}}</span>
                  &nbsp;
                  <span>时间:{{item.pubdate}}</span>
                  &nbsp;
                </p>
              </div>

            </van-cell>
```

`注意`: 

1. 个别图片请求失败,报错403->代表无权限访问, 是接口问题,可以不处理
2. 每条文章数据中的cover.type=1、3表示有图片,0标识没图片
3. 这里利用slot插槽自定义单元格内容label
4. 相对时间之后会进行处理



### 11-项目-首页-文章列表-图片懒加载

`目的`: 使用Vant的图片组件实现图片懒加载效果

`步骤`

1. 使用Vant中的Lazyload插件
2. 为van-image设置lazy-load属性

`代码`

`home/index.vue`

```html
<van-grid-item v-for="(src,index) in articleItem.cover.images" :key="index">
                    <van-image :src="src" lazy-load/>
                  </van-grid-item>
```

`main.js`

```js
import Vant, {
  Lazyload
} from 'vant'
Vue.use(Lazyload)

```

`注意`

1. 浏览器可以清空缓存并硬性重新加载
2. devtools可以筛选请求类型,比如筛选img请求

### 12-项目-首页-文章列表-时间处理-dayjs

`目的`:把后台返回的时间进行处理,我们需要相对时间

`步骤`

1. 安装配置[dayjs](https://github.com/iamkun/dayjs)库 
   1. 安装
   2. 导入并配置相对时间的插件rel
   3. 导入并配置国际化->支持中文loc
2. 使用dayjsAPI处理日期格式

`代码`

`main.js`

```js
import dayjs from 'dayjs'
import relaviveTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')
dayjs.extend(relaviveTime)
// console.log(dayjs().from(dayjs("2019-07-10")));

```

### 13-项目-首页-文章列表-时间处理-过滤器

`目的`:使用过滤器处理日期格式

`步骤`

1. 注册全局过滤器
2. 实现过滤器的功能
3. 使用过滤器

`代码`

`main.js`

```js
Vue.filter('relTime', (value) => {
  return dayjs().from(dayjs(value))
})
```

`home/index.vue`->template

```html
 <span>时间:{{item.pubdate | relTime}}</span>
```

`提示`:这里代码没问题->几秒前->后台接口返回的最新时间





### 14-项目-首页-更多操作-显示与隐藏

`目的`:

1. 在每条文章内容区域有x按钮,点击x,打开对话框
2. 点击任意位置,关闭对话框

`步骤`

1. 绑定事件
2. 准备更多操作的组件
3. 点击按钮,弹出更多操作的组件
4. 设置对话框的相关属性

`代码`

`home/index.vue`

```vue
&nbsp;
<van-icon class="close" name="cross" @click="showMoreActionDia()"></van-icon>

<!-- 更多操作 -->
<more-action v-model="isMoreActionShow"></more-action>


methods: {
showMoreActionDia() {
this.isMoreActionShow = true
},

.channel-tabs /deep/ .close {
  float: right;
  font-size: 30px;
}
```

`home/components/more-action.vue`

```js
<template>
<div>
  <van-dialog :value="value"
  @input="$emit('input',$event)"
  close-on-click-overlay
  :show-confirm-button="false">
  更多内容
  </van-dialog>
</div>
</template>

<script>
export default {
  name: 'MoreAction',
  props:{
    value:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
    };
  }
}
</script>

<style>
</style>

```

`注意`:

1. 这里用到了表单元素的父子通信,子组件中:value和@input ,父组件使用v-model
2. van-dia组件其实是表单元素  v-model







## day04



### 01-项目-首页-更多操作-布局

`目的`: 点击对话框中的对应cell切换显示两套布局

`代码` 

```html
<van-dialog :value="value" @input="$emit('input',$event)" close-on-click-overlay :show-confirm-button="false">

    <van-cell-group v-if="!isReportShow">
      <van-cell icon="location-o" title="不感兴趣" />
      <van-cell icon="location-o" title="反馈垃圾内容" is-link @click="isReportShow=true"/>
      <van-cell icon="location-o" title="拉黑作者" />
    </van-cell-group>

    <van-cell-group v-else>
      <van-cell icon="arrow-left" @click="isReportShow=false" />
      <van-cell title="侵权" icon="location-o" />
      <van-cell title="色情" icon="location-o" />
      <van-cell title="暴力" icon="location-o" />
      <van-cell title="低俗" icon="location-o" />
      <van-cell title="不适" icon="location-o" />
      <van-cell title="错误" icon="location-o" />
      <van-cell title="其他" icon="location-o" />
    </van-cell-group>
  </van-dialog>
```

### 02-项目-首页-更多操作-不感兴趣-封装请求

`目的`:在api/articles.js中封装请求

`代码`

```js
/**
 * 对文章不喜欢
 */

export const dislikesArticle = (articleId) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/dislikes',
    data: {
      target: articleId
    }
  })
}
```



### 03-项目-首页-更多操作-不感兴趣-处理超限

`目的`:文章id数据超限,需要使用json-bigint处理超限数据->和之前PC处理方式完全一样

`代码`

`util/request.js`

```js
import JSONBig from 'json-bigint'

request.defaults.transformResponse = [function (data) {
  try {
    return JSONBig.parse(data)
  } catch (error) {
    return data
  }
}]

```

`home/index.vue`

```html
 <van-list v-model="item.upPullLoading" :finished="item.upPullFinished" finished-text="没有更多了" @load="onLoad">
          <van-cell v-for="articleItem in item.articles" :key="articleItem.art_id.toString()" :title="articleItem.title">
              
             <!--省略--> 
```



### 04-项目-首页-更多操作-不感兴趣-获取文章id

`目的`:在more-action组件中获取当前不感兴趣文章的id

`步骤`

1. 在home/index.vue获取当前选中文章
2. 点击x按钮,把当前文章传递给data数据
3. 在home/index.vue中使用<more-action>组件时传入当前文章
4. 在more-action中接收当前文章数据

`代码`

`home/index.vue`

```js
// methods
  handleShowMoreAction(articleItem) {
      // console.log(articleItem)
      this.currentArticle = articleItem
      this.isMoreShow = true
    },
        
// data
       currentArticle: null
// template
<p>
                <span>作者:{{articleItem.aut_name}}</span>
                &nbsp;
                <span>评论{{articleItem.comm_count}}</span>
                &nbsp;
                <span>时间:{{articleItem.pubdate | relTime}}</span>
                &nbsp;
                <van-icon class="close" name="close"
                @click="handleShowMoreAction(articleItem)"
                ></van-icon>
              </p>
```

`more-action`

```js
 props: {
    value: {
      type: Boolean,
      default: false
    },
    currentArticle: {
      type: Object
    }
  },
```

`注意`:这里本质是把父组件的数据传递给子组件的props进行使用

### 05-项目-首页-更多操作-不感兴趣-完成

`目的`:发送不感兴趣文章的请求,更新视图

`步骤`

1. 子组件发送请求
2. 通过父组件更新视图

`代码`

`home/index.vue`->tempalte

```js
  <more-action v-model="isMoreShow" :currentArticle="currentArticle" @dislike-success="handleDislikeSuccess"></more-action>

```

`home/index.vue`->methods

```js
    handleSuccessUnlike() {
      const articles = this.activeChannel.articles
      const deIndex = articles.findIndex(item => item === this.currArticle)
      articles.splice(deIndex, 1)
    },
```

`more-action.vue`->methods

```js
 async handleDislike() {
      try {
        // console.log(this.currentArticle, '---')
        await dislikesArticle(this.currentArticle.art_id)
        // console.log(data)
        // 更新视图
        this.$emit('dislike-success')
        this.$emit('input', false)
        this.$toast('操作成功')
      } catch (error) {
        this.$toast('操作失败')
      }
    }
```



`注意`: 

1. 这里真正不喜欢文章的接口并没有,所以只处理更新视图
2. 这里用到了子传父
3. 拉黑作者和对文章不喜欢的逻辑一样





### 06-项目-首页-更多操作-举报

`目的`:完成举报操作

`步骤`

1. 设计数据结构遍历举报内容
2. 发送请求
3. 处理响应
4. 关闭对话框

`代码`

`api/articles.js`

```js
/**
 * 举报文章
 */
export const reportArticle = ({ articleId, type, remark = '' }) => {
    return request({
        method: 'POST',
        url: '/app/v1_0/article/reports',
        data: {
            target: articleId,
            type,
            remark
        }
    })
}
```

`more-action.vue`->template

```html
<van-cell-group v-else>
      <van-cell icon="arrow-left" @click="isReportShow=false" />
      <van-cell v-for="(item,index) in reportTypes" :key="index" icon="location-o" :title="item.label" @click="handleReportArticle(item.value)" />
    </van-cell-group>
```

`more-action.vue`->data

```js
 // 0-其他问题
      // 1-标题夸张
      // 2-低俗色情
      // 3-错别字多
      // 4-旧闻重复
      // 5-广告软文
      // 6-内容不实
      // 7-涉嫌违法犯罪
      // 8-侵权
      reportTypes: [
        { label: '其他问题', value: 0 },
        { label: '标题夸张', value: 1 },
        { label: '低俗色情', value: 2 },
        { label: '错别字多', value: 3 },
        { label: '旧闻重复', value: 4 },
        { label: '广告软文', value: 5 },
        { label: '内容不实', value: 6 },
        { label: '涉嫌违法犯罪', value: 7 },
        { label: '侵权', value: 8 }
      ]
```



`more-action.vue`->methods

```js
async handleReportArticle(type) {
      try {
        await reportArticle({
          articleId: this.currArticle.art_id,
          type: type
        })

        this.$emit('input', false)
        this.$toast('举报成功')
      } catch (error) {
        if (error.response.status === 409) {
          this.$toast('已被举报过')
          this.$emit('input', false)
        } else {
          this.$toast('举报失败')
          this.$emit('input', false)
        }
      }
    }
```

`提示`

1. 409 表示文章被举报过
2. 拉黑作者的做法和不感兴趣完全一样-> 假删除

### 07-项目-首页-文章列表-下拉刷新

`下拉刷新`

![5d26d03be4b05dcb439f2585](../../../../%E6%8E%88%E8%AF%BE/vueproject2/73/01-%E6%95%99%E5%AD%A6%E8%B5%84%E6%BA%90/assets/5d26d03be4b05dcb439f2585.png) 

`步骤`

1. 配置布尔数据
2. 下拉刷新->获取最新时间戳的数据

`代码`

`home/index.vue`->template

```html
        <van-pull-refresh v-model="item.downPullLoading" @refresh="onRefresh" :success-text="item.downPullSuccessText" :success-duration=1000>

     <!--省略-->

      </van-pull-refresh>
```



`home/index.vue`->methods

```js
async onRefresh() {
    const { activeChannel } = this
    // 备份上一次的时间
    const timestamp = activeChannel.timestamp
    // console.log(timestamp)

    // activeChannel.timestamp = 1556789000001
    // 获取最新时间戳
    activeChannel.timestamp = Date.now()
    // 根据最新时间戳发送请求获取最新数据
    const data = await this.loadArticle()

    if (data.results.length) {
        // 重置数据
        activeChannel.articles = data.results
        // 更新时间戳
        activeChannel.timestamp = data.pre_timestamp
        // 提示文本
        activeChannel.downPullSuccessText = '更新成功'
        // 保证满屏数据
        this.onLoad()
    } else {
        // 提示文本
        activeChannel.downPullSuccessText = '已是最新数据'
    }
    // 停止动画
    activeChannel.downPullLoading = false
},
```

### 08-项目-首页-频道管理-分析-显示按钮

`功能分析`

1. tabs频道右侧显示按钮
2. 点击按钮底部弹出模态框
3. 模态框中->编辑频道
4. 模态框中->显示我的频道
5. 我的频道中有高亮效果

`目的`:向频道列表右侧添加按钮

`代码`

`home/index.vue`->tempalte

```html
<van-tabs class="channel-tabs" v-model="activeChannelIndex">
    <div slot='nav-right' class="wap-nav">
      <van-icon name="wap-nav"></van-icon>
    </div>
    <!----省略>

```

`home/index.vue`->style

```css
.channel-tabs /deep/ .wap-nav {
  position: fixed;
  right: 0px;
}
```

### 09-项目-首页-频道管理-显示与隐藏模态框

`目的`:点击按钮,弹出模态框组件

`步骤`

1. 新建channel.vue组件
2. 使用Vant中的弹出层组件
3. 给按钮绑定事件,修改模态框的显示状态

`代码`

`home/components/channel.vue`

```vue
<template>
  <div>
    <van-popup :value="value" @input="$emit('input',$event)" position="bottom" :style="{ height: '80%' }" />
  </div>
</template>

<script>
export default {
  name: 'ChannelIndex',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  }
}
</script>
```

`home/index.vue`->template

```html
<van-tabs class="channel-tabs" v-model="activeChannelIndex">
      <div slot='nav-right' class="wap-nav" @click="showChannelModal">
        <van-icon name="wap-nav"></van-icon>
      </div>
    <!--省略-->


    <home-channel v-model="isChannelShow"></home-channel>
    <!--省略-->

```



`home/index.vue`->script->methods

```js
     showChannelModal() {

      this.isChannelShow = true
    }
```

`提示`: 和more-action的处理完全一样

### 10-项目-首页-频道管理-页面布局

`目的`:将重点放在业务上,这里将布局(div+css)准备好

`步骤`

1. 我的频道
2. 推荐频道

`代码`

```vue
<template>
  <van-popup
  :value="value"
  @input="$emit('input',$event)"
  position="bottom"
  :style="{ height: '95%' }"
  >
    <div class="channel">
      <div class="channel-head">
        <div>
          <span class="title">我的频道</span>
          <span class="desc">点击进入频道</span>
        </div>
        <div>
          <van-button
            type="danger"
            plain
            size="mini"
          >编辑</van-button>
        </div>
      </div>
      <van-grid class="channel-content" :gutter="10" clickable>
        <van-grid-item
          v-for="value in 8"
          :key="value"
          text="文字">
          <span class="text">文字</span>
          <!-- <van-icon class="close-icon" name="close" /> -->
        </van-grid-item>
      </van-grid>
    </div>

    <div class="channel">
      <div class="channel-head">
        <div>
          <span class="title">频道推荐</span>
          <span class="desc">点击添加频道</span>
        </div>
      </div>
      <van-grid class="channel-content" :gutter="10" clickable>
        <van-grid-item
          v-for="value in 8"
          :key="value"
          text="文字">
          <div class="info">
            <span class="text">文字</span>
          </div>
        </van-grid-item>
      </van-grid>
    </div>
  </van-popup>
</template>

<script>
export default {
  name: 'HomeChannel',
  props: {
    value: {
      type: Boolean,
      default: 'false'
    }
  },
  data() {
    return {}
  }
}
</script>


<style lang="less" scoped>
.channel {
  .channel-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    .title {
      font-size: 30px;
      margin-right: 5px;
    }
    .desc {
      font-size: 12px;
    }
    .action {
    }
  }
  .channel-content {
    .text {
      font-size: 16px;
    }
    .active {
      color: red;
    }
    .close-icon {
      font-size: 20px;
      position: absolute;
      top: -5px;
      right: -5px;
      z-index: 999;
      background-color: #fff;
    }
    .info {
      display: flex;
      align-items: center;
    }
  }
}
</style>

```

`提示`: 相当于把初级web切好的图拿过来 中级->写js逻辑

### 11-项目-首页-频道管理-渲染我的频道的数据-激活样式

`目的`:将我的频道的频道数据进行渲染和高亮显示

`步骤`

1. 父组件传递channels和activeChannelIndex
2. 子组件接收channels和activeIndex
3. 子组件遍历channels,设置激活样式

`代码`

`home/index.vue`->使用子组件时 传值

```html
<home-channel
  :channels="channels"
  :active-index="activeChannelIndex"
  v-model="isChannelShow">
  </home-channel>
```

`channel.vue`

```js
// template部分的遍历数据channels
<van-grid class="channel-content" :gutter="10" clickable>
      <van-grid-item v-for="(item,index) in channels" :key="item.id">
        <span
        slot="text"
        class="text"
        :class="{active:index===activeIndex}">{{item.name}}</span>
        <!-- <van-icon class="close-icon" name="close" /> -->
      </van-grid-item>
    </van-grid>
// js部分的props
props: {
    value: {
      type: Boolean,
      default: 'false'
    },
    channels: {
      type: Array,
      default: () => []
    },
    activeIndex: {
      type: Number,
      default: 0
    }
  },
```

### 12-项目-首页-频道管理-获取所有频道数据

`目的`:将获取所有频道数据的请求进行封装

`步骤`

1. 封装获取所有频道数据的请求
2. 在channel.vue中获取所有频道数据
3. 把所有频道数据赋值给data的allChannles数组

`代码`

`api/channels.js`

```js
/**
 * 获取所有频道数据
 */
export const getAllChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels'
  })
}

```

`channel.vue`

```js
 data() {
    return {
      allChannels: []
    }
  },
created() {
    this.loadAllChannels()
  },
  methods: {
     async loadAllChannels() {
      const data = await getAllChannels()
      data.channels.forEach(item => {
        item.articles = [] // 当前频道的文章列表数据
        item.downPullLoading = false // 当前频道下拉状态
        item.upPullLoading = false // 当前频道上拉加载更多
        item.upPullFinished = false // 当前频道加载完毕
        item.timestamp = Date.now() // 下一组数据的时间戳
      })
      this.allChannels = data.channels
    },
  }
```

`注意`:不要忘记为频道数组中的数据设置之前的属性

### 13-项目-首页-频道管理-筛选频道数据

`目的`:channels组件中,已有的数据

1. 我的频道数据:channels 
2. 所有频道数据:allChannels

需求:在下方的显示数据为allChannels中排除channels之后的结果

`步骤`

1. 添加计算属性restChannels,用来保存剩余数据
2. 获取已有频道的id
3. 根据已有频道的id筛选所有频道的数据
4. 根据restChannels遍历推荐频道的数据

`代码`

```js
  computed: {
    restChannels() {
      // 取出我的频道的id
      const userChannelIds = this.channels.map((item, i) => {
        return item.id
      })

      // 根据我的频道的id和所有频道的id进行筛选
      const restChannels = this.allChannels.filter((item, i) => {
        return !userChannelIds.includes(item.id)
      })

      return restChannels
    }
  },
```

`注意`

1. 计算属性的使用场景
2. 这里用到了 map filter includes 
3. 提示 只会for没问题->效率最高

### 14-项目-首页-频道管理-添加频道

`目的`:点击推荐频道中的某个频道,把该频道添加到我的频道进行展示

`步骤`

1. 给推荐频道绑定事件
2. 把当前点击的频道追加到this.channels中

`代码`

```js
    handleAddChannel(item) {
      this.channels.push(item)
    }
```

### 15-项目-首页-频道管理-添加频道-持久化-本地存储

`目的`:根据用户是否登录把添加的频道进行持久化保存

`步骤`

1. 如果登录,发送请求添加频道

2. 如果未登录,把添加的频道进行本地存储-

   这里先考虑2的情况

`代码`

```js
computed: {
    
    // 省略
        // 把vuex的state映射到当前组件的计算属性中
        ...mapState(['user'])
},
    methods:{
        handleAddChannel(item) {
            this.channels.push(item)
            // 登录
            if (this.user) {
                return
            } else {
                // 未登录
                window.localStorage.setItem('channels', JSON.stringify(this.channels))
            }
        }
    }
```

### 16-项目-首页-频道管理-添加频道-持久化-发送请求

`目的`:如果用户登录, 发送请求添加频道

`步骤`

1. 封装api请求
2. 设计数据结构{id:?,seq:?}
3. 发送请求

`代码`

`api/channel.js`

```js

/**
 * 批量修改用户频道列表（重置式）
 * channels:[
 *  {
 *    id:1 频道id
 *    seq:1 -> 顺序序号
 * }
 * ]
 *
 * id-> 要求排除第一个
 * seq 要求从2开始
 */

export const resetUserChannels = channels => {
    return request({
        method: 'PUT',
        url: `/app/v1_0/user/channels`,
        data: {
            channels
        }
    })
}
```

`channel.vue`->js->methods

```js
async handleAddChannel(item) {
      this.channels.push(item)
      // 登录
      if (this.user) {
        const data = this.channels.slice(1).map((item, i) => {
          return {
            id: item.id,
            seq: i + 2
          }
        })
        await resetUserChannels(data)
        return
      } else {
        // 未登录
        window.localStorage.setItem('channels', JSON.stringify(this.channels))
      }
    }
```

`注意:`

1. seq序号从2开始计算
2. 采用重置的方式添加频道

### 17-项目-首页-频道管理-进入频道

`目的`:在**非编辑状态**下,点击频道进入对应频道

`步骤`

1. 绑定事件
2. 子传父
3. 父接收子的数据

`代码`

`channel.vue`

```js
// methods中 
   async handleUserClick(item, index) {
      if (this.isEdit) {
        console.log('删除频道')

        this.deleChannel(item, index)
      } else {
        console.log('进入频道')
        this.changeChanle(item, index)
      }
    },
    changeChanle(item, index) {
      this.$emit('update:active-index', index)
      this.$emit('input', false)
    },
```

`home/index.vue`

```html
  <!--
       :active-index="activeChannelIndex"
    @update:active-index="activeChannelIndex=$event"
    简化为
    :active-index.sync="activeChannelIndex"
   -->
    <home-channel
    :channels="channels"
    v-model="isChannelShow"
    :active-index.sync="activeChannelIndex"
    >
  </home-channel>
```

> 注意.sync的用法

### 18-项目-首页-频道管理-删除频道-显示按钮

`目的`:点击编辑按钮,切换频道文字的删除按钮显示与隐藏

`步骤`

1. 提供布尔属性控制删除的显示与隐藏
2. 给编辑按钮绑定事件,修改布尔属性值
3. 把当前激活样式添加是否编辑的控制

`代码`

```html
  <div class="channel">
    <div class="channel-head">
      <div>
        <span class="title">我的频道</span>
        <span class="desc">点击进入频道</span>
      </div>
      <div>
        <van-button type="danger" plain size="mini"
        @click="isEdit=!isEdit"
        >{{!isEdit?'编辑':'完成'}}</van-button>
      </div>
    </div>
    <van-grid class="channel-content" :gutter="10" clickable>
      <van-grid-item v-for="(item,index) in channels" :key="item.id" text="文字">
        <span  class="text" :class="{active:index===activeIndex && !isEdit}">{{item.name}}
        </span>
        <van-icon v-if="isEdit" class="close-icon" name="close" />
      </van-grid-item>
    </van-grid>
  </div>
```

```js
 data() {
    return {
      allChannels: [],
      isEdit: false
    }
  },
```



### 19-项目-首页-频道管理-删除频道-本地删除

`目的`:在编辑状态下,点击频道,删除该频道

`步骤`

1. 从this.channels.中移除当前元素
2. 如果用户登录->发送删除频道的请求
3. 如果用户没登录->从本地存储中删除
4. 当在我的频道组件删除当前激活频道时,回到父组件,当前组件重新加载数据

`代码`

```js
  deleChannel(item, index) {
      console.log('deleChannel--')
      this.channels.splice(index, 1)
      if (this.user) {
        // 发送请求进行删除
      } else {
        window.localStorage.setItem('channels', JSON.stringify(this.channels))
      }
    },
```

`home/index.vue`

```js
  watch: {
    async '$store.state.user'() {
      this.loadChannels()
      this.activeChannel.upPullLoading = true
      await this.onLoad()
      // await this.onLoad()
    },
    isChannelShow(newV, oldV) {
      if (newV === false) {
        this.onLoad()
      }
    }
  },
```

### 20-项目-首页-频道管理-删除频道-发送请求

`目的`:在登录状态下 点击按钮,删除频道

`代码`

`api/channel.js/`->

```js
/**
 * 删除用户指定频道
 */
export const deleUserChannel = (ID) => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/channels/${ID}`
  })
}
```

`home/index.vue`->js->methods->deleChannel

```js
 async deleChannel(item, index) {
      console.log('deleChannel--')
      this.channels.splice(index, 1)
      if (this.user) {
        // 发送请求进行删除
        await deleUserChannel(item.id)
      } else {
        window.localStorage.setItem('channels', JSON.stringify(this.channels))
      }
    },
```



### 21-项目-首页-频道管理-删除频道-固定频道

`目的`:我的频道中的第一个`推荐`频道不允许删除

`步骤`

1. 将我的频道的第一个数据`推荐` 不显示删除按钮
2. 在点击频道时,第一个不进行处理

`代码`

```html
 <van-icon
        v-show="isEdit && !aliveChannels.includes(item.name)" class="close-icon" name="close" />
```

```js
data() {
    return {
        allChannels: [],
        isEdit: false,
        aliveChannels: ['推荐']
    }
},
    methods:{
        handleUserChannelClick(item, index) {
            if (!this.isEdit) {
                this.changeChannel(item, index)
            } else {
                !this.aliveChannels.includes(item.name) && this.deleChannel(item, index)
            }
        },
    }
```



## day05

### 01-项目-首页-频道管理-删除频道-显示按钮

`目的`:点击编辑按钮,切换频道文字的删除按钮显示与隐藏

`步骤`

1. 提供布尔属性控制删除的显示与隐藏
2. 给编辑按钮绑定事件,修改布尔属性值
3. 把当前激活样式添加是否编辑的控制

`代码`

```html
  <div class="channel">
    <div class="channel-head">
      <div>
        <span class="title">我的频道</span>
        <span class="desc">点击进入频道</span>
      </div>
      <div>
        <van-button type="danger" plain size="mini"
        @click="isEdit=!isEdit"
        >{{!isEdit?'编辑':'完成'}}</van-button>
      </div>
    </div>
    <van-grid class="channel-content" :gutter="10" clickable>
      <van-grid-item v-for="(item,index) in channels" :key="item.id" text="文字">
        <span  class="text" :class="{active:index===activeIndex && !isEdit}">{{item.name}}
        </span>
        <van-icon v-if="isEdit" class="close-icon" name="close" />
      </van-grid-item>
    </van-grid>
  </div>
```

```js
 data() {
    return {
      allChannels: [],
      isEdit: false
    }
  },
```



### 02-项目-首页-频道管理-删除频道-本地删除

`目的`:在编辑状态下,点击频道,删除该频道

`步骤`

1. 从this.channels.中移除当前元素
2. 如果用户登录->发送删除频道的请求
3. 如果用户没登录->从本地存储中删除
4. 当在我的频道组件删除当前激活频道时,回到父组件,当前组件重新加载数据

`代码`

```js
  deleChannel(item, index) {
      console.log('deleChannel--')
      this.channels.splice(index, 1)
        //    this.$emit('delete-success')

      if (this.user) {
        // 发送请求进行删除
      } else {
        window.localStorage.setItem('channels', JSON.stringify(this.channels))
      }
    },
```

`home/index.vue`-优化删除-**可选->** 回来看

```js
// template
    <van-tabs :lazy-render="false" @change="onTabChange" v-model="activeChannelIndex" class="channel-tab">
        
            <channel @delete-success="onDeleteSuccess" v-model="isShowChannel" :channels="channels" :activeChannelIndex="activeChannelIndex" @update:active-index="activeChannelIndex=$event"></channel>

// js methods
            onTabChange() {
      this.activeChannel.upPullLoading = true
      this.onLoad()
    },
            onDeleteSuccess() {
      if (!this.activeChannel.articles.length) {
        this.activeChannel.upPullLoading = true
        this.onLoad()
      }
    },

        
```



### 03-项目-首页-频道管理-删除频道-发送请求

`目的`:在登录状态下 点击按钮,删除频道

`代码`

`api/channel.js/`->

```js
/**
 * 删除用户指定频道
 */
export const deleUserChannel = (ID) => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/channels/${ID}`
  })
}
```

`home/index.vue`->js->methods->deleChannel

```js
 async deleChannel(item, index) {
      console.log('deleChannel--')
      this.channels.splice(index, 1)
      if (this.user) {
        // 发送请求进行删除
        await deleUserChannel(item.id)
      } else {
        window.localStorage.setItem('channels', JSON.stringify(this.channels))
      }
    },
```



### 04-项目-首页-频道管理-删除频道-固定频道

`目的`:我的频道中的第一个`推荐`频道不允许删除

`步骤`

1. 将我的频道的第一个数据`推荐` 不显示删除按钮
2. 在点击频道时,第一个不进行处理

`代码`

```html
 <van-icon
        v-show="isEdit && !aliveChannels.includes(item.name)" class="close-icon" name="close" />
```

```js
data() {
    return {
        allChannels: [],
        isEdit: false,
        aliveChannels: ['推荐']
    }
},
    methods:{
        handleUserChannelClick(item, index) {
            if (!this.isEdit) {
                this.changeChannel(item, index)
            } else {
                !this.aliveChannels.includes(item.name) && this.deleChannel(item, index)
            }
        },
    }
```



### 05-项目-首页-搜索-布局

`目的`:完成首页顶部的搜索模块的布局

`步骤`

1. 新建搜索组件search/index.vue
2. 配置路由
3. 布局

`代码`

```vue
<template>
<div>
  <van-search v-model="searchText" placeholder="请输入搜索关键词" show-action @search="onSearch" @cancel="onCancel" />
  <!-- 联想建议 -->
  <van-cell-group>
    <van-cell title="单元格" icon="search" />
    <van-cell title="单元格" icon="search" />
    <van-cell title="单元格" icon="search" />
    <van-cell title="单元格" icon="search" />
    <van-cell title="单元格" icon="search" />
    <van-cell title="单元格" icon="search" />
  </van-cell-group>
</div>

<!-- 历史搜索记录 -->
</template>

<script>
export default {
  name: 'SearchIndex',
  data() {
    return {
      searchText: ''
    }
  },
  methods: {
    onSearch() {
      console.log('onSearch--')
    },
    onCancel() {
      console.log('onCancel--')
    }
  }
}
</script>

<style  lang="less" scoped>
</style>

```

> 注意:需要做联想建议和历史记录

### 06-项目-首页-搜索-联想建议-获取数据-渲染

`目的`:请求联想建议的数据,并且展示出来

`步骤`

1. 封装api请求
2. 发送请求获取数据->watch监测变化
3. 根据数据遍历单元格显示数据

`代码`

`api/search.js`

```js
import request from '@/utils/request.js'

/**
 * 联想建议
 */
export const getSuggestion = (q) => {
  return request({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params: {
      q
    }
  })
}

```

`search/index.vue`

```vue
<template>
<div>
  <van-search v-model="searchText" placeholder="请输入搜索关键词" show-action @search="onSearch" @cancel="onCancel" />
  <!-- 联想建议 -->
  <van-cell-group>
    <van-cell icon="search" v-for="(item,i) in suggestionData" :key="i" :title="item" />
  </van-cell-group>
</div>

<!-- 历史搜索记录 -->
</template>

<script>
import { getSuggestion } from '@/api/search'

export default {
  name: 'SearchIndex',
  data() {
    return {
      searchText: '',
      suggestionData: []
    }
  },
  watch: {
    async searchText(newValue) {
      newValue = newValue.trim()
      if (!newValue.length) {
        return
      }
      try {
        const data = await getSuggestion(newValue)
        this.suggestionData = data.options
      } catch (error) {
        console.log(error)
      }
    }
  },
  methods: {
    onSearch() {
      console.log('onSearch--')
    },
    onCancel() {
      console.log('onCancel--')
    }
  }
}
</script>

<style  lang="less" scoped>
</style>

```

> 注意:目前虽然实现了功能,但是有性能问题->频繁发送请求



### 07-项目-首页-搜索-联想建议-防抖处理

`目的`:使用第三方库处理事件频繁触发的问题

`提示`: 某事件短间内频繁触发

`步骤`

1. 防抖函数debounce
2. 使用debounce解决频繁调用的问题

`代码`

`辅助函数`

```js
export const debounce = function (func, wait) {
  let timeout;
  return function () {
    let context = this;
    let args = arguments;

    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      func.apply(context, args)
    }, wait);
  }
}
```

`search/index.vue`->js

```js
 watch: {
    searchText: debounce(async function(newValue) {
      newValue = newValue.trim()
      if (!newValue.length) {
        return
      }
      try {
        const data = await getSuggestion(newValue)
        this.suggestionData = data.options
      } catch (error) {
        console.log(error)
      }
    }, 800)
  },
```





### 08-项目-首页-搜索-联想建议-关键字高亮

`目的`:在联想建议的词条中的关键字设置为高亮

`步骤`

1. 显示联想建议(已做完)
2. 结果词条有很多->每个都高亮->放在数组中处理
3. 将搜索关键字在结果词条中进行筛选
4. 把匹配成功的关键字设置样式

`代码`

```html
 <van-cell icon="search" v-for="(item,i) in suggestionData" :key="i" >
      <div slot="title" v-html="hightlight(item,searchText)">
      </div>
    </van-cell>
```



```js
 hightlight(text, keyword) {
      return text
        .toLowerCase()
        .split(keyword)
        .join(`<span style="color:red">${keyword}</span>`)
    },
```

### 09-项目-首页-搜索-联想建议-获取搜索结果

`目的`:获取搜索的最终结果,将来按回车或者点击搜索结果进入搜索结果列表页面

`步骤`

1. 给搜索框绑定search事件
2. 给每个搜索词条绑定click事件
3. 实现onSearch方法
4. 获取当前搜索关键字
5. 进入到搜索结果页面

`代码`

```html
<div>
  <form action="/">
  <van-search v-model="searchText" placeholder="请输入搜索关键词" show-action @search="onSearch(searchText)" @cancel="onCancel" />
  </form>
  <!-- 联想建议 -->
  <van-cell-group>
    <van-cell icon="search" v-for="(item,i) in suggestionData" :key="i"
    @click="onSearch(item)"
    >
      <div slot="title" v-html="hightlight(item,searchText)">
      </div>
    </van-cell>
  </van-cell-group>
</div>
```

```js
  onSearch(queryText) {
      console.log('onSearch--', queryText)
      if (!queryText.length) {
        return
      }
      this.$router.push({
        name: 'search-result',
        params: {
          q: queryText
        }
      })
    },
```

> 此时,search-result的组件和路由还没有提供

### 10-项目-首页-搜索-联想建议-显示搜索结果组件

`目的`:将search-result的路由和组件进行设置

`步骤`

1. 新建组件
2. 配置路由
3. 获取搜索结果数据(路由参数)

`代码`

`router.js`

```js
 {
      name: 'search-result',
      path: '/search/:q',
      component: () => import('@/views/search-result')
    },
```

`search-result/index.vue`

```vue
<template>
  <div>
    {{$route.params.q}}
  </div>
</template>

<script>
export default {
  name: 'SearchResult'
}
</script>

<style>
</style>

```

`search/index.vue`

```js
 onSearch(queryText) {
      console.log('onSearch--', queryText)
      if (!queryText.length) {
        return
      }
      this.$router.push({
        name: 'search-result',
        params: {
          q: queryText
        }
      })
    },
```

### 11-项目-首页-搜索结果-获取数据

`目的`:封装api、获取对应数据

`代码`

`api/search.js`

```js
/**
 * 搜索结果列表
 */
export const getSearch = ({
  page,
  perPage,
  q
}) => {
  return request({
    method: 'GET',
    url: '/app/v1_0/search',
    params: {
      page,
      per_page: perPage,
      q
    }
  })
}

```

`search-result/index.vue`->js

```js
import { getSearch } from '@/api/search'
export default {
  name: 'SearchResult',
  created() {
    this.loadSearch()
  },
  data() {
    return {
      searchData: []
    }
  },
  methods: {
    async loadSearch() {
      const data = await getSearch({ q: this.$route.params.q })
      console.log(data)
      this.searchData = data.results
    }
  }
}
```

### 12-项目-首页-搜索结果-布局

`目的`:将页面进行快速布局

`代码`

`search-result/index.vue`

```html
<div>
  <van-nav-bar 
  fixed
  title="搜索结果" 
  left-text="返回" left-arrow @click-left="$router.back()"></van-nav-bar>
  <van-list class="search-list" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
    <van-cell v-for="item in list" :key="item" :title="item" />
  </van-list>
</div>

<style lang="less" scoped>
.search-list {
  margin-top: 92px;
}
</style>
```

`search-result/index.vue`->js

```js
  onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 500)
    },
```



`index.less`

```css
.van-nav-bar {
  background-color: #0096fa;

  .van-nav-bar__title,
  .van-nav-bar__text,
  .van-icon {
    color: #fff;
  }
}
```

`注意`:这里的列表做法和之前一样,直接复制,不要忘记提供数据

### 13-项目-首页-搜索结果-渲染数据

`目的`:将数据在页面中渲染出来

`代码`

```html
<div>
  <van-nav-bar
  fixed
  title="搜索结果"
  left-text="返回" left-arrow @click-left="$router.back()"></van-nav-bar>
  <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
    <van-cell v-for="item in searchData" :key="item.art_id" :title="item.title" />
  </van-list>
</div>
```



```js
  data() {
    return {
      searchData: [],
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 20
    }
  },
  computed: {
    q() {
      return this.$route.params.q
    }
  },
  methods: {
    async onLoad() {
      const data = await getSearch({
        page: this.page,
        perPage: this.perPage,
        q: this.q
      })
      console.log(data)
      if (!data.results.length) {
        this.loading = false
        this.finished = true
        return
      }
      this.searchData.push(...data.results)
      this.page += 1
      this.loading = false
    }
  }
```

`注意`:目前页面有缓存keep-alive,需要处理

### 14-项目-首页-搜索结果-页码处理-缓存处理

`目的`:这里的搜索结果页面不需要缓存

`问题`: 搜索a关键字->展示A的结果组件->搜索b->应该展示B的结果->keep-alive->

`代码`->search-result/index.vue

```js
// keep-alive 组件停用时调用-> 缓存刚做完 就触发->此时 ,有缓存
  deactivated() {
    // 清除缓存的组件->干掉组件
    // this->当前Vue构造函数的实例化对象->Vue实例->Vue实例对象->obj.属性|obj.方法()->文档中Vue实例的.方法()

    // 完全销毁一个实例。->干掉组件

    this.$destroy()
  },
```

`提示`: 如何找到方法 比方法本身的用法要重要

### 15-项目-首页-搜索-历史记录-布局

`目的`:将搜索历史记录进行快速布局

`步骤`

1. 已经显示联想建议
2. 提供布尔属性控制联想建议和历史记录的切换显示
3. 将即使记录进行布局
4. 提供历史记录的全部删除/删除/完成按钮

`代码`

```html
 <!-- 联想建议 -->
    <van-cell-group v-if="suggestionData.length&&searchText.length">
      <van-cell icon="search" v-for="(item,i) in suggestionData" :key="i" @click="onSearch(item)">
        <div slot="title" v-html="hightlight(item,searchText)">
        </div>
      </van-cell>
    </van-cell-group>
    <!-- 历史搜索记录 -->
    <van-cell-group v-else>
      <van-cell title="历史记录">
        <van-icon @click="isDeleteData=true" v-show="!isDeleteData" slot="right-icon" name="delete" style="line-height:inherit"></van-icon>
        <div v-show="isDeleteData">
          <span style="margin-right:10px">全部删除</span>
          <span @click="isDeleteData=false">完成</span>
        </div>
      </van-cell>
      <van-cell title="hello111">
        <van-icon v-show="isDeleteData" slot="right-icon" name="close" style="line-height:inherit"></van-icon>
      </van-cell>

    </van-cell-group>
```

`注意`:提供布尔属性控制删除按钮的显示与隐藏isDeleteData



### 16-项目-首页-搜索-历史记录-本地存储

`目的`:利用localStorage持久化数据,并且实现删除功能

`代码`

```html
 <!-- 历史搜索记录 -->
    <van-cell-group v-if="searchHistories.length && !suggestionData.length">
      <van-cell title="历史记录">
        <van-icon @click="isDeleteData=true" v-show="!isDeleteData" slot="right-icon" name="delete" style="line-height:inherit"></van-icon>
        <div v-show="isDeleteData">
          <span style="margin-right:10px" @click="searchHistories = []">全部删除</span>
          <span @click="isDeleteData=false">完成</span>
        </div>
      </van-cell>
      <van-cell :title="item" v-for="(item, index) in searchHistories" :key="item">
        <van-icon @click="searchHistories.splice(index,1)" v-show="isDeleteData" slot="right-icon" name="close" style="line-height:inherit"></van-icon>
      </van-cell>

    </van-cell-group>
```

`js->data`

```js
 searchHistories:
        JSON.parse(window.localStorage.getItem('search-histories')) || []
```

`js->methods`

```js
onSearch(queryText) {
    console.log('onSearch--', queryText)
    if (!queryText.length) {
        return
    }
    // this.searchHistories.push(queryText)
    const data = new Set(this.searchHistories)
    data.add(queryText)
    this.searchHistories = Array.from(data)
    window.localStorage.setItem(
        'search-histories',
        JSON.stringify(this.searchHistories)
    )
    this.$router.push({
        name: 'search-result',
        params: {
            q: queryText
        }
    })
    this.searchText = ''
},
```

`js`->

```js
  deactivated() {
    this.$destroy()
  },
```

`注意`

1. 利用Set去重
2. 销毁组件


## day06

### 01-项目-首页-频道管理-删除频道-优化

`目的`:解决频道管理-删除频道-删除当前激活的频道后,页面无数据的问题

`可以尝试的解决方案`

1. 如果删除了当前激活的->回到默认推荐->最简单的!

2. 在子组件完成删除后->把整个频道数组传给父组件重新渲染->代码改动很大!

3. 监测当前激活的频道的文字->watch->手动更新数据

4. 监测数据变化->手动触发当前激活的tab

5. 本项目第三和第四无法解决该问题->  因为vant的tabs组件有点问题->tab内容加载机制

   

`步骤` 

1. 子组件删除成功后,发射事件给父组件
2. 父组件中手动加载数据
3. 设置tabs的lazy-render为false
4. tabs绑定change事件,手动更新数据

`代码`

`channel.vue`

```js
async deleChannel(item, index) {
      this.channels.splice(index, 1)

      // 让父组件重新更新当前频道的数据
      this.$emit('success-delete')
    
    
    // 省略
```

`home/index.vue`

```vue
// template
    <van-tabs :lazy-render="false" @change="changeTab" v-model="activeChannelIndex" class="channel-tabs">

        
  <channels @success-delete="handledeleteSuccess()" :activeIndex="activeChannelIndex" :channels="channels" v-model="isShowPopChannel" @update:active-index="activeChannelIndex=$event"></channels>

// js->methods
  changeTab() {
      // this.activeChannel.upPullLoading = true
      this.onLoad()
    },
    handledeleteSuccess() {
      console.log(this.activeChannel.articles.length)

      if (!this.activeChannel.articles.length) {
        console.log('----')
        this.activeChannel.upPullLoading = true
        this.onLoad()
      }
    },
        
```



### 02-项目-首页-搜索-显示和取消

`目的`:在首页组件显示搜索组件

`代码`

`home/index.vue`

```html
   <!-- 顶部导航 -->
    <van-nav-bar title="首页" fixed @click.native="$router.push({name:'search'})"></van-nav-bar>

```

`search/index.vue`

```js
 onCancel() {
      console.log('onCancel--')
      this.$router.push({
        name: 'home'
      })
    }
```

`注意`

1. @click.修饰符native
2. this.$router.back()

### 03-项目-token过期处理-分析

### 04-项目-token过期处理-实现

`目的`:token每隔一定时间会失效,此时请求会报错401,可以用refresh_token进行处理

`流程`: 发送请求1requet->401->res拦截器->判断是否有用户->有->更新token->发送请求2axios->成功->修改vuex的user->更新token完毕->返回当前这次请求1request

 

`代码`

`utils/request.js`

```js
// Add a response interceptor
request.interceptors.response.use(
    function(response) {
        // Do something with response data
        // 如果响应结果对象中有 data，则直接返回这个 data 数据
        // 如果响应结果对象中没有 data，则不作任何处理，直接原样返回这个数据
        return response.data.data || response.data
    },
    async error => {
        if (error.response.status === 401) {
            // 看一下有没有 user（有 user 就有 refresh_token）
            const user = store.state.user

            // 如果连 user 都没有，则直接跳转登录页去登录
            if (!user) {
                router.push({
                    name: 'login'
                })
                return
            }

            // 如果有 user，那我们请求接口使用 refresh_token 获取新的访问 token
            try {
                // 注意：请求获取刷线 token 不要使用 request
                // 因为刷新 token 有她自己的处理流程
                // 如果你使用 request 的话，需要做更多的判断处理，会导致你分不清请求的流程了
                const { data } = await axios({
                    method: 'PUT',
                    url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
                    headers: {
                        Authorization: `Bearer ${user.refresh_token}`
                    }
                })

                // 拿到新的登录令牌了
                // 更新用户 token
                store.commit('setUser', {
                    token: data.data.token,
                    refresh_token: user.refresh_token
                })

                // 把本次因为 token 过期的请求继续发出去
                // 非刷新 token 的请求，使用 request 走我们的那个正常的请求拦截相关流程
                return request(error.config)
            } catch (refreshErr) {
                // 刷新 token 都请求失败，甭想了，直接去登录页
                router.push({
                    name: 'login'
                })
            }
        }
        // Do something with response error
        return Promise.reject(error)
    }
)
```



### 05-项目-首页-详情-组件拆分

`目的`:导航+标题+作者信息组件+内容+更多操作组件

`代码`

`作者信息组件`->auth-info.vue

```vue
<template>
  <div class="auth-info">
    <div class="base-info">
      <img class="avatar" src="https://img.yzcdn.cn/vant/logo.png" alt="">
      <div>
        <p>黑马程序员</p>
        <p>3天前</p>
      </div>
    </div>
    <div>
      <van-button type="danger" :loading="false">关注</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuthInfo',
  props: {},
  data() {
    return {}
  }
}
</script>

<style lang="less" scoped>
.auth-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 26px;
  .base-info {
    display: flex;
    align-items: center;
  }
  .avatar {
    margin-right: 10px;
    width: 100px;
    height: 100px;
    border-radius: 100%;
  }
}
</style>

```

`更多操作组件`->more-action.vue

```vue
<template>
  <div class="more-action">
    <van-button icon="star-o" round :loading="false" type="danger">点赞</van-button>

    <van-button icon="delete" round :loading="false" type="danger">不喜欢</van-button>
  </div>
</template>

<script>
export default {
  name: 'MoreAction',
  props: {},
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.more-action {
  padding: 20px;
  display: flex;
  justify-content: space-around;
}
</style>

```

`文章详情组件`->article/index.vue

```vue
<template>
  <div class="article">
    <!-- 导航 -->
    <van-nav-bar title="黑马头条" left-text="返回" left-arrow @click-left="$router.back()"></van-nav-bar>
    <div>
      <!-- 文章标题 -->
      <h2 class="article-title">文章标题</h2>
      <!-- 作者信息 -->
      <auth-info></auth-info>
      <!-- 文章内容 -->
      <div class="article-content" v-html="文章内容">

      </div>
      <!-- 更多操作 -->
      <more-action></more-action>
    </div>
  </div>
</template>

<script>
import AuthInfo from './components/auth-info.vue'
import MoreAction from './components/more-action.vue'

export default {
  name: 'ArticleIndex',
  components: {
    AuthInfo,
    MoreAction
  },
  data() {
    return {}
  },
  created() {},
  methods: {}
}
</script>

<style lang="less" scoped>
.article {
  // padding: 20px;
  .article-title {
    font-size: 40px;
    font-weight: 400px;
  }
  .article-content {
    font-size: 20px;
  }
}
</style>

```

`router.js`

```js
    {
            name: 'article',
            path: '/article/:articleId',
            component: () =>
                import ('@/views/article')
        },
```

### 06-项目-首页-详情-获取数据

`目的`:进入详情、获取数据

`步骤`

1. home/index.vue绑定点击事件
2. api/article.js封装请求
3. article/index.vue发送请求获取数据

`注意`: 测试方便 这里的文章id可以写死 141314

`代码`

`home/index.vue`

```vue
<van-cell @click="$router.push({name:'article',params:{articleId:articleItem.art_id}})" v-for="articleItem in item.articles" :key="articleItem.art_id.toString()" :title="articleItem.title">
    <!--省略-->
</van-cell>
```

`api/article.js`

```js
/**
 * 文章详情
 */
export const getArticleDetail = articleId => {
    return request({
        method: 'GET',
        url: `/app/v1_0/articles/${articleId}`
    })
}
```

`article/index.vue`

```vue
<template>
  <div class="article">
    <!-- 导航 -->
    <van-nav-bar title="黑马头条" left-text="返回" left-arrow @click-left="$router.back()"></van-nav-bar>
    <div>
      <!-- 文章标题 -->
      <h2 class="article-title">{{article.title}}</h2>
      <!-- 作者信息 -->
      <auth-info></auth-info>
      <!-- 文章内容 -->
      <div class="article-content" v-html="article.content">

      </div>
      <!-- 更多操作 -->
      <more-action></more-action>
    </div>
  </div>
</template>

<script>
import AuthInfo from './components/auth-info.vue'
import MoreAction from './components/more-action.vue'
import { getArticleDetail } from '@/api/articles'

export default {
  name: 'ArticleIndex',
  components: {
    AuthInfo,
    MoreAction
  },
  data() {
    return {
      article: {
        art_id: 1153511593225486336,
        attitude: -1,
        aut_id: 1,
        aut_name: '娘娘爱你',
        aut_photo: 'http://toutiao.meiduo.site/FiUvarBdvpkRJMPEAICpohKDCC9Q',
        ch_id: 5,
        content: '<p>后台柔荑花柔荑花柔荑花</p>',
        is_collected: false,
        is_followed: false,
        pubdate: '2019-07-23T11:46:09',
        recomments: [],
        title: '太黄让他忽然他'
      }
    }
  },
  created() {
    this.loadArticle()
  },
  methods: {
    async loadArticle() {
      const data = await getArticleDetail(this.$route.params.articleId)
      this.article = data
    }
  }
}
</script>
```

`注意`:article的初始值可以给定,防止报错

### 07-项目-首页-详情-渲染作者信息

`目的`:把auth-info的数据进行展示

`步骤`

1. 父传子 article
2. 子接收数据prop
3. 子组件使用数据

`代码`

`auth-info.vue`

```vue
<template>
  <div class="auth-info">
    <div class="base-info">
      <img class="avatar" src="https://img.yzcdn.cn/vant/logo.png" alt="">
      <div>
        <p>{{article.aut_name}}</p>
        <p>{{article.pubdate | relTime}}</p>
      </div>
    </div>
    <div>
      <van-button :type="article.is_followed ? 'default':'danger'" :loading="false">
        {{article.is_followed?'已关注':'关注'}}
      </van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuthInfo',
  props: {
    article: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {}
  }
}
</script>
```

### 08-项目-首页-详情-关注和取消关注

`目的`:为关注按钮绑定事件进行处理

`步骤`

1. 绑定事件
2. 封装api方法
3. 提供布尔属性
4. 发送请求

`代码`

`api/user.js`

```js
/**
 * 关注用户
 */
export const followUser = userId => {
    return request({
        method: 'POST',
        url: '/app/v1_0/user/followings',
        data: {
            target: userId
        }
    })
}

/**
 * 取消关注
 */
export const unFollowUser = userId => {
    return request({
        method: 'DELETE',
        url: `/app/v1_0/user/followings/${userId}`
    })
}
```

`auth-info.vue`

```js
    async handleFollow() {
      try {
        this.isFollowLoading = true
        if (this.article.is_followed) {
          await unFollowUser(this.article.aut_id)
          this.article.is_followed = false
        } else {
          await followUser(this.article.aut_id)
          this.article.is_followed = true
        }
      } catch (error) {
        console.log(error)
      }
      this.isFollowLoading = false
    }
```

`注意`:登陆后才能关注



### 09-项目-首页-详情-评论-显示组件

`目的`:将准备好的评论组件进行展示

`comment-list.vue`

```vue
<template>
  <div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="item in list" :key="item">
        <div slot="icon">
          <img class="avatar" src="http://toutiao.meiduo.site/Fn6-mrb5zLTZIRG3yH3jG8HrURdU" alt="">
        </div>
        <div slot="title">
          <span>只是为了好玩儿</span>
        </div>
        <div slot="default">
          <van-button icon="like-o" size="mini" plain>赞</van-button>
        </div>
        <div slot="label">
          <p>hello world</p>
          <p>
            <span>2019-7-17 14:08:20</span>
            ·
            <span>回复</span>
          </p>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
export default {
  name: 'CommentList',
  props: {},
  data() {
    return {
      list: [],
      loading: false,
      finished: false
    }
  },
  created() {},
  methods: {
    onLoad() {
      console.log('onLoad')
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 5; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 10) {
          this.finished = true
        }
      }, 500)
    }
  }
}
</script>

<style lang="less" scoped>
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 100%;
  margin-right: 10px;
}
</style>

```

`注意`:没有新代码,直接复制,把精力放在新业务上

### 10-项目-首页-详情-评论-封装和测试api

`注意`: 如果一个接口有多个作用->把接口拆成不同的请求

```js
 * 分页数据的控制参数
 * pagenum 和 pagesize total
 * 这里的offset就是之前的页码 或者是时间戳
 * 这里的limit就是之前的每页数量 或者 时间戳每页数据
```



### 11-项目-首页-详情-评论-渲染视图

1. 提供data数据commets
2. 渲染视图

### 12-项目-首页-详情-评论-获取分页数据

`目的`: 根据接口文档封装文章评论的api并且渲染评论数据

`步骤`

1. 封装api
2. 测试接口
3. 获取数据
4. 分析分页数据的获取
5. 渲染视图

`代码`

`api/comment.js`

```js
export const getComments = ({
    articleId,
    offset
    // limit
}) => {
    return request({
        method: 'get',
        url: `/app/v1_0/comments`,
        params: {
            type: 'a',
            source: articleId,
            offset
            // limit
        }
    })
}
```

`comment.vue`

```js
import { getComments } from '@/api/comment.js'
export default {
  name: 'CommentList',
  props: {},
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      comments: [],
      offset: null
    }
  },
  computed: {
    articleId() {
      return this.$route.params.articleId
    }
  },
  props: {
    article: {
      type: Object,
      default: () => {}
    }
  },
  created() {},
  methods: {
    async onLoad() {
      const data = await getComments({
        articleId: this.articleId,
        offset: this.offset
      })
      // console.log(data)
      if (!data.results.length) {
        this.finished = true
        this.loading = false
        return
      }
      this.comments.push(...data.results)
      this.offset = data.last_id
      this.loading = false
    }
  }
}
```

`注意` 

1. offset初始值为 **null**
2. ****注意last_id的用法
3. 文章id的来源为路由参数,这里固定为141314



### 13-项目-首页-详情-回复-准备组件

`目的`: 将回复组件准备好并且显示出来

`代码`

`reply-list.vue` 

```html
<template>

  <van-popup :value='value' @input="$emit('input',$event)" position="bottom" :style="{height:'75%'}">

  </van-popup>
</template>

<script>
export default {
  name: 'ReplyList',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang='less' scoped>
</style>

```

### 14-项目-首页-详情-回复-global通信

`目的`: 点击评论组件的回复按钮,展示回复列表组件,把评论组件的数据传递给回复组件->利用globalbus

`步骤`

1. 新建global-bus.js 导出Vue实例
2. 评论列表组件comment  $emit
3. 回复列表组件 reply-list $on

`代码`

`global-bus.js`

```js
import Vue from 'vue'
export default new Vue()
```

`comment.vue`

```js
handleReplyShow() {
      vm.$emit('reply-show')
    },
```

`reply-list.vue`

```js
 created() {
    vm.$on('reply-show', () => {
      this.isShow = true
    })
  }
```

### 15-项目-首页-详情-回复-展示楼主信息

`目的`: 在回复组件顶部展示楼主信息

`代码`

`comment.vue`

```js
// html 点击回复按钮,传递当前文章评论
<span @click="handleReplyShow(item)">回复{{item.reply_count}}</span>

// js
 handleReplyShow(item) {
      vm.$emit('reply-show', item)
    },
```

`reply-list.vue`

```vue
<template>

  <van-popup v-model="isShow" position="bottom" :style="{height:'75%'}">
    <van-cell>
      <div slot="icon">
        <img class="avatar" :src="commentFirst.aut_photo" alt="">
      </div>
      <div slot="title">
        <span>{{commentFirst.aut_name}}</span>
        <van-tag>楼主</van-tag>
      </div>
      <div slot="default">
        <van-button icon="like-o" size="mini" plain>赞</van-button>
      </div>
      <div slot="label">
        <p>{{commentFirst.content}}</p>
        <p>
          <span>{{commentFirst.pubdate | relTime}}</span>
        </p>
      </div>
    </van-cell>
    <hr>
  </van-popup>
</template>

<script>
import vm from '@/utils/global-bus.js'
export default {
  name: 'ReplyList',
  data() {
    return {
      isShow: false,
      commentFirst: {}
    }
  },
  created() {
    vm.$on('reply-show', item => {
      this.isShow = true
      this.commentFirst = item
    })
  }
}
</script>

<style lang='less' scoped>
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 100%;
  margin-right: 10px;
}
</style>

```

`提示`: 楼主信息的展示和评论列表的一个单元格cell 一样

### 16-项目-首页-详情-回复-封装评论组件和回复列表组件-调整api

`目的`:comment.vue和reply-list楼主信息下面的回复列表很像,可以进行封装

`步骤` 

1. 封装api 改造为两套接口的使用
2. 修改comment.vue的数据来源 props
3. 在reply-list中使用comment.vue组件

`代码`

`article.js`

```js
export const getCommentsOrReply = ({ isCommet, commetOrReplyId, offset }) => {
    return request({
        method: 'GET',
        url: `/app/v1_0/comments`,
        params: {
            type: isCommet ? 'a' : 'c',
            source: commetOrReplyId,
            offset
            // limit
        }
    })
}

```

`commet-list.vue`->js->onload

```js
  const data = await getCommentsOrReply({
        commetOrReplyId: this.article_id,
        offset: this.offset,
        isCommet: true
      })
```

## day07

### 01-项目-首页-详情-回复-封装组件-调整api

`目的`:评论列表和回复列表共用一套接口,所以需要设计合理的api参数

`代码`

`文章评论的api` 

```js
/**
 * 获取评论或者获取回复
 */
export const getComments = ({
  source,1
  offset = null,
  limit = 10,
  isArticle = true
}) => {
  return request({
    method: 'GET',
    url: '/app/v1_0/comments',
    params: { // axios 不会添加类型为 null 的数据
      type: isArticle ? 'a' : 'c', // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
      source, // 源id，文章id或评论id
      offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
      limit // 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
    }
  })
}
```



### 02-项目-首页-详情-回复-封装组件-调整评论组件

`目的`:考虑组件的复用性->评论和回复列表可以复用同一个组件,提供props给外部

`commet-list.vue`

```js
export default {
  name: 'CommentList',
  props: {
    /**
     * source 是文章id或是评论id
     * 文章id用于获取文章的评论
     * 评论id用于获取评论的回复
     */
    source: {
      type: [Number, String],
      required: true
    },

    /**
     * 你是要加载文章的评论呢？还是要加载评论的回复
     */
    isArticle: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      comments: [],
      loading: false,
      finished: false,
      offset: null
    }
  },

  created () {
  },

  methods: {
    async onLoad () {
      console.log('oLoad')
      const data = await getComments({
        source: this.source,
        offset: this.offset,
        limit: 10, // 默认为 10
        isArticle: this.isArticle
      })

      // 如果没有数据，则意味着评论加载完毕了
      if (!data.results.length) {
        this.finished = true
        this.loading = false
        return
      }

      // 有数据，将数据添加到评论列表中
      this.comments.push(...data.results)

      // 将本次的 loading 设置为 false
      this.loading = false

      // 提供下一页的请求参数
      this.offset = data.last_id
    },

    handleShowReply (item) {
      globalBus.$emit('reply-show', item)
    }
  }
}
```

`article/index.vue`

```html
      <comment-list :source="articleId" />
```



### 03-项目-首页-详情-回复-封装组件-展示回复列表组件

`目的`: 在reply-list中使用封装好的组件

`reply-list.vue`

```html
    <comment-list v-if="isShow" :source="commentFirst.com_id.toString()" :is-article="false" />
```



### 04-项目-首页-详情-评论-发布评论-准备组件

`目的`:将准备好的发布评论的组件进行渲染

`代码`

`article/compontents/add-comment.vue`

```vue
<template>
  <div class="add-comment">
    <div class="input-wrap">
      <input type="text" v-model="content">
    </div>
    <div class="more-wrap">
      <!-- <van-icon v-if="!articleId" :name="article.is_collected ? 'star' : 'star-o'" @click="handleCollect"></van-icon> -->
      <van-button size="small" :disabled="!content.length" @click="handleAdd">发布</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddComment',
  data() {
    return {
      content: ''
    }
  },

  methods: {
    async handleAdd() {}
  }
}
</script>

<style lang="less" scoped>
.add-comment {
  width: 100%;
  background: #fff;
  padding: 20px;
  border-top: 2px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .input-wrap {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 20px;
    height: 60px;
    display: flex;
    align-items: center;
    width: 50%;
    input {
      border: none;
      color: #999;
      font-size: 30px;
    }
  }
  .more-wrap {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-evenly;
  }
}
</style>

```

`article/index.vue`

```html
  <!-- 发布评论 -->
      <add-comment class="add-comment" />
```

```css
.add-comment {
  position: fixed;
  left: 0;
  bottom: 0;
}
```



### 05-项目-首页-详情-评论-发布评论-封装api

`目的`:考虑api的复用,将发布评论的api和发布回复的api进行封装

`代码`

```js
/**
 * 添加评论|回复
 */
export const addComment = ({
    target,
    content,
    articleId = null // 如果数据为 null，则 axios 不会发送该数据
}) => {
    return request({
        method: 'POST',
        url: '/app/v1_0/comments',
        data: {
            // axios 不会添加类型为 null 的数据
            target, // 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
            content, // 评论内容
            art_id: articleId // 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
        }
    })
}
```

### 06-项目-首页-详情-评论-发布评论-发布成功

`目的`:点击发布按钮,发送请求,发布数据

`代码`

`article/index.vue`

```js
      <add-comment class="add-comment" :target="articleId" :article="article" />

```

`add-comment.vue`->js

```js
props: {
    target: {
        type: [Number, String],
            required: true
    },
        articleId: {
            type: [Number, String],
                default: null
        },
            article: {
                type: Object,
                    default: () => {}
            }
},
    methods: {
        async handleAdd() {
            try {
                await addComment({
                    target: this.target, // 文章id | 评论id
                    content: this.content,
                    articleId: this.articleId
                })
                this.$toast('发布成功')
                this.content = ''
            } catch (err) {
                this.$toast.fail('操作失败')
            }
        }
    }
```

`提示`: 目前代码已经可以发布成功了, 之后再测试



### 07-项目-首页-详情-回复-回复列表

`目的`:使用封装好的组件展示回复组件下方的回复列表

`代码`

`reply-list.vue`

```html
 <comment-list
        v-if="isShow"
        :source="comment.com_id.toString()"
        :is-article="false"
      />
```

`提示`: 这里的思想是封装组件->复用->根据接口提供的功能

### 08-项目-首页-详情-回复-发布回复的评论

`目的`:使用封装好的组件展示回复列表底部的发布

`repyl-list.vue`

```html
<!--省略-->
    <add-comment class="add-comment" v-if="isShow" :target="commentFirst.com_id.toString()" :article-id="articleId" />

```

```js
 props: {
    articleId: {
      type: [Number, String],
      required: true
    }
  },
```

```css
<style lang="less" scoped>
.add-comment {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 9999;
}
</style>
```

`article/index.vue`

```html
      <reply-list :article-id="articleId" />
```



### 09-项目-首页-详情-总结

`目的`: 组件化开发->复用组件

已写的组件:列表(评论和回复) 发布(评论和回复)组件

1. 先分析接口->一个接口多个功能->为接口提供的参数
2. 封装组件: 发送请求->请求参数的值?->值来源
   1. data->组件自己的简单数据
   2. **props**->接收外部的数据!!!!
   3. compued->组件自己的复杂数据->依赖关系
   4. vuex-> 多个组件共享的数据
   5. 路由参数params | query-> 
      1. 按钮->push->A到B->B中可以获取params值->刷新了B->params值undefined
      2. 解决方案-> path:'user/:name',  this.$route.params.name
   6. localStorage->数据的持久化的解决方案之一
3. 使用组件时,传值

`注意`: 组件封装->封装html(slot) css(使用者决定一部分样式) js(props和事件)

### 10-项目-个人-业务分析

1. 个人中心->
2. 用户编辑->**头像上传** 
3. **扩展: 即**时通信 -> 聊天-> 客服+机器人聊天
4. 看时间:网站->打包app



### 11-项目-个人-配置组件

`目的` 将准备好的组件进行展示

`步骤`

1. un-login->未登录状态的组件
2. user-info->登录状态的组件
3. index.vue->个人中心的主页

`代码`

`tabbar-layout` 

```html
      <van-tabbar-item icon="user-o" to="/mine">{{ $store.state.user ? '我的' : '未登录'}}</van-tabbar-item>

```

`un-login.vue`

```vue
<template>
  <div class="not-login" v-if="!$store.state.user">
    <div class="circle" @click="$router.push({ name: 'login', query: { redirect: '/my' } })">
      <span>登录</span>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less">
.not-login {
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  .circle {
    width: 100px;
    height: 100px;
    padding: 40px;
    background-color: red;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 40px;
  }
}
</style>

```

`user-info.vue`

```vue
<template>
  <van-cell-group class="user-info">
    <van-cell class="base-info" is-link :border="false" @click="$router.push({ name: 'user-profile' })">
      <div slot="title">
        <img class="avatar" src="" alt="显示头像">
        <span class="title">用户名</span>
      </div>
    </van-cell>
    <van-grid class="data-info" :border="false">
      <van-grid-item>
        <span class="count">1</span>
        <span class="text">头条</span>
      </van-grid-item>
      <van-grid-item>
        <span class="count">2</span>
        <span class="text">关注</span>
      </van-grid-item>
      <van-grid-item>
        <span class="count">3</span>
        <span class="text">粉丝</span>
      </van-grid-item>
      <van-grid-item>
        <span class="count">4</span>
        <span class="text">获赞</span>
      </van-grid-item>
    </van-grid>
  </van-cell-group>
</template>

<script>
export default {
  name: 'UserInfo',
  props: {}
}
</script>

<style lang="less">
.user-info {
  .base-info {
    display: flex;
    align-items: center;
    div {
      display: flex;
      align-items: center;
    }
    .avatar {
      margin-right: 30px;
      width: 100px;
      height: 100px;
      border-radius: 100%;
    }
  }
  .data-info {
    .text {
      font-size: 28px;
    }
    .count {
      font-size: 24px;
    }
  }
}
</style>

```

`mine/index.vue`

```vue
<template>
  <div>
    <un-login v-if="!$store.state.user" />
    <user-info v-else />
  </div>
</template>

<script>
import UnLogin from './components/un-login'
import UserInfo from './components/user-info'


export default {
  name: 'MyIndex',
  components: {
    UnLogin,
    UserInfo
  },

  data() {
    return {
     
    }
  },

  created() {
    console.log('created')

  },

  methods: {
  }
}
</script>

<style lang="less" scoped></style>

```



### 12-项目-个人-用户信息展示

`目的`: 将登录后的个人信息进行展示

`步骤`

1. 封装api
2. index.vue->发送请求
3. 把数据传递给个人信息组件user-info
4. 渲染个人信息数据

`代码`

`api`

```js
/**
 * 获取当前登录用户的基本信息
 */
export const getCurrentUserInfo = () => {
    return request({
        method: 'GET',
        url: `/app/v1_0/user`
    })
}

```

`index.vue`

```js
// template  
<user-info v-else :user="user" />

    // js
    created(){
    if (this.$store.state.user) {
        this.loadUserInfo()
    }

    methods: {
        async loadUserInfo() {
            try {
                const data = await getCurrentUserInfo()
                this.user = data
            } catch (err) {
                this.$toast.fail('加载用户信息失败')
            }
        }
    }
```

`user-info.vue`

```vue
        <span class="title">{{ user.name }}</span>
        <span class="count">{{ user.art_count }}</span>
        <span class="count">{{ user.follow_count }}</span>
        <span class="count">{{ user.fans_count }}</span>
        <span class="count">{{ user.like_count }}</span>

```



### 13-项目-个人-编辑-显示信息

`目的`: 点击user-info.vue的按钮,显示编辑组件

`步骤`

1. 配置组件user-profile/index.vue
2. 封装api
3. 获取数据
4. 渲染视图

`代码`

`user-profile/index.vue`

```vue
<template>
  <div>
    <van-nav-bar title="个人信息" left-text="返回" right-text="保存" left-arrow @click-left="$router.back()" @click-right="handleSave" />

    <van-cell-group>
      <van-cell is-link title="头像">
        <div slot="default">
          <img width="30" :src="user.photo" alt="">
        </div>
      </van-cell>
      <van-cell is-link title="昵称" :value="user.name" />
      <van-cell is-link title="介绍" value="内容" />
    </van-cell-group>

    <van-cell-group>
      <van-cell is-link title="性别" :value="user.gender === 0 ? '男' : '女'" />
      <van-cell is-link title="生日" :value="user.birthday" />
    </van-cell-group>

   
  </div>
</template>

<script>
import { getCurrentUserProfile } from '@/api/user'

export default {
  name: 'UserProfile',
  components: {
  },
  data() {
    return {
      user: {},
      isUploadPhotoShow: false
    }
  },

  created() {
    this.loadUserProfile()
  },

  methods: {
    async handleSave() {
  
    },
    async loadUserProfile() {
      try {
        const data = await getCurrentUserProfile()
        this.user = data
      } catch (err) {
        this.$toast.fail('加载用户信息失败')
      }
    }
  }
}
</script>

<style lang="less" scoped></style>

```

`api`

```js
/**
 * 获取当前登录用户的基本信息
 */
export const getCurrentUserProfile = () => {
    return request({
        method: 'GET',
        url: `/app/v1_0/user/profile`
    })
}
```

`提示`: 该接口的body 忽略 不用写

### 14-项目-个人-编辑-封装api

`目的`: 封装修改用户基本信息的请求,测试接口

```js
/**
 * 更新用户个人信息
 * axios 会把无效数据进行过滤，null、undefined 等数据
 */
export const updateUserProfile = ({
    name,
    photo,
    gender,
    birthday,
    realName,
    idNumber,
    idCardFront,
    idCardBack,
    idCardHandheld,
    intro
}) => {
    return request({
        method: 'PATCH',
        url: `/app/v1_0/user/profile`,
        data: {
            name,
            photo,
            gender,
            birthday,
            real_name: realName,
            id_number: idNumber,
            id_card_front: idCardFront,
            id_card_back: idCardBack,
            id_card_handheld: idCardHandheld,
            intro
        }
    })
}
```

`测试接口`->user-profile->index.vue

```js
async handleSave() {
      const data = await updateUserProfile({
        name: 'hm_lcz0'
      })
      console.log(data)
    },
```



### 15-项目-个人-编辑-头像上传-分析

`流程`: 编辑组件->点击头像->打开对话框(上传组件)->选择图片->确定选择(预览)->回到编辑组件->发送编辑请求 



### 16-项目-个人-编辑-头像上传-准备组件

`目的`:封装头像上传的组件upload-photo 

`代码`

`user-profile/components/upload-photo.vue`

```js
<template>
  <div>
    <van-dialog :value="value" @input="$emit('input', $event)" :show-confirm-button="false">
      <van-cell-group>
        <van-cell title="从相册选择"  />
        <input style="display: none;" >
        <van-cell title="拍照" />
        <van-cell title="取消" @click="$emit('input', false)" />
      </van-cell-group>
    </van-dialog>
  </div>
</template>

<script>
export default {
  name: 'UploadPhoto',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
    }
  },

  computed: {

  },

  methods: {
  
    }
}
</script>

<style>
</style>

```

`user-profile/index.vue`

```html
 <van-cell is-link title="头像" @click="isUploadPhotoShow = true">
        <div slot="default">
          <img width="30" :src="user.photo" alt="">
        </div>
      </van-cell>

<upload-photo
      v-model="isUploadPhotoShow"
    />
```



### 17-扩展-this指向-四种绑定

```js
   // this->指向
        // 1. window
        // 2. obj
        // 3. new Person
        // 4. 事件源

        // 前提知识铺垫: 会找调用栈
        function fn1() {
            console.log('fn1----');


            // debugger // 在这打个断点
            fn2()
        }

        function fn2() {
            console.log('fn2----');
            // debugger // 在这打个断点
            fn3()
        }

        function fn3() {
            // debugger // 在这打个断点
            console.log('fn3----');
        }

        // debugger // 在这打个断点
        // fn1()



        // 普通函数的this问题->调用方法时,调用方法的位置所在的栈的this
        // 1. 默认绑定: -> 独立调用函数 -> 函数前面没东西->this->window
        // function fna() {
        //     console.log(this.a);
        // }
        // var a = 10
        // fna()

        // 特例->严格模式->此时this不符合默认绑定规则
        // function fna() {
        //     'use strict'
        //     console.log(this.a);
        // }
        // var a = 10
        // fna()

        // 2. 显示绑定: 方法前面有东西->对象.方法()->此时方法中的this指向该对象
        // var a = 10
        // function fnb() {
        //     console.log(this.a);

        // }
        // var obj = {
        //     a: 20,
        //     fnb: fnb
        // }

        // obj.fnb()

        // 3. 隐式绑定: 使用call bind apply修改了方法内部的this指向->this指向call第一个实参
        // var a = 10
        // function fnc() {
        //     console.log(this.a);
        // }
        // var obj = {
        //     a: 20
        // }
        // fnc.call(obj)

        // 特例:  如果给call等方法传递的是null undefined 此时 默认绑定规则失效, 所以应用默认规则 所以是window
        // var a = 10

        // function fnc() {
        //     console.log(this.a);
        // }
        // var obj = {
        //     a: 20
        // }
        // fnc.call(null)

        // 4. new绑定: 使用new关键字修饰函数来调用->此时函数中的this指向new实例化的对象 
        // function foo(a){
        //   this.a = a
        // }
        // const b = new foo()

        // 小结:在一段代码中出现了多个规则, 此时优先级的顺序是:  new -> 显示 -> 隐式->默认
```

## day08

### 01-项目-个人-编辑-头像上传-准备组件

`目的`:封装头像上传的组件upload-photo 

`代码`

`user-profile/components/upload-photo.vue`

```js
<template>
  <div>
    <van-dialog :value="value" @input="$emit('input', $event)" :show-confirm-button="false">
      <van-cell-group>
        <van-cell title="从相册选择"  />
        <input style="display: none;" >
        <van-cell title="拍照" />
        <van-cell title="取消" @click="$emit('input', false)" />
      </van-cell-group>
    </van-dialog>
  </div>
</template>

<script>
export default {
  name: 'UploadPhoto',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
    }
  },

  computed: {

  },

  methods: {
  
    }
}
</script>

<style>
</style>

```

`user-profile/index.vue`

```html
 <van-cell is-link title="头像" @click="isUploadPhotoShow = true">
        <div slot="default">
          <img width="30" :src="user.photo" alt="">
        </div>
      </van-cell>

<upload-photo
      v-model="isUploadPhotoShow"
    />
```

### 02-项目-个人-编辑-头像上传-选择图片

`目的`: 点击cell,打开本地文件

`代码`

```vue
// template
<input style="display: none;" type="file" ref="input" >
// js
 computed: {
    file() {
      return this.$refs.input
    }
  },
methods:{
 openFile() {
      this.file.click()
    },
}
```

### 03-项目-个人-编辑-头像上传-预览图片

`目的`: 获取选择后的图片文件

`代码`

```html

```

```js
changeFile() {
    const reader = new FileReader()
    reader.readAsDataURL(this.file.files[0])
    reader.onload = () => {
        // console.log(reader.result) // base64格式的图片
        // console.log(ImagePreview)
        ImagePreview({
            images: [reader.result],
            // startPosition: 1,
            showIndex: false,
            showIndicators: false,
            onClose: () => {
                // 打开对话框
                this.openDia()
            }
        })
    }
},

    openDia() {
        // do something
        // 打开确认框
        this.$dialog
            .confirm({
            title: '是否确认修改头像'
        })
            .then(() => {
            this.updateImage()
        })
            .catch(() => {})
    },
```

### 04-项目-个人-编辑-头像上传-封装api

`目的`: 封装修改用户头像的请求

`代码`

```js
// 更新用户头像
// photo	file	否		头像
// id_card_front	file	否		身份证正面照片
// id_card_back	file	否		身份证背面照片
// id_card_handheld	file	否		手持身份证照片
export const updateUserPhoto = (name, file) => {
    const formData = new FormData()
    formData.append(name, file)
    return request({
        method: 'PATCH',
        url: `/app/v1_0/user/photo`,
        data: formData
    })
}
```

`注意`: 注意细看接口文档,ContentType的值

### 05-项目-个人-编辑-头像上传-发送请求-显示头像

`目的`:发送请求->修改头像->显示头像

`代码`

`upload-photo.vue`

```js
 async updateImage() {
      // console.log(this.file.files[0])
      const data = await updateUserPhoto('photo', this.file.files[0])
      // console.log(data)
      if (data.photo) {
        this.$emit('input', false)
        console.log(data.photo)

        this.$emit('upload-success', data.photo)
      } else {
        this.$toast('上传失败')
      }
    }
```

`user-profile/index.vue`

```html
    <upload-photo v-model="isUploadPhotoShow" @upload-success="user.photo=$event" />
```

### 06-项目-ws-介绍

> 想实现聊天->两个客户端给服务端发消息

> 介绍

1. ws是协议
2. ws基于tcp协议
3. ws是W3C的标准->自带的API
4. ws专业术语: 全双工通讯->客户端和服务端可以主动给对方发请求(发消息)

> 半双工->对讲机

> 特点

1. 长连接
2. 服务端可以主动给客户端发消息
3. 一旦连接,不会断开

### 07-项目-ws-基本使用

```js
var ws = new WebSocket("wss://echo.websocket.org");

ws.onopen = function(evt) { 
  console.log("Connection open ..."); 
  ws.send("Hello WebSockets!");
};

ws.onmessage = function(evt) {
  console.log( "Received Message: " + evt.data);
  ws.close();
};

ws.onclose = function(evt) {
  console.log("Connection closed.");
};      
```

### 08-项目-socketio-介绍

`目的`: 了解socket.io的作用,根据文档完成demo

`官网` : [socket.io](https://socket.io/get-started/chat/)  

### 09-项目-socketio-体验-连接

### 10-项目-socketio-体验-建立连接

### 11-项目-socketio-体验-收发消息

### 12-项目-socketio-体验-广播消息

> 下面是socket.io体验的完整代码,参照官方学习的demo

`socket.io`->服务端代码

```js
var app = require('express')()
var http = require('http').createServer(app)
var io = require('socket.io')(http)

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html')
})

io.on('connection', function(socket) {
    console.log('连接成功')
    socket.on('message', function(msg) {
        console.log('服务端收到了消息为:' + msg)
        // 服务端给客户端发送消息
        // socket.emit('message', '知道了')
        // 广播给所有的连接者
        io.emit('chat message', msg)
        // socket.broadcast.emit('hi')
    })
})

http.listen(3000, '0.0.0.0', function() {
    console.log('listening on *:3000')
})
```

`socket.io`->客户端代码

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <title>Socket.IO chat</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font: 13px Helvetica, Arial;
        }
        
        form {
            background: #000;
            padding: 3px;
            position: fixed;
            bottom: 0;
            width: 100%;
        }
        
        form input {
            border: 0;
            padding: 10px;
            width: 90%;
            margin-right: .5%;
        }
        
        form button {
            width: 9%;
            background: rgb(130, 224, 255);
            border: none;
            padding: 10px;
        }
        
        #messages {
            list-style-type: none;
            margin: 0;
            padding: 0;
        }
        
        #messages li {
            padding: 5px 10px;
        }
        
        #messages li:nth-child(odd) {
            background: #eee;
        }
    </style>

</head>

<body>

    <ul id="messages"></ul>
    <form action="">
        <input id="m" autocomplete="off" /><button>Send</button>
    </form>
    <script src="/socket.io/socket.io.js"></script>
    <script src="https://code.jquery.com/jquery-1.11.1.js"></script>


    <script>
        // var socket = io();

        $(function() {
            var socket = io('http://127.0.0.1:3000');
            $('form').submit(function(e) {
                e.preventDefault(); // prevents page reloading
                socket.emit('message', $('#m').val());
                $('#m').val('');
                return false;
            });
            // socket.on('message', (data) => {
            //     console.log('客户端收到服务端的消息为:', data);
            // })
            socket.on('chat message', function(msg) {
                $('#messages').append($('<li>').text(msg));
            });
        });
    </script>
</body>

</html>
```



### 13-项目-个人-机器人聊天-准备组件

`目的`: 点击个人中心的反馈cell,显示机器人聊天的组件

`步骤`

1. 添加cell 点击跳转
2. 配置路由
3. 新建组件chat.vue

`代码`

`user-info.vue`

```vue
<!-- 反馈 -->
    <van-cell class="base-info" is-link :border="false" @click="$router.push({ name: 'feedback' })">
      <div slot="title">
        <span class="title">用户反馈</span>
      </div>
    </van-cell>
```



`chat.vue`

```vue
<template>
  <div class="chat">
    <van-nav-bar fixed title="聊天" left-text="返回" left-arrow @click-left="$router.back()"></van-nav-bar>

    <div class="chat-window" ref="chat-window">
      <van-cell :class="item.from!=='myself'?'left':'right'" v-for="(item,index) in msgs" :key="index" :value="item.msg" />
      <div class="clear"></div>
    </div>

    <van-cell-group border class="sendmsg">
      <van-field border v-model="msg" center>
        <van-button slot="button" size="small" type="primary">发送</van-button>
      </van-field>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'Chat',
  components: {},
  data() {
    return {
      msg: '你好,小智机器人',
      msgs: []
    }
  },
  watch: {},
  methods: {},
  created() {}
}
</script>

<style lang='less' scoped>
.van-nav-bar {
  background-color: #1989fa;
  .van-nav-bar__title {
    color: #ffffff;
  }
}

.sendmsg {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}
.sendmsg /deep/ .van-cell {
  border: 1px solid black;
}

.chat .chat-window {
  position: relative;
  top: 92px;
  font-size: 14px;
}
.chat /deep/ .van-nav-bar__text {
  color: #ffffff;
}
.clear {
  height: 102px;
}
.chat-window /deep/ .left .van-cell__value {
  color: red;
}
.chat-window /deep/ .right .van-cell__value {
  color: green;
}
</style>


```



### 14-项目-个人-机器人聊天-建立连接

`目的`: 在项目中使用[socket.io-client](https://github.com/socketio/socket.io-client) 

`步骤`

1. 安装
2. 导入
3. 建立连接

`代码`

```js
import io from 'socket.io-client'

created() {
    this.setSocket()
},
    methods:{
        setSocket() {
            this.socket = io('http://ttapi.research.itcast.cn', {
                query: {
                    token: this.$store.state.user.token
                }
            })
            this.socket.on('connect', () => {
                console.log('连接成功')
            })
        }
```

### 15-项目-个人-机器人聊天-默认消息

`目的`:默认发送第一条消息,将消息渲染到视图

`步骤`

1. 提供data数据 socket 和 msgs
2. 连接成功后,发送消息 更新视图
3. 收到消息,更新视图

`代码`

```js
 this.socket.on('connect', () => {
        console.log('连接成功')

        this.socket.emit('message', {
          msg: this.msg,
          timestamp: Date.now()
        })
        this.msgs.push({
          msg: this.msg,
          from: 'myself'
        })
        this.socket.on('message', data => {
          console.log('接收到的消息为--->', data)
          this.msgs.push({
            msg: data.msg,
            from: 'yourself'
          })
        })
      })
```

`注意`

1. 消息类型为message->接口文档
2. 设计msg消息数组的数据结构[{msg:?,from:?}]



### 16-项目-个人-机器人聊天-收发消息

`目的`:点击发送按钮,收发消息

`代码`

```html
        <van-button slot="button" size="small" type="primary" @click="sendMsg" :disabled="!isConnect||!msg.length">发送</van-button>
```

```js
    sendMsg() {
      this.setSocket()
    },
```

`完整的js代码`

```js
<script>
import io from 'socket.io-client'

export default {
  name: 'Chat',
  components: {},
  data() {
    return {
      msg: '你好,小智机器人',
      msgs: [],
      socket: null,
      isConnect: false
    }
  },

  methods: {
    sendMsg() {
      this.setSocket()
    },

    // 发送消
    sendMsgToRobat() {
      this.socket.emit('message', {
        msg: this.msg,
        timestamp: Date.now()
      })
      this.msgs.push({
        msg: this.msg,
        from: 'myself'
      })
      this.msg = ''
      this.recMsgFromRobat()
    },
    // 收消息
    recMsgFromRobat() {
      this.socket.on('message', data => {
        this.msgs.push({
          msg: data.msg,
          from: 'yourself'
        })
      })
    },

    setSocket() {
      if (this.socket) {
        return
      }
      this.socket = io('http://ttapi.research.itcast.cn', {
        query: {
          token: this.$store.state.user.token
        }
      })

      this.socket.on('connect', () => {
        console.log('连接成功')
        this.isConnect = true
        this.sendMsgToRobat()
      })
    }
  },
  created() {
    if (this.$store.state.user) {
      this.setSocket()
    }
  }
}
</script>

```





### 


































