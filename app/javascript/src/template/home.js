import j from 'jquery'
import { log } from '../utils'
import noData from 'src/imgs/noData.png'
import defaultimg from 'src/imgs/noData.png'

const htmlBannerImg = ({ image_url: img, address }) => {
  let realimg = img || defaultimg
  let href
  if (!isNaN(Number(address))) {
    href = `/dapps/${address}`
  } else if (address.startsWith('http')) {
    href = address
  } else if (address.startsWith('/')) {
    href = address
  } else {
    console.error('Banner Error: Not fetch vaild address')
    href = address
  }

  const html = `
    <a class='bannerimg' href=${href}><img  src=${realimg} alt=""></a>
  `
  return html
}

const htmlBanner = (list) => {
  const l = list
  if (l.length === 0) {
    return ''
  }
  const len = l.length
  let html = ''
  for (let i = 0; i < len; i++) {
    const info = l[i]
    html += htmlBannerImg(info)
  }
  html = `
    <div class='banner'>
      ${html}
    </div>
  `
  return html
}

const pathShowDapp = (id) => {
  return `/dapps/${id}`
}

const htmlDappBlocksCell = (type, list) => {
  let html = ''
  list.forEach((info) => {
    const { name, logo_url, desc, id, marketing_url } = info

    let marketing = ''
    if (marketing_url) {
      marketing = `<img class="dappMarketing" src=${marketing_url} alt="">`
    }

    html += `
         <a class="dapp" href=${pathShowDapp(id)}  data-category='${type}' data-name='${name}'>
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
  return html
}

const dappmorePath = (name) => {
  return `/more/${name}`
}

const htmlDappBlocks = (list) => {
  let html = ''
  list.forEach((info) => {
    const { type, value } = info
    const cell = htmlDappBlocksCell(type, value)
    html += `
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
  return html
}

const htmlDefault = () => {
  const html = `<div class="noData">
                <img class="noDataImg" src="${noData}" alt="">
                <span class="noDataText">无数据显示</span>
              </div>`
  return html
}

const renderbyList = (container, list) => {
  const html = htmlBanner(list)
  if (html === '') {
    container.html(tDefault())
  } else {
    container.html(html)
  }
}

const renderBlockbyList = (container, list) => {
  const html = htmlDappBlocks(list)
  container.html(html)
}

export { renderbyList, htmlDappBlocks, renderBlockbyList, htmlBannerImg, pathShowDapp }
