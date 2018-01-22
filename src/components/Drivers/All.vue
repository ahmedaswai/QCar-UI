<template>
    <div class="page all-clients-page">
        <navbar></navbar>

        <div class="page-content d-flex align-items-stretch">
            <sidebar></sidebar>

            <div class="content-inner">
                <!-- Page Header-->
                <header class="page-header">
                <div class="container-fluid">
                    <h2 class="no-margin-bottom">جميع السائقين</h2>
                </div>
                </header>
                <!-- Dashboard Counts Section-->
                <section class="dashboard-counts no-padding-bottom">
                    <div class="container-fluid">


                        <div class="btns">
                            <a href="/" class="btn btn-primary">مستخدم جديد</a>
                            <button class="btn btn-danger pull-left" disabled><i class="fa fa-trash"></i></button>
                        </div>

                        <div class="card">
                            <div class="card-body">
                              <table class="table table-striped">
                                <thead>
                                  <tr>
                                    <th>#</th>
                                    <th>الإسم</th>
                                    <th>أرقام الهواتف</th>
                                    <th>التقييم</th>
                                    <th class="text-center">حالة المستخدم</th>
                                    <th class="text-center">جميع التفاصيل</th>
                                    <th class="text-center">مسح</th>
                                    <th class="text-center">تعديل</th>
                                  </tr>
                                </thead>
                                <tbody>

                                  <tr v-for="(driver, i) in drivers">
                                    <th scope="row">{{i + 1}}</th>
                                    <td>{{driver.fullName || 'غير محدد'}}</td>
                                    <td>{{driver.mobileNumber1}} - {{driver.mobileNumber2}} - {{driver.homePhoneNumber}}</td>
                                    <td>{{driver.rating}}</td>
                                    <td class="text-center">
                                        <i class="fa fa-check table-badge green" v-if="driver.status"></i>
                                        <i class="fa fa-close table-badge red" v-else></i>
                                    </td>
                                    <td class="text-center">
                                        <button class="btn btn-info"><i class="fa fa-list"></i></button>
                                    </td>
                                    <td class="text-center">
                                        <div>
                                            <div class="i-checks">
                                                <input :id="`checkboxCustom_${i}`" type="checkbox" class="checkbox-template" @change="addToBulkDelete">
                                                <label :for="`checkboxCustom_${i}`"></label>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="text-center">
                                        <router-link :to="{ name: '/clients/edit' }" class="btn btn-warning">
                                            <i class="fa fa-pencil"></i>
                                        </router-link>
                                    </td>
                                  </tr>

                                </tbody>
                              </table>
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
    name: 'all-clients',
    components: {
        navbar,
        sidebar
    },
    data () {
        return {
            drivers: []
        }
    },
    mounted(){
        this.$get('/api/drivers')
            .then(res => {
                console.log(res);
                this.drivers = res.rs
            }).catch(err => {
                console.log(err);
            })
    },
    methods: {
        addToBulkDelete(e){
            console.log(e);
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
