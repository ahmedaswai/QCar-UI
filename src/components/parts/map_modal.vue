<template>
    <div>
        <button 
            class="btn btn-primary"
            data-toggle="modal"
            :data-target="`#map_modal_${thisModalID}`"
        >
            <i class="material-icons">map</i>
        </button>


        <div :id="`map_modal_${thisModalID}`" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" class="modal fade text-left">
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
      thisModalID: "",
      center: { lat: 29.310297, lng: 30.845376 },
      showMarker: false,
      marker: {
        lat: 29.310297,
        lng: 30.845376
      }
    };
  },
  props: ["propsThatWillBeUpdated"],
  created() {
    this.thisModalID = this.$makeID();
  },
  methods: {
    mapClicked(e) {
      this.showMarker = true;
      // marker
      this.marker.lat = e.latLng.lat();
      this.marker.lng = e.latLng.lng();
      // parent props update
      this.$emit("locationsUpdated", {
        props: this.propsThatWillBeUpdated,
        selectedCoords: [e.latLng.lat(), e.latLng.lng()]
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
