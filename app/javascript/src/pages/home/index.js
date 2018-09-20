import j from 'jquery'
import { log } from '../../utils'
import { renderbyList, renderBlockbyList } from '../../template/home'
import jsontable from '../../utils/jsonApi'
import { tBannerimg } from '../../template/home'
import bindBanner from './bannerAction'
import neuronapi from '../../utils/neuron'

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
  return list.map((info) => {
    return j(tBannerimg(info))
  })
}

const renderBanner = () => {
  const url = jsontable.banners
  const container = j('#id-container-banner .banner')
  j.get(url, (data) => {
    const l = createBannerImgs(data)
    l.unshift(l.pop())
    const lrender = l.splice(0, 3)
    container.append(lrender)
    bindBanner(l)
  })
}

const render = () => {
  renderBanner()
  renderRecommand()
}

const bindEvent = () => {
  bindSearchBar()
}

const main = () => {
  bindEvent()
  render()
}

export default main
