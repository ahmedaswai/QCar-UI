<template>
    <div class="login-box">
        <div class="logo">
            <img src="/static/images/logo-white.png">
            <small>تسجيل الدخول إلي لوحة التحكم</small>
        </div>
        <div class="card">
            <div class="body">
                <div id="sign_in">
                    <div class="input-group">
                        <span class="input-group-addon">
                        <i class="material-icons">person</i>
                        </span>
                        <div class="form-line">
                            <input type="text" class="form-control" placeholder="إسم الدخول" v-model="username">
                        </div>
                    </div>
                    <div class="input-group">
                        <span class="input-group-addon">
                        <i class="material-icons">lock</i>
                        </span>
                        <div class="form-line">
                            <input type="password" class="form-control" placeholder="كلمة السر" v-model="password">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-8 p-t-5" style="direction: ltr;text-align: right;">
                            <div class="preloader pl-size-xs" v-if="loading">
                                <div class="spinner-layer pl-red-grey">
                                    <div class="circle-clipper left">
                                        <div class="circle"></div>
                                    </div>
                                    <div class="circle-clipper right">
                                        <div class="circle"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-4">
                            <button class="btn btn-block bg-pink waves-effect" @click="login">دخول</button>
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
    beforeCreate(){
        document.body.classList = 'theme-blue login-page ls-closed';
    },
    beforeDestroy(){
        document.body.classList = 'theme-blue';
    },
    methods: {
        login(e){
            this.loading = true
            let data = {
                userName: this.username,
                password: this.password
            };

            this.$post('/login', data).then((res) => {
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
