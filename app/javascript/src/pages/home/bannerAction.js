import j from 'jquery'
import { log } from '../../utils'
import jsontable from '../../utils/jsonApi'

const bindBannerTouch = () => {}

// const bindBannerClick = () => {
//   const banner = j('#id-container-banner').children(0)
//   const imgs = banner.children()
//   let timeout = null

//   const automove = () => {
//     if (timeout !== null) {
//       clearTimeout(timeout)
//     }
//     timeout = setTimeout(() => {
//       moveright()
//     }, 3000)
//   }

//   const eventMoveRemove = () => {
//     banner.children()[0].removeEventListener('click', moveleft)
//     banner.children()[2].removeEventListener('click', moveright)
//   }

//   const eventMoveAdd = () => {
//     banner.children()[0].addEventListener('click', moveleft)
//     banner.children()[2].addEventListener('click', moveright)
//   }

//   const moveleft = (event) => {
//     const oldmiddle = banner.children()[1]
//     oldmiddle.className = 'bannerimg banneranime middletoleft'
//     eventMoveRemove()
//     oldmiddle.className = 'bannerimg moveleft'
//     banner.append(banner.children()[0])
//     setTimeout(() => {
//       oldmiddle.className = 'bannerimg'
//     }, 0)
//     eventMoveAdd()
//     // automove()
//   }

//   const moveright = (event) => {
//     eventMoveRemove()
//     banner.children()[0].className = 'bannerimg moveright'
//     banner.prepend(banner.children()[2])
//     setTimeout(() => {
//       banner.children()[1].className = 'bannerimg'
//     }, 0)
//     eventMoveAdd()
//     // automove()
//   }
//   imgs[0].addEventListener('click', moveleft)
//   imgs[2].addEventListener('click', moveright)
//   // timeout = setTimeout(() => {
//   //   moveright()
//   // }, 3000)
// }

const bindBanner = (bannerDoms) => {
  const banner = j('#id-container-banner .banner')
  const pstart = {}
  const pcurrent = {}
  let lefttop
  let timeout = null

  const automoveStop = () => {
    if (timeout !== null) {
      clearTimeout(timeout)
    }
  }

  const automoveStart = () => {
    automoveStop()
    timeout = setTimeout(() => {
      moveright()
    }, 5000)
  }

  const moveleft = (event) => {
    // 向左,
    // 移除外部最后一个, 加到内部最后一个
    const newdom = bannerDoms.pop()
    newdom.attr('class', 'bannerimg newright')
    banner.append(newdom)

    // 移除内部第一个加到外部第一个
    const unused = banner.children(':first-child')
    bannerDoms.unshift(unused)
    unused.remove()
    newdom.attr('class', 'bannerimg')
    bindMiddleimg(j(banner.children(':nth-child(2)')))
  }

  const moveright = (event) => {
    // 向右
    // 移除外部第一个, 加入内部第一个
    const newdom = bannerDoms.shift()
    newdom.attr('class', 'bannerimg newleft')
    banner.prepend(newdom)

    // 移除内部最后一个, 加入外部最后一个
    const unused = banner.children(':last-child')
    bannerDoms.push(unused)
    unused.remove()
    newdom.attr('class', 'bannerimg')
    bindMiddleimg(j(banner.children(':nth-child(2)')))
  }

  const onTouchstart = (e) => {
    automoveStop()
    const img = j(e.delegateTarget)
    lefttop = img.position()
    const touch = e.touches[0]
    pstart.x = touch.clientX
    pcurrent.x = pstart.x
  }

  const onTouchmove = (e) => {
    event.preventDefault()
    const img = j(e.delegateTarget)
    const touch = e.touches[0]
    pcurrent.x = touch.clientX

    const left = lefttop.left + ((pcurrent.x - pstart.x) * img.innerWidth()) / window.innerWidth / 3

    const right = banner.innerWidth() - left - img.innerWidth()

    img.css({
      left,
      right,
      transform: 'translate(0)',
      transition: '0s',
    })
  }

  const onTouchend = (e) => {
    const img = j(e.delegateTarget)
    unbindMiddleimg()
    log(pcurrent.x, pstart.x)
    if (pcurrent.x < pstart.x) {
      img.css('transition', 'right')
      moveleft()
    } else if (pcurrent.x > pstart.x) {
      img.css('transition', 'left')
      moveright()
    } else {
      bindMiddleimg(img)
      img.click()
    }
    setTimeout(() => {
      img.removeAttr('style')
    }, 0)
  }

  const bindMiddleimg = (middleimg) => {
    middleimg.on('touchstart', onTouchstart)
    middleimg.on('touchmove', onTouchmove)
    middleimg.on('touchend', onTouchend)
    automoveStart()
  }

  const unbindMiddleimg = () => {
    banner.children().off('touchstart', onTouchstart)
    banner.children().off('touchmove', onTouchmove)
    banner.children().off('touchend', onTouchend)
  }

  bindMiddleimg(banner.children(':nth-child(2)'))
}

export default bindBanner
