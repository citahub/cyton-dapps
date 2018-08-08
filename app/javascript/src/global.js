import { log, _e, _es, bind, setStyle, setStyles, localStoreParsed, localStoreStore } from './utils.js'

const GlobalTable = {}

const initElementTable = () => {
  const header = _e('#id-header')
  const dapps = _e('#id-dapps')
  const searchBar = _e('#id-searchBar')
  GlobalTable.elementTable = {
    header,
    dapps,
    searchBar,
  }
}

export { GlobalTable, initElementTable }
