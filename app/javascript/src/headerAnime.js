import { GlobalTable } from './global'
import { _e, _es, setStyle, setStyles } from './utils.js'

const createHeaderAnime = () => {
  const { header, dapps } = GlobalTable.elementTable

  const headerNav = _e('.headerNav', header)
  const title = _e('.headerTitleContainer', header)
  const input = _e('.headerSearch', header)
  const icon = _e('.headerSearchIcon', headerNav)
  const items = _es('.headerNavItem')
  const itemActive = _e('.headerNavItem.active')

  const { bottom: h } = input.getBoundingClientRect()
  const { bottom: dappsEndTop } = header.getBoundingClientRect()

  const transition = (start, end) => {
    const step = (end - start) / h
    return (n) => start + n * step
  }

  const transitionsColor = (color1, color2) => {
    const steps = color1.map((c1, i) => {
      const step = (color2[i] - c1) / h
      return step
    })
    const colorfunc = (n) => {
      const color = color1.map((c1, i) => {
        let s = c1 + n * steps[i]
        s = Math.floor(s)
        return s
      })
      const c = `rgb(${color.join(', ')})`
      return c
    }
    return colorfunc
  }

  const iconTop = transition(150, 50)
  const headerBackColor1 = transitionsColor([54, 95, 255], [255, 255, 255])
  const headerBackColor2 = transitionsColor([79, 114, 255], [255, 255, 255])
  const headerBorderColor = transitionsColor([79, 114, 255], [248, 248, 250])
  const itemsColor = transitionsColor([187, 201, 255], [138, 141, 159])
  const itemActiveColor = transitionsColor([255, 255, 255], [38, 42, 68])

  let changing = true

  const eventfunc = () => {
    // const { bottom: n } = header.getBoundingClientRect()
    const n = document.body.scrollTop + document.documentElement.scrollTop
    const setStateBegin = () => {
      setStyle(icon, {
        top: '100%',
        transform: 'translate(0%, 0%)',
      })
      setStyle(header, {
        background: 'linear-gradient(to bottom, #365FFF, #4F72FF)',
        position: 'relative',
        borderBottom: '1px solid #4F72FF',
      })
      setStyle(title, {
        display: 'block',
      })
      setStyles(items, {
        color: '#bbc9ff',
      })
      setStyle(itemActive, {
        color: '#fff',
      })
      setStyle(dapps, {
        marginTop: 0,
      })
    }

    const changeState = () => {
      setStyle(icon, {
        top: `${iconTop(n)}%`,
      })
      setStyle(header, {
        background: `linear-gradient(to bottom, ${headerBackColor1(n)}, ${headerBackColor2(n)})`,
        borderBottom: `1px solid ${headerBorderColor(n)}`,
        position: 'relative',
      })
      setStyle(title, {
        display: 'block',
      })
      setStyles(items, {
        color: itemsColor(n),
      })
      setStyle(itemActive, {
        color: itemActiveColor(n),
      })
      setStyle(dapps, {
        marginTop: 0,
      })
      changing = true
    }

    const setStateEnd = () => {
      setStyle(icon, {
        top: '50%',
        transform: 'translate(0%, -50%)',
      })
      setStyle(header, {
        background: 'linear-gradient(to bottom, #fff, #fff)',
        borderBottom: `1px solid #f8f8fa`,
        position: 'fixed',
        // top: `${-h}px`,
      })
      setStyle(title, {
        display: 'none',
      })
      setStyles(items, {
        color: '#8a8d9f',
      })
      setStyle(itemActive, {
        color: '#262a44',
      })
      setStyle(dapps, {
        marginTop: `${dappsEndTop}px`,
      })
      // window.scroll(0, n)
      changing = false
    }

    if (n === 0) {
      setStateBegin()
    } else if (0 < n && n <= h) {
      changeState()
    } else if (n > h && changing === true) {
      setStateEnd()
    }
  }
  return eventfunc
}

export { createHeaderAnime }
