import j from 'jquery'
import { renderbyList } from '../../template/dapps'
import { dappsLoaded } from '../../utils/dappsApi'
import { log } from '../../utils'
import Config from '../../config'
import { titlebarNormal } from '../../utils/tablebar'

const main = () => {
  titlebarNormal()
  const container = j('#id-container-dapplist')
  renderbyList(container, Config.history)
}

export default main
