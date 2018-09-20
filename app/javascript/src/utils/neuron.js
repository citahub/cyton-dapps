// with native
import platforminfo from './platform'
// const startNativePage = (event) => {
//   try {
//     touchSearchbar()
//   } catch (err) {
//     log(err)
//   }
//   try {
//     appHybrid.startAddWebsitePage()
//   } catch (err) {
//     log(err)
//   }
//   event.stopPropagation()
// }

const initAndroidApi = () => {
  const table = {
    openSearchPage: appHybrid.startAddWebsitePage,
  }
  return table
}

const initIosApi = () => {
  const table = {
    openSearchPage: touchSearchbar,
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
