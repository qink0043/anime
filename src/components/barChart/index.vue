<template>
  <div ref="chatRef" class="barChart"></div>
</template>

<script setup>
import { onBeforeUnmount, ref, watch } from 'vue'
//引入echarts
import * as echarts from 'echarts'
const props = defineProps({
  count: {
    type: Object,
    default: () => ({})
  }
})
const chatRef = ref(null)
let myChart = null
const initChart = () => {
  const xData = Object.keys(props.count).map(item => `${item}分`)
  const yData = Object.values(props.count)
  myChart = echarts.init(chatRef.value)
  myChart.setOption({
    title: {
      text: '评分柱状图'
    },
    tooltip: {},
    xAxis: {
      data: xData
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        show: false
      },
      splitLine: {
        show: false
      }
    },
    series: [
      {
        name: '评分人数',
        type: 'bar',
        data: yData,
        itemStyle: {
          color: '#409EFF'
        }
      }
    ]
  })
}
watch(() => props.count, (newCount) => {
  if (newCount && Object.keys(newCount).length > 0) {
    initChart()
  }
})

onBeforeUnmount(() => {
  myChart.dispose()
})
</script>

<style scoped lang="scss">
.barChart {
  width: 100%;
  height: 100%;
}
</style>