export function getUser() {
  return JSON.parse(localStorage.getItem('camerahub_user') || 'null')
}

export function setUser(user) {
  localStorage.setItem('camerahub_user', JSON.stringify(user))
}

export function removeUser() {
  localStorage.removeItem('camerahub_user')
}

export function isLoggedIn() {
  return !!getUser()
}

export function login(username, password) {
  const mockUsers = [
    { id: 1, username: '摄影师小王', phone: '13800000001', email: 'wang@camerahub.com', password: '123456', avatar: '👤', role: 'user' },
    { id: 10, username: '管理员', phone: '13800000000', email: 'admin@camerahub.com', password: 'admin123', avatar: '🛡️', role: 'admin' }
  ]
  const storedUsers = JSON.parse(localStorage.getItem('camerahub_users') || '[]')
  const allUsers = [...mockUsers, ...storedUsers]
  const user = allUsers.find(u => (u.username === username || u.phone === username || u.email === username) && u.password === password)
  if (user) {
    const userData = { id: user.id, username: user.username, avatar: user.avatar, role: user.role, phone: user.phone || '', email: user.email || '' }
    setUser(userData)
    return { success: true, user: userData }
  }
  return { success: false, message: '用户名或密码错误' }
}

export function register(data) {
  const users = JSON.parse(localStorage.getItem('camerahub_users') || '[]')
  const newUser = {
    id: Date.now(),
    ...data,
    avatar: '👤',
    role: 'user'
  }
  users.push(newUser)
  localStorage.setItem('camerahub_users', JSON.stringify(users))
  return { success: true, user: newUser }
}

export function socialLogin(platform) {
  const user = {
    id: Date.now(),
    username: platform + '用户',
    avatar: platform === 'QQ' ? '🐧' : '💚',
    role: 'user',
    phone: '',
    email: ''
  }
  setUser(user)
  return { success: true, user }
}
