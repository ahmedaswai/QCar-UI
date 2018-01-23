<template>
    <div class="page new-client-page">
        <navbar></navbar>

        <div class="page-content d-flex align-items-stretch">
            <sidebar></sidebar>

            <div class="content-inner">
                <!-- Page Header-->
                <header class="page-header">
                <div class="container-fluid">
                    <h2 class="no-margin-bottom">إضافة سائق</h2>
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
                                    <label class="form-control-label">موقع السائق</label>
                                    <gmap-map
                                        :center="{lat:29.310297, lng:30.845376}"
                                        :zoom="10"
                                        class="map-wrapper"
                                        @click="mapClicked"
                                    >
                                        <gmap-marker
                                            :position="marker"
                                            @click="center=marker"
                                            v-if="showMarker"
                                        ></gmap-marker>
                                    </gmap-map>
                                </div>
                                <div class="form-group">
                                  <label class="form-control-label">إسم السائق</label>
                                  <input type="text" class="form-control" v-model="newDriver.fullName">
                                </div>
                                <div class="form-group">
                                  <label class="form-control-label">رقم التلفون الأول</label>
                                  <input type="text" class="form-control" v-model="newDriver.mobileNumber1">
                                </div>
                                <div class="form-group">
                                  <label class="form-control-label">رقم التلفون الثاني</label>
                                  <input type="text" class="form-control" v-model="newDriver.mobileNumber2">
                                </div>
                                <div class="form-group">
                                  <label class="form-control-label">رقم تليفون المنزل</label>
                                  <input type="text" class="form-control" v-model="newDriver.homePhoneNumber">
                                </div>
                                <div class="form-group">
                                  <label class="form-control-label">رقم البطاقة</label>
                                  <input type="text" class="form-control" v-model="newDriver.idNumber">
                                </div>
                                <div class="form-group">
                                  <label class="form-control-label">رقم رخصة السواقة</label>
                                  <input type="text" class="form-control" v-model="newDriver.licenseNumber">
                                </div>
                                <div class="form-group">
                                  <label class="form-control-label">رقم رخصة السيارة</label>
                                  <input type="text" class="form-control" v-model="newDriver.carLicenseNumber">
                                </div>
                                <div class="form-group">
                                  <label class="form-control-label">تاريخ إنتهاء رخصة القيادة</label>
                                  <input type="date" class="form-control" v-model="newDriver.carLicenseExpiryDate">
                                </div>
                                <div class="form-group">
                                  <label class="form-control-label">مدينة الترخيص</label>
                                  <select class="form-control" v-model="newDriver.carLicenseCity">
                                      <option value="0">الفيوم</option>
                                      <option value="1">القاهرة</option>
                                      <option value="2">بني سويف</option>
                                  </select>
                                </div>
                                <div class="form-group">
                                  <label class="form-control-label">تاريخ ميلاد السائق</label>
                                  <input type="date" class="form-control" v-model="newDriver.birthDate">
                                </div>
                                <div class="form-group">
                                  <label class="form-control-label">ملاحظات</label>
                                  <textarea  rows="8" class="form-control" v-model="newDriver.notes"></textarea>
                                </div>
                                <div class="form-group">
                                  <label class="form-control-label">رصيد السائق</label>
                                  <input type="number" class="form-control" v-model="newDriver.credit">
                                </div>
                                <div class="form-group">
                                    <label class="form-control-label">الحالة</label>
                                    <div class="text-right">
                                        <label class="switch">
                                            <input type="checkbox" checked v-model="newDriver.status">
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
            newDriver: {
                fullName: 'محمد حسنين',
                mobileNumber1: '01000000000',
                mobileNumber2: '01000000001',
                homePhoneNumber: '084123123',
                idNumber: '123123',
                licenseNumber: '123123',
                carLicenseNumber: '123123',
                carLicenseExpiryDate: '2017-03-20',
                carLicenseCity: 0,
                birthDate: '1990-09-21',
                notes: 'some notes',
                status: false,
                credit: 10,
                homeLocation: {}
            },
            marker: {
                lat:29.310297,
                lng:30.845376
            },
            showMarker: false
        }
    },
    methods: {
        save(){
            this.newDriver.homeLocation.coordinates = [this.marker.lat, this.marker.lng]
            // console.log(this.newDriver);
            this.$post('/api/drivers', this.newDriver)
                .then((res) => {
                    console.log(res);
                    if(res.sc === 200){
                        this.$router.push('/drivers/all')
                    }
                }).catch((err) => {
                    console.log(err);
                })
        },
        mapClicked(e){
            this.showMarker = true;
            this.marker.lat = e.latLng.lat()
            this.marker.lng = e.latLng.lng()
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
