# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# for develop

dapp_types = [
  { name: "人气推荐" },
  { name: "游戏" },
  { name: "去中心化交易所" },
  { name: "行情" },
  { name: "效率" },
  { name: "探索" },
  { name: "其它" }
]

def start_at()
  Time.now
end

def end_at()
  Time.now + 1.year
end

def create_dapp(dapps, type)
  normal = {
    dapp_type_id: type.id, 
    start_at: start_at, 
    end_at: end_at, 
    desc: '全球潮流音乐，搭配舞蹈、表演等内容形式，还有超多原创特效、滤镜、场景切换帮你一秒变大片，为你打造刷爆朋友圈的魔性短视频。脑洞有多大，舞台就有多大！好玩的人都在这儿！', 
    score: 1, 
    developer: 'developer', 
    marketing_url: 'https://dapp.cryptape.com/faucet/', 
    intro: '东半球最最好玩的游戏',
    url_address: "https://dapp.cryptape.com/demo/first-forever",
    d_type: :new_dapp,
    logo_url: "https://cdn.cryptape.com/neuron/Artboard3.png",
    ios_version: "0.0.0.000000",
    android_version: "0.0.0.000000",
  }
  Dapp.create(dapps.map { |n| normal.merge(n) })
end

def create_banner(banners)
  normal = {
    start_at: start_at, 
    end_at: end_at,
    image_url: "https://img.chainnews.com/material/images/f15b61d0a3256e8af33eaebadc735cba.jpg",
    ios_version: "0.0.0.000000",
    android_version: "0.0.0.000000",
  }
  
  Banner.create!(banners.map { |n| normal.merge(n) })
end

dapps = [
  {
    name: "First Forever",
    url_address: "https://dapp.cryptape.com/demo/first-forever",
    logo_url: "https://cdn.cryptape.com/neuron/Artboard3.png",
    ios_version: "1.0.0.000000",
    android_version: "1.0.0.000000",
  },
  {
    name: "AppChain Testnet Faucet",
    url_address: "https://dapp.cryptape.com/faucet",
    logo_url: "https://avatars1.githubusercontent.com/u/35361817",
    ios_version: "2.0.0.000000",
    android_version: "2.0.0.000000",
  },
  {
    name: "Hyperdragon",
    url_address: "https://hyperdragons.alfakingdom.com/",
    logo_url: "https://hyperdragons.alfakingdom.com/favicon.ico",
    ios_version: "3.0.0.000000",
    android_version: "3.0.0.000000",
  },
  {
    name: "DApp Review",
    url_address: "https://dapp.review/explore",
    logo_url: "https://dapp.review/favicon.ico",
  }
]

banners = [
  {
    address: '1',
    image_url: 'http://img.newyx.net/article/image/201611/23/f5b8a4546b.jpg',

  },
  {
    address: '2',
    image_url: 'http://ifanr-cdn.b0.upaiyun.com/wp-content/uploads/2017/07/maliao.jpg',

  },
  {
    address: '3',
    image_url: 'https://driver.cool3c.com/files/7/playstation-now.jpg',
  },
  {
    address: '4',
    image_url: 'https://photo.sofun.tw/2014/08/Plants-VS-Zombies-2-Logo.jpg',
  },
  {
    address: '5',
  },
  {
    address: '6',
  },
  {
    address: '7',
  },
]

ApplicationRecord.transaction do
  create_banner banners
  
  DappType.create!(dapp_types)
  popular_type = DappType.find_by(name: "人气推荐")
  game_type = DappType.find_by(name: "游戏")
  create_dapp dapps, popular_type
  create_dapp dapps, game_type
end
