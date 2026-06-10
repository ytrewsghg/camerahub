import { ref } from 'vue'

const toasts = ref([])
let toastId = 0

export function useToast() {
  const show = (message, type = 'info', duration = 3000) => {
    const id = ++toastId
    toasts.value.push({ id, message, type, show: true })
    setTimeout(() => {
      const idx = toasts.value.findIndex(t => t.id === id)
      if (idx > -1) {
        toasts.value[idx].show = false
        setTimeout(() => {
          toasts.value.splice(toasts.value.findIndex(t => t.id === id), 1)
        }, 300)
      }
    }, duration)
  }

  const success = (msg) => show(msg, 'success')
  const error = (msg) => show(msg, 'error')
  const warning = (msg) => show(msg, 'warning')
  const info = (msg) => show(msg, 'info')

  return { toasts, show, success, error, warning, info }
}
