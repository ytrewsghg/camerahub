<template>
  <router-link :to="`/secondhand/${item.id}`" class="product-card">
    <div class="card-image">
      <img :src="item.images?.[0]" :alt="item.name" loading="lazy" @error="handleImgError" />
      <span class="condition-badge" :class="conditionClass">{{ item.condition }}</span>
    </div>
    <div class="card-body">
      <h3 class="card-title">{{ item.name }}</h3>
      <p class="card-info">{{ item.condition }} · {{ item.useYears }}年 · {{ (item.shutterCount / 10000).toFixed(1) }}万次快门</p>
      <div class="seller-info">
        <span class="seller-avatar">{{ item.seller.avatar }}</span>
        <span class="seller-name">{{ item.seller.name }}</span>
        <span class="seller-rating">★ {{ item.seller.rating }}</span>
      </div>
      <div class="card-bottom">
        <div class="price-group">
          <span class="price">¥{{ item.price.toLocaleString() }}</span>
          <span class="original-price">¥{{ item.originalPrice.toLocaleString() }}</span>
        </div>
        <span class="discount">省¥{{ (item.originalPrice - item.price).toLocaleString() }}</span>
      </div>
    </div>
  </router-link>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({ item: { type: Object, required: true } })

const conditionClass = computed(() => {
  const s = props.item.conditionScore
  if (s >= 93) return 'excellent'
  if (s >= 85) return 'good'
  return 'fair'
})

const handleImgError = (e) => {
  e.target.src = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" fill="%23f1f5f9"><rect width="400" height="300"/><text x="200" y="150" text-anchor="middle" fill="%2394a3b8" font-size="40">📷</text></svg>')
}
</script>

<style scoped>
.product-card {
  background: var(--card-bg);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--card-shadow);
  transition: var(--transition);
  display: block;
  border: 1px solid var(--border-light);
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--card-shadow-hover);
}

.product-card:hover .card-image img {
  transform: scale(1.08);
}

.card-image {
  position: relative;
  height: 220px;
  overflow: hidden;
  background: var(--bg-tertiary);
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.condition-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 4px 12px;
  border-radius: var(--radius-full);
  font-size: 12px;
  font-weight: 600;
  backdrop-filter: blur(4px);
}

.condition-badge.excellent {
  background: rgba(34, 197, 94, 0.85);
  color: white;
}

.condition-badge.good {
  background: rgba(37, 99, 235, 0.85);
  color: white;
}

.condition-badge.fair {
  background: rgba(245, 158, 11, 0.85);
  color: white;
}

.card-body {
  padding: 20px;
}

.card-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 6px;
}

.card-info {
  font-size: 13px;
  color: var(--text-tertiary);
  margin-bottom: 12px;
}

.seller-info {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 14px;
  font-size: 13px;
}

.seller-avatar {
  font-size: 18px;
}

.seller-name {
  color: var(--text-secondary);
  font-weight: 500;
}

.seller-rating {
  color: var(--accent);
  font-weight: 600;
  margin-left: auto;
}

.card-bottom {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.price-group {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.price {
  font-size: 22px;
  font-weight: 800;
  color: var(--danger);
}

.original-price {
  font-size: 13px;
  color: var(--text-tertiary);
  text-decoration: line-through;
}

.discount {
  font-size: 12px;
  color: var(--success);
  font-weight: 600;
  background: rgba(34, 197, 94, 0.1);
  padding: 4px 10px;
  border-radius: var(--radius-full);
}
</style>
