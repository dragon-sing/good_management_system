import { login, logout, updatePassword, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  username: '',
  avatar: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, username) => {
    state.username = username
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // username login
  async login({ commit }, usernameInfo) {
    const { username, password } = usernameInfo
    const { data } = await login({ username: username.trim(), password: password })
    console.log(data)
    commit('SET_TOKEN', data.token)
    setToken(data.token)
  },

  async updatePassword({ commit }, updateForm) {
    const { data } = await updatePassword(updateForm)
    console.log(data)
  },

  // get username info
  async getInfo({ commit }) {
    const { data } = await getInfo()
    if (!data) {
      throw new Error('Verification failed, please Login again.')
    }
    const { roles, username } = data
    if (!roles || roles.length <= 0) {
      throw new Error('getInfo: roles must be a non-null array!')
    }
    commit('SET_ROLES', roles)
    commit('SET_NAME', username)
    commit('SET_AVATAR', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif')
    return await Promise.resolve(data)
  },

  // username logout
  async logout({ commit, state, dispatch }) {
    await logout(state.token)
    commit('SET_TOKEN', '')
    commit('SET_ROLES', [])
    removeToken()
    resetRouter()

    // reset visited views and cached views
    // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
    dispatch('tagsView/delAllViews', null, { root: true })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'
    commit('SET_TOKEN', token)
    setToken(token)
    const { roles } = await dispatch('getInfo')
    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
