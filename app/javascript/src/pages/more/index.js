import j from 'jquery'
import { renderbyList } from '../../template/more'
import { dappsLoaded } from '../../utils/dappsApi'
import { log } from '../../utils'
import Config from '../../config'
import jsontable from '../../utils/jsonApi'
import { titlebarNormal } from '../../utils/tablebar'
import { trackDapplist } from '../../utils/sensors'

const bindTrackDapplist = (container) => {
  container.find('.dapp').each(function () {
    const dapp = $(this)
    const category = dapp.attr('data-catagory')
    const name = dapp.attr('data-name')
    dapp.on('click', function () {
      trackDapplist({
        DApp_category: category,
        DApp_name: name,
      })
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
    const type = document.title
    renderbyList(container, data, type)
    bindTrackDapplist(container)
  })
}

export default main
