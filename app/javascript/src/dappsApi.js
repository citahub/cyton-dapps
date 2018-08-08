import { localStoreParsed, localStoreStore } from './utils.js'

const dappsLoaded = (key) => {
  let dapps = localStoreParsed(key)
  if (!Array.isArray(dapps)) {
    dapps = []
  }
  return dapps
}

const dappsSave = (dapps, key) => {
  localStoreStore(key, dapps)
}

const dappsAdd = (dapp, key) => {
  const { entry, icon, name } = dapp
  const o = {
    img: icon,
    url: entry,
    name: name,
  }
  const dapps = dappsLoaded(key)
  const len = dapps.length
  for (let i = 0; i < len; i++) {
    const obj = dapps[i]
    if (o.url === obj.url) {
      return
    }
  }
  dapps.push(o)
  dappsSave(dapps, key)
}

const dappsRemove = (url, key) => {
  const dapps = dappsLoaded(key)
  const len = dapps.length
  for (let i = 0; i < len; i++) {
    const obj = dapps[i]
    if (url === obj.url) {
      dapps.splice(i, 1)
      dappsSave(dapps, key)
      return
    }
  }
}

// 提供给外部的接口
const initApi = () => {
  if (window.__mydapp === undefined) {
    const key = '__viewInfoList_mydapps'
    window.__mydapp = {
      remove: (dapp) => dappsRemove(dapp, key),
      add: (dapp) => dappsAdd(dapp, key),
    }
    Object.freeze(window.__mydapp)
  }

  if (window.__myhistory === undefined) {
    const key = '__viewInfoList_myhistory'
    window.__myhistory = {
      add: (dapp) => dappsAdd(dapp, key),
    }
    Object.freeze(window.__mydapp)
  }
}

export { initApi }
