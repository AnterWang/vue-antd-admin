<template>
    <div class="amap" :id="id">
        <slot></slot>    
    </div>
</template>

<script>

import {loadAMapScript, generatorId} from '@/utils/common'; 

export default {

    name: 'hh-map',

    props: {
        options: {
            type: Object,
            default: () => {}
        }
    },

    data() {
        return {
            id: generatorId()
        }
    },
    
    created() {
        this.map = null;
    },

    mounted() {
        this.initMap();
    },

    methods: {
        initMap() {
            loadAMapScript()
                .then(res => {
                    const map = new AMap.Map(this.id, {
                        zoom: 18,
                        ...(this.options || {})
                    });

                    this.map = map;
                    this.initEvents();
                    this.$emit('loaded', map);
                })
        },

        initEvents() {
            this.map.on('click', (ev) => {
                this.$emit('click', ev);
            })
        }
    }
}
</script>

<style scoped>
.amap {
    height: 400px;
}
</style>