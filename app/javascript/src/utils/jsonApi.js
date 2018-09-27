import platforminfo from './platform'

const log = console.log.bind(console, '>>>')

const parsedPlatformVersion = () => {
  const { platform, version, notNeuron } = platforminfo
  const s = notNeuron ? '' : `${platform}_version=${version}`
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

  table.more = (href) => {
    return `${href}.json?${version}`
  }

  return table
}

export default initJsonApiTable()

export { parsedUserAgent }
