<template>
    <div>
        <div class="block-header">
            <h2>جميع السائقين</h2>
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
                            data-target="#newDriver">
                            <i class="material-icons">add</i>
                        </button>
                    </div>

                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>إسم السائق</th>
                                <th>أرقام الهواتف</th>
                                <th>الموقع</th>
                                <th class="text-center">حالة السائق</th>
                                <th>مسح</th>
                                <th>تفاصيل</th>
                                <th>تعديل</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(user, i) in drivers" :key="user.id">
                                <th scope="row">{{i + 1}}</th>
                                <td>{{user.fullName || 'غير محدد'}}</td>
                                <td>{{user.mobileNumber1}} - {{user.mobileNumber2}} - {{user.homePhoneNumber}}</td>
                                <td>
                                    <a
                                        v-if="user.homeLocation"
                                        :href="`http://maps.google.com/?q=${user.homeLocation.coordinates[0]},${user.homeLocation.coordinates[1]}`"
                                        target="_blank"
                                        class="btn btn-primary map-btn"
                                    >
										<i class="material-icons">my_location</i>
									</a>
                                </td>
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
                                    <a
                                        data-toggle="modal"
                                        data-target="#driverDetails"
                                        class="btn btn-info"
                                        @click="driverDetails(user)"
                                    >
										<i class="material-icons">list</i>
									</a>
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
        <div id="newDriver" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" class="modal fade text-left">
            <div role="document" class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 id="exampleModalLabel" class="modal-title">إضافة مستخدم جديد</h4>
                        <button type="button" data-dismiss="modal" aria-label="Close" class="close"><span aria-hidden="true">×</span></button>
                    </div>
                    <div class="modal-body text-right">

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
                            <div class="form-line">
                                <label class="form-control-label">إسم السائق</label>
                                <input type="text" class="form-control" v-model="newDriver.fullName">
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="form-line">
                                <label class="form-control-label">رقم التلفون الأول</label>
                                <input type="text" class="form-control" v-model="newDriver.mobileNumber1">
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="form-line">
                                <label class="form-control-label">رقم التلفون الثاني</label>
                                <input type="text" class="form-control" v-model="newDriver.mobileNumber2">
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="form-line">
                                <label class="form-control-label">رقم تليفون المنزل</label>
                                <input type="text" class="form-control" v-model="newDriver.homePhoneNumber">
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="form-line">
                                <label class="form-control-label">رقم البطاقة</label>
                                <input type="text" class="form-control" v-model="newDriver.idNumber">
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="form-line">
                                <label class="form-control-label">رقم رخصة السواقة</label>
                                <input type="text" class="form-control" v-model="newDriver.licenseNumber">
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="form-line">
                                <label class="form-control-label">رقم رخصة السيارة</label>
                                <input type="text" class="form-control" v-model="newDriver.carLicenseNumber">
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="form-line">
                                <label class="form-control-label">تاريخ إنتهاء رخصة القيادة</label>
                                <input type="date" class="form-control" v-model="newDriver.carLicenseExpiryDate">
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="form-line">
                                <label class="form-control-label">مدينة الترخيص</label>
                                <select class="form-control" v-model="newDriver.carLicenseCity">
                                    <option value="0">الفيوم</option>
                                    <option value="1">القاهرة</option>
                                    <option value="2">بني سويف</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="form-line">
                                <label class="form-control-label">تاريخ ميلاد السائق</label>
                                <input type="date" class="form-control" v-model="newDriver.birthDate">
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="form-line">
                                <label class="form-control-label">ملاحظات</label>
                                <textarea  rows="8" class="form-control" v-model="newDriver.notes"></textarea>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="form-line">
                                <label class="form-control-label">رصيد السائق</label>
                                <input type="number" class="form-control" v-model="newDriver.credit">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="form-control-label">الحالة</label>
                            <div class="switch">
                                <label>غير فعال<input type="checkbox" v-model="newDriver.status"><span class="lever"></span>فعال</label>
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


        <!-- Driver Details -->
        <div id="driverDetails" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" class="modal fade text-left">
            <div role="document" class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 id="exampleModalLabel" class="modal-title">تفاصيل السائق</h4>
                        <button type="button" data-dismiss="modal" aria-label="Close" class="close"><span aria-hidden="true">×</span></button>
                    </div>
                    <div class="modal-body text-right">

                        <!-- <div class="form-group">
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
                        </div> -->
                        <div class="col-xs-4 show-info">
                            <div class="">
                                <label class="form-control-label">إسم السائق</label>
                                <input type="text" class="form-control" disabled v-model="driverDetailsObj.fullName">
                            </div>
                        </div>
                        <div class="col-xs-4 show-info">
                            <div class="">
                                <label class="form-control-label">رقم التلفون الأول</label>
                                <input type="text" class="form-control" disabled v-model="driverDetailsObj.mobileNumber1">
                            </div>
                        </div>
                        <div class="col-xs-4 show-info">
                            <div class="">
                                <label class="form-control-label">رقم التلفون الثاني</label>
                                <input type="text" class="form-control" disabled v-model="driverDetailsObj.mobileNumber2">
                            </div>
                        </div>
                        <div class="col-xs-4 show-info">
                            <div class="">
                                <label class="form-control-label">رقم تليفون المنزل</label>
                                <input type="text" class="form-control" disabled v-model="driverDetailsObj.homePhoneNumber">
                            </div>
                        </div>
                        <div class="col-xs-4 show-info">
                            <div class="">
                                <label class="form-control-label">رقم البطاقة</label>
                                <input type="text" class="form-control" disabled v-model="driverDetailsObj.idNumber">
                            </div>
                        </div>
                        <div class="col-xs-4 show-info">
                            <div class="">
                                <label class="form-control-label">رقم رخصة السواقة</label>
                                <input type="text" class="form-control" disabled v-model="driverDetailsObj.licenseNumber">
                            </div>
                        </div>
                        <div class="col-xs-4 show-info">
                            <div class="">
                                <label class="form-control-label">رقم رخصة السيارة</label>
                                <input type="text" class="form-control" disabled v-model="driverDetailsObj.carLicenseNumber">
                            </div>
                        </div>
                        <div class="col-xs-4 show-info">
                            <div class="">
                                <label class="form-control-label">تاريخ إنتهاء رخصة القيادة</label>
                                <div>{{driverDetailsObj.carLicenseExpiryDate}}</div>
                            </div>
                        </div>
                        <div class="col-xs-4 show-info">
                            <div class="">
                                <label class="form-control-label">مدينة الترخيص</label>
                                <select class="form-control" disabled v-model="driverDetailsObj.carLicenseCity">
                                    <option value="0">الفيوم</option>
                                    <option value="1">القاهرة</option>
                                    <option value="2">بني سويف</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-xs-4 show-info">
                            <div class="">
                                <label class="form-control-label">تاريخ ميلاد السائق</label>
                                <div>{{driverDetailsObj.birthDate}}</div>
                            </div>
                        </div>
                        <div class="col-xs-4 show-info">
                            <div class="">
                                <label class="form-control-label">ملاحظات</label>
                                <div>{{driverDetailsObj.notes}}</div>
                            </div>
                        </div>
                        <div class="col-xs-4 show-info">
                            <div class="">
                                <label class="form-control-label">رصيد السائق</label>
                                <input type="number" class="form-control" disabled v-model="driverDetailsObj.credit">
                            </div>
                        </div>
                        <div class="col-xs-4 show-info">
                            <label class="form-control-label">الحالة</label>
                            <div class="switch">
                                <label>غير فعال<input type="checkbox" disabled v-model="driverDetailsObj.status"><span class="lever"></span>فعال</label>
                            </div>
                        </div>

                        <div class="clearfix"></div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" data-dismiss="modal" class="btn btn-secondary">إغلاق</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "all-clients",
  data() {
    return {
      drivers: [],
      newDriver: {
        fullName: "محمد حسنين",
        mobileNumber1: "01000000000",
        mobileNumber2: "01000000001",
        homePhoneNumber: "084123123",
        idNumber: "123123",
        licenseNumber: "123123",
        carLicenseNumber: "123123",
        carLicenseExpiryDate: "2017-03-20",
        carLicenseCity: 0,
        birthDate: "1990-09-21",
        notes: "some notes",
        status: false,
        credit: 10,
        homeLocation: {}
      },
      driverDetailsObj: {},
      marker: {
        lat: 29.310297,
        lng: 30.845376
      },
      showMarker: false,
      selectTotDeleteItems: []
    };
  },
  mounted() {
    this.getData();

    setTimeout(() => {
      $(".modal").on("shown.bs.modal", () => {
        console.log("openning modal");
        this.$gmapDefaultResizeBus.$emit("resize");
      });
    }, 100);
  },
  methods: {
    getData() {
      this.$get("/api/drivers")
        .then(res => {
          console.log(res);
          this.drivers = res.rs;
          setTimeout(() => {
            this.$initTable();
          }, 100);
        })
        .catch(err => {
          console.log(err);
        });
    },
    addToBulkDelete(e, id) {
      console.log();
      if (this.selectTotDeleteItems.indexOf(id) === -1) {
        this.selectTotDeleteItems.push(id);
      } else {
        this.selectTotDeleteItems.splice(
          this.selectTotDeleteItems.indexOf(id),
          1
        );
      }
      console.log(this.selectTotDeleteItems);
    },
    deleteSelected() {
      this.$deleteBulk("/api/drivers/delete/bulk", [
        ...this.selectTotDeleteItems
      ])
        .then(res => {
          console.log(res);
          $(".modal").modal("hide");
          this.getData();
        })
        .catch(err => {
          console.log(err);
        });
    },
    save() {
      this.newDriver.homeLocation.coordinates = [
        this.marker.lat,
        this.marker.lng
      ];

      this.$post("/api/drivers", this.newDriver)
        .then(res => {
          console.log(res);
          if (res.sc === 200) {
            this.getData();
            $(".modal").modal("hide");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    mapClicked(e) {
      this.showMarker = true;
      this.marker.lat = e.latLng.lat();
      this.marker.lng = e.latLng.lng();
    },
    driverDetails(user) {
      user.birthDate = this.getDateFormated(user.birthDate);
      user.carLicenseExpiryDate = this.getDateFormated(
        user.carLicenseExpiryDate
      );
      this.driverDetailsObj = user;
    },
    getDateFormated(date) {
      let d = new Date(date);
      return `${d.getFullYear()}-${d.getMonth()}-${d.getDay()}`;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
