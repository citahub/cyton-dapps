import platforminfo from './platform'
import { log } from './index'

const initAndroidApi = function() {
  const openSearchPage = () => window.appHybrid.startAddWebsitePage()
  function setTitlebar(json) {
    setTimeout(() => {
      window.webTitleBar.getTitleBar(json)
    }, 0)
    console.log(json)
  }
  // const setTitlebar = (json) => {}
  const table = {
    openSearchPage,
    setTitlebar,
  }
  return table
}

const initIosApi = function() {
  const openSearchPage = () => window.touchSearchbar()
  const setTitlebar = function(json) {
    window.webkit.messageHandlers.getTitleBar.postMessage({ body: json })
  }
  const table = {
    openSearchPage,
    setTitlebar,
  }
  return table
}

const initWebApi = () => {
  const funcnames = ['openSearchPage', 'setTitlebar']
  const table = {}
  funcnames.forEach((name) => {
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

// export default initNeuronTable()

// trycatch way
const warnPlatformError = () => console.warn('Not in Neuron')

const openSearchPage = function() {
  try {
    window.appHybrid.startAddWebsitePage()
  } catch (error) {
    try {
      window.touchSearchbar()
    } catch (error) {
      warnPlatformError()
    }
  }
}

const setTitlebar = function(json) {
  try {
    window.webTitleBar.getTitleBar(json)
  } catch (error) {
    try {
      window.webkit.messageHandlers.getTitleBar.postMessage({ body: json })
    } catch (error) {
      warnPlatformError()
    }
  }
}

const openCollection = function() {
  try {
    android()
  } catch (error) {
    try {
      clickMyCollection()
    } catch (error) {
      warnPlatformError()
    }
  }
}

const openMyDapp = function() {
  try {
    android()
  } catch (error) {
    try {
      clickMyDApp()
    } catch (error) {
      warnPlatformError()
    }
  }
}

const methods = {
  openSearchPage,
  setTitlebar,
  openCollection,
  openMyDapp,
}

export default methods
