import j from 'jquery'
import { log } from '../../utils'
import jsontable from '../../utils/jsonApi'
import { tBannerimg } from './template'

const createBannerImgs = (list) => {
  return list.map((info) => {
    return j(tBannerimg(info))
  })
}

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
    banner.children()[0].removeEventListener('click', moveleft)
    banner.children()[2].removeEventListener('click', moveright)
  }

  const eventMoveAdd = () => {
    banner.children()[0].addEventListener('click', moveleft)
    banner.children()[2].addEventListener('click', moveright)
  }

  const moveleft = (event) => {
    const oldmiddle = banner.children()[1]
    oldmiddle.className = 'bannerimg banneranime middletoleft'
    eventMoveRemove()
    oldmiddle.className = 'bannerimg moveleft'
    banner.append(banner.children()[0])
    setTimeout(() => {
      oldmiddle.className = 'bannerimg'
    }, 0)
    eventMoveAdd()
    // automove()
  }

  const moveright = (event) => {
    eventMoveRemove()
    banner.children()[0].className = 'bannerimg moveright'
    banner.prepend(banner.children()[2])
    setTimeout(() => {
      banner.children()[1].className = 'bannerimg'
    }, 0)
    eventMoveAdd()
    // automove()
  }
  imgs[0].addEventListener('click', moveleft)
  imgs[2].addEventListener('click', moveright)
  // timeout = setTimeout(() => {
  //   moveright()
  // }, 3000)
}

const bindBanner = () => {
  bindBannerTouch()
  bindBannerClick()
}

const renderBanner = () => {
  const url = jsontable.banners
  const container = j('#id-container-banner .banner')
  return j.get(url, (data) => {
    const l = createBannerImgs(data)
    l.unshift(l.pop())
    const lrender = l.slice(0, 2)
    lrender.unshift(l.pop())
    container.append(lrender)
    bindBanner()
    // container.promise().done(bindBanner)
  })
}

export default renderBanner
export { bindBanner }
