import j from 'jquery'
import { renderbyList } from '../../template/more'
import { dappsLoaded } from '../../utils/dappsApi'
import { log } from '../../utils'
import Config from '../../config'
import jsontable from '../../utils/jsonApi'
import { titlebarNormal } from '../../utils/tablebar'
import { trackDapplist } from '../../utils/sensors'

const bindTrackDapplist = (container) => {
  container.each(function() {
    const dapp = j(this)
    const category = dapp.attr('data-category')
    const name = dapp.attr('data-name')

    trackDapplist(this, {
      DApp_category: category,
      DApp_name: name,
    })
  })
}

const main = ({ pname }) => {
  titlebarNormal()
  const url = jsontable.more(location.href)
  const pathnames = location.pathname.split('/')
  document.title = decodeURI(pathnames[pathnames.length - 1])
  const container = j('#id-container-dapplist')
  j.get(url, (data) => {
    // const info = data.find((obj) => {
    //   return obj.type === pname
    // })
    const type = document.title
    renderbyList(container, data, type)
    bindTrackDapplist(container)
  })
}

export default main
