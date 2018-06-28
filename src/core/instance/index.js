import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)  // initMixin()
}

initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)  // 初始化实例的事件处理方法： $emit, $off, $once, $on 。
lifecycleMixin(Vue)
renderMixin(Vue)

export default Vue
