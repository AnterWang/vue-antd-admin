<template>
    <div class="container-view">
        <vuecolor @getColor="getColor">
            <a-input v-model="color" type="text" style="width:200px" />
        </vuecolor>
    </div>
</template>

<script>
import vuecolor from '@/components/vueColor';
export default {
    name: 'color',
    components: {
        vuecolor
    },
    data () {
        return {
            color: ''
        }
    },
    created () {
        this.$loading.show()
        setTimeout(()=>{
            this.$loading.hide()
        },1000)
    },
    methods: {
        // 获取颜色
        getColor (val) {
            this.color = val
        },
    }
}
</script>
<style lang="less" scoped>
.container-view {
}
</style>
