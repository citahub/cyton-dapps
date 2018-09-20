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
  const imgs = banner.children()
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
    const newdom = bannerDoms.pop()
    newdom.attr('class', 'bannerimg newright')
    banner.append(newdom)

    setTimeout(() => {
      const unused = banner.children(':first-child')
      bannerDoms.unshift(unused)
      unused.remove()
      newdom.attr('class', 'bannerimg')
      bindMiddleimg(j(banner.children(':nth-child(2)')))
    }, 0)
  }

  const moveright = (event) => {
    const newdom = bannerDoms.shift()
    newdom.attr('class', 'bannerimg newleft')
    banner.prepend(newdom)

    setTimeout(() => {
      const unused = banner.children(':last-child')
      bannerDoms.push(unused)
      unused.remove()
      newdom.attr('class', 'bannerimg')
      bindMiddleimg(j(banner.children(':nth-child(2)')))
    }, 0)
  }

  const onTouchstart = (e) => {
    automoveStop()
    const img = j(e.target)
    lefttop = img.position()
    const touch = e.touches[0]
    pstart.x = touch.clientX
  }

  const onTouchmove = (e) => {
    event.preventDefault()
    const img = j(e.target)
    const touch = e.touches[0]
    pcurrent.x = touch.clientX


    const left = lefttop.left + ((pcurrent.x - pstart.x) * img.innerWidth()) / window.innerWidth / 3

    const right = banner.innerWidth() - left - img.innerWidth()
    log(right)

    img.css({
      left,
      right,
      transform: 'translate(0)',
      transition: '0s',
    })
  }

  const onTouchend = (e) => {
    const img = j(e.target)
    unbindMiddleimg(img)
    if (pcurrent.x < pstart.x) {
      img.css('transition', 'right')
      moveleft()
    } else {
      img.css('transition', 'left')
      moveright()
    }
    setTimeout(() => {
      img.removeAttr('style')
    }, 0)
  }

  const bindMiddleimg = (middleimg) => {
    middleimg.on('touchstart', onTouchstart)
    middleimg.on('touchmove', onTouchmove)
    middleimg.on('touchend', onTouchend)
    // automoveStart()
  }

  const unbindMiddleimg = (middleimg) => {
    middleimg.off('touchstart', onTouchstart)
    middleimg.off('touchmove', onTouchmove)
    middleimg.off('touchend', onTouchend)
  }

  bindMiddleimg(j(imgs[1]))
}

export default bindBanner
