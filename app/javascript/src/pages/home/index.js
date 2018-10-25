import j from 'jquery'
import { log } from '../../utils'
import { renderbyList, renderBlockbyList } from '../../template/home'
import jsontable from '../../utils/jsonApi'
import { tBannerimg } from '../../template/home'
import bindBanner from './bannerAction'
import neuronapi from '../../utils/neuron'
import { bindPulldownRefresh } from './pulldownRefresh'
import { titlebarNormal } from '../../utils/tablebar'
import { trackDapplist } from '../../utils/sensors'

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

const bindTrackDapplist = (container) => {
  container.find('.dapp').on('click', function(event) {
    const dom = this
    const dapp = j(dom)
    const category = dapp.attr('data-category')
    const name = dapp.attr('data-name')

    trackDapplist(dom, {
      DApp_category: category,
      DApp_name: name,
    })
  })
}

const renderRecommand = () => {
  const url = jsontable.dapps
  const container = j('#id-container-dappblocks')
  return j.get(url, (data) => {
    renderBlockbyList(container, data)
    bindTrackDapplist(container)
    bindNavigationButton()
  })
}

const createBannerImgs = (list) => {
  return list.reverse().map((info, i) => {
    const jquery = j(tBannerimg(info))
    const props = {
      index: i,
      id: info.id,
    }
    return {
      jquery,
      props,
    }
  })
}

const renderBanner = () => {
  const url = jsontable.banners
  j.get(url, (data) => {
    let dat
    const length = data.length
    if (length > 3) {
      dat = data
    } else if (length === 3 || length === 2) {
      dat = [...data, ...data]
    } else if (length === 1) {
      dat = [...data, ...data, ...data, ...data]
    } else {
      console.error('banners info error')
    }
    let l = createBannerImgs(dat)
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
