import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Dashboard from '@/components/Dashboard'
import AllC from '@/components/Clients/All'
import AllD from '@/components/Drivers/All'

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
        },

        // Clients
        {
            path: '/clients/all',
            name: 'AllC',
            component: AllC
        },


        // Drivers
        {
            path: '/drivers/all',
            name: 'AllD',
            component: AllD
        },
    ]
})
