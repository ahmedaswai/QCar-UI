<template>
    <div>
        <div class="block-header">
            <h2>جميع طلبات العملاء</h2>
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
                        <router-link :to="{path: '/customers/new-order'}"
                            class="btn btn-primary btn-circle waves-effect waves-circle waves-float"
                            data-toggle="modal"
                            data-target="#new">
                            <i class="material-icons">add</i>
                        </router-link>
                    </div>

                    <div class="table-search card" style="display: none;">
                        <div class="form-group">
                            <label>رقم الطلب</label>
                            <input type="text" class="input-with-border" v-model="search.orderNum">
                        </div>
                        <div class="form-group">
                            <label>الرقم التعريفي للعميل</label>
                            <input type="text" class="input-with-border" v-model="search.customerId">
                        </div>
                        <div class="form-group">
                            <label>ملاحظات</label>
                            <input type="text" class="input-with-border" v-model="search.notes">
                        </div>
                        <div class="form-group">
                            <label class="form-control-label">الحالة</label>
                            <div class="switch">
                                <label>غير فعال<input type="checkbox" v-model="search.status"><span class="lever"></span>فعال</label>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>طريقة الدفع</label>

                            <input name="payment-method" type="radio" id="radio_1" value="0" v-model="search.paymentMethod" />
                            <label for="radio_1">نقدي</label>
                            <input name="payment-method" type="radio" id="radio_2" value="1" v-model="search.paymentMethod" />
                            <label for="radio_2">رصيد العميل</label>
                            <input name="payment-method" type="radio" id="radio_3" value="2" v-model="search.paymentMethod" />
                            <label for="radio_3">بطاقة إئتمان</label>
                        </div>
                        <div class="row">
                            <div class="col-xs-4">
                                <label>مكان الطلب</label>
                                <mapModal @locationsUpdated="updateLocation" propsThatWillBeUpdated="orderLat,orderLng"></mapModal>
                                <!-- {{search.orderLat + ' - '+search.orderLng}} -->
                                <label>المدي</label>
                                <input type="number" class="input-with-border" v-model="search.orderRange">
                            </div>
                            <div class="col-xs-4">
                                <label>مكان بدء الرحلة</label>
                                <mapModal @locationsUpdated="updateLocation" propsThatWillBeUpdated="fromLat,fromLng"></mapModal>
                                <!-- {{search.fromLat + ' - '+search.fromLng}} -->
                                <label>المدي</label>
                                <input type="number" class="input-with-border" v-model="search.fromRange">
                            </div>
                            <div class="col-xs-4">
                                <label>مكان إنتهاء الرحلة</label>
                                <mapModal @locationsUpdated="updateLocation" propsThatWillBeUpdated="toLat,toLng"></mapModal>
                                <!-- {{search.toLat + ' - '+search.toLng}} -->
                                <label>المدي</label>
                                <input type="number" class="input-with-border" v-model="search.toRange">
                            </div>
                        </div>
                        <div class="form-group row custome-row">
                            <div class="col-xs-6">
                                <label class="form-control-label">موعد بدء الرحلة</label>
                                <input
                                    type="text"
                                    class="datetimepicker input-with-border form-control"
                                    placeholder="برجاء إختبار تاريخ و توقيت بدء الرحلة"
                                    data-timeType="orderDateFrom"
                                >
                            </div>
                            <div class="col-xs-6">
                                <label class="form-control-label">موعد إنتهاء الرحلة</label>
                                <input
                                    type="text"
                                    class="datetimepicker input-with-border form-control"
                                    placeholder="برجاء إختبار تاريخ و توقيت إنتهاء الرحلة"
                                    data-timeType="orderDateTo"
                                >
                            </div>
                        </div>
                        <div class="col-xs-12">
                            <button class="btn btn-info btn-lg pull-left" @click="initSearch">بحث</button>
                        </div>
                        <div class="clearfix"></div>
                    </div>

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
                                <th>#</th>
                                <th>إسم العميل</th>
                                <th>أرقام الهواتف</th>
                                <th class="text-center">توقيت الطلب</th>
                                <th>مسح</th>
                                <th>تفاصيل</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(order, i) in orders" :key="order.id">
                                    <th scope="row">{{i + 1}}</th>
                                    <td>{{order.customer.fullName || 'غير محدد'}}</td>
                                    <td>{{order.customer.mobileNumber1}} - {{order.customer.mobileNumber2}} - {{order.customer.homePhoneNumber}}</td>
                                    <td class="text-center">
                                        {{order.orderTime | formatDate}}
                                    </td>
                                    <td>
                                        <div>
                                            <div class="i-checks">
                                                <input :id="`checkboxCustom_${i}`" type="checkbox" class="checkbox-template chk-col-red" @change="addToBulkDelete($event, order.id)">
                                                <label :for="`checkboxCustom_${i}`"></label>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <a
                                            data-toggle="modal"
                                            data-target="#details"
                                            class="btn btn-info"
                                            @click="details(order)"
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

        <!-- Details -->
        <div id="details" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" class="modal fade text-left">
            <div role="document" class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 id="exampleModalLabel" class="modal-title">تفاصيل الطلب</h4>
                        <button type="button" data-dismiss="modal" aria-label="Close" class="close"><span aria-hidden="true">×</span></button>
                    </div>
                    <div class="modal-body text-right row">
                        
                        <div class="clearfix"></div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" data-dismiss="modal" class="btn btn-secondary">إغلاق</button>
                    </div>
                </div>
            </div>
        </div><!--/details-->

    </div>
</template>

<script>
import mapModal from "../parts/map_modal";

export default {
  name: "all-orders",
  components: {
    mapModal
  },
  data() {
    return {
      orders: [],
      selectTotDeleteItems: [],
      searching: false,
      search: {
        status: true,
        paymentMethod: "0",

        notes: "",
        customerId: "",
        orderNum: "",

        orderLat: 0,
        orderLng: 0,
        orderRange: 1,

        fromLat: 0,
        fromLng: 0,
        fromRange: 1,

        toLat: 0,
        toLng: 0,
        toRange: 1,

        orderDateFrom: "1515429814",
        orderDateTo: "1576163532"
      }
    };
  },
  mounted() {
    this.getData();

    setTimeout(() => {
      $(".modal").on("shown.bs.modal", () => {
        console.log("openning modal");
        this.$gmapDefaultResizeBus.$emit("resize");
      });

      //Datetimepicker plugin
      let el = $(".datetimepicker");
      el.bootstrapMaterialDatePicker({
        format: "dddd DD MMMM YYYY - HH:mm",
        clearButton: false,
        weekStart: 1
      });
      el.on("change", (e, date) => {
        this.search[e.currentTarget.dataset.timetype] = date.unix();
      });
    }, 100);
  },
  methods: {
    initSearch() {
      this.searching = true;
      let params = "?";
      params += "paymentMethod=" + this.search.paymentMethod;
      params += "&status=" + this.search.status;
      params += "&orderNum=" + this.search.orderNum;
      params += "&customerId=" + this.search.customerId;
      params += "&notes=" + this.search.notes;

      params += "&fromLat=" + this.search.fromLat;
      params += "&fromLng=" + this.search.fromLng;
      params += "&fromRange=" + this.search.fromRange;

      params += "&toLat=" + this.search.toLat;
      params += "&toLng=" + this.search.toLng;
      params += "&toRange=" + this.search.toRange;

      params += "&orderLat=" + this.search.orderLat;
      params += "&orderLng=" + this.search.orderLng;
      params += "&orderRange=" + this.search.orderRange;

      params += "&orderDateFrom=" + this.search.orderDateFrom;
      params += "&orderDateTo=" + this.search.orderDateTo;

      console.log(params);

      this.$get(`/api/orders/criteria${params}`)
        .then(res => {
          this.searching = false;
          this.orders = res.rs;
        })
        .catch(err => {
          this.searching = false;
          console.log(err);
        });
    },
    updateLocation(payload) {
      let props = payload.props.split(",");

      props.forEach((prop, i) => {
        this.search[prop] = payload.selectedCoords[i];
      });
    },
    toggleSearch() {
      $(".table-search").slideToggle("fast");
    },
    getData() {
      this.$get("/api/orders")
        .then(res => {
          console.log(res);
          this.orders = res.rs;
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
      this.$deleteBulk("/api/orders/delete/bulk", [
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
    details(order) {
      console.log(this.details, order);
      this.detailsObj = order;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
