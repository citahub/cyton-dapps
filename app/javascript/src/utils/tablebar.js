import neuronMethods from './neuron'
import { log } from './index'

/*
  {
    "title": {
        "name": "DApp",
        "backgroundColor": "AAFFFFFF"
    },
    "left": {
        "type": "back",     // back：返回箭头  close：关闭叉号
        "action": "jsFunction",
    },
    "right": {
        "isShow": true,
        "action": "jsFunction"
        "type": "menu" // menu：三横线折叠菜单  share：分享  something: 自定义
    },

}
*/

const titlebarNormal = () => {
  const o = {
    left: {
      type: 'back',
    },
    right: {
      isShow: false,
    },
  }
  const json = JSON.stringify(o)
  neuronMethods.setTitlebar(json)
}

const titlebarShow = () => {
  const o = {
    left: {
      type: 'back',
    },
    right: {
      isShow: true,
      type: 'share',
    },
  }
  const json = JSON.stringify(o)
  neuronMethods.setTitlebar(json)
}

export { titlebarNormal, titlebarShow }
