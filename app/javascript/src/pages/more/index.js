import j from 'jquery'
import { renderbyList } from '../../template/more'
import { dappsLoaded } from '../../utils/dappsApi'
import { log } from '../../utils'
import Config from '../../config'
import jsontable from '../../utils/jsonApi'
import { titlebarNormal } from '../../utils/tablebar'
import { trackDapplist } from '../../utils/sensors'
import { currentLocale } from "../../i18n"

const bindTrackDapplist = (container) => {
  container.find('.dapp').each(function () {
    const dapp = $(this)
    const category = dapp.attr('data-category')
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
  // const url = jsontable.more(location.href, currentLocale())
  const url = location.protocol + "//" + location.host + location.pathname + ".json" + location.search
  const arr = location.pathname.split("/")
  const get_type_url = location.protocol + "//" + location.host + "/dapps/type/" + arr[arr.length - 1]
  j.get(get_type_url, (resp)=> {
    document.title = resp.name
    const container = j('#id-container-dapplist')
    j.get(url, (data) => {
      const type = document.title
      renderbyList(container, data, type)
      bindTrackDapplist(container)
    })
  })
}

export default main
