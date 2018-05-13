/* @flow */

import { toArray } from '../util/index'

export function initUse (Vue: GlobalAPI) {
  Vue.use = function (plugin: Function | Object) {
    const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
    if (installedPlugins.indexOf(plugin) > -1) { // 检查记录的插件数组，避免重复注册插件。
      return this
    }

    // additional parameters
    const args = toArray(arguments, 1)  // 注册插件时传入的参数。
    args.unshift(this)  // install function 的第一个参数是 Vue 
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args)
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args)
    }
    installedPlugins.push(plugin)
    return this
  }
}
