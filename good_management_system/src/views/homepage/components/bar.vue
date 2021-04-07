<template>
  <div id="bar" style="width: 800px;height:400px;"></div>
</template>

<script>

export default {
  name: 'Bar',
  props: {
    visitor: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: ''
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
      const xArray = []
      const yArray = []
      this.source.forEach(v => {
        xArray.push(v.WeekDay)
        yArray.push(v.visitors)
      })
      const myChart = this.$echarts.init(document.getElementById('bar'))

      const option = {
        title: {
          text: '访客量'
        },
        toolttip: {},
        legend: {
          data: ['访客量']
        },
        xAxis: {
          data: xArray
        },
        yAxis: {
        },
        barWidth: 46,
        series: [{
          name: '访问量',
          type: 'bar',
          data: yArray
        }]

      }
      myChart.setOption(option)
    }
  }
}

</script>

<style>

</style>
