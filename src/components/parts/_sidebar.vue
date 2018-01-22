<template>
    <div class="sidebar-component">
        <!-- Side Navbar -->
        <nav class="side-navbar">
          <!-- Sidebar Header-->
          <div class="sidebar-header d-flex align-items-center">
            <div class="avatar"><img src="/static/img/avatar-1.jpg" alt="..." class="img-fluid rounded-circle"></div>
            <div class="title">
              <h1 class="h4">إسم المدير</h1>
              <p>مدير</p>
            </div>
          </div>
          <!-- Sidebar Navidation Menus-->
          <ul class="list-unstyled">
            <li> <a href="index.html"><i class="icon-home"></i>الرئيسية</a></li>
            <li><a href="#clients_menu" aria-expanded="false" data-toggle="collapse">
                <i class="icon-user"></i>إدارة العملاء</a>
                <ul id="clients_menu" class="collapse list-unstyled">
                    <li><router-link :to="{path: '/clients/new'}">أضف عميل</router-link></li>
                    <li><router-link :to="{path: '/clients/all'}">بيانات العملاء</router-link></li>
                    <!-- <li><router-link :to="{path: '/clients/requests'}">الطلبات</router-link></li> -->
                    <!-- <li><router-link :to="{path: '/clients/bills'}">فواتير العملاء</router-link></li> -->
                </ul>
            </li>
            <li><a href="#drivers_menu" aria-expanded="false" data-toggle="collapse">
                <i class="icon-user"></i>إدارة السائقين</a>
                <ul id="drivers_menu" class="collapse list-unstyled">
                    <li><router-link :to="{path: '/drivers/new'}">أضف سائق</router-link></li>
                    <li><router-link :to="{path: '/drivers/all'}">بيانات السائقين</router-link></li>
                    <!-- <li><router-link :to="{path: '/clients/requests'}">الطلبات</router-link></li> -->
                    <!-- <li><router-link :to="{path: '/clients/bills'}">فواتير العملاء</router-link></li> -->
                </ul>
            </li>
          </ul>
        </nav>
    </div>
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
