import j from 'jquery'
import { renderbyList } from '../../template/more'
import { dappsLoaded } from '../../utils/dappsApi'
import { log } from '../../utils'
import Config from '../../config'
import jsontable from '../../utils/jsonApi'
import { titlebarNormal } from '../../utils/tablebar'

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
    renderbyList(container, data)
  })
}

export default main
