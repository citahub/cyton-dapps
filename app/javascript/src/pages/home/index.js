import j from 'jquery'
import { log } from '../../utils'
import { renderbyList, renderBlockbyList } from '../../template/home'
import jsontable from '../../utils/jsonApi'
import { htmlBannerImg } from '../../template/home'
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
  container.find('.dapp').each(function() {
    const dapp = $(this)
    const category = dapp.attr('data-category')
    const name = dapp.attr('data-name')
    dapp.on('click', function() {
      trackDapplist({
        DApp_category: category,
        DApp_name: name,
      })
    })
  })
}

const bindLinkButtons = () => {
  const container = j('#id-container-jumpButtons')
  container.children('.button.openCollection').on('click', neuronapi.openCollection)
  container.children('.button.openMyDapp').on('click', neuronapi.openMyDapp)
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
  return list.map((info, i) => {
    const jquery = j(htmlBannerImg(info))
    const props = {
      index: i.toString(),
      id: info.id.toString(),
    }
    return {
      jquery,
      props,
    }
  })
}

const renderBannerNav = (length) => {
  let i = 1
  let html = `<div class='navCell active'></div>`
  while (i < length) {
    html += `<div class='navCell'></div>`
    i++
  }
  j('#id-container-banner .navs').html(html)
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
    renderBannerNav(length)
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
  bindLinkButtons()
}

const main = () => {
  // titlebarNormal()
  bindEvent()
  render()
}

export default main
