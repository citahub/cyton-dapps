let _log = () => {
    return () => {}
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

const unbind = (element, eventName, callback) => {
    element.removeEventListener(eventName, callback)
}

const _e = (selector, element = document) => element.querySelector(selector)

const _es = (selector, element = document) => element.querySelectorAll(selector)

export {
    log,
    _e,
    _es,
    bind,
    unbind,
    localStoreParsed,
    localStoreStore,
}