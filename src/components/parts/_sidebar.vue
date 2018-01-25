<template>
    <!-- Left Sidebar -->
    <aside id="leftsidebar" class="sidebar">
        <!-- User Info -->
        <div class="user-info">
            <!-- <div class="image">
                <img src="/static/images/user.png" width="48" height="48" alt="User" />
            </div> -->
            <div class="info-container">
                <div class="name" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">إسم المستخدم</div>
                <!-- <div class="email">john.doe@example.com</div> -->
                <div class="btn-group user-helper-dropdown">
                    <i class="material-icons" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">keyboard_arrow_down</i>
                    <ul class="dropdown-menu pull-right">
                        <li><a href="javascript:void(0);"><i class="material-icons">input</i>Sign Out</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- #User Info -->
        <!-- Menu -->
        <div class="menu">
            <ul class="list">
                <li class="header">القائمة الرئيسية</li>
                <li>
                    <router-link :to="{path: '/dashboard'}">
                        <i class="material-icons">home</i>
                        <span>الرئيسية</span>
                    </router-link>
                </li>
                <li>
                    <a href="javascript:void(0);" class="menu-toggle">
                        <i class="material-icons">people</i>
                        <span>إدارة المستخدمين</span>
                    </a>
                    <ul class="ml-menu">
                        <li>
                            <router-link :to="{path: '/users/all'}">بيانات المستخدمين</router-link>
                        </li>
                    </ul>
                </li>
                <li>
                    <a href="javascript:void(0);" class="menu-toggle">
                        <i class="material-icons">drive_eta</i>
                        <span>إدارة السائقين</span>
                    </a>
                    <ul class="ml-menu">
                        <li>
                            <router-link :to="{path: '/drivers/all'}">بيانات السائقين</router-link>
                        </li>
                    </ul>
                </li>
                <li>
                    <a href="javascript:void(0);" class="menu-toggle">
                        <i class="material-icons">attach_money</i>
                        <span>إدارة العملاء</span>
                    </a>
                    <ul class="ml-menu">
                        <li>
                            <router-link :to="{path: '/customers/all'}">بيانات العملاء</router-link>
                        </li>
                        <li>
                            <router-link :to="{path: '/customers/new-order'}">إنشاء طلب جديد</router-link>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <!-- #Menu -->
    </aside>
    <!-- #END# Left Sidebar -->
</template>

<script>
export default {
    name: 'sidebar',
    data () {
        return {

        }
    },
    mounted(){

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
