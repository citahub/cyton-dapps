import j from 'jquery'
import { log } from '../../utils'

const bindPulldownRefresh = () => {
  const doc = j(document)
  let yStart
  let yEnd
  const onTouchstart = (e) => {
    yStart = e.touches[0].pageY
  }
  const onTouchmove = (e) => {
    yEnd = e.touches[0].pageY
  }
  const onTouchend = (e) => {
    if (window.scrollY <= 0 && yEnd - yStart > 60) {
      location.reload()
    }
  }
  const bind = () => {
    doc.on('touchstart', onTouchstart)
    doc.on('touchmove', onTouchmove)
    doc.on('touchend', onTouchend)
  }
  bind()
}

export { bindPulldownRefresh }
