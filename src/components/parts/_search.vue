<template>
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
                <label>المدي <small>(يتم قياس المدي بالمتر)</small></label>
                <input type="number" class="input-with-border" v-model="search.orderRange">
            </div>
            <div class="col-xs-4">
                <label>مكان بدء الرحلة</label>
                <mapModal @locationsUpdated="updateLocation" propsThatWillBeUpdated="fromLat,fromLng"></mapModal>
                <!-- {{search.fromLat + ' - '+search.fromLng}} -->
                <label>المدي <small>(يتم قياس المدي بالمتر)</small></label>
                <input type="number" class="input-with-border" v-model="search.fromRange">
            </div>
            <div class="col-xs-4">
                <label>مكان إنتهاء الرحلة</label>
                <mapModal @locationsUpdated="updateLocation" propsThatWillBeUpdated="toLat,toLng"></mapModal>
                <!-- {{search.toLat + ' - '+search.toLng}} -->
                <label>المدي <small>(يتم قياس المدي بالمتر)</small></label>
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
</template>

<script>
import mapModal from "../parts/map_modal";

export default {
  name: "search",
  components: {
    mapModal
  },
  data() {
    return {
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
    updateLocation(payload) {
      let props = payload.props.split(",");

      props.forEach((prop, i) => {
        this.search[prop] = payload.selectedCoords[i];
      });
    },
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
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
small {
  opacity: 0.7;
  font-size: 80%;
}
</style>
