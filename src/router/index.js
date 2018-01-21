import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Dashboard from '@/components/Dashboard'
import New from '@/components/Clients/New'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Login',
            component: Login
        },{
            path: '/dashboard',
            name: 'Dashboard',
            component: Dashboard
        },{
            path: '/clients/new',
            name: 'New',
            component: New
        }
    ]
})
