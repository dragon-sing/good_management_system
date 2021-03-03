<template>
  <div class="ml-10 flex-inline mt-10">
    <el-select
      v-model="selected"
      :loading="loading"
      placeholder="选择品类"
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
  </div>

</template>

<script>
import { getCategoryList } from '@/api/categoryManager'
export default {
  name: 'CategorySelect',
  props: {
    value: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      selected: [], // 已选数据
      selectOptions: [], // 当前下拉数据
      loading: false // 加载器
    }
  },
  methods: {
    init() {
      this.query()
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
