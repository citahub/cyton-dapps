import j from 'jquery'
import { renderbyList } from '../../utils/templateDapps'
import { dappsLoaded } from '../../utils/dappsApi'
import { log } from '../../utils'
import Config from '../../config'

const main = () => {
  const container = j('#id-container-localdapplist')
  renderbyList(container, Config.history)
}

export default main
