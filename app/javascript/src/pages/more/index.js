import j from 'jquery'
import { renderbyList } from '../../utils/templateMore'
import { dappsLoaded } from '../../utils/dappsApi'
import { log } from '../../utils'
import Config from '../../config'

const main = ({ pname }) => {
  const ios = 'ios_version=0.0.0.000000'
  const url = `${location.origin}/dapps.json?/${ios}`
  const container = j('#id-container-dapplist')
  j.get(url, (data) => {
    const info = data.find((obj) => {
      return obj.type === pname
    })
    renderbyList(container, info.value)
  })
}

export default main
