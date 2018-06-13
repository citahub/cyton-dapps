import {
    log,
    _e,
    _es,
    bind,
    unbind,
    localStoreParsed,
    localStoreStore,
} from './utils.js'
import './stylesheets/application.scss'
import headerBackground from 'src/imgs/headerBackground.svg'
import noData from 'src/imgs/noData.png'
import './imgs/index'

const GlobalTable = {}

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
    const l = GlobalTable.elementTable.navList
    const clsn = 'headerNavItem'
    const clsa = 'headerNavItem active'
    setFirstActive(l, clsa)
}

// with native
const startNativePage = () => {
    appHybrid.startAddWebsitePage()
}

const tDappListCell = (img, name, url) => {
    const t = `<div class="dappsListItem">
                  <div class="dappsListImgContainer">
                    <img class="dappsListImg" src=${img} alt="">
                  </div>
                  <div class="dappsListContent">
                    <div class="dappsListName">${name}</div>
                    <a class="dappsListUrl" href="${url}">${url}</a>
                  </div>
                </div>`
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
    t = `<div class="dappsContainer container">
            ${t}
        </div>`
    return t
}

const tMyDappsDefault = () => {
    const t = `<div class="noData">
                <img class="noDataImg" src="${noData}" alt="">
                <span class="noDataText">无数据显示</span>
              </div>`
    return t
}

const renderMyDappsContainer = (dapps) => {
    const container = GlobalTable.elementTable.localViewContainer
    if (Array.isArray(dapps) && dapps.length > 0) {
        container.innerHTML = tMyDapps(dapps)
    } else {
        container.innerHTML = tMyDappsDefault()
    }
}

const mydappSave = (dapps) => {
    renderMyDappsContainer(dapps)
    localStoreStore('__viewInfoList_myDapps', dapps)
}

const mydappLoaded = () => {
    let dapps = localStoreParsed('__viewInfoList_myDapps')
    if (!Array.isArray(dapps)) {
        dapps = []
    }
    return dapps
}

const mydappAdd = (dapp) => {
    const dapps = mydappLoaded()
    const len = dapps.length
    for (let i = 0; i < dapps.length; i++) {
        const obj = dapps[i];
        if (dapp.url === obj.url) {
            return
        }
    }
    dapps.push(dapp)
    mydappSave(dapps)
}

const mydappRemove = (url) => {
    const dapps = mydappLoaded()
    const len = dapps.length
    for (let i = 0; i < dapps.length; i++) {
        const obj = dapps[i];
        if (url === obj.url) {
            dapps.splice(i, 1)
            mydappSave(dapps)
            return
        }
    }
}

const initApi = () => {
    log(window.__mydapp)
    if (window.__mydapp === undefined ) {
        window.__mydapp = {
            remove: mydappRemove,
            add: mydappAdd,
        }
        Object.freeze(window.__mydapp)
    }
}

const renderMyDapps = () => {
    if (location.pathname === '/dapps/mine') {
        const dapps = localStoreParsed('__viewInfoList_myDapps')
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
    const l = [info, info, info]
    localStoreStore('__viewInfoList_myDapps', l)
    setInterval(() => {
        log('test')
        mydappRemove(info.url)
        setTimeout(() => {
            mydappAdd(info)
        }, 1500)
    }, 3000)
}


const bindEvents = () => {
    const {searchBar} = GlobalTable.elementTable
    bind(searchBar, 'click', startNativePage)
}

const initElementTable = () => {
    const header = _e('#id_header')
    const localViewContainer = _e('#id_localViewContainer')
    const searchBar = _e('#id_searchBar')
    const navList = _es('.headerNavItem', header)

    GlobalTable.elementTable = {
        header,
        localViewContainer,
        searchBar,
        navList,
    }
}

const init = () => {
    initElementTable()
    initApi()
    // test()
    bindEvents()
    setActiveNav()
    renderMyDapps()
}

const main = () => {
    bind(document, 'DOMContentLoaded', init)
}

main()
