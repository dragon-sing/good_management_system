<template>
  <el-select
    v-model="selected"
    :loading="loading"
    placeholder="选择品类"
    v-bind="$props"
    @focus="init"
    @change="handleChange"
  >
    <el-option
      v-for="item in selectOptions"
      :key="item.cat_id"
      :value="item.cat_id"
      :label="item.cat_name"
    />
  </el-select>

</template>

<script>
import { getCategoryList } from '@/api/categoryManager'
export default {
  name: 'CategorySelect',
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selected: [], // 已选的数据即一个商品类别,这里传递的是id
      selectOptions: [], // 当前下拉的所有数据
      saveOptions: [], // 缓存，不需要每一次都执行query函数
      loading: false // 加载器
    }
  },
  watch: {
    selectOptions: {
      handler() {
        this.saveOptions = this.selectOptions
      },
      immediate: true }
  },
  methods: {
    init() {
      if (this.saveOptions.length === 0) {
        this.query()
      } else {
        this.selectOptions = this.saveOptions
      }
    },
    async query() {
      try {
        this.loading = true
        const { code, data } = await getCategoryList()
        if (code === 200) {
          this.selectOptions = Array.isArray(data) ? data : []
        }
      } finally {
        this.loading = false
      }
    },
    handleChange() {
      this.$emit('input', this.selected)
    }
  }
}
</script>
