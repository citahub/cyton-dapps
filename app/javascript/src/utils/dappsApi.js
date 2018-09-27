import { log, localStoreParsed, localStoreStore } from '.'
// import { _e, _es } from './utils'
import test from 'src/imgs/icon/test.svg'
import foot from 'src/imgs/icon/foot.svg'

const renderkeyTable = {
  mydapps: {
    local: '__viewInfoList_mydapps',
    title: '我的收藏',
    icon: test,
  },
  myhistory: {
    local: '__viewInfoList_myhistory',
    title: '我的足迹',
    icon: foot,
    maxlength: 20,
  },
}

const dappsLoaded = (local) => {
  let dapps
  try {
    dapps = localStoreParsed(local)
    if (!Array.isArray(dapps)) {
      throw 'init dapps'
    }
  } catch (error) {
    console.log(error)
    dapps = []
  }
  return dapps
}

const dappsSave = (dapps, local) => {
  localStoreStore(local, dapps)
}

const dappsAdd = ({ entry, icon, name, timestamp }, { local, method = 'unshift', maxlength }) => {
  const o = {
    img: icon,
    url: entry,
    name: name,
    time: timestamp,
  }
  const dapps = dappsLoaded(local)
  const len = dapps.length
  for (let i = 0; i < len; i++) {
    const obj = dapps[i]
    if (o.url === obj.url) {
      return
    }
  }
  if (method === 'unshift') {
    dapps.unshift(o)
  } else {
    dapps.push(o)
  }
  if (maxlength && maxlength < len) {
    dapps.splice(maxlength, len)
  }
  dappsSave(dapps, local)
}

const dappsRemove = (url, { local }) => {
  const dapps = dappsLoaded(local)
  const len = dapps.length
  for (let i = 0; i < len; i++) {
    const obj = dapps[i]
    if (url === obj.url) {
      dapps.splice(i, 1)
      dappsSave(dapps, local)
      return
    }
  }
}

// 提供给外部的接口
const initApi = () => {
  const table = renderkeyTable
  if (window.__mydapp === undefined) {
    const info = table.mydapps
    const remove = (url) => dappsRemove(url, info)
    const add = (dapp) => dappsAdd(dapp, info)
    window.__mydapp = {
      remove,
      add,
    }
    Object.freeze(window.__mydapp)
  }

  if (window.__myhistory === undefined) {
    const info = table.myhistory
    const add = (dapp) => {
      dappsAdd(dapp, info)
    }
    window.__myhistory = {
      add,
    }
    Object.freeze(window.__myhistory)
  }
}

export { initApi, dappsLoaded }
