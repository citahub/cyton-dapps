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
    const t =
        `<a class="dappsListItem" href="${url}">
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
    t = `<div class="dappsContainer container">
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
        const container = GlobalTable.elementTable.localViewContainer
        // log(`renderMyDappsContainer`, 'input:', JSON.stringify(dapps, ' ', 2))
        if (Array.isArray(dapps) && dapps.length > 0) {
            // log('dapps 非空')
            const t = tMyDapps(dapps)
            log(GlobalTable)
            container.innerHTML = t
        } else {
            // log('dapps 空')
            container.innerHTML = tMyDappsDefault()
        }
    }
}

const mydappSave = (dapps) => {
    renderMyDappsContainer(dapps)
    localStoreStore('__viewInfoList_myDapps', dapps)
}

const mydappLoaded = () => {
    // log(`mydappLoaded`)
    let dapps = localStoreParsed('__viewInfoList_myDapps')
    if (!Array.isArray(dapps)) {
        dapps = []
    }
    return dapps
}

const mydappAdd = (dapp) => {
    // log('mydappAdd')
    // log(`mydappAdd: input: (${JSON.stringify(dapp, ' ', 2)})`)
    const {entry, icon, name} = dapp
    const o = {
        img: icon,
        url: entry,
        name: name,
    }
    const dapps = mydappLoaded()
    const len = dapps.length
    for (let i = 0; i < dapps.length; i++) {
        const obj = dapps[i];
        if (o.url === obj.url) {
            return
        }
    }
    dapps.push(o)
    // log('dapp added', dapps)
    mydappSave(dapps)
}

const mydappRemove = (url) => {
    // log(`mydappRemove: input: (${url})`)
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
    if (window.__mydapp === undefined) {
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
    let a = {
        img: 'http://p1.music.126.net/sr9yP4Kt4xxYap5T7CbMqQ==/109951162955032377.jpg?param=180y180',
        name: 'Yuki',
        url: 'http://p1.music.126.net/sr9yP4Kt4xxYa',
    }
    const l = [info, info, info]
    localStoreStore('__viewInfoList_myDapps', l)
    setInterval(() => {
        // log('test')
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
    // log(localViewContainer)
    const searchBar = _e('#id_searchBar')
    const navList = _es('.headerNavItem', header)

    GlobalTable.elementTable = {
        header,
        localViewContainer,
        searchBar,
        navList,
    }
    log(GlobalTable)
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
