import { GlobalTable } from './global'
import { dappsLoaded } from './dappsApi'
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

const tDappsContainer = ({ local, title, icon }) => {
  const l = dappsLoaded(local)
  if (l.length === 0) {
    return null
  }
  const len = l.length
  let t = ''
  for (let i = 0; i < len; i++) {
    const info = l[i]
    t += tDappListCell(info.img, info.name, info.url)
  }
  t = `<div class="popularContainer">
          <div class="popularTitle">
            <img class="popularIcon" src=${icon}>
            <div class="popularText">${title}</div>
          </div>
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

const renderMinePage = () => {
  if (location.pathname === '/dapps/mine') {
    const container = GlobalTable.elementTable.dapps
    const table = GlobalTable.renderkeyTable
    // TODO: 这里可以抽一个函数
    const mydapps = tDappsContainer(table.mydapps) || ''
    const myhistory = tDappsContainer(table.myhistory) || ''
    if (mydapps === null && myhistory === null) {
      container.innerHTML = tMyDappsDefault()
    } else {
      container.innerHTML = mydapps + myhistory
    }
  }
}

export { renderMinePage }
