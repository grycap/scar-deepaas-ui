import Vue from 'vue'
import Router from 'vue-router'
import cognitoAuth from '@/cognito'
import Login from '@/components/auth/login/Login.vue'
import Dashboard from '@/components/Dashboard.vue'
import Settings from '@/components/Settings.vue'
import Callback from '@/components/Callback.vue'

Vue.use(Router)

function requireAuth (to, from, next) {
    var id_token = JSON.parse(localStorage.getItem("token_id"));
    console.log(id_token != null)
    if (id_token != null){
      next()
    }else {
      cognitoAuth.isAuthenticated((err, loggedIn) => {
        if (err) return next()
        console.log(loggedIn)
        if (!loggedIn) {
          next({
            path: '/login',
            query: { redirect: to.fullPath }
          })
        } else {
          next()
        }
      })
    }

  }

  export default new Router({
    linkActiveClass: 'active', 
    // mode: 'history',
    base: __dirname,
    routes: [
      { path: '', component: Login, beforeEnter: requireAuth  },
      { path: '/', component: Login, beforeEnter: requireAuth  },
      { path: '/dashboard', component: Dashboard, beforeEnter: requireAuth },
      {path : '/settings', component: Settings, beforeEnter: requireAuth },
      {path : '/callback', component: Callback},
      { path: '/login', component: Login},
            
      { path: '/logout',
        beforeEnter (to, from, next) {
          var id_token = JSON.parse(localStorage.getItem("token_id"));
          if (id_token == null){
            cognitoAuth.logout();         
          }
          next('/login')
          document.getElementsByName('token')['0'].content = '';
          localStorage.removeItem('session');
          localStorage.removeItem('token_id');
          localStorage.clear()
        }
      }
    ]
  })