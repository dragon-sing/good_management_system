import { Message, MessageBox, Notification } from 'element-ui'

const layer = {
  // 消息提示层
  msg(message, { duration, type = '', onClose } = {}) {
    if (!duration && (type === 'error' || type === 'warning')) duration = 6000
    else if (!duration) {
      duration = 3000
    }
    return Message({
      message,
      showClose: true,
      dangerouslyUseHTMLString: true,
      duration,
      type,
      onClose
    })
  },

  // 通知
  notify(
    message,
    { title = '提示', duration = 4500, type = '', onClose, onClick } = {}
  ) {
    return Notification({
      title,
      duration,
      message,
      type,
      dangerouslyUseHTMLString: true,
      onClose,
      onClick
    })
  },

  // 确认框
  confirm(
    msg,
    { title = '温馨提示', type = 'warning', confirmButtonText = '确定', cancelButtonText = '取消' } = {}
  ) {
    return new Promise((resolve, reject) => {
      MessageBox.confirm(msg, {
        confirmButtonText,
        cancelButtonText,
        title,
        type,
        dangerouslyUseHTMLString: true
      })
        .then(() => resolve())
        .catch(() => reject())
    })
  },

  // 警告框
  alert(msg, { title = '提示' } = {}) {
    MessageBox.alert(msg, {
      title,
      closeOnClickModal: true,
      dangerouslyUseHTMLString: true
    })
      .then(() => {})
      .catch(() => {})
  },

  // 确认输入框
  prompt(title = '输入信息', { inputType = 'textarea', inputValue = '', words = 500, inputPlaceholder, required = false, requiredMsg = '' } = {}) {
    return new Promise((resolve, reject) => {
      MessageBox.prompt('', {
        title,
        inputType,
        inputValue, // 输入框初始文本
        inputPlaceholder: inputPlaceholder || '字数不得超过' + words,
        inputValidator(val) {
          if (required && !val.trim()) return requiredMsg

          const ispass = new RegExp('^.{0,' + words + '}$').test(val)
          const msg = ispass ? true : '字数不得超过' + words
          return msg
        }
      })
        .then(res => {
          const val = res.value == null ? '' : res.value
          resolve(val.trim())
        })
        .catch(cancel => {
          reject(cancel)
        })
    })
  }
}

export default layer
