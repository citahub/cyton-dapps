import platforminfo from './platform'

const initAndroidApi = () => {
  const openSearchPage = () => window.appHybrid.startAddWebsitePage()
  const table = {
    openSearchPage,
  }
  return table
}

const initIosApi = () => {
  const openSearchPage = () => window.touchSearchbar()
  const table = {
    openSearchPage,
  }
  return table
}

const initWebApi = () => {
  const funcnames = ['openSearchPage']
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
  return initTable[platform]()
}

export default initNeuronTable()
