import { log, _e, _es, bind } from './utils'
import { GlobalTable } from './global'
import { createHeaderAnime } from './headerAnime'

// with native
const startNativePage = (event) => {
  try {
    touchSearchbar()
  } catch (err) {
    log(err)
  }
  try {
    appHybrid.startAddWebsitePage()
  } catch (err) {
    log(err)
  }
  event.stopPropagation()
}

const bindEvents = () => {
  const { searchBar } = GlobalTable.elementTable
  const earth = _es('.headerSearchIcon')[1]
  bind(searchBar, 'click', startNativePage)
  bind(earth, 'click', startNativePage)

  const headerAnime = createHeaderAnime()
  bind(window, 'scroll', headerAnime)
}

export { bindEvents }
