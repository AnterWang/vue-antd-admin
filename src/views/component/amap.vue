<template>
    <div class="container-view">
        <div>经纬度：{{location}}</div>
        <div>地址：{{address.formattedAddress || ''}}</div>
        <a-map @click="getPoint" @loaded="handleMapLoaded"></a-map>
    </div>
</template>

<script>
import aMap from '@/components/aMap';
export default {
    name: 'amap',
    components: {
        aMap
    },
    data () {
        return {
            address: {}
        }
    },
    computed: {
        location() {
            const {lng, lat} = this.address;
            if (lng && lat) {
                return `${lng},${lat}`
            }
            return ''
        }
    },
    created () {

    },
    methods: {
        getPoint (ev) {
            if (!this.geo) return;
            this.map.remove(this.markers);
            if (this.selectPointMarker) {
                this.map.remove(this.selectPointMarker);
            }
            const marker = new AMap.Marker({
                map: this.map,
                position: ev.lnglat,
                icon: new AMap.Icon({
                    image: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png',
                    imageSize: new AMap.Size(30, 40)

                })

                // title: item.formattedAddress,
            });
            this.selectPointMarker = marker;
            this.geo.getAddress(ev.lnglat, (status, result) => {
                if (status == 'complete' && result.info == 'OK') {
                    this.address = result.regeocode || {};
                    const { lng, lat } = ev.lnglat;
                    this.address.lng = lng;
                    this.address.lat = lat;
                }
            });
        },

        handleMapLoaded (map) {
            this.map = map;
            this.autoComplete = new AMap.Autocomplete();
            AMap.plugin(['AMap.ControlBar'], function () {
                const controlBar = new AMap.ControlBar({
                    showControlButton: false
                })
                map.addControl(controlBar)
            });

            AMap.plugin('AMap.Geocoder', () => {
                this.geo = new AMap.Geocoder();
            });
        }
    }
}
</script>
<style lang="less" scoped>
.container-view {
}
</style>
