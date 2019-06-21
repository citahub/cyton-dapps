import platforminfo from './platform'

const log = console.log.bind(console, '>>>')

const parsedPlatformVersion = () => {
  const { platform, version, notCyton } = platforminfo
  const s = notCyton ? '' : `${platform}_version=${version}`
  return s
}

const initJsonApiTable = () => {
  const version = parsedPlatformVersion()
  const origin = location.origin

  const createdUrl = (pathname) => {
    // 临时性测试用
    return `${origin}/${pathname}.json?${version}`
  }

  const keylist = ['banners', 'dapps']
  const table = {}
  keylist.forEach((key) => {
    table[key] = createdUrl(key)
  })

  table.more = (href, locale) => {
    return `${href}.json?${version}&locale=${locale}`
  }

  return table
}

export default initJsonApiTable()

export { parsedUserAgent }
