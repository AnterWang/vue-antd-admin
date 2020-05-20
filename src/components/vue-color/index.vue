<template>
    <div class="box">
        <a-popover trigger="click">
            <template slot="content">
                <sketch-picker v-model="colors" @input="updateValue"></sketch-picker>
            </template>
            <slot></slot>
        </a-popover>
    </div>
</template>

<script>
    import { Sketch } from 'vue-color'
    export default {
        components: {
            'sketch-picker': Sketch
        },
//        props: {
//            text:{
//                type: String,
//                default: function () {
//                    return ''
//                }
//            }
//        },
        data() {
            return {
                // 颜色选择器
                colors: ''
            }
        },
        methods: {
            // 颜色选择器
            updateValue (val) {
                this.colors = val.hex
                this.$emit('getColor',val.hex)
            },
        }
    }
</script>

<style lang="less" scoped>
    .box{

    }
</style>
