<template>
  <div class="rental-page">
    <div class="page-header">
      <div class="container">
        <h1 class="page-title">📷 相机租赁</h1>
        <p class="page-desc">专业设备，按天租赁，灵活便捷</p>
      </div>
    </div>
    <div class="container">
      <div class="filter-bar">
        <div class="search-box">
          <span class="search-icon">🔍</span>
          <input v-model="searchQuery" type="text" placeholder="搜索设备名称、品牌..." />
        </div>
        <div class="filters">
          <select v-model="brandFilter" class="filter-select">
            <option value="">全部品牌</option>
            <option v-for="b in brands" :key="b" :value="b">{{ b }}</option>
          </select>
          <select v-model="categoryFilter" class="filter-select">
            <option value="">全部类型</option>
            <option value="微单">微单</option>
            <option value="电影机">电影机</option>
            <option value="卡片机">卡片机</option>
            <option value="无人机">无人机</option>
            <option value="云台相机">云台相机</option>
            <option value="稳定器">稳定器</option>
            <option value="中画幅">中画幅</option>
          </select>
          <select v-model="priceSort" class="filter-select">
            <option value="">默认排序</option>
            <option value="asc">价格升序</option>
            <option value="desc">价格降序</option>
            <option value="rating">评分最高</option>
          </select>
        </div>
      </div>
      <div v-if="loading" class="devices-grid">
        <SkeletonCard v-for="i in 8" :key="i" />
      </div>
      <div v-else-if="filteredDevices.length" class="devices-grid">
        <DeviceCard v-for="device in paginatedDevices" :key="device.id" :device="device" />
      </div>
      <div v-else class="empty-state">
        <span class="empty-icon">🔍</span>
        <p>未找到符合条件的设备</p>
        <button class="btn btn-ghost" @click="resetFilters">重置筛选</button>
      </div>
      <div v-if="totalPages > 1" class="pagination">
        <button class="page-btn" :disabled="currentPage === 1" @click="currentPage--">‹</button>
        <button v-for="p in displayedPages" :key="p" class="page-btn" :class="{ active: p === currentPage }" @click="currentPage = p">
          {{ p }}
        </button>
        <button class="page-btn" :disabled="currentPage === totalPages" @click="currentPage++">›</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { rentalDevices } from '../data/mock.js'
import DeviceCard from '../components/DeviceCard.vue'
import SkeletonCard from '../components/SkeletonCard.vue'

const loading = ref(true)
const searchQuery = ref('')
const brandFilter = ref('')
const categoryFilter = ref('')
const priceSort = ref('')
const currentPage = ref(1)
const pageSize = 8

const brands = [...new Set(rentalDevices.map(d => d.brand))]

const filteredDevices = computed(() => {
  let list = [...rentalDevices]
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(d => d.name.toLowerCase().includes(q) || d.brand.toLowerCase().includes(q))
  }
  if (brandFilter.value) list = list.filter(d => d.brand === brandFilter.value)
  if (categoryFilter.value) list = list.filter(d => d.category === categoryFilter.value)
  if (priceSort.value === 'asc') list.sort((a, b) => a.price - b.price)
  else if (priceSort.value === 'desc') list.sort((a, b) => b.price - a.price)
  else if (priceSort.value === 'rating') list.sort((a, b) => b.rating - a.rating)
  return list
})

const totalPages = computed(() => Math.ceil(filteredDevices.value.length / pageSize))
const paginatedDevices = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredDevices.value.slice(start, start + pageSize)
})

const displayedPages = computed(() => {
  const total = totalPages.value
  const cur = currentPage.value
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const pages = [1]
  for (let i = Math.max(2, cur - 1); i <= Math.min(total - 1, cur + 1); i++) pages.push(i)
  if (!pages.includes(total)) pages.push(total)
  return pages
})

const resetFilters = () => {
  searchQuery.value = ''
  brandFilter.value = ''
  categoryFilter.value = ''
  priceSort.value = ''
  currentPage.value = 1
}

watch([searchQuery, brandFilter, categoryFilter, priceSort], () => { currentPage.value = 1 })

onMounted(() => { setTimeout(() => { loading.value = false }, 800) })
</script>

<style scoped>
.rental-page {
  padding-bottom: 60px;
}

.page-header {
  background: var(--primary-gradient);
  padding: 60px 0 48px;
  color: white;
}

.page-title {
  font-size: 36px;
  font-weight: 800;
  margin-bottom: 8px;
}

.page-desc {
  font-size: 16px;
  opacity: 0.9;
}

.filter-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin: 32px 0;
  flex-wrap: wrap;
}

.search-box {
  position: relative;
  flex: 1;
  max-width: 400px;
}

.search-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
}

.search-box input {
  width: 100%;
  padding: 14px 16px 14px 48px;
  border: 2px solid var(--border);
  border-radius: var(--radius-full);
  font-size: 15px;
  color: var(--text-primary);
  background: var(--card-bg);
  transition: var(--transition);
}

.search-box input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
}

.filters {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.filter-select {
  padding: 12px 20px;
  border: 2px solid var(--border);
  border-radius: var(--radius-full);
  font-size: 14px;
  color: var(--text-primary);
  background: var(--card-bg);
  cursor: pointer;
  transition: var(--transition);
  appearance: none;
  -webkit-appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 36px;
}

.filter-select:focus {
  border-color: var(--primary);
}

.devices-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.empty-state {
  text-align: center;
  padding: 80px 20px;
  color: var(--text-secondary);
}

.empty-icon {
  font-size: 56px;
  display: block;
  margin-bottom: 16px;
}

.empty-state p {
  font-size: 16px;
  margin-bottom: 20px;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 40px;
}

.page-btn {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  background: var(--card-bg);
  color: var(--text-secondary);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-btn:hover:not(:disabled) {
  border-color: var(--primary);
  color: var(--primary);
}

.page-btn.active {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

.page-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

@media (max-width: 1024px) {
  .devices-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .filter-bar {
    flex-direction: column;
  }
  .search-box {
    max-width: 100%;
  }
  .page-title {
    font-size: 28px;
  }
}

@media (max-width: 480px) {
  .devices-grid {
    grid-template-columns: 1fr;
  }
  .filters {
    width: 100%;
  }
  .filter-select {
    flex: 1;
  }
}
</style>
