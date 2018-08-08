import { localStoreParsed, localStoreStore } from './utils.js'
import { renderMydapps } from './dappsRender'

const mydappSave = (dapps) => {
  renderMydapps(dapps)
  localStoreStore('__viewInfoList_mydapps', dapps)
}

const mydappLoaded = () => {
  let dapps = localStoreParsed('__viewInfoList_mydapps')
  if (!Array.isArray(dapps)) {
    dapps = []
  }
  return dapps
}

// const mydappLoaded = () => {
//   let dapps = localStoreParsed('__viewInfoList_mydapps')
//   if (!Array.isArray(dapps)) {
//     dapps = []
//   }
//   return dapps
// }

const mydappAdd = (dapp) => {
  const { entry, icon, name } = dapp
  const o = {
    img: icon,
    url: entry,
    name: name,
  }
  const dapps = mydappLoaded()
  const len = dapps.length
  for (let i = 0; i < dapps.length; i++) {
    const obj = dapps[i]
    if (o.url === obj.url) {
      return
    }
  }
  dapps.push(o)
  mydappSave(dapps)
}

const myhistoryAdd = (dapp) => {
  const { entry, icon, name } = dapp
  const o = {
    img: icon,
    url: entry,
    name: name,
  }
  const dapps = mydappLoaded()
  const len = dapps.length
  for (let i = 0; i < len; i++) {
    const obj = dapps[i]
    if (o.url === obj.url) {
      return
    }
  }
  dapps.push(o)
  // log('dapp added', dapps)
  mydappSave(dapps)
}

const mydappRemove = (url) => {
  const dapps = mydappLoaded()
  const len = dapps.length
  for (let i = 0; i < len; i++) {
    const obj = dapps[i]
    if (url === obj.url) {
      dapps.splice(i, 1)
      mydappSave(dapps)
      return
    }
  }
}

// 提供给外部的接口
const initApi = () => {
  if (window.__mydapp === undefined) {
    window.__mydapp = {
      remove: mydappRemove,
      add: mydappAdd,
    }
    Object.freeze(window.__mydapp)
  }

  if (window.__myhistory === undefined) {
    window.__myhistory = {
      remove: mydappRemove,
      add: mydappAdd,
    }
    Object.freeze(window.__mydapp)
  }
}

export { initApi }
