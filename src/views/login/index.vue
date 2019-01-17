
<template>
  <div id="login1">
    <h1>Tilte msg: {{ msg }}</h1>
    <input v-model="msg">
    <p>Computed reversed message: "{{ reversedMsg }}"</p>
    <ol>
      <li v-for="todo in todos" :key="todo">
        {{ todo.text }}
      </li>
    </ol>
    <my-component></my-component>
   <ul>
     <todo-item v-for= "item in groceryList" :key="item.id" v-bind:todo="item"></todo-item>
   </ul>
    <div class="login-container">
      <el-form ref="loginForm" :model="loginForm">
        <el-form-item prop="username">
          <el-input
          v-model="loginForm.username"
          name="username"
          type="text"
          auto-complete="on"
          />
        </el-form-item>
      </el-form>
    </div>
   <div>
     <ul is="transition-group">
       <li v-for="(user, index) of users" class="user" :key="index">
         <span>{{user.name}} - {{user.email}}</span>
         <button v-on:click="removeUser(index)">X</button>
       </li>
     </ul>
     <form id='form' v-on:submit.prevent="addUser">
       <input type="text" v-model="newUser.name" placeholder="Username"/>
       <input type="email" v-model="newUser.email" placeholder="email@email.com"/>
       <input type="submit" value="Add User"/>
     </form>
     <ul class="errors">
       <li v-show="!validation.name">Name cannot be empty.</li>
       <li v-show="!validation.email">Please provide a valid email address.</li>
     </ul>
   </div>
    <div id="databinding">
    <button v-on:click="show = !show">点我</button>
      <transition :name="slideFade" >
        <p v-if="show"> 菜鸟驿------动画效果测试</p>
      </transition>
    </div>
    <br/>
    <div id="lsit-demo" class="demo">
      <button v-on:click="add"> Add </button>
      <button v-on:click="remove"> Remove </button>
      <br/>
      <transition-group :name="list">
      <p v-for=" item in items" :key="item" class="list-item">
        {{ item }}
      </p>
      </transition-group>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
var Child = {
  template: '<div>A custom component!</div>'
}
// 注册
Vue.component('todo-item', {
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
})
export default {
  name: 'Login1',
  components: {
    'my-component': Child
  },
  props: {
    slideFade: {
      type: String,
      default: 'fade'
    },
    list: {
      type: String,
      default: 'list'
    }
  },
  data () {
    return {
      msg: '用户登录中心',
      todos: [
        { text: '学习 JavaScript' },
        { text: '学习 Vue' },
        { text: '整个牛项目' }
      ],
      groceryList: [
        { id: 0, text: '蔬菜' },
        { id: 1, text: '奶酪' },
        { id: 2, text: '随便其它什么人吃的东西' }
      ],
      loginForm: {
        username: 'admin',
        password: '1111111'
      },
      newUser: {
        name: '',
        email: ''
      },
      users: [],
      show: false,
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      nextNum: 10
    }
  },
  computed: {
    reversedMsg: function () {
      return this.msg.split('').reverse().join('')
    },
    validation: function () {
      const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      return {
        name: !!this.newUser.name.trim(),
        email: reg.test(this.newUser.email)
      }
    },
    isValid: function () {
      var validation = this.validation
      return Object.keys(validation).every(function (key) {
        return validation[key]
      })
    }
  },
  methods: {
    // 新增一条数据
    addUser: function () {
      if (this.isValid) {
        this.users.push({name: this.newUser.name, email: this.newUser.email})
        this.newUser.name = ''
        this.newUser.email = ''
        console.info(this.users.length + ':' + this.users[0].name)
      }
    },
    // 删除一条数据
    removeUser: function (index) {
      console.info(index)
      this.users.splice(index, 1)
    },
    randomIndex: function () {
      return Math.floor(Math.random() * this.items.length)
    },
    add: function () {
      this.items.splice(this.randomIndex(), 0, this.nextNum++)
    },
    remove: function () {
      this.items.splice(this.randomIndex(), 1)
    }
  }
}
</script>

<style scoped>
  .user {
    height: 30px;
    line-height: 30px;
    padding: 10px;
    border-top: 1px solid #eee;
    overflow: hidden;
    transition: all .25s ease;
  }
.user:last-child {
    border-bottom: 1px solid #eee;
  }
.errors {
    color: #f00;
  }
  /*定义进入过渡生效时的状态*/
  .fade-enter-active{
    transition: all .3s ease;
  }
  /*定义离开过渡生效时的状态*/
  .fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  /*定义离开过渡的结束状态*/
  .fade-enter, .fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }
  .list-item {
    display: inline-block;
    margin-right: 10px;
  }
  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }
  .list-enter, .list-leave-to
    /* .list-leave-active for below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(30px);
  }
</style>
