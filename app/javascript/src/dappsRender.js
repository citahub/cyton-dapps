import { localStoreParsed, localStoreStore } from './utils.js'
import { GlobalTable } from './global'
import noData from 'src/imgs/noData.png'

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
  for (let i = 0; i < len; i++) {
    const info = l[i]
    t += tDappListCell(info.img, info.name, info.url)
  }
  t = `<div class="dappsBlock container">
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

const renderMydapps = (dapps) => {
  if (location.pathname === '/dapps/mine') {
    const container = GlobalTable.elementTable.dapps
    if (Array.isArray(dapps) && dapps.length > 0) {
      const t = tMyDapps(dapps)
      container.innerHTML = t
    } else {
      container.innerHTML = tMyDappsDefault()
    }
  }
}

export { renderMydapps }
