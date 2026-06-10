<template>
  <div class="dashboard-page">
    <div class="page-header">
      <div class="container">
        <h1 class="page-title">📊 数据后台</h1>
        <p class="page-desc">CameraHub 运营数据一览</p>
      </div>
    </div>
    <div class="container">
      <!-- Stats Cards -->
      <div class="stats-grid">
        <div class="stat-card" v-for="stat in statsCards" :key="stat.label" :style="{ borderLeftColor: stat.color }">
          <div class="stat-icon" :style="{ background: stat.color + '15', color: stat.color }">{{ stat.icon }}</div>
          <div class="stat-info">
            <span class="stat-value">{{ stat.value }}</span>
            <span class="stat-label">{{ stat.label }}</span>
          </div>
          <div class="stat-trend" :class="stat.trend > 0 ? 'up' : 'down'">
            {{ stat.trend > 0 ? '↑' : '↓' }} {{ Math.abs(stat.trend) }}%
          </div>
        </div>
      </div>

      <!-- Charts Row 1 -->
      <div class="charts-row">
        <div class="chart-card">
          <h3 class="chart-title">📈 订单统计</h3>
          <div ref="orderChartRef" class="chart-container"></div>
        </div>
        <div class="chart-card">
          <h3 class="chart-title">💰 成交金额趋势</h3>
          <div ref="revenueChartRef" class="chart-container"></div>
        </div>
      </div>

      <!-- Charts Row 2 -->
      <div class="charts-row">
        <div class="chart-card">
          <h3 class="chart-title">🏆 热门设备排行</h3>
          <div ref="hotChartRef" class="chart-container"></div>
        </div>
        <div class="chart-card">
          <h3 class="chart-title">📱 设备类别占比</h3>
          <div ref="categoryChartRef" class="chart-container"></div>
        </div>
      </div>

      <!-- User Growth -->
      <div class="chart-card full">
        <h3 class="chart-title">👥 用户增长趋势</h3>
        <div ref="userChartRef" class="chart-container" style="height: 320px"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, inject } from 'vue'
import * as echarts from 'echarts'

const isDark = inject('isDark')

const statsCards = [
  { icon: '📦', label: '总订单', value: '1,286', color: '#2563EB', trend: 12 },
  { icon: '💰', label: '总成交额', value: '¥386,500', color: '#22C55E', trend: 8 },
  { icon: '👥', label: '注册用户', value: '10,258', color: '#F59E0B', trend: 15 },
  { icon: '📷', label: '设备数量', value: '586', color: '#8B5CF6', trend: 5 }
]

const orderChartRef = ref(null)
const revenueChartRef = ref(null)
const hotChartRef = ref(null)
const categoryChartRef = ref(null)
const userChartRef = ref(null)

let charts = []

const getTextColor = () => isDark.value ? '#94A3B8' : '#64748B'
const getBgColor = () => isDark.value ? '#1E293B' : '#FFFFFF'
const getBorderColor = () => isDark.value ? '#334155' : '#E2E8F0'

const initCharts = () => {
  charts.forEach(c => c.dispose())
  charts = []

  const textColor = getTextColor()
  const borderColor = getBorderColor()

  // Order Chart - Bar
  if (orderChartRef.value) {
    const chart = echarts.init(orderChartRef.value)
    chart.setOption({
      tooltip: { trigger: 'axis' },
      grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
      xAxis: {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月'],
        axisLine: { lineStyle: { color: borderColor } },
        axisLabel: { color: textColor }
      },
      yAxis: {
        type: 'value',
        axisLine: { lineStyle: { color: borderColor } },
        axisLabel: { color: textColor },
        splitLine: { lineStyle: { color: borderColor, type: 'dashed' } }
      },
      series: [{
        type: 'bar',
        data: [120, 200, 150, 280, 230, 340],
        itemStyle: {
          borderRadius: [8, 8, 0, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#3B82F6' },
            { offset: 1, color: '#2563EB' }
          ])
        }
      }]
    })
    charts.push(chart)
  }

  // Revenue Chart - Area
  if (revenueChartRef.value) {
    const chart = echarts.init(revenueChartRef.value)
    chart.setOption({
      tooltip: { trigger: 'axis' },
      grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
      xAxis: {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月'],
        axisLine: { lineStyle: { color: borderColor } },
        axisLabel: { color: textColor }
      },
      yAxis: {
        type: 'value',
        axisLine: { lineStyle: { color: borderColor } },
        axisLabel: { color: textColor },
        splitLine: { lineStyle: { color: borderColor, type: 'dashed' } }
      },
      series: [{
        type: 'line',
        data: [28000, 45000, 38000, 62000, 55000, 86000],
        smooth: true,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(34, 197, 94, 0.3)' },
            { offset: 1, color: 'rgba(34, 197, 94, 0.02)' }
          ])
        },
        lineStyle: { color: '#22C55E', width: 3 },
        itemStyle: { color: '#22C55E' }
      }]
    })
    charts.push(chart)
  }

  // Hot Devices - Horizontal Bar
  if (hotChartRef.value) {
    const chart = echarts.init(hotChartRef.value)
    chart.setOption({
      tooltip: { trigger: 'axis' },
      grid: { left: '3%', right: '8%', bottom: '3%', containLabel: true },
      xAxis: {
        type: 'value',
        axisLine: { lineStyle: { color: borderColor } },
        axisLabel: { color: textColor },
        splitLine: { lineStyle: { color: borderColor, type: 'dashed' } }
      },
      yAxis: {
        type: 'category',
        data: ['Hasselblad X2D', 'Fuji X100VI', 'Sony A7M4', 'DJI Pocket 3', 'Nikon Z8'],
        axisLine: { lineStyle: { color: borderColor } },
        axisLabel: { color: textColor }
      },
      series: [{
        type: 'bar',
        data: [86, 128, 195, 210, 156],
        itemStyle: {
          borderRadius: [0, 8, 8, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: '#F59E0B' },
            { offset: 1, color: '#FBBF24' }
          ])
        }
      }]
    })
    charts.push(chart)
  }

  // Category Pie
  if (categoryChartRef.value) {
    const chart = echarts.init(categoryChartRef.value)
    chart.setOption({
      tooltip: { trigger: 'item' },
      legend: {
        orient: 'vertical', right: '5%', top: 'center',
        textStyle: { color: textColor }
      },
      series: [{
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['40%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: { borderRadius: 10, borderColor: getBgColor(), borderWidth: 3 },
        label: { show: false },
        emphasis: { label: { show: true, fontSize: 16, fontWeight: 'bold' } },
        data: [
          { value: 8, name: '微单', itemStyle: { color: '#2563EB' } },
          { value: 3, name: '无人机', itemStyle: { color: '#22C55E' } },
          { value: 2, name: '电影机', itemStyle: { color: '#F59E0B' } },
          { value: 2, name: '卡片机', itemStyle: { color: '#8B5CF6' } },
          { value: 3, name: '其他', itemStyle: { color: '#EC4899' } }
        ]
      }]
    })
    charts.push(chart)
  }

  // User Growth - Line
  if (userChartRef.value) {
    const chart = echarts.init(userChartRef.value)
    chart.setOption({
      tooltip: { trigger: 'axis' },
      grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
      xAxis: {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        axisLine: { lineStyle: { color: borderColor } },
        axisLabel: { color: textColor }
      },
      yAxis: {
        type: 'value',
        axisLine: { lineStyle: { color: borderColor } },
        axisLabel: { color: textColor },
        splitLine: { lineStyle: { color: borderColor, type: 'dashed' } }
      },
      series: [{
        type: 'line',
        data: [820, 932, 1100, 1534, 1890, 2300, 2690, 3100, 3580, 4200, 4850, 5600],
        smooth: true,
        lineStyle: { color: '#2563EB', width: 3 },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(37, 99, 235, 0.25)' },
            { offset: 1, color: 'rgba(37, 99, 235, 0.02)' }
          ])
        },
        itemStyle: { color: '#2563EB' }
      }]
    })
    charts.push(chart)
  }
}

onMounted(() => {
  setTimeout(initCharts, 100)
  window.addEventListener('resize', () => charts.forEach(c => c.resize()))
})

onUnmounted(() => {
  charts.forEach(c => c.dispose())
})
</script>

<style scoped>
.dashboard-page { padding-bottom: 60px; }

.page-header {
  background: linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #334155 100%);
  padding: 60px 0 48px; color: white;
}
.page-title { font-size: 36px; font-weight: 800; margin-bottom: 8px; }
.page-desc { font-size: 16px; opacity: 0.7; }

.stats-grid {
  display: grid; grid-template-columns: repeat(4, 1fr);
  gap: 20px; margin: 32px 0;
}

.stat-card {
  background: var(--card-bg); border-radius: var(--radius-xl);
  padding: 24px; display: flex; align-items: center; gap: 16px;
  box-shadow: var(--card-shadow); border: 1px solid var(--border-light);
  border-left: 4px solid var(--primary); transition: var(--transition);
}
.stat-card:hover { transform: translateY(-4px); box-shadow: var(--card-shadow-hover); }

.stat-icon {
  width: 52px; height: 52px; border-radius: var(--radius-lg);
  display: flex; align-items: center; justify-content: center;
  font-size: 24px;
}

.stat-info { flex: 1; }
.stat-value { font-size: 24px; font-weight: 800; color: var(--text-primary); display: block; }
.stat-label { font-size: 13px; color: var(--text-tertiary); }

.stat-trend {
  font-size: 13px; font-weight: 600; padding: 4px 10px;
  border-radius: var(--radius-full);
}
.stat-trend.up { color: var(--success); background: rgba(34, 197, 94, 0.1); }
.stat-trend.down { color: var(--danger); background: rgba(239, 68, 68, 0.1); }

.charts-row {
  display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;
}

.chart-card {
  background: var(--card-bg); border-radius: var(--radius-xl);
  padding: 28px; box-shadow: var(--card-shadow);
  border: 1px solid var(--border-light);
}
.chart-card.full { margin-bottom: 20px; }

.chart-title {
  font-size: 18px; font-weight: 700; color: var(--text-primary); margin-bottom: 20px;
}

.chart-container { height: 280px; }

@media (max-width: 1024px) {
  .stats-grid { grid-template-columns: repeat(2, 1fr); }
  .charts-row { grid-template-columns: 1fr; }
}
@media (max-width: 768px) {
  .stats-grid { grid-template-columns: 1fr; }
  .page-title { font-size: 28px; }
}
</style>
