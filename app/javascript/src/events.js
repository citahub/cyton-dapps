import { log, _e, bind } from './utils.js'
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
  const { searchBar, headerAnime2 } = GlobalTable.elementTable
  const earth = _e('.headerSearchIcon', headerAnime2)
  bind(searchBar, 'click', startNativePage)
  bind(earth, 'click', startNativePage)

  const headerAnime = createHeaderAnime()
  bind(window, 'scroll', headerAnime)
}

export { bindEvents }
