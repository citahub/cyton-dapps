const parsedUserAgent = () => {
  const test =
    'Mozilla/5.0 (Linux; Android 8.1.0; ONEPLUS A6000 Build/OPM1.171019.011; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.158 Mobile Safari/537.36 Neuron(Platform=Android&AppVersion=0.6.3.180919)'
  // const userAgent = test

  const userAgent = navigator.userAgent
  let str = userAgent.split('Neuron(')[1]
  if (str === undefined) {
    console.warn('Not found Neuron info')
    return {
      platform: 'ios',
      version: '0.0.0.000000',
      notNeuron: true,
    }
  } else {
    str = str.split(')')[0]
  }
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

export default parsedUserAgent()
