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

  const initBanner = () => {
    const domlist = [bannerList[0].jquery, bannerList[1].jquery, bannerList[bannerLength - 1].jquery]
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
    // 向左,
    // 移除外部最后一个, 加到内部最后一个
    let newindex = currentindex + 2
    if (newindex > bannerLength - 1) {
      newindex = newindex - bannerLength
    }
    currentindex += 1
    if (currentindex > bannerLength - 1) {
      currentindex = currentindex - bannerLength
    }
    const newinfo = bannerList[newindex]
    const newdom = newinfo.jquery
    newdom.attr('class', 'bannerimg newright')
    banner.append(newdom)

    // 移除内部第一个加到外部第一个
    const unused = banner.children(':first-child')
    unused.remove()
    newdom.attr('class', 'bannerimg')
    bindMiddleimg(j(banner.children(':nth-child(2)')), bannerList[currentindex].props)
  }

  const moveright = (event) => {
    // 向右
    // 移除外部第一个, 加入内部第一个
    let newindex = currentindex - 2
    if (newindex < 0) {
      newindex = newindex + bannerLength
    }
    currentindex -= 1
    if (currentindex < 0) {
      currentindex = currentindex + bannerLength
    }
    const newinfo = bannerList[newindex]
    const newdom = newinfo.jquery
    newdom.attr('class', 'bannerimg newleft')
    banner.prepend(newdom)

    // 移除内部最后一个, 加入外部最后一个
    const unused = banner.children(':last-child')
    bannerList.push(unused)
    unused.remove()
    newdom.attr('class', 'bannerimg')
    bindMiddleimg(j(banner.children(':nth-child(2)')), bannerList[currentindex].props)
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

  // const onMousedown = (e) => {
  //   automoveStop()
  //   const img = j(e.delegateTarget)
  //   imgInnerPosition = img.position()
  //   imgLeft = img.offset().left
  //   pstart.x = e.offsetX
  //   pcurrent.x = pstart.x
  //   mousedown = true
  // }

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

  // const onMousemove = (e) => {
  //   if (mousedown) {
  //     event.preventDefault()
  //     event.stopPropagation()
  //     event.stopImmediatePropagation()
  //     const img = j(e.delegateTarget)
  //     pcurrent.x = e.offsetX

  //     log(imgInnerPosition)
  //     const left = imgInnerPosition.left + ((pcurrent.x - pstart.x) * img.innerWidth()) / window.innerWidth / 3

  //     const right = banner.innerWidth() - left - img.innerWidth()

  //     img.css({
  //       left,
  //       right,
  //       transform: 'translate(0)',
  //       transition: 'left 0s',
  //     })
  //   }
  // }

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
      // img.click()
    }
    setTimeout(() => {
      img.removeAttr('style')
    }, 0)
  }

  const onClick = (element, props) => () => {
    log('on click props', props)
    trackDappbanner(element, props, console.log.bind('track dapp banner'))
  }

  const eventtable = {
    touchend: null,
    click: null,
  }

  const bindMiddleimg = (middleimg) => {
    middleimg.on('touchstart', onTouchstart)
    // middleimg.on('mousedown', onMousedown)

    middleimg.on('touchmove', onTouchmove)
    // middleimg.on('mousemove', onMousemove)

    const props = bannerList[currentindex].props
    eventtable.touchend = onTouchend(props)
    middleimg.on('touchend', eventtable.touchend)

    eventtable.click = onClick(middleimg[0], props)
    middleimg.on('click', eventtable.click)

    // middleimg.on('mouseup', onTouchend)
    automoveStart()
  }

  const unbindMiddleimg = () => {
    banner.children().off('touchstart', onTouchstart)
    // banner.children().off('mousedown', onMousedown)
    banner.children().off('touchmove', onTouchmove)
    // banner.children().off('mousemove', onMousemove)
    banner.children().off('touchend', eventtable.touchend)
    banner.children().off('click', eventtable.click)
    // banner.children().off('mouseup', onTouchend)
  }

  const main = () => {
    initBanner()
    bindMiddleimg(banner.children(':nth-child(2)'))
  }

  main()
}

export default bindBanner
