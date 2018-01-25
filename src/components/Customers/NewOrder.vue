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
                            :center="{lat:29.310297, lng:30.845376}"
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
                    <div class="form-group">
                        <label class="form-control-label">موعد بدء الرحلة</label>
                        <vue-timepicker format="HH:mm:ss"></vue-timepicker>
                    </div>

                </div><!--/card-->
            </div><!--/col-lg-12 col-md-12 col-sm-12 col-xs-12-->
        </div><!--row-->

    </div>
</template>

<script>
import VueTimepicker from 'vue2-timepicker'

export default {
    name: 'new-order',
    components: {
        VueTimepicker
    },
    data () {
        return {
            current: {
                position: {lat:29.310297, lng:30.845376},
                showMarker: false
            },
            tripStart: {
                showMarker: false,
                position: {lat:29.310297, lng:30.845376},
            },
            tripEnd: {
                showMarker: false,
                position: {lat:29.310297, lng:30.845376},
            },
        }
    },
    mounted(){
        this.getCurrentLocation()
    },
    methods: {
        // orderTime
        // new Date().getTime() / 1000

        getCurrentLocation(){
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    this.current.showMarker = true
                    this.current.position.lat = position.coords.latitude
                    this.current.position.lng = position.coords.longitude
                });
            } else {
                x.innerHTML = "Geolocation is not supported by this browser.";
            }
        },
        mapClicked(e, type){
            this[type].showMarker = true
            this[type].position.lat = e.latLng.lat()
            this[type].position.lng = e.latLng.lng()
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
