<template>
    <div class="col-lg-6 col-lg-push-3">
        <div class="block-header">
            <h2>إنشاء طلب جديد</h2>
        </div>
        <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="card form">

                    <div class="form-group">
                        <label class="form-control-label">مكان الطلب</label>
                        <gmap-map
                            :center="current.center"
                            :zoom="10"
                            class="map-wrapper"
                        >
                            <gmap-marker
                                :position="current.position"
                                v-if="current.showMarker"
                            ></gmap-marker>
                        </gmap-map>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label">مكان بدء الرحلة</label>
                        <gmap-map
                            :center="{lat:29.310297, lng:30.845376}"
                            :zoom="10"
                            class="map-wrapper"
                            @click="mapClicked($event, 'tripStart')"
                        >
                            <gmap-marker
                                :position="tripStart.position"
                                v-if="tripStart.showMarker"
                            ></gmap-marker>
                        </gmap-map>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label">مكان إنتهاء الرحلة</label>
                        <gmap-map
                            :center="{lat:29.310297, lng:30.845376}"
                            :zoom="10"
                            class="map-wrapper"
                            @click="mapClicked($event, 'tripEnd')"
                        >
                            <gmap-marker
                                :position="tripEnd.position"
                                v-if="tripEnd.showMarker"
                            ></gmap-marker>
                        </gmap-map>
                    </div>
                    <div class="form-group row custome-row">
                        <div class="col-xs-6">
                            <label class="form-control-label">موعد بدء الرحلة</label>
                            <input
                                type="text"
                                class="datetimepicker input-with-border form-control"
                                placeholder="برجاء إختبار تاريخ و توقيت بدء الرحلة"
                                data-timeType="tripStartTime"
                            >
                        </div>
                        <div class="col-xs-6">
                            <label class="form-control-label">موعد إنتهاء الرحلة</label>
                            <input
                                type="text"
                                class="datetimepicker input-with-border form-control"
                                placeholder="برجاء إختبار تاريخ و توقيت إنتهاء الرحلة"
                                data-timeType="tripEndTime"
                                >
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label">طريقة الدفع</label>
                        <div></div>
                        <input name="payment-method" type="radio" id="radio_1" value="0" v-model="order.paymentMethod" />
                        <label for="radio_1">نقدي</label>

                        <input name="payment-method" type="radio" id="radio_2" value="1" v-model="order.paymentMethod" />
                        <label for="radio_2">رصيد العميل</label>

                        <input name="payment-method" type="radio" id="radio_3" value="2" v-model="order.paymentMethod" />
                        <label for="radio_3">بطاقة إئتمان</label>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label">العميل</label>

                        <select class="selectClient" name="state" v-if="clients.length > 0" v-model="order.customer">
                            <option :value="user.id" v-for="user in clients" :key="user.id">{{user.fullName}}</option>
                        </select>

                        <div class="preloader pl-size-xs ltr" v-else>
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
                    <div class="form-group">
                        <label class="form-control-label">ملاحظات</label>
                        <textarea class="form-control input-with-border" rows="8" v-model="order.notes"></textarea>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label">الحالة</label>
                        <div class="switch">
                            <label>غير فعال<input type="checkbox" v-model="order.status"><span class="lever"></span>فعال</label>
                        </div>
                    </div>
                    <button class="btn btn-primary btn-block" @click="save">حفظ</button>
                </div><!--/card-->
            </div><!--/col-lg-12 col-md-12 col-sm-12 col-xs-12-->
        </div><!--row-->


    </div>
</template>

<script>
import VueTimepicker from "vue2-timepicker";

export default {
  name: "new-order",
  components: {
    VueTimepicker
  },
  data() {
    return {
      current: {
        center: { lat: 29.310297, lng: 30.845376 },
        position: { lat: 29.310297, lng: 30.845376 },
        showMarker: false
      },
      tripStart: {
        showMarker: false,
        position: { lat: 29.310297, lng: 30.845376 }
      },
      tripEnd: {
        showMarker: false,
        position: { lat: 29.310297, lng: 30.845376 }
      },
      clients: [],
      order: {
        tripStartTime: 0,
        tripEndTime: 0,
        customer: { id: null },
        orderLocation: {},
        fromLocation: {},
        toLocation: {}
      }
    };
  },
  mounted() {
    this.getCurrentLocation();
    this.getClients();

    // this.$get('/api/orders')
    //     .then(res => {
    //         console.log(res);
    //     }).catch(err => {
    //         console.log(err);
    //     })

    setTimeout(() => {
      //Datetimepicker plugin
      let el = $(".datetimepicker");
      el.bootstrapMaterialDatePicker({
        format: "dddd DD MMMM YYYY - HH:mm",
        clearButton: false,
        weekStart: 1
      });
      el.on("change", (e, date) => {
        this.order[e.currentTarget.dataset.timetype] = date.unix();
      });
    }, 100);
  },
  methods: {
    save() {
      let obj = this.$copy(this.order);
      obj.orderTime = Math.round(+new Date().getTime() / 1000);
      obj.orderLocation.coordinates = [
        this.current.position.lat,
        this.current.position.lng
      ];
      obj.fromLocation.coordinates = [
        this.tripStart.position.lat,
        this.tripStart.position.lng
      ];
      obj.toLocation.coordinates = [
        this.tripEnd.position.lat,
        this.tripEnd.position.lng
      ];

      obj.paymentMethod = parseInt(obj.paymentMethod);

      this.$post("/api/orders", obj)
        .then(res => {
          console.log(res);
          this.$router.push("/customers/all-orders");
        })
        .catch(err => {
          console.log(err);
        });
    },
    getClients() {
      this.$get("/api/customers")
        .then(res => {
          this.clients = res.rs;
          setTimeout(() => {
            $(".selectClient").select2();
            $(".selectClient").on("select2:select", e => {
              // On client select
              this.order.customer.id = e.target.value;
            });
          }, 100);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getCurrentLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          this.current.showMarker = true;
          this.current.position.lat = position.coords.latitude;
          this.current.position.lng = position.coords.longitude;
          this.current.center.lat = position.coords.latitude;
          this.current.center.lng = position.coords.longitude;
        });
      } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
      }
    },
    mapClicked(e, type) {
      this[type].showMarker = true;
      this[type].position.lat = e.latLng.lat();
      this[type].position.lng = e.latLng.lng();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
