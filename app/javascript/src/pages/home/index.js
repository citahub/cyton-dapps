import j from 'jquery'
import { log } from '../../utils'
import { renderbyList, renderBlockbyList } from '../../template/home'
import jsontable from '../../utils/jsonApi'
import renderBanner, { bindBanner } from './banner'
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
