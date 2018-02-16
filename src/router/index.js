import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Dashboard from '@/components/Dashboard'
import AllUsers from '@/components/Users/All'
import AllDrivers from '@/components/Drivers/All'
import AllCustomers from '@/components/Customers/All'
import AllOrders from '@/components/Customers/AllOrders'
import NewOrder from '@/components/Customers/NewOrder'
import AllTrips from '@/components/Trips/AllTrips'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Login',
            component: Login
        }, {
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
        }, {
            path: '/customers/new-order',
            name: 'NewOrder',
            component: NewOrder
        }, {
            path: '/customers/all-orders',
            name: 'AllOrders',
            component: AllOrders
        },

        //  Customers
        {
            path: '/trips/all',
            name: 'AllTrips',
            component: AllTrips
        },
    ]
})
