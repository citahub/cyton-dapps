import { dappsLoaded } from '../utils/dappsApi'
import { log } from '../utils'
import noData from 'src/imgs/noData.png'
import defaultimg from 'src/imgs/noData.png'
import linkto from 'src/imgs/icon/linkto.png'

const htmlDappListCell = ({ img, name, url, time }) => {
  let realimg = img
  if (!img) {
    realimg = defaultimg
  }

  const date = new Date(time)
  const timeStr = `${date.getFullYear() || 2000}-${date.getMonth() || 0 + 1}-${date.getDate() || 1}`
  const html = `<a class="dappsListItem" href="${url}">
                <div class='dappsListImgContainer'>
                  <img class="dappsListImg" src=${realimg} alt="">
                  
                </div>
                <div class="dappsListContent">
                  <div class="dappsListName">${name}</div>
                  <div class="dappsListUrl" >${timeStr}</div>
                </div>
                <img class="linkto" src=${linkto} alt="linkto">
            </a>`
  return html
}

const htmlDappsContainer = ({ local, title, icon }) => {
  const l = dappsLoaded(local)
  if (l.length === 0) {
    return ''
  }
  const len = l.length
  let html = ''
  for (let i = 0; i < len; i++) {
    const info = l[i]
    html += htmlDappListCell(info)
  }
  const htmlTitle = `
          <div class="popularTitle">
            <img class="popularIcon" src=${icon}>
            <div class="popularText">${title}</div>
          </div>`
  html = `<div class="popularContainer">
          ${html}
        </div>`
  return html
}

const htmlDappsDefault = () => {
  const html = `<div class="noData">
                <img class="noDataImg" src="${noData}" alt="">
                <span class="noDataText">空空如也</span>
              </div>`
  return html
}

const renderbyList = (container, { local }) => {
  const html = htmlDappsContainer({ local })
  if (html === '') {
    container.html(tDappsDefault())
  } else {
    container.html(html)
  }
}

export { renderbyList, htmlDappsContainer, htmlDappsDefault }
