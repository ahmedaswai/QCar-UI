<template>
    <div>
        <button 
            class="btn btn-primary"
            data-toggle="modal"
            :data-target="`#map_modal_${thisMapID}`"
        >
            <i class="material-icons">map</i>
        </button>
        <input type="text" v-if="address.length > 0" readonly class="form-control address-input" v-model="address">


        <div :id="`map_modal_${thisMapID}`" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" class="modal fade text-left">
            <div role="document" class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 id="exampleModalLabel" class="modal-title">إختر مكان</h4>
                        <button type="button" data-dismiss="modal" aria-label="Close" class="close"><span aria-hidden="true">×</span></button>
                    </div>
                    <div class="modal-body">

                        <gmap-map
                            :center="center"
                            :zoom="10"
                            class="map-wrapper"
                            @click="mapClicked"
                            :ref="`map_${thisMapID}`"
                            >
                            <gmap-marker
                                :position="marker"
                                v-if="showMarker"
                                ></gmap-marker>
                        </gmap-map>

                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
  name: "map-modal",
  data() {
    return {
      thisMapID: "",
      center: { lat: 29.310297, lng: 30.845376 },
      showMarker: false,
      marker: {
        lat: 29.310297,
        lng: 30.845376
      },
      address: ""
    };
  },
  props: ["propsThatWillBeUpdated"],
  created() {
    this.thisMapID = this.$makeID();
  },
  mounted() {},
  methods: {
    mapClicked(e) {
      this.showMarker = true;
      // marker
      this.marker.lat = e.latLng.lat();
      this.marker.lng = e.latLng.lng();

      this.getAddress(this.marker);

      // parent props update
      this.$emit("locationsUpdated", {
        props: this.propsThatWillBeUpdated,
        selectedCoords: [e.latLng.lat(), e.latLng.lng()]
      });
    },
    getAddress(coords) {
      let self = this;
      let geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: coords }, function(results, status) {
        if (status === "OK") {
          if (results[0]) {
            self.address = results[0].formatted_address;
            console.log(self.address);
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
.form-control {
  width: 100%;
  margin-top: 5px;
}
</style>
