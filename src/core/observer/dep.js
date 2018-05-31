/* @flow */

import type Watcher from './watcher'
import { remove } from '../util/index'  // 从数组中移除一个元素。

let uid = 0

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
// __ob__ 对象有该属性，调用 notify 方法订阅更新。
export default class Dep {
  static target: ?Watcher;
  id: number;
  subs: Array<Watcher>;

  constructor () {
    this.id = uid++
    this.subs = []
  }

  addSub (sub: Watcher) {
    this.subs.push(sub)
  }

  removeSub (sub: Watcher) {
    remove(this.subs, sub)
  }

  depend () {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }

  notify () {
    // stabilize the subscriber list first
    const subs = this.subs.slice()
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update()
    }
  }
}

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null  // 静态属性, 当前 Dep 的目标 watcher 应该是唯一的。
const targetStack = []

export function pushTarget (_target: Watcher) {
  if (Dep.target) targetStack.push(Dep.target)
  Dep.target = _target
}

// 弹出当前被观察的对象。
export function popTarget () {
  Dep.target = targetStack.pop()
}
