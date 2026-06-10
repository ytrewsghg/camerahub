<template>
  <router-link :to="`/rental/${device.id}`" class="device-card">
    <div class="card-image">
      <img :src="device.image" :alt="device.name" loading="lazy" @error="handleImgError" />
      <div class="card-tags" v-if="device.tags?.length">
        <span class="tag" v-for="tag in device.tags.slice(0, 2)" :key="tag">{{ tag }}</span>
      </div>
    </div>
    <div class="card-body">
      <h3 class="card-title">{{ device.name }}</h3>
      <p class="card-brand">{{ device.brand }} · {{ device.category }}</p>
      <div class="card-rating">
        <span class="stars">{{ '★'.repeat(Math.floor(device.rating)) }}{{ device.rating % 1 ? '☆' : '' }}</span>
        <span class="rating-num">{{ device.rating }}</span>
      </div>
      <div class="card-bottom">
        <div class="card-price">
          <span class="price">¥{{ device.price }}</span>
          <span class="price-unit">/天</span>
        </div>
        <span class="stock" :class="{ low: device.stock <= 3 }">
          {{ device.stock <= 3 ? '仅剩' + device.stock + '件' : '可租' + device.stock + '件' }}
        </span>
      </div>
    </div>
  </router-link>
</template>

<script setup>
const props = defineProps({ device: { type: Object, required: true } })

const handleImgError = (e) => {
  e.target.src = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" fill="%23f1f5f9"><rect width="400" height="300"/><text x="200" y="150" text-anchor="middle" fill="%2394a3b8" font-size="40">📷</text></svg>')
}
</script>

<style scoped>
.device-card {
  background: var(--card-bg);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--card-shadow);
  transition: var(--transition);
  display: block;
  border: 1px solid var(--border-light);
}

.device-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--card-shadow-hover);
}

.device-card:hover .card-image img {
  transform: scale(1.08);
}

.card-image {
  position: relative;
  width: 100%;
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

.card-tags {
  position: absolute;
  top: 12px;
  left: 12px;
  display: flex;
  gap: 6px;
}

.tag {
  padding: 4px 10px;
  border-radius: var(--radius-full);
  font-size: 11px;
  font-weight: 600;
  background: rgba(37, 99, 235, 0.85);
  color: white;
  backdrop-filter: blur(4px);
}

.card-body {
  padding: 20px;
}

.card-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.card-brand {
  font-size: 13px;
  color: var(--text-tertiary);
  margin-bottom: 10px;
}

.card-rating {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 14px;
}

.stars {
  color: var(--accent);
  font-size: 13px;
  letter-spacing: 1px;
}

.rating-num {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-secondary);
}

.card-bottom {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.card-price {
  display: flex;
  align-items: baseline;
  gap: 2px;
}

.price {
  font-size: 24px;
  font-weight: 800;
  color: var(--danger);
}

.price-unit {
  font-size: 13px;
  color: var(--text-tertiary);
}

.stock {
  font-size: 12px;
  color: var(--success);
  font-weight: 500;
}

.stock.low {
  color: var(--danger);
}
</style>
