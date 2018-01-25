<template>
    <div>
        <div class="block-header">
            <h2>جميع المستخدمين</h2>
        </div>
        <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="card">
                    <div class="table-btns">
                        <button
                            class="btn btn-danger btn-circle waves-effect waves-circle waves-float will-fade-in"
                            :class="{'fade-toggle': selectTotDeleteItems.length > 0}"
                            data-toggle="modal"
                            data-target="#bulkDelete">
                            <i class="material-icons">delete</i>
                        </button>
                        <button
                            class="btn btn-primary btn-circle waves-effect waves-circle waves-float"
                            data-toggle="modal"
                            data-target="#newUser">
                            <i class="material-icons">add</i>
                        </button>
                    </div>

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
                                <td>{{user.userType | userType}}</td>
                                <td class="text-center">
                                    <i class="material-icons green" v-if="user.status">done_all</i>
                                    <i class="material-icons yellow" v-else>warning</i>
                                </td>
                                <td>
                                    <div>
                                        <div class="i-checks">
                                            <input :id="`checkboxCustom_${i}`" type="checkbox" class="checkbox-template chk-col-red" @change="addToBulkDelete($event, user.id)">
                                            <label :for="`checkboxCustom_${i}`"></label>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <router-link :to="{ name: '/clients/edit' }" class="btn btn-warning">
                                        <i class="material-icons">edit</i>
                                    </router-link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div><!--/card-->
            </div><!--/col-lg-12 col-md-12 col-sm-12 col-xs-12-->
        </div><!--row-->

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
        <!-- New user -->
        <div id="newUser" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" class="modal fade text-left">
            <div role="document" class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 id="exampleModalLabel" class="modal-title">إضافة مستخدم جديد</h4>
                        <button type="button" data-dismiss="modal" aria-label="Close" class="close"><span aria-hidden="true">×</span></button>
                    </div>
                    <div class="modal-body text-right">


                        <div class="form-group">
                            <label class="form-control-label">إسم المستخدم</label>
                            <div class="form-line">
                                <input type="email" class="form-control" v-model="newUser.userName">
                            </div><!--/form-line-->
                        </div>
                        <div class="form-group">
                            <div class="form-line">
                                <label class="form-control-label">إسم تسجيل الدخول</label>
                                <input type="email" class="form-control" v-model="newUser.loginName">
                            </div><!--/form-line-->
                        </div>
                        <div class="form-group">
                            <div class="form-line">
                                <label class="form-control-label">كلمة السر الجديدة</label>
                                <input type="password" class="form-control" v-model="newUser.password">
                            </div><!--/form-line-->
                        </div>
                        <div class="form-group">
                            <div class="form-line">
                                <label class="form-control-label">نوع المستخدم</label>
                                <select name="" id="" class="form-control" v-model="newUser.userType">
                                    <option value="0">مدير</option>
                                    <option value="1">مالك</option>
                                    <option value="2">سائق</option>
                                    <option value="3">عميل</option>
                                </select>
                            </div><!--/form-line-->
                        </div>
                        <div class="form-group">
                            <label class="form-control-label">الحالة</label>
                            <div class="switch">
                                <label>غير فعال<input type="checkbox" v-model="newUser.status"><span class="lever"></span>فعال</label>
                            </div>

                            <div class="text-right">
                                <label class="switch">
                                    <input type="checkbox" checked >
                                    <span class="slider round"></span>
                                </label>
                            </div>
                        </div>


                    </div>
                    <div class="modal-footer">
                        <button type="button" data-dismiss="modal" class="btn btn-secondary">إلغاء</button>
                        <button type="button" class="btn btn-primary" @click="save">حفظ</button>
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
            newUser: {
               userName: '',
               password: '',
               status: false,
               userType: 0, // Admin(0),Owner(1),Driver(2),Customer(3)
               loginName: ''
            },
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
            this.$deleteBulk('/api/drivers/delete/bulk', [...this.selectTotDeleteItems])
                .then(res => {
                    console.log(res);
                    $('.modal').modal('hide')
                    this.getData();
                }).catch(err => {
                    console.log(err);
                })
        },
        save(){
            // console.log(this.newUser);
            this.$post('/api/users', this.newUser)
                .then((res) => {
                    console.log(res);
                    if(res.sc === 200){
                        $('.modal').modal('hide')
                        this.getData();
                    }
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
