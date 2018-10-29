import sensors from 'sa-sdk-javascript'
import environment from './environment'
import { log } from './index'

const init = () => {
  sensors.init({
    server_url: 'https://banana.cryptape.com:8106/sa?project=default',
    //heatmap_url神策分析中点击分析及触达分析功能代码，代码生成工具会自动生成。如果神策代码中 `sensorsdata.min.js` 版本是 1.9.1 及以上版本，这个参数必须配置，低于此版本不需要配置。
    heatmap_url: './heatmap.min.js',
    //web_url 神策分析中点击分析及触达分析功能会用到此地址，代码生成工具会自动生成。如果神策后台版本及 `sensorsdata.min.js` 均是 1.10 及以上版本，这个参数不需要配置。
    web_url: 'https://banana.cryptape.com:8106',
    heatmap: {
      //是否开启点击图，默认 default 表示开启，自动采集 $WebClick 事件，可以设置 'not_collect' 表示关闭
      //需要 JSSDK 版本号大于 1.7
      clickmap: 'default',
      //是否开启触达注意力图，默认 default 表示开启，自动采集 $WebStay 事件，可以设置 'not_collect' 表示关闭
      //需要 JSSDK 版本号大于 1.9.1
      scroll_notice_map: 'not_collect',
    },
    use_app_track: true,
    use_client_time: true,
    show_log: environment === 'development',
  })
  const distinct_id = sensors.store.getDistinctId()
  sensors.login(distinct_id)
  sensors.quick('autoTrack')
}

const trackDappbanner = (element, props, callback = null) => {
  // sensors.trackLink(element, 'DApp_banner', props, callback)
  sensors.track('DApp_banner', props, callback)
}

const trackDappdetails = (props, callback = null) => {
  sensors.track('DApp_details', props, callback)
}

const trackDappbutton = (element, props, callback = null) => {
  // sensors.trackLink(element, 'DApp_button', props, callback)
  sensors.track('DApp_button', props, callback)
}

const trackDapplist = (element, props, callback = null) => {
  // sensors.trackLink(element, 'DApp_list', props, callback)
  sensors.track('DApp_list', props, callback)
}

// const trackDappusetime = (element, props, callback = null) => {
//   log('trackDappusetime')
//   sensors.trackLink(element, 'DApp_usetime', props, callback)
// }

// const test = () => {
//   sensors.track('test_event_name', { test_key: 'test_value' }, console.log.bind('test:\n'))
// }

const main = () => {
  init()
  // test()
}

main()

export {
  sensors,
  trackDappbanner,
  trackDappdetails,
  trackDappbutton,
  trackDapplist,
  // trackDappusetime,
}
