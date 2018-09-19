import j from 'jquery'
import { log } from '../../utils'
import { renderbyList, renderBlockbyList } from './template'
import jsontable from '../../utils/jsonApi'
import renderBanner, { bindBanner } from './banner'

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

const main = () => {
  render()
}

export default main
