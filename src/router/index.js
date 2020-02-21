import Vue from 'vue'
import Router from 'vue-router'
import cognitoAuth from '@/cognito'
import Login from '@/components/auth/login/Login.vue'
import Dashboard from '@/components/Dashboard.vue'

Vue.use(Router)

function requireAuth (to, from, next) {
    cognitoAuth.isAuthenticated((err, loggedIn) => {
      if (err) return next()
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

  export default new Router({
    linkActiveClass: 'active',
    // mode: 'history',
    base: __dirname,
    routes: [
      { path: '/', component: Login, beforeEnter: requireAuth  },
      { path: '/dashboard', component: Dashboard, beforeEnter: requireAuth },
      { path: '/login', component: Login},
            
      // { path: '/curso_cloud_aws', component: Cursocloudaws },
       { path: '/logout',
        beforeEnter (to, from, next) {
          cognitoAuth.logout();         
          next('/login')
          document.getElementsByName('token')['0'].content = '';
          localStorage.removeItem('session');
        }
      }
    ]
  })