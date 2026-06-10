<template>
  <div class="skeleton-card">
    <div class="skeleton-image skeleton"></div>
    <div class="skeleton-body">
      <div class="skeleton-title skeleton"></div>
      <div class="skeleton-text skeleton" style="width: 60%"></div>
      <div class="skeleton-row">
        <div class="skeleton-price skeleton"></div>
        <div class="skeleton-tag skeleton"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.skeleton-card {
  background: var(--card-bg);
  border-radius: var(--radius-xl);
  overflow: hidden;
  border: 1px solid var(--border-light);
}

.skeleton-image {
  height: 220px;
}

.skeleton-body {
  padding: 20px;
}

.skeleton-title {
  height: 20px;
  width: 70%;
  margin-bottom: 10px;
}

.skeleton-text {
  height: 14px;
  margin-bottom: 16px;
}

.skeleton-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.skeleton-price {
  height: 24px;
  width: 80px;
}

.skeleton-tag {
  height: 20px;
  width: 50px;
  border-radius: var(--radius-full);
}
</style>
