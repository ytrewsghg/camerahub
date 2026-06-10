<template>
  <div class="publish-page">
    <div class="page-header">
      <div class="container">
        <h1 class="page-title">📦 发布闲置</h1>
        <p class="page-desc">让你的闲置设备找到新主人</p>
      </div>
    </div>
    <div class="container">
      <div class="publish-card">
        <form @submit.prevent="handleSubmit" class="publish-form">
          <div class="form-row">
            <div class="form-group">
              <label>商品名称 <span class="required">*</span></label>
              <input v-model="form.name" type="text" placeholder="例如：Sony A7M4" required />
            </div>
            <div class="form-group">
              <label>品牌 <span class="required">*</span></label>
              <select v-model="form.brand" required>
                <option value="">请选择品牌</option>
                <option v-for="b in brands" :key="b" :value="b">{{ b }}</option>
              </select>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>型号 <span class="required">*</span></label>
              <input v-model="form.model" type="text" placeholder="例如：A7M4" required />
            </div>
            <div class="form-group">
              <label>成色 <span class="required">*</span></label>
              <select v-model="form.condition" required>
                <option value="">请选择成色</option>
                <option value="全新">全新</option>
                <option value="95新">95新</option>
                <option value="9成新">9成新</option>
                <option value="8成新">8成新</option>
                <option value="7成新">7成新</option>
              </select>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>使用年限</label>
              <input v-model="form.useYears" type="number" min="0" max="20" placeholder="0" />
            </div>
            <div class="form-group">
              <label>售价（元）<span class="required">*</span></label>
              <input v-model="form.price" type="number" min="1" placeholder="请输入售价" required />
            </div>
          </div>
          <div class="form-group full">
            <label>商品描述 <span class="required">*</span></label>
            <textarea v-model="form.description" placeholder="详细描述商品状况、配件、使用情况等..." rows="5" required></textarea>
          </div>
          <div class="form-group full">
            <label>上传图片</label>
            <div class="upload-area" @click="triggerUpload" @dragover.prevent @drop.prevent="handleDrop">
              <input type="file" ref="fileInput" accept="image/*" multiple style="display: none" @change="handleFiles" />
              <div class="upload-placeholder" v-if="!form.images.length">
                <span class="upload-icon">📷</span>
                <p>点击或拖拽上传图片</p>
                <span class="upload-hint">支持 JPG、PNG 格式，最多5张</span>
              </div>
              <div class="upload-preview" v-else>
                <div class="preview-item" v-for="(img, i) in form.images" :key="i">
                  <img :src="img" />
                  <button type="button" class="remove-img" @click.stop="form.images.splice(i, 1)">✕</button>
                </div>
                <div class="preview-item add-more" v-if="form.images.length < 5" @click.stop="triggerUpload">
                  <span>+</span>
                </div>
              </div>
            </div>
          </div>
          <button type="submit" class="btn btn-primary btn-lg publish-btn" :disabled="isSubmitting">
            <span v-if="isSubmitting" class="spinner"></span>
            {{ isSubmitting ? '发布中...' : '🚀 立即发布' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from '../utils/toast.js'

const router = useRouter()
const toast = useToast()

const brands = ['Sony', 'Canon', 'Nikon', 'Fuji', 'DJI', 'Panasonic', 'Leica', 'Hasselblad', '其他']
const form = ref({ name: '', brand: '', model: '', condition: '', useYears: '', price: '', description: '', images: [] })
const isSubmitting = ref(false)
const fileInput = ref(null)

const triggerUpload = () => fileInput.value?.click()

const handleFiles = (e) => {
  const files = Array.from(e.target.files || [])
  files.forEach(file => {
    if (form.value.images.length >= 5) return
    const reader = new FileReader()
    reader.onload = (ev) => { form.value.images.push(ev.target.result) }
    reader.readAsDataURL(file)
  })
}

const handleDrop = (e) => {
  const files = Array.from(e.dataTransfer.files || [])
  files.forEach(file => {
    if (form.value.images.length >= 5) return
    const reader = new FileReader()
    reader.onload = (ev) => { form.value.images.push(ev.target.result) }
    reader.readAsDataURL(file)
  })
}

const handleSubmit = async () => {
  if (!form.value.name || !form.value.brand || !form.value.model || !form.value.condition || !form.value.price || !form.value.description) {
    toast.warning('请填写所有必填项')
    return
  }
  isSubmitting.value = true
  await new Promise(r => setTimeout(r, 1500))
  isSubmitting.value = false
  toast.success('发布成功！你的闲置已上架')
  router.push('/secondhand')
}
</script>

<style scoped>
.publish-page { padding-bottom: 60px; }

.page-header {
  background: linear-gradient(135deg, #22C55E 0%, #16A34A 100%);
  padding: 60px 0 48px; color: white;
}
.page-title { font-size: 36px; font-weight: 800; margin-bottom: 8px; }
.page-desc { font-size: 16px; opacity: 0.9; }

.publish-card {
  background: var(--card-bg); border-radius: var(--radius-2xl);
  padding: 48px; margin-top: 32px; box-shadow: var(--card-shadow);
  border: 1px solid var(--border-light);
  animation: slideUp 0.5s ease;
}

.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }

.form-group { margin-bottom: 20px; }
.form-group.full { grid-column: 1 / -1; }

.form-group label {
  display: block; font-size: 14px; font-weight: 600;
  color: var(--text-primary); margin-bottom: 8px;
}

.required { color: var(--danger); }

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%; padding: 14px 16px; border: 2px solid var(--border);
  border-radius: var(--radius-lg); font-size: 15px; color: var(--text-primary);
  background: var(--bg-primary); transition: var(--transition);
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: var(--primary); box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
}

.form-group textarea { resize: vertical; min-height: 120px; }

.upload-area {
  border: 2px dashed var(--border); border-radius: var(--radius-xl);
  padding: 32px; cursor: pointer; transition: var(--transition);
  min-height: 180px; display: flex; align-items: center; justify-content: center;
}

.upload-area:hover { border-color: var(--primary); background: rgba(37, 99, 235, 0.02); }

.upload-placeholder { text-align: center; color: var(--text-tertiary); }
.upload-icon { font-size: 40px; display: block; margin-bottom: 12px; }
.upload-placeholder p { font-size: 15px; color: var(--text-secondary); margin-bottom: 4px; }
.upload-hint { font-size: 12px; }

.upload-preview { display: flex; gap: 12px; flex-wrap: wrap; }
.preview-item {
  position: relative; width: 100px; height: 100px;
  border-radius: var(--radius-md); overflow: hidden;
}
.preview-item img { width: 100%; height: 100%; object-fit: cover; }
.remove-img {
  position: absolute; top: 4px; right: 4px; width: 22px; height: 22px;
  border-radius: 50%; background: var(--danger); color: white;
  border: none; font-size: 11px; cursor: pointer; display: flex;
  align-items: center; justify-content: center;
}
.add-more {
  border: 2px dashed var(--border); display: flex; align-items: center;
  justify-content: center; font-size: 28px; color: var(--text-tertiary); cursor: pointer;
}

.publish-btn { width: 100%; margin-top: 12px; }

.spinner {
  width: 20px; height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white; border-radius: 50%;
  animation: spin 0.6s linear infinite; display: inline-block;
}

@media (max-width: 768px) {
  .form-row { grid-template-columns: 1fr; }
  .publish-card { padding: 24px; }
  .page-title { font-size: 28px; }
}
</style>
