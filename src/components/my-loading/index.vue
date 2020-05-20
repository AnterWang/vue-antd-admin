<template>
    <div id="loading-mask" v-show="showLoading">
        <div class="loading-wrapper">
            <span class="loading-dot loading-dot-spin"><i></i><i></i><i></i><i></i></span>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        props: {
            showLoading: false
        }
    }
</script>
<style src="./loading.css">

</style>
