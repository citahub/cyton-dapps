import j from 'jquery'
import { log } from '../../utils'
import jsontable from '../../utils/jsonApi'
import { trackDappbanner } from '../../utils/sensors'

const bindBanner = (bannerList) => {
  const banner = j('#id-container-banner .banner')
  const bannerLength = bannerList.length
  const pstart = {}
  const pcurrent = {}
  let currentindex = 0
  let nextindex = 1
  let imgInnerPosition
  let imgLeft
  let timeout = null
  let mousedown = false

  const nav = j('#id-container-banner .navs')

  const updateNav = (currentindex) => {
    nav.children('.active').removeClass('active')
    nav.children(`:nth-child(${currentindex + 1})`).addClass('active')
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
      moveleft()
    }, 5000)
  }

  const moveleft = (event) => {
    // left <-, current increase, 7 0 1 -> 0 1 2
    currentindex += 1
    if (currentindex > bannerLength - 1) {
      currentindex = currentindex - bannerLength
    }

    let newindex = currentindex + 1
    if (newindex > bannerLength - 1) {
      newindex = newindex - bannerLength
    }

    const newdom = bannerList[newindex].jquery
    newdom.attr('class', 'bannerimg newright')
    banner.append(newdom)

    const unused = banner.children(':first-child')
    unused.remove()

    newdom.attr('class', 'bannerimg')
    bindMiddleimg(j(banner.children(':nth-child(2)')), bannerList[currentindex].props)
    updateNav(currentindex)
  }

  const moveright = (event) => {
    // right -> , current decrease, 7 0 1 -> 6 7 0
    currentindex -= 1
    if (currentindex < 0) {
      currentindex = currentindex + bannerLength
    }

    let newindex = currentindex - 1
    if (newindex < 0) {
      newindex = newindex + bannerLength
    }

    const newdom = bannerList[newindex].jquery
    newdom.attr('class', 'bannerimg newleft')
    banner.prepend(newdom)

    const unused = banner.children(':last-child')
    unused.remove()

    newdom.attr('class', 'bannerimg')
    bindMiddleimg(j(banner.children(':nth-child(2)')), bannerList[currentindex].props)
    updateNav(currentindex)
  }

  const onTouchstart = (e) => {
    automoveStop()
    const img = j(e.delegateTarget)
    imgInnerPosition = img.position()
    imgLeft = img.offset().left
    const touch = e.touches[0]
    pstart.x = touch.clientX
    pcurrent.x = pstart.x

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
    pcurrent.x = touch.clientX

    const left = imgInnerPosition.left + ((pcurrent.x - pstart.x) * img.innerWidth()) / window.innerWidth / 3

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
    mousedown = false
    const img = j(e.delegateTarget)
    unbindMiddleimg()
    if (img.offset().left < imgLeft) {
      img.css('transition', 'right')
      moveleft()
    } else if (img.offset().left > imgLeft) {
      img.css('transition', 'left')
      moveright()
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

    const props = bannerList[currentindex].props
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
