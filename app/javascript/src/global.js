import { _e, _es } from './utils.js'
import test from 'src/imgs/icon/test.svg'
import foot from 'src/imgs/icon/foot.svg'

const renderkeyTable = {
  mydapps: {
    local: '__viewInfoList_mydapps',
    title: '我的收藏',
    icon: test,
  },
  myhistory: {
    local: '__viewInfoList_myhistory',
    title: '我的足迹',
    icon: foot,
    maxlength: 20,
  },
}

const GlobalTable = {
  renderkeyTable,
}

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

const initGlobalTable = () => {
  initElementTable()
}

export { GlobalTable, initGlobalTable }
