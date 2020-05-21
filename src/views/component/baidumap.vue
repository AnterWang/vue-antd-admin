<template>
    <div class="container-view">
        <div>经纬度：{{add.jd}},{{add.wd}}</div>
        <div>地址：{{add.site}}</div>
        <BaiduMap
            ak="gXdYoLVHU0pGXohtP8pDVR3sKmZNnrDV"
            center="北京"
            :zoom="12.8"
            :scroll-wheel-zoom="true"
            @click="getPoint"
            style="width: 100%;height: 500px"
        >
            <!--地图类型，两种：一种是路线一种是绿的那种-->
            <bm-map-type
                :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']"
                anchor="BMAP_ANCHOR_TOP_LEFT"
            ></bm-map-type>
            <!--地图搜索功能，绑定上面的input，-->
            <!--display: none样式很关键，因为下面默认会有地址提示信息很长，很烦，这样搜索会很舒服，-->
            <!--zoom是搜索结果的视图比例，个人觉得12.8很舒服显示-->
            <bm-local-search
                :keyword="keyword"
                :auto-viewport="true"
                zoom="12.8"
                style="display: none"
            ></bm-local-search>
            <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
            <!--信息窗口，show属性是控制显示隐藏，infoWindowClose和infoWindowOpen是控制信息窗口关闭隐藏的方法-->
            <!--<bm-marker :position="postionMap" >-->
            <!--<bm-info-window :show="show" @close="infoWindowClose" @open="infoWindowOpen" style="font-size: 14px">-->
            <!--<p>站点：{{ add.siteName }}</p>-->
            <!--<p>站点地址：{{ add.site }}</p>-->
            <!--</bm-info-window>-->
            <!--</bm-marker>-->
        </BaiduMap>
    </div>
</template>

<script>
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import BmNavigation from 'vue-baidu-map/components/controls/Navigation.vue'
import BmLocalSearch from 'vue-baidu-map/components/search/LocalSearch.vue'
import BmMapType from 'vue-baidu-map/components/controls/MapType.vue'

export default {
    name: 'baidumap',
    components: { BaiduMap, BmNavigation, BmLocalSearch, BmMapType },
    data () {
        return {
            keyword: '',
            add: {
                jd: '',
                wd: '',
                zoom: '',
                site: ''
            }
        }
    },
    beforeCreate () {

    },
    created () {

    },
    methods: {
        getPoint (e) {    //点击地图获取一些信息，
            this.show = true;
            //                this.postionMap.lng = e.point.lng;     //通过  e.point.lng获取经度
            //                this.postionMap.lat = e.point.lat;     //通过  e.point.lat获取纬度
            this.add.jd = e.point.lng;
            this.add.wd = e.point.lat;
            this.zoom = e.target.getZoom()

            let geocoder = new BMap.Geocoder();  //创建地址解析器的实例
            geocoder.getLocation(e.point, rs => {
                this.add.site = rs.address;
                //地址描述(string)=
                // console.log(rs.address);    //这里打印可以看到里面的详细地址信息，可以根据需求选择想要的
                // console.log(rs.addressComponents);//结构化的地址描述(object)
                // console.log(rs.addressComponents.province); //省
                // console.log(rs.addressComponents.city); //城市
                // console.log(rs.addressComponents.district); //区县
                // console.log(rs.addressComponents.street); //街道
                // console.log(rs.addressComponents.streetNumber); //门牌号
                // console.log(rs.surroundingPois); //附近的POI点(array)
                // console.log(rs.business); //商圈字段，代表此点所属的商圈(string)
            });
        },

    }
}
</script>
<style lang="less" scoped>
.container-view {
}
</style>
