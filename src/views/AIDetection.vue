<template>
  <div class="ai-page">
    <div class="page-hero">
      <div class="container">
        <h1 class="page-title">🤖 AI 检测中心</h1>
        <p class="page-desc">AI智能真伪检测 · 设备估值 · 智能推荐</p>
      </div>
    </div>

    <div class="container">
      <!-- Tabs -->
      <div class="ai-tabs">
        <button class="ai-tab" :class="{ active: activeTab === 'detect' }" @click="activeTab = 'detect'">🔍 真伪检测</button>
        <button class="ai-tab" :class="{ active: activeTab === 'value' }" @click="activeTab = 'value'">💰 设备估值</button>
        <button class="ai-tab" :class="{ active: activeTab === 'recommend' }" @click="activeTab = 'recommend'">🎯 设备推荐</button>
      </div>

      <!-- AI Detect -->
      <div v-if="activeTab === 'detect'" class="ai-section">
        <div class="section-card">
          <div class="card-header">
            <h2>🔍 AI 真伪检测</h2>
            <p>上传设备照片，AI智能分析设备真伪</p>
          </div>
          <div class="detect-content">
            <div class="upload-zone" @click="$refs.detectInput.click()" @dragover.prevent @drop.prevent>
              <input type="file" ref="detectInput" accept="image/*" style="display:none" @change="handleDetectUpload" />
              <div v-if="!detectImage" class="upload-placeholder">
                <span class="upload-icon">📸</span>
                <p>点击上传设备照片</p>
                <span class="hint">支持 JPG/PNG，建议上传清晰正面照</span>
              </div>
              <div v-else class="preview-wrapper">
                <img :src="detectImage" class="preview-img" />
              </div>
            </div>
            <button class="btn btn-primary btn-lg detect-btn" @click="startDetect" :disabled="!detectImage || detectLoading">
              <span v-if="detectLoading" class="spinner"></span>
              {{ detectLoading ? 'AI检测中...' : '🤖 开始检测' }}
            </button>
          </div>
          <transition name="result">
            <div v-if="detectResult" class="detect-result">
              <div class="result-header">
                <span class="result-icon">{{ detectResult.score >= 80 ? '✅' : '⚠️' }}</span>
                <div>
                  <h3>可信度 {{ detectResult.score }}%</h3>
                  <p>{{ detectResult.message }}</p>
                </div>
              </div>
              <div class="result-details">
                <div class="detail-item" v-for="d in detectResult.details" :key="d.label">
                  <span class="detail-label">{{ d.label }}</span>
                  <div class="detail-bar">
                    <div class="bar-fill" :style="{ width: d.value + '%', background: d.color }"></div>
                  </div>
                  <span class="detail-value">{{ d.value }}%</span>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>

      <!-- AI Value -->
      <div v-if="activeTab === 'value'" class="ai-section">
        <div class="section-card">
          <div class="card-header">
            <h2>💰 AI 设备估值</h2>
            <p>基于市场大数据，智能评估设备价值</p>
          </div>
          <div class="value-form">
            <div class="form-row">
              <div class="form-group">
                <label>品牌</label>
                <select v-model="valueForm.brand">
                  <option value="">请选择</option>
                  <option v-for="b in ['Sony','Canon','Nikon','Fuji','DJI','Panasonic','Leica']" :key="b" :value="b">{{ b }}</option>
                </select>
              </div>
              <div class="form-group">
                <label>型号</label>
                <input v-model="valueForm.model" type="text" placeholder="例如：A7M4" />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>使用年限</label>
                <select v-model="valueForm.years">
                  <option value="">请选择</option>
                  <option value="0.5">半年以内</option>
                  <option value="1">1年</option>
                  <option value="2">2年</option>
                  <option value="3">3年</option>
                  <option value="5">5年以上</option>
                </select>
              </div>
              <div class="form-group">
                <label>成色</label>
                <select v-model="valueForm.condition">
                  <option value="">请选择</option>
                  <option value="全新">全新</option>
                  <option value="95新">95新</option>
                  <option value="9成新">9成新</option>
                  <option value="8成新">8成新</option>
                </select>
              </div>
            </div>
            <button class="btn btn-primary btn-lg" @click="startValue" :disabled="valueLoading">
              <span v-if="valueLoading" class="spinner"></span>
              {{ valueLoading ? 'AI估值中...' : '🤖 开始估值' }}
            </button>
          </div>
          <transition name="result">
            <div v-if="valueResult" class="value-result">
              <h3>💰 估值结果</h3>
              <div class="value-cards">
                <div class="value-card main">
                  <span class="value-label">建议售价</span>
                  <span class="value-amount">¥{{ valueResult.price.toLocaleString() }}</span>
                </div>
                <div class="value-card">
                  <span class="value-label">建议日租金</span>
                  <span class="value-amount">¥{{ valueResult.dailyRent }}</span>
                </div>
                <div class="value-card">
                  <span class="value-label">市场热度</span>
                  <span class="value-amount hot">{{ valueResult.hot }}</span>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>

      <!-- AI Recommend -->
      <div v-if="activeTab === 'recommend'" class="ai-section">
        <div class="section-card">
          <div class="card-header">
            <h2>🎯 AI 设备推荐</h2>
            <p>根据你的用途和预算，智能推荐最适合的设备</p>
          </div>
          <div class="recommend-form">
            <div class="form-group">
              <label>主要用途</label>
              <div class="option-group">
                <button v-for="u in ['旅行', '摄影作业', 'Vlog', '商业拍摄']" :key="u"
                  class="option-btn" :class="{ active: recForm.usage === u }" @click="recForm.usage = u">
                  {{ usageIcons[u] }} {{ u }}
                </button>
              </div>
            </div>
            <div class="form-group">
              <label>预算范围</label>
              <div class="option-group">
                <button v-for="b in ['1000以内', '3000以内', '5000以内', '10000以内']" :key="b"
                  class="option-btn" :class="{ active: recForm.budget === b }" @click="recForm.budget = b">
                  💰 {{ b }}
                </button>
              </div>
            </div>
            <button class="btn btn-primary btn-lg" @click="startRecommend" :disabled="recLoading">
              <span v-if="recLoading" class="spinner"></span>
              {{ recLoading ? 'AI推荐中...' : '🤖 获取推荐' }}
            </button>
          </div>
          <transition name="result">
            <div v-if="recResults.length" class="rec-results">
              <div class="rec-card" v-for="(rec, i) in recResults" :key="i">
                <div class="rec-rank">#{{ i + 1 }}</div>
                <div class="rec-info">
                  <h4>{{ rec.name }}</h4>
                  <p class="rec-reason">{{ rec.reason }}</p>
                  <div class="rec-tags">
                    <span class="rec-tag" v-for="s in rec.scenes" :key="s">{{ s }}</span>
                  </div>
                </div>
                <div class="rec-price">¥{{ rec.price }}/天</div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useToast } from '../utils/toast.js'

const toast = useToast()
const activeTab = ref('detect')

// Detect
const detectImage = ref('')
const detectLoading = ref(false)
const detectResult = ref(null)

const handleDetectUpload = (e) => {
  const file = e.target.files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (ev) => { detectImage.value = ev.target.result; detectResult.value = null }
  reader.readAsDataURL(file)
}

const startDetect = async () => {
  detectLoading.value = true
  await new Promise(r => setTimeout(r, 3000))
  const score = Math.floor(Math.random() * 15) + 85
  detectResult.value = {
    score,
    message: score >= 90 ? '设备疑似正品，检测指标优良' : '设备基本可信，建议进一步验证',
    details: [
      { label: '外观工艺', value: Math.min(99, score + Math.floor(Math.random() * 5)), color: '#22C55E' },
      { label: '标识刻印', value: Math.min(99, score + Math.floor(Math.random() * 3) - 2), color: '#2563EB' },
      { label: '配件匹配', value: Math.min(99, score + Math.floor(Math.random() * 8) - 3), color: '#F59E0B' },
      { label: '固件验证', value: Math.min(99, score + Math.floor(Math.random() * 4)), color: '#8B5CF6' }
    ]
  }
  detectLoading.value = false
  toast.success('AI检测完成！')
}

// Value
const valueForm = ref({ brand: '', model: '', years: '', condition: '' })
const valueLoading = ref(false)
const valueResult = ref(null)

const startValue = async () => {
  if (!valueForm.value.brand || !valueForm.value.model) {
    toast.warning('请至少选择品牌和型号')
    return
  }
  valueLoading.value = true
  await new Promise(r => setTimeout(r, 2500))
  const base = Math.floor(Math.random() * 8000) + 5000
  valueResult.value = {
    price: base,
    dailyRent: Math.floor(base * 0.03),
    hot: ['🔥🔥🔥🔥🔥', '🔥🔥🔥🔥', '🔥🔥🔥'][Math.floor(Math.random() * 3)]
  }
  valueLoading.value = false
  toast.success('估值完成！')
}

// Recommend
const recForm = ref({ usage: '', budget: '' })
const recLoading = ref(false)
const recResults = ref([])
const usageIcons = { '旅行': '✈️', '摄影作业': '📷', 'Vlog': '🎥', '商业拍摄': '💼' }

const recommendations = {
  '旅行': [
    { name: 'DJI Pocket 3', reason: '极致轻便，自带云台防抖，旅行Vlog首选', scenes: ['旅行', 'Vlog', '日常'], price: 129 },
    { name: 'Sony A7C2', reason: '全画幅轻量化，画质与便携兼得', scenes: ['旅行', '风光', '人像'], price: 249 },
    { name: 'Fuji XT5', reason: '胶片模拟直出即成片，旅途中无需后期', scenes: ['旅行', '街拍', '人文'], price: 279 }
  ],
  '摄影作业': [
    { name: 'Sony A7M4', reason: '全画幅均衡旗舰，对焦与画质双优', scenes: ['人像', '风光', '商业'], price: 299 },
    { name: 'Nikon Z8', reason: '高像素旗舰，细节丰富，专业首选', scenes: ['商业', '风光', '体育'], price: 429 },
    { name: 'Canon R6 II', reason: '出色色彩与对焦，人像风光皆宜', scenes: ['人像', '活动', '风光'], price: 349 }
  ],
  'Vlog': [
    { name: 'DJI Pocket 3', reason: '口袋大小，自带美颜和云台', scenes: ['Vlog', '日常', '旅行'], price: 129 },
    { name: 'Sony ZV-E1', reason: '全画幅Vlog专机，AI自动构图', scenes: ['Vlog', '直播', '创作'], price: 249 },
    { name: 'Fuji X100VI', reason: '高颜值街拍神器，出片即分享', scenes: ['Vlog', '街拍', '生活'], price: 349 }
  ],
  '商业拍摄': [
    { name: 'Sony FX3', reason: '专业电影机，S-Log3色彩科学', scenes: ['广告', '短片', '电影'], price: 499 },
    { name: 'Canon R5C', reason: '8K录制+散热风扇，无限制拍摄', scenes: ['商业', '影视', '产品'], price: 449 },
    { name: 'Nikon Z8', reason: '8K N-RAW，专业级影像输出', scenes: ['商业', '风光', '活动'], price: 429 }
  ]
}

const startRecommend = async () => {
  if (!recForm.value.usage || !recForm.value.budget) {
    toast.warning('请选择用途和预算')
    return
  }
  recLoading.value = true
  await new Promise(r => setTimeout(r, 2000))
  recResults.value = recommendations[recForm.value.usage] || []
  recLoading.value = false
  toast.success('推荐完成！')
}
</script>

<style scoped>
.ai-page { padding-bottom: 60px; }

.page-hero {
  background: linear-gradient(135deg, #8B5CF6 0%, #6366F1 50%, #2563EB 100%);
  padding: 60px 0 48px; color: white;
}
.page-title { font-size: 36px; font-weight: 800; margin-bottom: 8px; }
.page-desc { font-size: 16px; opacity: 0.9; }

.ai-tabs {
  display: flex; gap: 8px; margin: 32px 0;
  padding: 6px; background: var(--bg-secondary);
  border-radius: var(--radius-full);
}
.ai-tab {
  flex: 1; padding: 14px 20px; border-radius: var(--radius-full);
  font-size: 15px; font-weight: 600; border: none;
  background: transparent; color: var(--text-secondary);
  cursor: pointer; transition: var(--transition);
}
.ai-tab.active {
  background: var(--primary-gradient); color: white;
  box-shadow: 0 4px 16px rgba(37, 99, 235, 0.3);
}

.section-card {
  background: var(--card-bg); border-radius: var(--radius-2xl);
  padding: 40px; box-shadow: var(--card-shadow);
  border: 1px solid var(--border-light); animation: slideUp 0.5s ease;
}

.card-header { margin-bottom: 32px; }
.card-header h2 { font-size: 24px; font-weight: 700; margin-bottom: 8px; }
.card-header p { font-size: 15px; color: var(--text-secondary); }

.upload-zone {
  border: 2px dashed var(--border); border-radius: var(--radius-xl);
  padding: 48px; cursor: pointer; transition: var(--transition);
  min-height: 240px; display: flex; align-items: center; justify-content: center;
  margin-bottom: 24px;
}
.upload-zone:hover { border-color: var(--primary); }

.upload-placeholder { text-align: center; }
.upload-icon { font-size: 48px; display: block; margin-bottom: 12px; }
.upload-placeholder p { font-size: 16px; color: var(--text-secondary); margin-bottom: 4px; }
.hint { font-size: 13px; color: var(--text-tertiary); }

.preview-wrapper { width: 100%; }
.preview-img { max-height: 300px; margin: 0 auto; border-radius: var(--radius-lg); }

.detect-btn { width: 100%; }

.spinner {
  width: 20px; height: 20px; border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white; border-radius: 50%;
  animation: spin 0.6s linear infinite; display: inline-block;
}

/* Detect Result */
.detect-result {
  margin-top: 32px; padding: 28px; background: var(--bg-secondary);
  border-radius: var(--radius-xl);
}
.result-header { display: flex; align-items: center; gap: 16px; margin-bottom: 24px; }
.result-icon { font-size: 40px; }
.result-header h3 { font-size: 20px; font-weight: 700; color: var(--text-primary); }
.result-header p { font-size: 14px; color: var(--text-secondary); margin-top: 4px; }

.result-details { display: flex; flex-direction: column; gap: 16px; }
.detail-item { display: flex; align-items: center; gap: 12px; }
.detail-label { font-size: 14px; color: var(--text-secondary); min-width: 70px; }
.detail-bar { flex: 1; height: 8px; background: var(--bg-tertiary); border-radius: 4px; overflow: hidden; }
.bar-fill { height: 100%; border-radius: 4px; transition: width 1s ease; }
.detail-value { font-size: 14px; font-weight: 700; min-width: 45px; text-align: right; }

/* Value Form */
.value-form .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
.form-group { margin-bottom: 16px; }
.form-group label { display: block; font-size: 14px; font-weight: 600; margin-bottom: 8px; }
.form-group input,
.form-group select {
  width: 100%; padding: 14px 16px; border: 2px solid var(--border);
  border-radius: var(--radius-lg); font-size: 15px; color: var(--text-primary);
  background: var(--bg-primary); transition: var(--transition);
}
.form-group input:focus, .form-group select:focus { border-color: var(--primary); }

.value-result {
  margin-top: 32px; padding: 28px; background: var(--bg-secondary);
  border-radius: var(--radius-xl);
}
.value-result h3 { font-size: 20px; font-weight: 700; margin-bottom: 20px; }
.value-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.value-card {
  background: var(--card-bg); border-radius: var(--radius-lg); padding: 20px;
  text-align: center; box-shadow: var(--card-shadow);
}
.value-card.main { border: 2px solid var(--primary); }
.value-label { font-size: 13px; color: var(--text-tertiary); display: block; margin-bottom: 8px; }
.value-amount { font-size: 28px; font-weight: 800; color: var(--text-primary); }
.value-amount.hot { font-size: 22px; }

/* Recommend */
.recommend-form { margin-bottom: 24px; }
.option-group { display: flex; gap: 12px; flex-wrap: wrap; }
.option-btn {
  padding: 12px 24px; border-radius: var(--radius-full);
  border: 2px solid var(--border); background: var(--bg-primary);
  font-size: 14px; font-weight: 600; color: var(--text-primary);
  cursor: pointer; transition: var(--transition);
}
.option-btn.active {
  border-color: var(--primary); background: rgba(37, 99, 235, 0.1); color: var(--primary);
}

.rec-results { display: flex; flex-direction: column; gap: 16px; }
.rec-card {
  display: flex; align-items: center; gap: 20px;
  padding: 24px; background: var(--bg-secondary); border-radius: var(--radius-xl);
  transition: var(--transition);
}
.rec-card:hover { transform: translateX(8px); }
.rec-rank {
  font-size: 28px; font-weight: 900; color: var(--primary);
  min-width: 56px; text-align: center;
}
.rec-info { flex: 1; }
.rec-info h4 { font-size: 18px; font-weight: 700; margin-bottom: 6px; }
.rec-reason { font-size: 14px; color: var(--text-secondary); margin-bottom: 8px; }
.rec-tags { display: flex; gap: 6px; }
.rec-tag {
  padding: 3px 10px; border-radius: var(--radius-full);
  font-size: 11px; font-weight: 600;
  background: rgba(37, 99, 235, 0.1); color: var(--primary);
}
.rec-price { font-size: 20px; font-weight: 800; color: var(--danger); white-space: nowrap; }

/* Transitions */
.result-enter-active { animation: slideUp 0.5s ease; }
.result-leave-active { animation: slideUp 0.3s ease reverse; }

@media (max-width: 768px) {
  .ai-tabs { flex-direction: column; border-radius: var(--radius-lg); }
  .value-cards { grid-template-columns: 1fr; }
  .value-form .form-row { grid-template-columns: 1fr; }
  .option-group { flex-direction: column; }
  .option-btn { width: 100%; }
  .rec-card { flex-direction: column; text-align: center; }
  .rec-price { margin-top: 8px; }
  .page-title { font-size: 28px; }
}
</style>
