<template>
    <div>
        <div class="block-header">
            <h2>إحصائيات</h2>
        </div>

        <!-- Widgets -->
        <div class="row clearfix" v-if="!loading">
            <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                <div class="info-box bg-orange hover-expand-effect">
                    <div class="icon">
                        <i class="material-icons">explore</i>
                    </div>
                    <div class="content">
                        <div class="text">عدد الرحلات</div>
                        <div class="number">{{data.numberOfOnlineUsers}}</div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                <div class="info-box bg-cyan hover-expand-effect">
                    <div class="icon">
                        <i class="material-icons">compare_arrows</i>
                    </div>
                    <div class="content">
                        <div class="text">عدد الطلبات</div>
                        <div class="number">{{data.numberOfOrders}}</div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                <div class="info-box bg-pink hover-expand-effect">
                    <div class="icon">
                        <i class="material-icons">drive_eta</i>
                    </div>
                    <div class="content">
                        <div class="text">عدد السائقين الفعالين</div>
                        <div class="number">{{data.numberOfActiveDrivers}}</div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                <div class="info-box bg-light-green hover-expand-effect">
                    <div class="icon">
                        <i class="material-icons">drive_eta</i>
                    </div>
                    <div class="content">
                        <div class="text">عدد السائقين المتاحين الأن</div>
                        <div class="number">{{data.numberOfOnlineDrivers}}</div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                <div class="info-box bg-orange hover-expand-effect">
                    <div class="icon">
                        <i class="material-icons">people</i>
                    </div>
                    <div class="content">
                        <div class="text">عدد العملاء المتاحين الأن</div>
                        <div class="number">{{data.numberOfOnlineUsers}}</div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                <div class="info-box bg-cyan hover-expand-effect">
                    <div class="icon">
                        <i class="material-icons">people</i>
                    </div>
                    <div class="content">
                        <div class="text">عدد المستخدمين الفعالين</div>
                        <div class="number">{{data.numberOfOnlineUsers}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="text-center" v-else style="padding: 40px 0">
            <div class="preloader pl-size-md ltr">
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
        <!-- #END# Widgets -->
    </div>
</template>

<script>
export default {
    name: 'Dashboard',
    data () {
        return {
            data: {},
            loading: true
        }
    },
    mounted(){
        this.getData()
    },
    methods: {
        getData(){
            this.$get('/api/dashboard/landing-page')
                .then(res => {
                    console.log(res);
                    this.loading = false
                    this.data = res.rs;
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
