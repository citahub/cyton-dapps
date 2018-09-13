import { log, localStoreParsed, localStoreStore } from '.'
import { GlobalTable } from '../temp/global'

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

const dappsAdd = (dapp, { local, method = 'unshift', maxlength }) => {
  const { entry, icon, name } = dapp
  const o = {
    img: icon,
    url: entry,
    name: name,
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

const dappsRemove = (url, {local}) => {
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
  const table = GlobalTable.renderkeyTable
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
    Object.freeze(window.__mydapp)
  }
}

export { initApi, dappsLoaded }
