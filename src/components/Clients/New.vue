<template>
    <div class="page new-client-page">
        <navbar></navbar>

        <div class="page-content d-flex align-items-stretch">
            <sidebar></sidebar>

            <div class="content-inner">
                <!-- Page Header-->
                <header class="page-header">
                <div class="container-fluid">
                    <h2 class="no-margin-bottom">إضافة عميل</h2>
                </div>
                </header>
                <!-- Dashboard Counts Section-->
                <section class="dashboard-counts no-padding-bottom">
                    <div class="container-fluid">


                        <div class="col-lg-6 col-lg-push-3">
                          <div class="card">
                            <div class="card-body">
                              <div>
                                <div class="form-group">
                                  <label class="form-control-label">إسم المستخدم</label>
                                  <input type="email" class="form-control" v-model="newUser.userName">
                                </div>
                                <div class="form-group">
                                  <label class="form-control-label">إسم تسجيل الدخول</label>
                                  <input type="email" class="form-control" v-model="newUser.loginName">
                                </div>
                                <div class="form-group">
                                  <label class="form-control-label">كلمة السر الجديدة</label>
                                  <input type="password" class="form-control" v-model="newUser.password">
                                </div>
                                <div class="form-group">
                                  <label class="form-control-label">توع المستخدم</label>
                                  <select name="" id="" class="form-control" v-model="newUser.userType">
                                      <option value="0">مدير</option>
                                      <option value="1">مالك</option>
                                      <option value="2">سائق</option>
                                      <option value="3">عميل</option>
                                  </select>
                                </div>
                                <div class="form-group">
                                  <label class="form-control-label">الحالة</label>
                                  <div class="text-right">
                                      <label class="switch">
                                        <input type="checkbox" checked v-model="newUser.status">
                                        <span class="slider round"></span>
                                      </label>
                                  </div>
                                </div>
                                <div class="form-group">
                                  <input type="submit" value="حفظ" class="btn btn-primary" @click="save">
                                </div>
                            </div>
                            </div>
                          </div>
                        </div>


                    </div>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
import navbar from '@/components/parts/_navbar';
import sidebar from '@/components/parts/_sidebar';

export default {
    name: 'new-client',
    components: {
        navbar,
        sidebar
    },
    data () {
        return {
            newUser: {
                userName: 'Eslam',
                password: '123123',
                status: false,
                userType: 0, // Admin(0),Owner(1),Driver(2),Customer(3)
                loginName: 'eslam'
            }
        }
    },
    methods: {
        save(){
            // console.log(this.newUser);
            this.$post('/api/users', this.newUser)
                .then((res) => {
                    console.log(res);
                }).catch((err) => {
                    console.log(err);
                })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
