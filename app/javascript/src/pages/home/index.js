import j from 'jquery'
import { log } from '../../utils'
import { renderbyList, renderBlockbyList } from './template'
import { bindBanner } from './bannerAction'

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

const renderBanner = () => {
  const ios = 'ios_version=0.0.0.000000'
  const url = `${location.origin}/banners.json?/${ios}`
  const container = j('#id-container-banner')
  return j.get(url, (data) => {
    renderbyList(container, data)
    container.promise().done(bindBanner)
  })
}

const renderRecommand = () => {
  const ios = 'ios_version=0.0.0.000000'
  const url = `${location.origin}/dapps.json?/${ios}`
  const container = j('#id-container-dappblocks')
  return j.get(url, (data) => {
    log(data)
    renderBlockbyList(container, data)
  })
}

const render = () => {
  renderBanner()
  renderRecommand()
}

const bindevents = () => {
  bindNavigationButton()
}

const main = () => {
  render()
  bindevents()
}

export default main
