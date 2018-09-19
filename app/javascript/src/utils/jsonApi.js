const log = console.log.bind(console, '>>>')

const parsedUserAgent = () => {
  const test =
    'Mozilla/5.0 (Linux; Android 8.1.0; ONEPLUS A6000 Build/OPM1.171019.011; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.158 Mobile Safari/537.36 Neuron(Platform=Android&AppVersion=0.6.3.180919)'
  // const userAgent = test

  const userAgent = navigator.userAgent
  const str = userAgent.split('Neuron(')[1].split(')')[0]
  const info = {}
  const keytable = {
    Platform: 'platform',
    AppVersion: 'version',
  }
  str.split('&').forEach((s) => {
    const l = s.split('=')
    const key = keytable[l[0]] || l[0].toLowerCase()
    info[key] = l[1].toLowerCase()
  })
  return info
}

const parsedPlatformVersion = () => {
  let s
  try {
    const { platform, version } = parsedUserAgent()
    s = `${platform}_version=${version}`
  } catch (err) {
    console.warn('Fetch version error: ', err)
    s = 'ios_version=0.0.0.000000'
  }
  return s
}

const initJsonApiTable = () => {
  const version = parsedPlatformVersion()
  const origin = location.origin
  
  const createdUrl = (pathname) => {
    return `${origin}/${pathname}.json?/${version}`
  }
  
  const keylist = ['banners', 'dapps']
  const table = {}
  keylist.forEach((key) => {
    table[key] = createdUrl(key)
  })

  return table
}

export default initJsonApiTable()

export { parsedUserAgent }
