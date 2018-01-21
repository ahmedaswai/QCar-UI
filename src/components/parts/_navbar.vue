<template>
    <div class="header-component">
        <!-- Main Navbar-->
        <header class="header">
          <nav class="navbar">
            <div class="container-fluid">
              <div class="navbar-holder d-flex align-items-center justify-content-between">
                <!-- Navbar Header-->
                <div class="navbar-header">
                  <!-- Navbar Brand --><a href="index.html" class="navbar-brand">
                    <div class="brand-text brand-big"><span>كيو-كار</span></div>
                    <!-- <div class="brand-text brand-small"><strong>BD</strong></div> -->
                </a>
                  <!-- Toggle Button-->
                  <!-- <a id="toggle-btn" href="#" class="menu-btn active"><span></span><span></span><span></span></a> -->
                </div>
                <!-- Navbar Menu -->
                <ul class="nav-menu list-unstyled d-flex flex-md-row align-items-md-center">
                  <!-- Logout    -->
                  <li class="nav-item">
                      <router-link :to="{path: '/'}" class="nav-link logout">تسجيل الخروج <i class="fa fa-sign-out"></i></router-link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>
    </div>
</template>

<script>
export default {
    name: 'navbar',
    data () {
        return {

        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
