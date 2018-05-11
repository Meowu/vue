/* @flow */

import { warn, extend, isPlainObject } from 'core/util/index'

export function bindObjectListeners (data: any, value: any): VNodeData {
  if (value) {
    if (!isPlainObject(value)) {
      process.env.NODE_ENV !== 'production' && warn(
        'v-on without argument expects an Object value',
        this
      )
    } else {
      const on = data.on = data.on ? extend({}, data.on) : {}
      for (const key in value) {
        const existing = on[key]
        const ours = value[key]
        on[key] = existing ? [].concat(ours, existing) : ours // 如果已经为该事件绑定一个值，则将其值和新值合并为数组，不然就绑定新值。也就是一个监听事件可以为其绑定多个函数。
      }
    }
  }
  return data
}
