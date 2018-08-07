import { log, _e, _es, bind, setStyle, setStyles, localStoreParsed, localStoreStore } from './utils.js'
import { GlobalTable, initElementTable } from './global'
import { renderMydapps } from './dappsRender'
import { createHeaderAnime } from './headerAnime'
import { initApi } from './apiOuter'
import './imgs/index'
import './stylesheets'

const setFirstActive = (elementList, classActive) => {
  const clsa = classActive
  const path = location.pathname
  const l = elementList
  const len = l.length
  for (let i = 0; i < len; i++) {
    const e = l[i]
    if (e.dataset.link === path) {
      e.className = clsa
      return
    }
  }
}

const setActiveNav = () => {
  const { header } = GlobalTable.elementTable
  const l = _es('.headerNavItem', header)
  const clsa = 'headerNavItem active'
  setFirstActive(l, clsa)
}

// with native
const startNativePage = (event) => {
  try {
    touchSearchbar()
  } catch (err) {
    log(err)
  }
  try {
    appHybrid.startAddWebsitePage()
  } catch (err) {
    log(err)
  }
  event.stopPropagation()
}

const test = () => {
  const img = 'http://p1.music.126.net/sr9yP4Kt4xxYap5T7CbMqQ==/109951162955032377.jpg?param=180y180'
  const name = 'Yuki'
  const url = 'http://p1.music.126.net/sr9yP4Kt4xxYap5T7CbMqQ==/109951162955032377.jpg?param=180y180'
  const info = {
    img,
    name,
    url,
  }
  const length = 100
  let l = []
  for (let i = 0; i < length; i++) {
    l.push(info)
  }
  localStoreStore('__viewInfoList_mydapps', l)
}

const bindEvents = () => {
  const { searchBar, headerAnime2 } = GlobalTable.elementTable
  const earth = _e('.headerSearchIcon', headerAnime2)
  bind(searchBar, 'click', startNativePage)
  bind(earth, 'click', startNativePage)

  const headerAnime = createHeaderAnime()
  bind(window, 'scroll', headerAnime)
}

const renderMydappsPage = () => {
  if (location.pathname === '/dapps/mine') {
    const dapps = localStoreParsed('__viewInfoList_mydapps')
    renderMydapps(dapps)
  }
}

const initDom = () => {
  initElementTable()
  // initStyle()
  test()
  setActiveNav()
  bindEvents()
  renderMydappsPage()
}

const main = () => {
  initApi()
  bind(document, 'DOMContentLoaded', initDom)
}

main()
