<template>
    <a-select
        showSearch
        style="width:240px;"
        placeholder="请输入门店名称搜索"
        optionFilterProp="children"
        allowClear
        @search="handleSearch"
        @change="handleChange"
        v-bind="$attrs"
    >
        <a-spin v-if="fetching" slot="notFoundContent" size="small"/>
        <a-select-option 
            v-for="(item, index) in list" 
            :key="index" 
            :value="item[`${valueField}`]"
        >{{item.name}}</a-select-option>
    </a-select>
</template>

<script>
//:disabled="disableOptions[item.code]"
import {platformshow} from '@/api/store';
import debounce from 'debounce';

export default {
    model: {
        prop: 'value',
        event: 'change'
    },

    props: {
        disableOptions: {
            type: Object,
            default: () => {}
        },

        getExtraData: {
            type: Boolean,
            default: false
        },

        valueField: {
            type: String,
            default: 'code'
        }
    },

    data() {
        return {
            list: [],
            fetching: false
        }
    },

    created() {
      this.handleSearch = debounce(this.handleSearch.bind(this), 400);
    },

    methods: {
        handleSearch(value) {
            if (value) {
                this.fetching = true;
                platformshow({name: value, pageNo: 1, pageSize: 100000})
                    .then(res => {
                        this.list = res.data.records || [];
                    })
                    .finally(() => {
                        this.fetching = false;
                    })
            } else {
                this.list = [];
            }
            
        },

        handleChange(val) {
            let extraData = {};
            if (this.getExtraData) {
                extraData = this.list.find(item => item[valueField] == val);
            }
            this.$emit('change', val, extraData);
        }
    }


}
</script>

<style scoped>

</style>