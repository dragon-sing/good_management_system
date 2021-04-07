<template>
  <div v-loading="loading" class="app-container ml-10">
    <el-button @click="changeTab('bar')"> 条形图</el-button>
    <el-button @click="changeTab('pie')">饼图</el-button>
    <component :is="tab" ref="chart" :visitor="source" />
  </div>
</template>

<script>
import { queryVisitor } from '@/api/visit'
import bar from './components/bar'
import pie from './components/pie'
export default {
  name: 'Homepage',
  components: {
    bar,
    pie
  },
  data() {
    return {
      loading: false,
      source: [],
      tab: 'bar'
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      await this.query()
      this.$refs['chart'].init()
    },
    changeTab(tab) {
      this.tab = tab
    },
    async query() {
      try {
        this.loading = true
        const { code, data } = await queryVisitor()
        if (code === 200) {
          this.source = data
        }
      } finally {
        this.loading = false
      }
    }

  }}

</script>

<style>

</style>
