import j from 'jquery'
import { log } from '../../utils'

const bindBannerTouch = () => {
  const banner = j('#id-container-banner').children()
  const imgs = banner.children()
  const img = j(imgs[2])

  img.on('touchstart', () => {
    log('start touch')
  })
  img.on('touchend', () => {
    log('end touch')
  })
  img.on('touchmove', (event) => {
    event.preventDefault()
    log(event)
    log('move touch')
  })
}

const bindBanner = () => {
  const banner = j('#id-container-banner').children(0)
  const imgs = banner.children()
  const length = imgs.length
  for (let i = 0; i < length; i++) {
    const img = imgs[i]
    img.id = i
  }
  window.banner = banner
  const eventMoveRemove = () => {
    banner.children()[1].removeEventListener('click', moveleft)
    banner.children()[3].removeEventListener('click', moveright)
  }
  const eventMoveAdd = () => {
    banner.children()[1].addEventListener('click', moveleft)
    banner.children()[3].addEventListener('click', moveright)
  }
  const moveleft = (event) => {
    const oldmiddle = banner.children()[2]
    oldmiddle.className = 'bannerimg banneranime middletoleft'
    eventMoveRemove()
    oldmiddle.className = 'bannerimg moveleft'
    banner.append(banner.children()[0])
    setTimeout(() => {
      oldmiddle.className = 'bannerimg'
    }, 0)
    eventMoveAdd()
  }
  const moveright = (event) => {
    eventMoveRemove()
    banner.children()[2].className = 'bannerimg moveright'
    banner.prepend(banner.children()[4])
    setTimeout(() => {
      banner.children()[3].className = 'bannerimg'
    }, 0)
    eventMoveAdd()
  }
  imgs[1].addEventListener('click', moveleft)
  imgs[3].addEventListener('click', moveright)
}

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

const main = () => {
  if (location.pathname === '/') {
    bindNavigationButton()
    bindBanner()
    bindBannerTouch()
  }
}

export default main
