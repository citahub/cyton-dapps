import j from 'jquery'
import { renderbyList } from '../../template/dapps'
import { dappsLoaded } from '../../utils/dappsApi'
import { log } from '../../utils'
import Config from '../../config'

const main = () => {
  const container = j('#id-container-dapplist')
  renderbyList(container, Config.mine)
}

export default main
