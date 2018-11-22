import j from 'jquery'
import { log } from '../../utils'
import jsontable from '../../utils/jsonApi'
import { trackDappbanner } from '../../utils/sensors'

const bindBanner = (bannerList) => {
  const banner = j('#id-container-banner .banner')
  const bannerLength = bannerList.length
  const pointStart = {}
  const pointCurrent = {}
  let currentIndex = 0
  let imgInnerPosition
  let imgLeft
  let timeout = null

  const nav = j('#id-container-banner .navs')

  const updateNav = (currentIndex) => {
    nav.children('.active').removeClass('active')
    nav.children(`:nth-child(${currentIndex + 1})`).addClass('active')
  }

  const initBanner = () => {
    const domlist = [bannerList[bannerLength - 1].jquery, bannerList[0].jquery, bannerList[1].jquery]
    banner.append(domlist)
  }

  const automoveStop = () => {
    if (timeout !== null) {
      clearTimeout(timeout)
    }
  }

  const automoveStart = () => {
    automoveStop()
    timeout = setTimeout(() => {
      moveLeft()
    }, 5000)
  }

  const moveLeft = (event) => {
    // left <-, current increase, 7 0 1 -> 0 1 2
    currentIndex += 1
    if (currentIndex > bannerLength - 1) {
      currentIndex = 0
    }

    let newIndex = currentIndex + 1
    if (newIndex > bannerLength - 1) {
      newIndex = 0
    }

    const newDom = bannerList[newIndex].jquery
    newDom.attr('class', 'bannerimg newright')
    banner.append(newDom)

    const unused = banner.children(':first-child')
    unused.remove()

    newDom.attr('class', 'bannerimg')
    bindMiddleimg(j(banner.children(':nth-child(2)')), bannerList[currentIndex].props)
    updateNav(currentIndex)
  }

  const moveRight = (event) => {
    // right -> , current decrease, 7 0 1 -> 6 7 0
    currentIndex -= 1
    if (currentIndex < 0) {
      currentIndex = currentIndex + bannerLength
    }

    let newIndex = currentIndex - 1
    if (newIndex < 0) {
      newIndex = newIndex + bannerLength
    }

    const newDom = bannerList[newIndex].jquery
    newDom.attr('class', 'bannerimg newleft')
    banner.prepend(newDom)

    const unused = banner.children(':last-child')
    unused.remove()

    newDom.attr('class', 'bannerimg')
    bindMiddleimg(j(banner.children(':nth-child(2)')), bannerList[currentIndex].props)
    updateNav(currentIndex)
  }

  const onTouchstart = (e) => {
    automoveStop()
    const img = j(e.delegateTarget)
    imgInnerPosition = img.position()
    imgLeft = img.offset().left
    const touch = e.touches[0]
    pointStart.x = touch.clientX
    pointCurrent.x = pointStart.x

    const left = imgInnerPosition.left
    const right = banner.innerWidth() - left - img.innerWidth()
    img.css({
      left,
      right,
      transform: 'translate(0)',
      transition: 'left 0s',
    })
  }

  const onTouchmove = (e) => {
    event.preventDefault()
    const img = j(e.delegateTarget)
    const touch = e.touches[0]
    pointCurrent.x = touch.clientX

    const left = imgInnerPosition.left + ((pointCurrent.x - pointStart.x) * img.innerWidth()) / window.innerWidth / 3

    const right = banner.innerWidth() - left - img.innerWidth()

    img.css({
      left,
      right,
      transform: 'translate(0)',
      transition: '0s',
    })
  }

  const onTouchend = (props) => (e) => {
    e.stopPropagation()
    const img = j(e.delegateTarget)
    unbindMiddleimg()
    if (img.offset().left < imgLeft) {
      img.css('transition', 'right')
      moveLeft()
    } else if (img.offset().left > imgLeft) {
      img.css('transition', 'left')
      moveRight()
    } else {
      bindMiddleimg(img, props)
      onClick(img, props)
    }
    setTimeout(() => {
      img.removeAttr('style')
    }, 0)
  }

  const onClick = (element, props) => () => {
    trackDappbanner(props)
  }

  const eventtable = {
    touchend: null,
    click: null,
  }

  const bindMiddleimg = (middleimg) => {
    middleimg.on('touchstart', onTouchstart)
    middleimg.on('touchmove', onTouchmove)

    const props = bannerList[currentIndex].props
    eventtable.touchend = onTouchend(props)
    middleimg.on('touchend', eventtable.touchend)

    eventtable.click = onClick(middleimg[0], props)
    middleimg.on('click', eventtable.click)
    automoveStart()
  }

  const unbindMiddleimg = () => {
    banner.children().off('touchstart', onTouchstart)
    banner.children().off('touchmove', onTouchmove)
    banner.children().off('touchend', eventtable.touchend)
    banner.children().off('click', eventtable.click)
  }

  const main = () => {
    initBanner()
    bindMiddleimg(banner.children(':nth-child(2)'))
  }

  main()
}

export default bindBanner
