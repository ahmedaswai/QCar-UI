<template>
    <div class="page all-clients-page">
        <navbar></navbar>

        <div class="page-content d-flex align-items-stretch">
            <sidebar></sidebar>

            <div class="content-inner">
                <!-- Page Header-->
                <header class="page-header">
                <div class="container-fluid">
                    <h2 class="no-margin-bottom">جميع العملاء</h2>
                </div>
                </header>
                <!-- Dashboard Counts Section-->
                <section class="dashboard-counts no-padding-bottom">
                    <div class="container-fluid">


                        <div class="btns">
                            <a href="/" class="btn btn-primary">مستخدم جديد</a>
                            <button class="btn btn-danger pull-left" v-if="selectTotDeleteItems.length > 0" data-toggle="modal" data-target="#bulkDelete"><i class="fa fa-trash"></i></button>
                        </div>

                        <div class="card">
                            <div class="card-body">
                              <table class="table table-striped">
                                <thead>
                                  <tr>
                                    <th>#</th>
                                    <th>إسم المستخدم</th>
                                    <th>إسم الدخول</th>
                                    <th>نوع المستخدم</th>
                                    <th class="text-center">حالة المستخدم</th>
                                    <th>مسح</th>
                                    <th>تعديل</th>
                                  </tr>
                                </thead>
                                <tbody>

                                  <tr v-for="(user, i) in users">
                                    <th scope="row">{{i + 1}}</th>
                                    <td>{{user.userName}}</td>
                                    <td>{{user.loginName}}</td>
                                    <td>{{user.userType}}</td>
                                    <td class="text-center">
                                        <i class="fa fa-check table-badge green" v-if="user.status"></i>
                                        <i class="fa fa-close table-badge red" v-else></i>
                                    </td>
                                    <td>
                                        <div>
                                            <div class="i-checks">
                                                <input :id="`checkboxCustom_${i}`" type="checkbox" class="checkbox-template" @change="addToBulkDelete($event, user.id)">
                                                <label :for="`checkboxCustom_${i}`"></label>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
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


        <!-- Modal-->
        <div id="bulkDelete" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" class="modal fade text-left">
            <div role="document" class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h4 id="exampleModalLabel" class="modal-title">حذف</h4>
                  <button type="button" data-dismiss="modal" aria-label="Close" class="close"><span aria-hidden="true">×</span></button>
                </div>
                <div class="modal-body text-right">
                  <h4>هل انت متاكد انك تريد الحذف؟</h4>
                </div>
                <div class="modal-footer">
                  <button type="button" data-dismiss="modal" class="btn btn-secondary">لا</button>
                  <button type="button" class="btn btn-danger" @click="deleteSelected">نعم, إحذف ما تم إختياره</button>
                </div>
              </div>
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
            users: [],
            selectTotDeleteItems: []
        }
    },
    mounted(){
        this.getData();
    },
    methods: {
        getData(){
            this.$get('/api/users')
                .then(res => {
                    console.log(res);
                    this.users = res.rs
                }).catch(err => {
                    console.log(err);
                })
        },
        addToBulkDelete(e, id){
            console.log();
            if (this.selectTotDeleteItems.indexOf(id) === -1) {
                this.selectTotDeleteItems.push(id);
            }else{
                this.selectTotDeleteItems.splice(this.selectTotDeleteItems.indexOf(id), 1)
            }
            console.log(this.selectTotDeleteItems);
        },
        deleteSelected(){
            console.log([...this.selectTotDeleteItems]);
            this.$deleteBulk('/api/drivers/delete/bulk', [...this.selectTotDeleteItems])
                .then(res => {
                    console.log(res);
                }).catch(err => {
                    console.log(err);
                })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
