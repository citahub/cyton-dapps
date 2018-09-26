import j from 'jquery'
import { log } from '../utils'
import noData from 'src/imgs/noData.png'
import defaultimg from 'src/imgs/noData.png'

const tBannerimg = ({ image_url: img, address }) => {
  let realimg = img || defaultimg
  let href
  if (!isNaN(Number(address))) {
    href = `/dapps/${address}`
  } else if (address.startWith('http')) {
    href = address
  } else if (address.startWith('/')) {
    href = address
  } else {
    console.error('Banner Error: Not fetch vaild address')
    href = address
  }

  const t = `
    <a class='bannerimg' href=${href}><img  src=${realimg} alt=""></a>
  `
  return t
}

const tBanner = (list) => {
  const l = list
  if (l.length === 0) {
    return ''
  }
  const len = l.length
  let t = ''
  for (let i = 0; i < len; i++) {
    const info = l[i]
    t += tBannerimg(info)
  }
  t = `
    <div class='banner'>
      ${t}
    </div>
  `
  return t
}

const dappshowPath = (id) => {
  return `/dapps/${id}`
}

const tDappblocksCell = (list) => {
  let t = ''
  list.forEach((info) => {
    const { name, logo_url, desc, id, marketing_url } = info

    let marketing = ''
    log(marketing_url)
    if (marketing_url) {
      marketing = `<img class="dappMarketing" src=${marketing_url} alt="">`
    }

    t += `
         <a class="dapp" href=${dappshowPath(id)}>
          <div class='dappsimgContainer'>
            <img class="dappimg" src=${logo_url}>
            </div>
            <div class="dappinfo">
            <div class="dapptitle">
              ${name}
              ${marketing}
            </div>
            <div class="dappintro">${desc}</div>
          </div>
        </a>
        `
  })
  return t
}

const dappmorePath = (name) => {
  return `/more/${name}`
}

const tDappblocks = (list) => {
  let t = ''
  list.forEach((info) => {
    const { type, value } = info
    const cell = tDappblocksCell(value)
    t += `
    <div class="block">
      <div class="header">
        <div class="headertitle">
          ${type}
        </div>
        <a href=${dappmorePath(type)} class="buttonmore">更多</a>
      </div>
      <div class="dapplist">
        ${cell}
      </div>
    </div>
    `
  })
  return t
}

const tDefault = () => {
  const t = `<div class="noData">
                <img class="noDataImg" src="${noData}" alt="">
                <span class="noDataText">无数据显示</span>
              </div>`
  return t
}

const renderbyList = (container, list) => {
  const html = tBanner(list)
  if (html === '') {
    container.html(tDefault())
  } else {
    container.html(html)
  }
}

const renderBlockbyList = (container, list) => {
  const html = tDappblocks(list)
  container.html(html)
}

export { renderbyList, tDappblocks, renderBlockbyList, tBannerimg, dappshowPath }
