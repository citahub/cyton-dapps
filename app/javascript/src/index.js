import './stylesheets/application.scss'


const log = console.log.bind(console)

const bind = (element, eventName, callback) => {
    element.addEventListener(eventName, callback)
}

const unbind = (element, eventName, callback) => {
    element.removeEventListener(eventName, callback)
}

const _e = (selector, element = document) => element.querySelector(selector)

const _es = (selector, element = document) => element.querySelectorAll(selector)

const GlobalTable = {}

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

// const renderTable = {}

// const setOneActive = (target, elementList, classNormal, classActive) => {
//     const cls = target.className
//     const clsn = classNormal
//     if (cls === clsn) {
//         const clsa = classActive
//         const l = GlobalTable.elementTable.navList
//         const len = l.length
//         for (let i = 0; i < len; i++) {
//             const e = l[i]
//             e.className = clsn
//         }
//         target.className = clsa
//     }
// }

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
    log('app hybrid')
    appHybrid.startAddWebsitePage()
}

const bindEvents = () => {
    const {searchBar} = GlobalTable.elementTable
    // bind(searchBar, 'focus', startNativePage)
    bind(searchBar, 'click', startNativePage)
}


// const bindHeader = () => {
//     const header = GlobalTable.elementTable.header
//     bind(header, 'click', (event) => {
//         const target = event.target
//         const block = target.dataset.block
//         log(block)
//         if (block) {
//             const cls = target.className
//             const clsn = 'headerNavItem'
//             const clsa = 'headerNavItem active'
//             const l = GlobalTable.elementTable.navList
//             setOneActive(target, l, clsn, clsa)
//         }
//     })
// }

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
    return t
}

const renderMyDappsContainer = () => {
    let l = localStorage.__viewInfoList_myDapps
    l = JSON.parse(l)
    const container = GlobalTable.elementTable.localViewContainer
    if (l && l.length > 0) {
        container.innerHTML = tMyDapps(l)
    }
}

const renderMyDapps = () => {
    if (location.pathname === '/dapps/mine') {
        // test()
        renderMyDappsContainer()
    }
}

// const test = () => {
//     const img = 'http://p1.music.126.net/sr9yP4Kt4xxYap5T7CbMqQ==/109951162955032377.jpg?param=180y180'
//     const name = 'Yuki'
//     const url = 'http://p1.music.126.net/sr9yP4Kt4xxYap5T7CbMqQ==/109951162955032377.jpg?param=180y180'
//     const l = [
//         {
//             img,
//             name,
//             url,
//         },
//         {
//             img,
//             name,
//             url,
//         },
//         {
//             img,
//             name,
//             url,
//         },
//         {
//             img,
//             name,
//             url,
//         },
//     ]
//     localStorage.__viewInfoList_myDapps = JSON.stringify(l)
// }

const init = () => {
    initElementTable()
    bindEvents()
    setActiveNav()
    renderMyDapps()
}

const main = () => {
    bind(document, 'DOMContentLoaded', init)
}

main()
//
// document.addEventListener('DOMContentLoaded', () => {
//     document.getElementById('searchBar').addEventListener('focus',
//         startNativePage(),
//     )
// })
