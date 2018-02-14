<template>
    <!-- New Trip -->
    <div id="newTrip" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" class="modal fade text-left">
        <div role="document" class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 id="exampleModalLabel" class="modal-title">رحلة جديدة</h4>
                    <button type="button" data-dismiss="modal" aria-label="Close" class="close"><span aria-hidden="true">×</span></button>
                </div>
                <div class="modal-body text-right row">

                    <div class="row">
                        <div class="col-xs-6">
                            <label>مكان بدء الرحلة</label>
                            <gmap-map
                                :center="center"
                                :zoom="10"
                                class="map-wrapper"
                                @click="mapClicked($event, 'start')"
                                >
                                <gmap-marker
                                    :position="startLoc"
                                    v-if="show_start_marker"
                                    ></gmap-marker>
                            </gmap-map>
                            <input type="text" disabled class="form-control input-with-border" v-if="startAddress" v-model="startAddress">
                        </div>
                        <div class="col-xs-6">
                            <label>مكان إنتهاء الرحلة</label>
                            <gmap-map
                                :center="center"
                                :zoom="10"
                                class="map-wrapper"
                                @click="mapClicked($event, 'end')"
                                >
                                <gmap-marker
                                    :position="endLoc"
                                    v-if="show_end_marker"
                                    ></gmap-marker>
                            </gmap-map>
                            <input type="text" disabled class="form-control input-with-border" v-if="endAddress" v-model="endAddress">
                        </div>

                        <div class="col-xs-12">
                            <table class="table table-striped" v-if="drivers.length > 0" style="margin-top: 40px;">
                                <thead>
                                    <th>#</th>
                                    <th>إسم السائق</th>
                                    <th>أرقام الهواتف</th>
                                    <th>الموقع</th>
                                    <th class="text-center">حالة السائق</th>
                                    <th>إختر سائق</th>
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
                                            <input name="selectDriver" type="radio" :value="user.id" :id="`selectDriver_${i}`" v-model="driver.id" />
                                            <label :for="`selectDriver_${i}`"></label>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <h3 style="padding: 60px; text-align: center;" v-else>برجاء إختيار نقطة بدء الرحلة</h3>
                        </div>
                        
                        <div class="col-xs-4">
                            <div class="form-group">
                                <label>وقت الإنتظار <small>(يتم حساب وقت الإنتظار بالساعة)</small></label>
                                <input type="text" class="form-control input-with-border" v-model="waitingTime">
                            </div>
                        </div>
                        <div class="col-xs-4">
                            <div class="form-group">
                                <label>الوقت المتوقع لإنتهاء الرحلة</label>
                                <input type="text" data-timetype="propsedStartTime" class="form-control input-with-border datetimepicker">
                            </div>
                        </div>
                        <div class="col-xs-4">
                            <div class="form-group">
                                <label>الوقت المتوقع لبدء الرحلة</label>
                                <input type="text" data-timetype="propsedEndTime" class="form-control input-with-border datetimepicker">
                            </div>
                        </div>
                        <div class="col-xs-12">
                            <div class="form-group">
                                <label>ملاحظات</label>
                                <textarea cols="30" rows="10" class="form-control input-with-border" v-model="notes"></textarea>
                            </div>
                        </div>


                    </div>
                    
                    <div class="clearfix"></div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" @click="save">حفظ</button>
                    <button type="button" data-dismiss="modal" class="btn btn-secondary">إغلاق</button>
                </div>
            </div>
        </div>
    </div><!--/new trip-->
</template>

<script>
export default {
  name: "add-trip",
  data() {
    return {
      center: { lat: 29.310297, lng: 30.845376 },
      show_start_marker: false,
      show_end_marker: false,
      marker: {
        lat: 29.310297,
        lng: 30.845376
      },
      address: "",

      newTrip_start_lat: 0,
      newTrip_start_lng: 0,

      newTrip_end_lat: 0,
      newTrip_end_lng: 0,

      drivers: [],

      startLoc: { lat: 0, lng: 0 },
      endLoc: { lat: 0, lng: 0 },
      startAddress: "",
      endAddress: "",
      driver: { id: "" },
      waitingTime: 1,
      propsedStartTime: 0,
      propsedEndTime: 0,
      notes: ""
    };
  },
  props: ["orderForNewTrip"],
  mounted() {
    setTimeout(() => {
      //Datetimepicker plugin
      let el = $(".datetimepicker");
      el.bootstrapMaterialDatePicker({
        format: "dddd DD MMMM YYYY - HH:mm",
        clearButton: false,
        weekStart: 1
      });
      el.on("change", (e, date) => {
        this[e.currentTarget.dataset.timetype] = date.unix();
      });
    }, 100);
  },
  methods: {
    save() {
      let data = {
        driver: { id: "" },
        startLoc: { coordinates: [] },
        endLoc: { coordinates: [] }
      };
      data.startLoc.coordinates = [this.startLoc.lat, this.startLoc.lng];
      data.endLoc.coordinates = [this.endLoc.lat, this.endLoc.lng];
      data.driver.id = this.driver.id;
      data.waitingTime = this.waitingTime * 60; // convert hours to minutes
      data.order = this.orderForNewTrip;
      data.actualStartTime = this.propsedStartTime;
      data.actualEndTime = this.propsedEndTime;
      data.notes = this.notes;

      this.$post("/api/trips", data)
        .then(res => {
          console.log(res);
          $(".modal").modal("hide");
        })
        .catch(err => {
          console.log(err);
        });
    },
    mapClicked(e, type) {
      this[`show_${type}_marker`] = true;
      let pos = this[`${type}Loc`];

      pos.lat = e.latLng.lat();
      pos.lng = e.latLng.lng();

      this.getAddress(pos, type);
      this.getNearDrivers(e.latLng.lat(), e.latLng.lng());
    },
    getNearDrivers(lat, lng) {
      //   this.$get(`/api/drivers/distance?lng=${lng}&lat=${lat}&radius=1000`)
      //     .then(res => {
      //       console.log(res);
      //     })
      //     .catch(err => {
      //       console.log(err);
      //     });

      this.$get(`/api/drivers`)
        .then(res => {
          //   console.log(res);
          this.drivers = res.rs;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getAddress(coords, type) {
      let self = this;
      let geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: coords }, function(results, status) {
        if (status === "OK") {
          if (results[0]) {
            self[`${type}Address`] = results[0].formatted_address;
            return results[0].formatted_address;
          } else {
            return "لا يوجد نتائج";
          }
        } else {
          return "Something went worng!";
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
