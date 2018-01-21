<template>
    <div class="page login-page">
      <div class="container d-flex align-items-center">
        <div class="form-holder has-shadow">
          <div class="row">
            <!-- Logo & Information Panel-->
            <div class="col-lg-6">
              <div class="info d-flex align-items-center text-right">
                  <img src="/static/img/logo-white.png">
                <div class="content">
                  <div class="logo">
                      <h1>كيو-كار</h1>
                  </div>
                  <p>تسجيل دخول للوحة تحكم النظام</p>
                </div>
              </div>
            </div>
            <!-- Form Panel    -->
            <div class="col-lg-6 bg-white">
              <div class="form d-flex align-items-center">
                <div class="content">
                  <div id="login-form">
                    <div class="form-group">
                      <input id="login-username" type="text" name="loginUsername" autofocus v-model="username" class="input-material">
                      <label for="login-username" class="label-material active">إسم المستخدم</label>
                    </div>
                    <div class="form-group">
                      <input id="login-password" type="password" name="loginPassword" v-model="password" class="input-material">
                      <label for="login-password" class="label-material active">كلمة المرور</label>
                    </div>
                    <div @click="login" class="btn btn-primary">تسجيل الدخول</div>
                    <div class="loader" v-if="loading">
                        <svg class="circular" viewBox="25 25 50 50">
                          <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/>
                        </svg>
                    </div>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data () {
        return {
            username: 'bmind',
            password: '123',
            loading: false
        }
    },
    methods: {
        login(e){
            this.loading = true
            let data = {
                userName: this.username,
                password: this.password
            };

            this.$post('/login', data).then((res) => {
                console.log('posting..', res);
                if (res.sc === 200) {
                    localStorage.setItem('Q_Car__user_info', JSON.stringify(res.rs.user))
                    localStorage.setItem('Q_Car__user_token', res.rs.token)
                    this.$router.push('/dashboard')
                }
                setTimeout(() => {
                    this.loading = false
                }, 500)
            }).catch((err) => {
                console.log('Err', err);
            })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
