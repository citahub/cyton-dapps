let _log = () => {
  // return () => {}
  return console.log.bind(console, '>>>')
}
const log = _log()

const localStoreParsed = (key) => {
  const json = localStorage.getItem(key)
  if (json) {
    const value = JSON.parse(json)
    return value
  } else {
    return null
  }
}

const localStoreStore = (key, value) => {
  const json = JSON.stringify(value)
  localStorage.setItem(key, json)
}

const bind = (element, eventName, callback) => {
  element.addEventListener(eventName, callback)
}

const binds = (elements, eventName, callback) => {
  elements.forEach((element) => {
    bind(element, eventName, callback)
  })
}

const unbind = (element, eventName, callback) => {
  element.removeEventListener(eventName, callback)
}

const _e = (selector, element = document) => element.querySelector(selector)

const _es = (selector, element = document) => element.querySelectorAll(selector)

const setStyle = (element, style) => {
  Object.keys(style).forEach((key) => {
    element.style[key] = style[key]
  })
}

const setStyles = (elements, style) => {
  elements.forEach((element) => setStyle(element, style))
}

const newElement = (tag = 'div') => {
  return document.createElement(tag)
}

export { log, _e, _es, bind, binds, unbind, setStyle, setStyles, newElement, localStoreParsed, localStoreStore }
