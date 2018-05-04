import './stylesheets/application.scss'


const log = console.log.bind(console)

const elementTable = {}
const renderTable = {}

const bind = function (element, eventName, callback) {
    element.addEventListener(eventName, callback)
}

const unbind = function (element, eventName, callback) {
    element.removeEventListener(eventName, callback)
}

const setOneActive = function (target, elementList, classNormal, classActive) {
    const cls = target.className
    const clsn = classNormal
    if (cls === clsn) {
        const clsa = classActive
        const l = elementTable.navList
        const len = l.length
        for (let i = 0; i < len; i++) {
            const e = l[i]
            e.className = clsn
        }
        target.className = clsa
    }
}

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
    const l = elementTable.navList
    const clsn = 'headerNavItem'
    const clsa = 'headerNavItem active'
    setFirstActive(l, clsa)
}

const bindHeader = function () {
    const header = elementTable.header
    bind(header, 'click', function (event) {
        const target = event.target
        const block = target.dataset.block
        log(block)
        if (block) {
            const cls = target.className
            const clsn = 'headerNavItem'
            const clsa = 'headerNavItem active'
            const l = elementTable.navList
            setOneActive(target, l, clsn, clsa)
        }
    })
}

const tDappListCell = function (img, name, url) {
    const t = `
    <div class="DappsListItem">
      <div class="DappsListImgContainer">
        <img class="DappsListImg" src=${img} alt="">
      </div>
      <div class="DappsListContent">
        <div class="DappsListName">${name}</div>
        <div class="DappsListUrl">${url}</div>
      </div>
    </div>`
    return t
}

const tMyDapps = function (dappInfoList) {
    const l = dappInfoList
    const len = l.length
    let t = ''
    for (let i = 0; i < l.length; i++) {
        const info = l[i]
        t += tDappListCell(info.img, info.name, info.url)
    }
    return t
}

const initElementTable = function () {
    const table = elementTable
    const header = document.getElementById('id_header')
    const localViewContainer = document.getElementById('id_localViewContainer')
    const navList = header.querySelectorAll('.headerNavItem')
    table.header = header
    table.localViewContainer = localViewContainer
    table.navList = navList
}

const renderMyDappsContainer = function () {
    let l = localStorage.__viewInfoList_myDapps
    l = JSON.parse(l)
    const container = elementTable.localViewContainer
    if (l && l.length > 0) {
        container.innerHTML = tMyDapps(l)
    }
}

const renderMyDapps = () => {
    if (location.pathname === '/dapps/mine') {
        test()
        renderMyDappsContainer()
    }
}

const renderPopular = function () {
}

const initRenderTable = function () {
    const table = renderTable
    table.myDapps = renderMyDapps
    table.populay = renderPopular
}

const test = function () {
    const img = 'http://p1.music.126.net/sr9yP4Kt4xxYap5T7CbMqQ==/109951162955032377.jpg?param=180y180'
    const name = 'Yuki'
    const url = 'http://p1.music.126.net/sr9yP4Kt4xxYap5T7CbMqQ==/109951162955032377.jpg?param=180y180'
    const l = [
        {
            img,
            name,
            url,
        },
        {
            img,
            name,
            url,
        },
        {
            img,
            name,
            url,
        },
        {
            img,
            name,
            url,
        },
    ]
    localStorage.__viewInfoList_myDapps = JSON.stringify(l)
}

const init = () => {
    log(location.pathname)
    initElementTable()
    initRenderTable()
    setActiveNav()
    renderMyDapps()
}

const main = () => {
    bind(window, 'load', init)
}

main()

