import platforminfo from './platform'
import { log } from './index'

const initAndroidApi = function() {
  const openSearchPage = function() {
    window.appHybrid.startAddWebsitePage()
  }

  const setTitlebar = function(json) {
    window.webTitleBar.getTitleBar(json)
  }

  const openMyDapp = function () {
    window.appHybrid.toWebCollection()
  }

  const openCollection = function() {
    window.appHybrid.toErc721()
  }

  const table = {
    openSearchPage,
    setTitlebar,
    openMyDapp,
    openCollection,
  }
  return table
}

const initIosApi = function() {
  const openSearchPage = function() {
    window.touchSearchbar()
  }

  const setTitlebar = function(json) {
    window.webkit.messageHandlers.getTitleBar.postMessage({ body: json })
  }

  const openMyDapp = function() {
    clickMyDApp()
  }

  const openCollection = function() {
    clickMyCollection()
  }

  const table = {
    openSearchPage,
    setTitlebar,
    openMyDapp,
    openCollection,
  }
  return table
}

const initWebApi = () => {
  const funcNames = ['openSearchPage', 'setTitlebar', 'openMyDapp', 'openCollection']
  const table = {}
  funcNames.forEach((name) => {
    table[name] = () => console.warn('no method:', name)
  })
  return table
}

const initNeuronTable = () => {
  let { platform, notNeuron } = platforminfo
  if (notNeuron) {
    platform = null
  }
  const initTable = {
    android: initAndroidApi,
    ios: initIosApi,
    [null]: initWebApi,
  }
  const methods = initTable[platform]()
  return methods
}

export default initNeuronTable()
