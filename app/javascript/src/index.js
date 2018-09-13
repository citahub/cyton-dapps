import { _es, bind, localStoreStore, log } from './utils'
// import { initGlobalTable, GlobalTable } from './global'
// import { renderMinePage } from './utils/templateDapps'
// import { initApi } from './dappsApi'
// import { bindEvents } from './events'
import './imgs/index'
import './stylesheets'
// import j from 'jquery'
import pagehome from './pages/home'
// import pagemore from './pages/more'

const test = () => {
  const img = 'http://p1.music.126.net/sr9yP4Kt4xxYap5T7CbMqQ==/109951162955032377.jpg?param=180y180'
  const name = 'Yuki'
  const url = 'http://p1.music.126.net/sr9yP4Kt4xxYap5T7CbMqQ==/109951162955032377.jpg?param=180y180'
  const info = {
    img,
    name,
    url,
  }
  let i = 0
  window.testinfo = () => {
    return {
      icon: img,
      name,
      entry: i++,
    }
  }
  const length = 10
  let l = []
  for (let i = 0; i < length; i++) {
    l.push(info)
  }
  localStoreStore('__viewInfoList_mydapps', l)
  localStoreStore('__viewInfoList_myhistory', l)
}

// const setFirstActive = (elementList, classActive) => {
//   const clsa = classActive
//   const path = location.pathname
//   const l = elementList
//   const len = l.length
//   for (let i = 0; i < len; i++) {
//     const e = l[i]
//     if (e.dataset.link === path) {
//       e.className = clsa
//       return
//     }
//   }
// }

// const setActiveNav = () => {
//   const { header } = GlobalTable.elementTable
//   const l = _es('.headerNavItem', header)
//   const clsa = 'headerNavItem active'
//   setFirstActive(l, clsa)
// }

// const renderMydappsPage = () => {
//   if (location.pathname === '/dapps/mine') {
//     const dapps = localStoreParsed('__viewInfoList_mydapps')
//     renderMydapps(dapps)
//   }
// }

const init = () => {
  // initGlobalTable()
  // initApi()
  // // test()
  // setActiveNav()
  // renderMinePage()
  // bindEvents()
  pagehome()
  pagemore()
}

const main = () => {
  bind(document, 'DOMContentLoaded', init)
}

main()
