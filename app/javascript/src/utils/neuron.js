import platforminfo from './platform'
import { log } from './index'

const initAndroidApi = function() {
  // 不知道为什么要加 try catch 或 settimeout,
  // 尽量不使用箭头函数, 还是不知道为什么
  // 但如果不加, java 就会报错...
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
  const setTitlebar = (json) => {}
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

export default initNeuronTable()
