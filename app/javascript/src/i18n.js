const i18nData = {
  en: {
    more: "More",
    noData: "No Data"
  },
  "zh-CN": {
    more: "更多",
    noData: "无数据显示"
  }
}

export const currentLocale = () => {
  return $('meta[name=locale]').attr('content');
}

export const currentLocaleData = () => {
  return i18nData[currentLocale()]
}
