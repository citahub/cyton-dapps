import platforminfo from './platform'

const initAndroidApi = () => {
  const openSearchPage = () => window.appHybrid.startAddWebsitePage()
  const setTitlebar = function(json) {
    console.log(json)
    try {
      window.webTitleBar.getTitleBar(json)
    } catch (error) {
      console.log(error)
    }
  }
  // const setTitlebar = (json) => {}
  const table = {
    openSearchPage,
    setTitlebar,
  }
  return table
}

const initIosApi = () => {
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
