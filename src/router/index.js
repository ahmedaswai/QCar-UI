import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Dashboard from '@/components/Dashboard'
import NewC from '@/components/Clients/New'
import AllC from '@/components/Clients/All'
import NewD from '@/components/Drivers/New'
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
            path: '/clients/new',
            name: 'NewC',
            component: NewC
        },{
            path: '/clients/all',
            name: 'AllC',
            component: AllC
        },


        // Drivers
        {
            path: '/drivers/new',
            name: 'NewD',
            component: NewD
        },{
            path: '/drivers/all',
            name: 'AllD',
            component: AllD
        },
    ]
})
