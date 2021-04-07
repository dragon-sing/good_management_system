<template>
  <div id="pie" style="width: 800px;height:400px;"></div>
</template>

<script>

export default {
  name: 'Pie',
  props: {
    visitor: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      loading: false,
      source: []
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.myechart()
    },
    myechart() {
      this.source = this.visitor
      const data = []
      this.source.forEach(v => {
        data.push({
          name: v.WeekDay,
          value: v.visitors
        })
      })
      const myChart = this.$echarts.init(document.getElementById('pie'))

      const option = {
        title: {
          text: '访客量',
          left: 'center'
        },
        width: '50%',
        height: '',
        series: [{
          name: '访问量',
          type: 'pie',
          radius: '75%',
          center: ['50%', '50%'],
          data: data,
          left: '5%',
          right: '95%',
          top: 0,
          bottom: '80%'
        }]

      }
      myChart.setOption(option)
    }
  }
}

</script>

<style>

</style>
