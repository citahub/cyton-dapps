import j from 'jquery'

const environment = () => {
  const env = j('meta[name=environment]').attr('content')
  console.log('current environment:', env)
  return env
}

export default environment()
