<template>
    <div>
        <div class="block-header">
            <h2>جميع الرحلات</h2>
        </div>
        <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="card transparent-card">
                    <div class="table-btns">
                        <button
                            class="btn btn-danger btn-circle waves-effect waves-circle waves-float will-fade-in"
                            :class="{'fade-toggle': selectTotDeleteItems.length > 0}"
                            data-toggle="modal"
                            data-target="#bulkDelete">
                            <i class="material-icons">delete</i>
                        </button>
                        <button class="btn btn-info btn-circle waves-effect waves-circle waves-float open-search" @click="toggleSearch">
                            <i class="material-icons">search</i>
                        </button>
                    </div>

                    <!-- <search></search> -->

                    <div class="table-wrapper card">
                        <div class="table-loader text-center" style="padding: 20px;" v-if="searching">
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
                        <table class="table table-striped" v-else>
                            <thead>
                                <tr>
                                <th>رقم الرحلة</th>
                                <th>إسم العميل</th>
                                <th class="text-center">مكان البدء</th>
                                <th class="text-center">مكان الإنتهاء</th>
                                <th class="text-center">توقيت بدء الرحلة</th>
                                <th class="text-center">توقيت إنتهاء الرحلة</th>
                                <th>مسح</th>
                                <th class="text-center">السائق</th>
                                <th>تفاصيل</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(trip, i) in trips" :key="trip.id">
                                    <th scope="row">{{trip.tripNumber}}</th>
                                    <td>{{trip.order.customer.fullName || 'غير محدد'}}</td>
                                    <td class="text-center">
                                        <a
                                            v-if="trip.startLoc"
                                            :href="`http://maps.google.com/?q=${trip.startLoc.coordinates[0]},${trip.startLoc.coordinates[1]}`"
                                            target="_blank"
                                            class="btn btn-info map-btn"
                                        >
                                            <i class="material-icons">my_location</i>
                                        </a>
                                    </td>
                                    <td class="text-center">
                                        <a
                                            v-if="trip.endLoc"
                                            :href="`http://maps.google.com/?q=${trip.endLoc.coordinates[0]},${trip.endLoc.coordinates[1]}`"
                                            target="_blank"
                                            class="btn btn-info map-btn"
                                        >
                                            <i class="material-icons">my_location</i>
                                        </a>
                                    </td>
                                    <td class="text-center">
                                        {{trip.actualStartTime | formatDate}}
                                    </td>
                                    <td class="text-center">
                                        {{trip.actualEndTime | formatDate}}
                                    </td>
                                    <td>
                                        <div>
                                            <div class="i-checks">
                                                <input :id="`checkboxCustom_${i}`" type="checkbox" class="checkbox-template chk-col-red" @change="addToBulkDelete($event, trip.id)">
                                                <label :for="`checkboxCustom_${i}`"></label>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <a
                                            data-toggle="modal"
                                            data-target="#driverDetails"
                                            class="btn btn-info"
                                            @click="details('driver', trip.driver)"
                                        >
                                            <i class="material-icons">drive_eta</i>
                                        </a>
                                    </td>
                                    <td>
                                        <a
                                            data-toggle="modal"
                                            data-target="#orderDetails"
                                            class="btn btn-info"
                                            @click="details('order', trip.order)"
                                        >
                                            <i class="material-icons">list</i>
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
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

        <!-- Driver Details -->
        <div id="driverDetails" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" class="modal fade text-left">
            <div role="document" class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 id="exampleModalLabel" class="modal-title">تفاصيل السائق</h4>
                        <button type="button" data-dismiss="modal" aria-label="Close" class="close"><span aria-hidden="true">×</span></button>
                    </div>
                    <div class="modal-body text-right" v-if="showDriverDetails">
                        <div class="col-xs-4 show-info">
                            <div class="">
                                <label class="form-control-label">إسم السائق</label>
                                <input type="text" class="form-control" disabled v-model="driverDetailsObj.fullName">
                            </div>
                        </div>
                        <div class="col-xs-4 show-info">
                            <div class="">
                                <label class="form-control-label">رقم البطاقة</label>
                                <input type="text" class="form-control" disabled v-model="driverDetailsObj.idNumber">
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

        <!-- Order Details -->
        <div id="orderDetails" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" class="modal fade text-left">
            <div role="document" class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 id="exampleModalLabel" class="modal-title">تفاصيل السائق</h4>
                        <button type="button" data-dismiss="modal" aria-label="Close" class="close"><span aria-hidden="true">×</span></button>
                    </div>
                    <div class="modal-body text-right" if="showOrderDetails">
                        <h4>تفاصيل العميل</h4>
                        <div class="col-xs-4 show-info">
                            <div class="">
                                <label class="form-control-label">إسم العميل</label>
                                <input type="text" class="form-control" disabled v-model="orderDetailsObj.customer.fullName">
                            </div>
                        </div>
                        <div class="col-xs-4 show-info">
                            <div class="">
                                <label class="form-control-label">رقم الهاتف</label>
                                <input type="text" class="form-control" disabled v-model="orderDetailsObj.customer.mobileNumber1">
                            </div>
                        </div>
                        <div class="col-xs-4 show-info">
                            <div class="">
                                <label class="form-control-label">التقييم</label>
                                <input type="text" class="form-control" disabled v-model="orderDetailsObj.customer.rating">
                            </div>
                        </div>
                        <div class="col-xs-4 show-info">
                            <div class="">
                                <label class="form-control-label">الرصيد</label>
                                <input type="text" class="form-control" disabled v-model="orderDetailsObj.customer.credit">
                            </div>
                        </div>
                        <div class="col-xs-4 show-info">
                            <div class="">
                                <label class="form-control-label">ملاحظات</label>
                                <div>{{orderDetailsObj.customer.notes}}</div>
                            </div>
                        </div>
                        <div class="col-xs-4 show-info">
                            <div class="">
                                <label class="form-control-label">في الرحلة</label>
                                <div>{{orderDetailsObj.customer.inTrip ? 'نعم' : 'لا' }}</div>
                            </div>
                        </div>
                        
                        <div class="col-xs-4 show-info">
                            <label class="form-control-label">الحالة</label>
                            <div class="switch">
                                <label><input type="checkbox" disabled v-model="orderDetailsObj.customer.status"><span class="lever"></span></label>
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
import search from "../parts/_search";
import mapModal from "../parts/map_modal";
import addTrip from "../parts/addTrip";

export default {
  name: "all-trips",
  components: {
    search,
    mapModal,
    addTrip
  },
  data() {
    return {
      trips: [],
      selectTotDeleteItems: [],
      searching: false,
      orderForNewTrip: {},
      tripCostObj: {},
      driverDetailsObj: {},
      showDriverDetails: false,
      orderDetailsObj: {
        customer: {}
      },
      showOrderDetails: false
    };
  },
  mounted() {
    this.getData();

    setTimeout(() => {
      $(".modal").modal("hide");
    }, 1000);
  },
  methods: {
    toggleSearch() {
      $(".table-search").slideToggle("fast");
    },
    getData() {
      this.$get("/api/trips")
        .then(res => {
          console.log(res);
          this.trips = res.rs;
          setTimeout(() => {
            this.$initTable();
          }, 100);
        })
        .catch(err => {
          console.log(err);
        });
    },
    addToBulkDelete(e, id) {
      if (this.selectTotDeleteItems.indexOf(id) === -1) {
        this.selectTotDeleteItems.push(id);
      } else {
        this.selectTotDeleteItems.splice(
          this.selectTotDeleteItems.indexOf(id),
          1
        );
      }
    },
    deleteSelected() {
      this.$deleteBulk("/api/trips/delete/bulk", [...this.selectTotDeleteItems])
        .then(res => {
          console.log(res);
          $(".modal").modal("hide");
          this.getData();
        })
        .catch(err => {
          console.log(err);
        });
    },
    details(type, obj) {
      if (type === "driver") {
        this.driverDetailsObj = obj;
        this.showDriverDetails = true;
        return;
      }
      if (type === "order") {
        this.orderDetailsObj = obj;
        this.showOrderDetails = true;
        return;
      }
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
