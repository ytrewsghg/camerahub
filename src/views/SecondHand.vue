<template>
  <div class="secondhand-page">
    <div class="page-header">
      <div class="container">
        <h1 class="page-title">💰 二手交易</h1>
        <p class="page-desc">AI保真检测，放心买卖二手设备</p>
      </div>
    </div>
    <div class="container">
      <div class="filter-bar">
        <div class="search-box">
          <span class="search-icon">🔍</span>
          <input v-model="searchQuery" type="text" placeholder="搜索二手设备..." />
        </div>
        <div class="filters">
          <select v-model="brandFilter" class="filter-select">
            <option value="">全部品牌</option>
            <option v-for="b in brands" :key="b" :value="b">{{ b }}</option>
          </select>
          <select v-model="conditionFilter" class="filter-select">
            <option value="">全部成色</option>
            <option value="95新">95新及以上</option>
            <option value="9成新">9成新</option>
            <option value="8成新">8成新</option>
          </select>
          <select v-model="sortOrder" class="filter-select">
            <option value="">默认排序</option>
            <option value="price-asc">价格升序</option>
            <option value="price-desc">价格降序</option>
            <option value="newest">最新发布</option>
          </select>
        </div>
      </div>
      <div v-if="filteredItems.length" class="products-grid">
        <ProductCard v-for="item in paginatedItems" :key="item.id" :item="item" />
      </div>
      <div v-else class="empty-state">
        <span class="empty-icon">🔍</span>
        <p>未找到符合条件的商品</p>
        <button class="btn btn-ghost" @click="resetFilters">重置筛选</button>
      </div>
      <div v-if="totalPages > 1" class="pagination">
        <button class="page-btn" :disabled="currentPage === 1" @click="currentPage--">‹</button>
        <button v-for="p in displayedPages" :key="p" class="page-btn" :class="{ active: p === currentPage }" @click="currentPage = p">{{ p }}</button>
        <button class="page-btn" :disabled="currentPage === totalPages" @click="currentPage++">›</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { secondHandItems } from '../data/mock.js'
import ProductCard from '../components/ProductCard.vue'

const searchQuery = ref('')
const brandFilter = ref('')
const conditionFilter = ref('')
const sortOrder = ref('')
const currentPage = ref(1)
const pageSize = 8

const brands = [...new Set(secondHandItems.map(i => i.brand))]

const filteredItems = computed(() => {
  let list = [...secondHandItems]
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(i => i.name.toLowerCase().includes(q) || i.brand.toLowerCase().includes(q))
  }
  if (brandFilter.value) list = list.filter(i => i.brand === brandFilter.value)
  if (conditionFilter.value) {
    if (conditionFilter.value === '95新及以上') list = list.filter(i => i.conditionScore >= 93)
    else if (conditionFilter.value === '9成新') list = list.filter(i => i.conditionScore >= 85 && i.conditionScore < 93)
    else if (conditionFilter.value === '8成新') list = list.filter(i => i.conditionScore < 85)
  }
  if (sortOrder.value === 'price-asc') list.sort((a, b) => a.price - b.price)
  else if (sortOrder.value === 'price-desc') list.sort((a, b) => b.price - a.price)
  else if (sortOrder.value === 'newest') list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  return list
})

const totalPages = computed(() => Math.ceil(filteredItems.value.length / pageSize))
const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredItems.value.slice(start, start + pageSize)
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
  conditionFilter.value = ''
  sortOrder.value = ''
  currentPage.value = 1
}

watch([searchQuery, brandFilter, conditionFilter, sortOrder], () => { currentPage.value = 1 })
</script>

<style scoped>
.secondhand-page { padding-bottom: 60px; }

.page-header {
  background: linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%);
  padding: 60px 0 48px;
  color: white;
}

.page-title { font-size: 36px; font-weight: 800; margin-bottom: 8px; }
.page-desc { font-size: 16px; opacity: 0.9; }

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

.filters { display: flex; gap: 12px; flex-wrap: wrap; }

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
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 36px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.empty-state {
  text-align: center;
  padding: 80px 20px;
  color: var(--text-secondary);
}

.empty-icon { font-size: 56px; display: block; margin-bottom: 16px; }
.empty-state p { font-size: 16px; margin-bottom: 20px; }

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

.page-btn:hover:not(:disabled) { border-color: var(--primary); color: var(--primary); }
.page-btn.active { background: var(--primary); color: white; border-color: var(--primary); }
.page-btn:disabled { opacity: 0.4; cursor: not-allowed; }

@media (max-width: 1024px) {
  .products-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 768px) {
  .filter-bar { flex-direction: column; }
  .search-box { max-width: 100%; }
  .page-title { font-size: 28px; }
}
@media (max-width: 480px) {
  .products-grid { grid-template-columns: 1fr; }
}
</style>
