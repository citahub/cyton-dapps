import j from 'jquery'
import { log } from '../../utils'
import { renderbyList, renderBlockbyList } from '../../template/home'
import jsontable from '../../utils/jsonApi'
import { tBannerimg } from '../../template/home'
import bindBanner from './bannerAction'
import neuronapi from '../../utils/neuron'
import { bindPulldownRefresh } from './pulldownRefresh'
import { titlebarNormal } from '../../utils/tablebar'

const bindNavigationButton = () => {
  const navbutton = j('#id-button-navigation')
  const mask = j('#id-container-mask')
  mask.click((event) => {
    mask.hide()
    event.stopPropagation()
  })
  navbutton.click(() => {
    mask.show()
  })
}

const bindSearchBar = () => {
  const bar = j('#id-button-search')
  bar.click((e) => {
    neuronapi.openSearchPage()
    e.stopPropagation()
  })
}

const renderRecommand = () => {
  const url = jsontable.dapps
  const container = j('#id-container-dappblocks')
  return j.get(url, (data) => {
    renderBlockbyList(container, data)
    bindNavigationButton()
  })
}

const createBannerImgs = (list) => {
  return list.reverse().map((info) => {
    return j(tBannerimg(info))
  })
}

const renderBanner = () => {
  const url = jsontable.banners
  const container = j('#id-container-banner .banner')
  j.get(url, (data) => {
    let dat = data
    if (data.length <= 3) {
      dat = [...data, ...data, ...data]
    } else {
      dat = data
    }
    let l = createBannerImgs(dat)
    const img1 = l.shift()
    const img2 = l.shift()
    const imgLast = l.pop()
    const inner = [img2, img1, imgLast]
    container.append(inner)
    bindBanner(l)
  })
}

const render = () => {
  renderBanner()
  renderRecommand()
}

const bindEvent = () => {
  // bindPulldownRefresh()
  bindSearchBar()
}

const main = () => {
  // titlebarNormal()
  bindEvent()
  render()
}

export default main
