import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Dashboard from '@/components/Dashboard'
import AllUsers from '@/components/Users/All'
import AllDrivers from '@/components/Drivers/All'
import AllCustomers from '@/components/Customers/All'

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

        // Users
        {
            path: '/users/all',
            name: 'AllUsers',
            component: AllUsers
        },

        // Drivers
        {
            path: '/drivers/all',
            name: 'AllDrivers',
            component: AllDrivers
        },

        // Customers
        {
            path: '/customers/all',
            name: 'AllCustomers',
            component: AllCustomers
        },
    ]
})
