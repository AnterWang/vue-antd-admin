<script>
import {mapState} from 'vuex';
export default {
    name: 'auth',
    props: {
        authKey: {
            type: String,
            default: ''
        }
    },
    computed: {
        ...mapState(['permission']),
    },
    render() {
        // return this.$slots['default'];
        let authListMap = this.permission.authList;
        // console.log('authListMap.....', authListMap);
        if (authListMap[this.authKey]) {
            return  this.$slots['default'];
        } 
        return null;
    }
}
</script>

<style scoped>

</style>