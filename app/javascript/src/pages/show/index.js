import j from 'jquery'
import { renderbyList } from '../../template/more'
import { dappsLoaded } from '../../utils/dappsApi'
import { log } from '../../utils'
import Config from '../../config'
import jsontable from '../../utils/jsonApi'
import { titlebarNormal } from '../../utils/tablebar'
import { trackDappdetails, trackDappbutton } from '../../utils/sensors'

const main = ({ pname }) => {
  titlebarNormal()
  const store = j('#id-store')
  const category = store.attr('data-category')
  const name = store.attr('data-name')
  trackDappdetails({
    DApp_category: category,
  })
  const gotobutton = j('#id-container-other .goto')
  trackDappbutton(gotobutton, {
    DApp_category: category,
    DApp_name: name,
  })
}

export default main
