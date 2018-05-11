/* @flow */

import config from '../config'
import { ASSET_TYPES } from 'shared/constants'
import { warn, isPlainObject } from '../util/index'

export function initAssetRegisters (Vue: GlobalAPI) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(type => {
    Vue[type] = function (   // 注册全局（组件|指令|过滤器）方法， Vue.component(id, Fn | Obj)
      id: string,
      definition: Function | Object
    ): Function | Object | void {
      if (!definition) {
        return this.options[type + 's'][id]  // 没有传入定义方法则获取对应的类型。
      } else {
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production') {
          if (type === 'component' && config.isReservedTag(id)) {  // 不能用 vue 保留字作组件名。
            warn(
              'Do not use built-in or reserved HTML elements as component ' +
              'id: ' + id
            )
          }
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id  // 注册组件时如果不提供 name 则用 id 作为组件名。
          definition = this.options._base.extend(definition)
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition }  // 使用函数定义指令时，默认在 bind 和 update 时调用该函数以触发相同的行为。
        }
        this.options[type + 's'][id] = definition
        return definition  // 总是返回构造器。
      }
    }
  })
}
