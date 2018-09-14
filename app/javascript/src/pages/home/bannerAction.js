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
    log(event.touches)
    log('move touch')
  })
}

const bindBannerClick = () => {
  const banner = j('#id-container-banner').children(0)
  const imgs = banner.children()
  let timeout = null

  const automove = () => {
    if (timeout !== null) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => {
      moveright()
    }, 3000)
  }

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
    automove()
  }

  const moveright = (event) => {
    eventMoveRemove()
    banner.children()[2].className = 'bannerimg moveright'
    banner.prepend(banner.children()[4])
    setTimeout(() => {
      banner.children()[3].className = 'bannerimg'
    }, 0)
    eventMoveAdd()
    automove()
  }
  imgs[1].addEventListener('click', moveleft)
  imgs[3].addEventListener('click', moveright)
  timeout = setTimeout(() => {
    moveright()
  }, 3000)
}

const bindBanner = () => {
  bindBannerTouch()
  bindBannerClick()
}

export { bindBanner }
