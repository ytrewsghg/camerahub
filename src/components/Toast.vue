<template>
  <div class="toast-container">
    <transition-group name="toast">
      <div v-for="toast in toasts" :key="toast.id" class="toast" :class="[toast.type, { hiding: !toast.show }]">
        <span class="toast-icon">{{ icons[toast.type] }}</span>
        <span class="toast-msg">{{ toast.message }}</span>
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { useToast } from '../utils/toast.js'

const { toasts } = useToast()

const icons = {
  success: '✅',
  error: '❌',
  warning: '⚠️',
  info: 'ℹ️'
}
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 88px;
  right: 24px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.toast {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 24px;
  border-radius: var(--radius-lg);
  background: var(--card-bg);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  border-left: 4px solid var(--primary);
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
  min-width: 280px;
  max-width: 420px;
}

.toast.success { border-left-color: var(--success); }
.toast.error { border-left-color: var(--danger); }
.toast.warning { border-left-color: var(--accent); }
.toast.info { border-left-color: var(--primary); }

.toast-icon { font-size: 18px; }

.toast-enter-active {
  animation: slideInRight 0.3s ease;
}
.toast-leave-active {
  animation: slideInRight 0.3s ease reverse;
}

@keyframes slideInRight {
  from { opacity: 0; transform: translateX(60px); }
  to { opacity: 1; transform: translateX(0); }
}

@media (max-width: 480px) {
  .toast-container {
    right: 12px;
    left: 12px;
  }
  .toast {
    min-width: auto;
  }
}
</style>
