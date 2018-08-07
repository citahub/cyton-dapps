import { log, _e, _es, bind, setStyle, setStyles, localStoreParsed, localStoreStore } from './utils.js'
import {
  GlobalTable,
  initElementTable
} from './global'
import createHeaderAnime from './headerAnime'
import './imgs/index'
import './stylesheets/application.scss'
import './stylesheets/header.scss'
import noData from 'src/imgs/noData.png'

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

const tDappListCell = (img, name, url) => {
  const t = `<a class="dappsListItem" href="${url}">
            <div class="dappsListImgContainer">
              <img class="dappsListImg" src=${img} alt="">
            </div>
            <div class="dappsListContent">
              <div class="dappsListName">${name}</div>
              <div class="dappsListUrl" >${url}</div>
            </div>
        </a>`
  return t
}

const tMyDapps = (dappInfoList) => {
  const l = dappInfoList
  const len = l.length
  let t = ''
  for (let i = 0; i < l.length; i++) {
    const info = l[i]
    t += tDappListCell(info.img, info.name, info.url)
  }
  t = `<div class="dappsBlock container">
            ${t}
        </div>`
  // log('tMyDapps template', t, 'input:', JSON.stringify(dappInfoList, ' ', 2))
  return t
}

const tMyDappsDefault = () => {
  const t = `<div class="noData">
                <img class="noDataImg" src="${noData}" alt="">
                <span class="noDataText">无数据显示</span>
              </div>`
  // log('tMyDappsDefault template', t,)
  return t
}

const renderMyDappsContainer = (dapps) => {
  if (location.pathname === '/dapps/mine') {
    const container = GlobalTable.elementTable.dapps
    // log(`renderMyDappsContainer`, 'input:', JSON.stringify(dapps, ' ', 2))
    if (Array.isArray(dapps) && dapps.length > 0) {
      const t = tMyDapps(dapps)
      container.innerHTML = t
    } else {
      container.innerHTML = tMyDappsDefault()
    }
  }
}

const mydappSave = (dapps) => {
  renderMyDappsContainer(dapps)
  localStoreStore('__viewInfoList_mydapps', dapps)
}

const mydappLoaded = () => {
  let dapps = localStoreParsed('__viewInfoList_mydapps')
  if (!Array.isArray(dapps)) {
    dapps = []
  }
  return dapps
}

// const mydappLoaded = () => {
//   let dapps = localStoreParsed('__viewInfoList_mydapps')
//   if (!Array.isArray(dapps)) {
//     dapps = []
//   }
//   return dapps
// }

const mydappAdd = (dapp) => {
  const { entry, icon, name } = dapp
  const o = {
    img: icon,
    url: entry,
    name: name,
  }
  const dapps = mydappLoaded()
  const len = dapps.length
  for (let i = 0; i < dapps.length; i++) {
    const obj = dapps[i]
    if (o.url === obj.url) {
      return
    }
  }
  dapps.push(o)
  // log('dapp added', dapps)
  mydappSave(dapps)
}

const myhistoryAdd = (dapp) => {
  const { entry, icon, name } = dapp
  const o = {
    img: icon,
    url: entry,
    name: name,
  }
  const dapps = mydappLoaded()
  const len = dapps.length
  for (let i = 0; i < len; i++) {
    const obj = dapps[i]
    if (o.url === obj.url) {
      return
    }
  }
  dapps.push(o)
  // log('dapp added', dapps)
  mydappSave(dapps)
}

const mydappRemove = (url) => {
  const dapps = mydappLoaded()
  const len = dapps.length
  for (let i = 0; i < len; i++) {
    const obj = dapps[i]
    if (url === obj.url) {
      dapps.splice(i, 1)
      mydappSave(dapps)
      return
    }
  }
}

// 提供给外部的接口
const initApi = () => {
  if (window.__mydapp === undefined) {
    window.__mydapp = {
      remove: mydappRemove,
      add: mydappAdd,
    }
    Object.freeze(window.__mydapp)
  }

  if (window.__myhistory === undefined) {
    window.__mydapp = {
      remove: mydappRemove,
      add: mydappAdd,
    }
    Object.freeze(window.__mydapp)
  }
}

const renderMyDapps = () => {
  if (location.pathname === '/dapps/mine') {
    const dapps = localStoreParsed('__viewInfoList_mydapps')
    renderMyDappsContainer(dapps)
  }
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

const init = () => {
  initElementTable()
  initApi()
  // initStyle()
  test()
  setActiveNav()
  bindEvents()
  renderMyDapps()
}

const main = () => {
  bind(document, 'DOMContentLoaded', init)
}

main()
