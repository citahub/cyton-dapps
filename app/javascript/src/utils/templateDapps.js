import { dappsLoaded } from './dappsApi'
// import { log } from './utils'
import noData from 'src/imgs/noData.png'
import defaultimg from 'src/imgs/noData.png'
import linkto from 'src/imgs/icon/linkto.png'

const tDappListCell = ({ img, name, url, time }) => {
  let realimg = img
  if (!img) {
    realimg = defaultimg
  }
  const t = `<a class="dappsListItem" href="${url}">
                <div class='dappsListImgContainer'>
                  <img class="dappsListImg" src=${realimg} alt="">
                </div>
                <div class="dappsListContent">
                  <div class="dappsListName">${name}</div>
                  <div class="dappsListUrl" >${time}</div>
                </div>
                <img class="linkto" src=${linkto} alt="linkto">
            </a>`
  return t
}

const tDappsContainer = ({ local, title, icon }) => {
  const l = dappsLoaded(local)
  if (l.length === 0) {
    return ''
  }
  const len = l.length
  let t = ''
  for (let i = 0; i < len; i++) {
    const info = l[i]
    t += tDappListCell(info)
  }
  const ttitle = `
          <div class="popularTitle">
            <img class="popularIcon" src=${icon}>
            <div class="popularText">${title}</div>
          </div>`
  t = `<div class="popularContainer">
          ${t}
        </div>`
  return t
}

const tDappsDefault = () => {
  const t = `<div class="noData">
                <img class="noDataImg" src="${noData}" alt="">
                <span class="noDataText">无数据显示</span>
              </div>`
  return t
}

const renderbyList = (container, { local }) => {
  const html = tDappsContainer({ local })
  if (html === '') {
    container.html(tDappsDefault())
  } else {
    container.html(html)
  }
}

// const renderMinePage = () => {
//   if (location.pathname === '/dapps/mine') {
//     const container = GlobalTable.elementTable.dapps
//     const table = GlobalTable.renderkeyTable
//     // TODO: 这里可以抽一个函数
//     const mydapps = tDappsContainer(table.mydapps)
//     const myhistory = tDappsContainer(table.myhistory)
//     if (mydapps === '' && myhistory === '') {
//       container.innerHTML = tMyDappsDefault()
//     } else {
//       container.innerHTML = mydapps + myhistory
//     }
//   }
// }

export { renderbyList, tDappsContainer, tDappsDefault }
