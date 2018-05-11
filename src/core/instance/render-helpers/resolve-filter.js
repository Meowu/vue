/* @flow */

import { identity, resolveAsset } from 'core/util/index'

/**
 * Runtime helper for resolving filters
 */
export function resolveFilter (id: string): Function {
  // 找不到 filter 时尝试从原型链中查找。
  return resolveAsset(this.$options, 'filters', id, true) || identity
}
