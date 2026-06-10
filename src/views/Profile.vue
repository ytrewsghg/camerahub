<template>
  <div class="profile-page">
    <div class="container profile-container">
      <div class="profile-sidebar">
        <div class="user-card">
          <span class="user-avatar">{{ user?.avatar || '👤' }}</span>
          <h3 class="user-name">{{ user?.username || '用户' }}</h3>
          <span class="user-role badge badge-primary">{{ user?.role === 'admin' ? '管理员' : '普通用户' }}</span>
        </div>
        <nav class="sidebar-nav">
          <button v-for="tab in tabs" :key="tab.key" class="nav-item" :class="{ active: activeTab === tab.key }" @click="activeTab = tab.key">
            <span class="nav-icon">{{ tab.icon }}</span>
            <span>{{ tab.label }}</span>
          </button>
          <button class="nav-item logout" @click="handleLogout">🚪 退出登录</button>
        </nav>
      </div>
      <div class="profile-content">
        <!-- My Orders -->
        <div v-if="activeTab === 'orders'" class="content-section">
          <h2 class="content-title">我的订单</h2>
          <div v-if="userOrders.length" class="order-list">
            <div v-for="order in userOrders" :key="order.id" class="order-card">
              <div class="order-header">
                <span class="order-id">订单号：CH{{ String(order.id).padStart(6, '0') }}</span>
                <span class="order-status" :class="statusClass(order.status)">{{ order.status }}</span>
              </div>
              <div class="order-body">
                <div class="order-device">{{ order.deviceName }}</div>
                <div class="order-meta">
                  <span>{{ order.type === 'rental' ? '租赁' : '购买' }} · {{ order.days }}天</span>
                  <span>{{ order.createdAt }}</span>
                </div>
              </div>
              <div class="order-footer">
                <span class="order-total">¥{{ order.totalPrice.toLocaleString() }}</span>
              </div>
            </div>
          </div>
          <div v-else class="empty-state">
            <span class="empty-icon">📦</span>
            <p>暂无订单</p>
          </div>
        </div>

        <!-- Rental History -->
        <div v-if="activeTab === 'rentals'" class="content-section">
          <h2 class="content-title">租赁记录</h2>
          <div v-if="userRentals.length" class="order-list">
            <div v-for="order in userRentals" :key="order.id" class="order-card">
              <div class="order-header">
                <span class="order-id">{{ order.deviceName }}</span>
                <span class="order-status" :class="statusClass(order.status)">{{ order.status }}</span>
              </div>
              <div class="order-body">
                <div class="order-meta">
                  <span>租{{ order.days }}天 · 押金 ¥{{ order.deposit.toLocaleString() }}</span>
                  <span>{{ order.createdAt }}</span>
                </div>
              </div>
              <div class="order-footer">
                <span class="order-total">¥{{ order.totalPrice.toLocaleString() }}</span>
              </div>
            </div>
          </div>
          <div v-else class="empty-state">
            <span class="empty-icon">📷</span><p>暂无租赁记录</p>
          </div>
        </div>

        <!-- Transactions -->
        <div v-if="activeTab === 'transactions'" class="content-section">
          <h2 class="content-title">交易记录</h2>
          <div v-if="userTransactions.length" class="order-list">
            <div v-for="tx in userTransactions" :key="tx.id" class="order-card">
              <div class="order-header">
                <span class="order-id">{{ tx.itemName }}</span>
                <span class="order-status" :class="statusClass(tx.status)">{{ tx.status }}</span>
              </div>
              <div class="order-body">
                <div class="order-meta"><span>{{ tx.createdAt }}</span></div>
              </div>
              <div class="order-footer">
                <span class="order-total">¥{{ tx.price.toLocaleString() }}</span>
              </div>
            </div>
          </div>
          <div v-else class="empty-state">
            <span class="empty-icon">💰</span><p>暂无交易记录</p>
          </div>
        </div>

        <!-- Favorites -->
        <div v-if="activeTab === 'favorites'" class="content-section">
          <h2 class="content-title">我的收藏</h2>
          <div class="favorites-grid">
            <DeviceCard v-for="d in favoriteDevices" :key="d.id" :device="d" />
          </div>
          <div v-if="!favoriteDevices.length" class="empty-state">
            <span class="empty-icon">❤️</span><p>暂无收藏</p>
            <router-link to="/rental" class="btn btn-ghost">去逛逛</router-link>
          </div>
        </div>

        <!-- Settings -->
        <div v-if="activeTab === 'settings'" class="content-section">
          <h2 class="content-title">账号设置</h2>
          <div class="settings-form">
            <div class="form-group">
              <label>用户名</label>
              <input :value="user?.username" type="text" disabled />
            </div>
            <div class="form-group">
              <label>手机号</label>
              <input :value="user?.phone || '未设置'" type="text" />
            </div>
            <div class="form-group">
              <label>邮箱</label>
              <input :value="user?.email || '未设置'" type="email" />
            </div>
            <button class="btn btn-primary" @click="toast.success('设置已保存')">保存设置</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { getUser, removeUser } from '../utils/auth.js'
import { orders, transactions, rentalDevices } from '../data/mock.js'
import { useToast } from '../utils/toast.js'
import DeviceCard from '../components/DeviceCard.vue'

const router = useRouter()
const toast = useToast()
const user = ref(getUser())
const activeTab = ref('orders')

const tabs = [
  { key: 'orders', icon: '📋', label: '我的订单' },
  { key: 'rentals', icon: '📷', label: '租赁记录' },
  { key: 'transactions', icon: '💰', label: '交易记录' },
  { key: 'favorites', icon: '❤️', label: '我的收藏' },
  { key: 'settings', icon: '⚙️', label: '账号设置' }
]

const userOrders = computed(() => orders.filter(o => o.userId === user.value?.id).slice(0, 10))
const userRentals = computed(() => orders.filter(o => o.userId === user.value?.id && o.type === 'rental'))
const userTransactions = computed(() => transactions.filter(t => t.buyerId === user.value?.id || t.sellerId === user.value?.id))
const favoriteDevices = computed(() => rentalDevices.slice(0, 4))

const statusClass = (status) => {
  const map = { '已完成': 'success', '使用中': 'primary', '待取件': 'warning', '已取消': 'danger', '交易中': 'warning' }
  return map[status] || 'primary'
}

const handleLogout = () => {
  removeUser()
  window.dispatchEvent(new Event('userChanged'))
  toast.success('已退出登录')
  router.push('/')
}
</script>

<style scoped>
.profile-page { padding: 32px 0 60px; }

.profile-container { display: flex; gap: 24px; }

.profile-sidebar {
  width: 280px; flex-shrink: 0;
  background: var(--card-bg); border-radius: var(--radius-2xl);
  padding: 32px 20px; box-shadow: var(--card-shadow);
  border: 1px solid var(--border-light);
  height: fit-content; position: sticky; top: 104px;
}

.user-card { text-align: center; padding-bottom: 24px; border-bottom: 1px solid var(--border); margin-bottom: 20px; }
.user-avatar { font-size: 48px; display: block; margin-bottom: 12px; }
.user-name { font-size: 18px; font-weight: 700; margin-bottom: 8px; }

.sidebar-nav { display: flex; flex-direction: column; gap: 4px; }

.nav-item {
  display: flex; align-items: center; gap: 12px;
  padding: 14px 16px; border-radius: var(--radius-lg);
  font-size: 14px; font-weight: 500; color: var(--text-secondary);
  background: transparent; border: none; cursor: pointer; transition: var(--transition);
  text-align: left;
}
.nav-item:hover { background: var(--bg-secondary); color: var(--text-primary); }
.nav-item.active { background: rgba(37, 99, 235, 0.1); color: var(--primary); font-weight: 600; }
.nav-icon { font-size: 18px; }
.nav-item.logout { color: var(--danger); margin-top: 12px; }
.nav-item.logout:hover { background: rgba(239, 68, 68, 0.1); }

.profile-content {
  flex: 1; background: var(--card-bg); border-radius: var(--radius-2xl);
  padding: 36px; box-shadow: var(--card-shadow); border: 1px solid var(--border-light);
  min-height: 500px;
}

.content-title {
  font-size: 24px; font-weight: 700; margin-bottom: 24px;
  padding-bottom: 16px; border-bottom: 1px solid var(--border);
}

.order-list { display: flex; flex-direction: column; gap: 12px; }

.order-card {
  background: var(--bg-secondary); border-radius: var(--radius-lg);
  padding: 20px; transition: var(--transition);
}
.order-card:hover { background: var(--bg-tertiary); }

.order-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.order-id { font-size: 14px; font-weight: 600; color: var(--text-primary); }
.order-status { font-size: 12px; font-weight: 600; padding: 4px 12px; border-radius: var(--radius-full); }
.order-status.success { background: rgba(34, 197, 94, 0.1); color: var(--success); }
.order-status.primary { background: rgba(37, 99, 235, 0.1); color: var(--primary); }
.order-status.warning { background: rgba(245, 158, 11, 0.1); color: var(--accent); }
.order-status.danger { background: rgba(239, 68, 68, 0.1); color: var(--danger); }

.order-body { margin-bottom: 12px; }
.order-device { font-size: 16px; font-weight: 600; color: var(--text-primary); margin-bottom: 6px; }
.order-meta { font-size: 13px; color: var(--text-tertiary); display: flex; justify-content: space-between; }

.order-footer { display: flex; justify-content: flex-end; }
.order-total { font-size: 20px; font-weight: 800; color: var(--danger); }

.favorites-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }

.empty-state { text-align: center; padding: 60px 20px; color: var(--text-secondary); }
.empty-icon { font-size: 48px; display: block; margin-bottom: 12px; }
.empty-state p { font-size: 15px; margin-bottom: 16px; }

.settings-form { max-width: 400px; }
.form-group { margin-bottom: 20px; }
.form-group label { display: block; font-size: 14px; font-weight: 600; margin-bottom: 8px; }
.form-group input {
  width: 100%; padding: 12px 16px; border: 2px solid var(--border);
  border-radius: var(--radius-lg); font-size: 15px; color: var(--text-primary);
  background: var(--bg-primary);
}
.form-group input:focus { border-color: var(--primary); }

@media (max-width: 768px) {
  .profile-container { flex-direction: column; }
  .profile-sidebar { width: 100%; position: static; }
  .sidebar-nav { flex-direction: row; overflow-x: auto; padding-bottom: 8px; }
  .nav-item { white-space: nowrap; font-size: 13px; padding: 10px 14px; }
  .favorites-grid { grid-template-columns: 1fr; }
}
</style>
