import { dappsLoaded } from '../utils/dappsApi'
import { log } from '../utils'
import noData from 'src/imgs/noData.png'
import defaultimg from 'src/imgs/noData.png'
import linkto from 'src/imgs/icon/linkto.png'
import { dappshowPath } from './home'

const tDappListCell = (type, { logo_url, name, id, desc, marketing_url }) => {
  let realimg = logo_url
  if (!realimg) {
    realimg = defaultimg
  }
  let marketing = ''
  if (marketing_url) {
    marketing = `<img class="dappsListMarketing" src=${marketing_url} alt="">`
  }
  const t = `<a class="dappsListItem" href="${dappshowPath(id)}" data-category='${type}' data-name='${name}'>
                <div class='dappsListImgContainer'>
                  <img class="dappsListImg" src=${realimg} alt="">
                  
                </div>
                <div class="dappsListContent">
                  <div class="dappsListName">${name}${marketing}</div>
                  <div class="dappsListUrl" >${desc}</div>
                </div>
                <img class="linkto" src=${linkto} alt="linkto">
            </a>`
  return t
}

const tDappsContainer = (type, dappinfoList) => {
  const l = dappinfoList
  if (l.length === 0) {
    return ''
  }
  const len = l.length
  let t = ''
  for (let i = 0; i < len; i++) {
    const info = l[i]
    t += tDappListCell(type, info)
  }
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

const renderbyList = (container, list, type) => {
  const html = tDappsContainer(type, list)
  if (html === '') {
    container.html(tDappsDefault())
  } else {
    container.html(html)
  }
}

export { renderbyList, tDappsContainer, tDappsDefault }
