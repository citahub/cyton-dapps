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
    intro: 'dapp introduction',
    score: 5,
    developer: 'developer name',
    url_address: 'https://docs.citahub.com/zh-CN/toolchain/cyton/cyton-intro',
    desc: 'dapp description',
    marketing_url: "https://first-forever.citahub.com",
    d_type: :new_dapp,
    logo_url: "https://cdn.citahub.com/neuron/default_web_icon.png",
    ios_version: "0.0.0.000000",
    android_version: "0.0.0.000000",
  }
  Dapp.create(dapps.map { |n| normal.merge(n) })
end

def create_banner(banners)
  normal = {
    start_at: start_at,
    end_at: end_at,
    image_url: "https://place-hold.it/960x480/37a6a8/000000/000?text=Awesome%20DApp",
    ios_version: "0.0.0.000000",
    android_version: "0.0.0.000000",
  }

  Banner.create!(banners.map { |n| normal.merge(n) })
end

dapps = [
  {
    name: "First Forever",
    url_address: "https://first-forever.citahub.com",
    marketing_url: "https://first-forever.citahub.com",
    logo_url: "https://cdn.citahub.com/neuron/Artboard3.png",
    ios_version: "1.0.0.000000",
    android_version: "1.0.0.000000",
    developer: "https://www.rivtower.com",
    desc: "最初即永恒 - 把你重要的一刻，永存在链上",
    intro: "开源代码： https://github.com/citahub/first-forever-demo",
  },
  {
    name: "CITA Testnet Faucet",
    url_address: "https://faucet.citahub.com/faucet",
    marketing_url: "https://faucet.citahub.com/faucet",
    logo_url: "https://cdn.citahub.com/neuron/default_web_icon.png",
    ios_version: "2.0.0.000000",
    android_version: "2.0.0.000000",
    developer: "https://www.rivtower.com",
    desc: "CITA 测试链水龙头 - 领取测试链 token",
    intro: "开源代码： https://github.com/citahub/cita-testnet-faucet",
  },
  {
    name: "Hyperdragon",
    url_address: "http://hyperdragons.alfakingdom.com/",
    marketing_url: "http://hyperdragons.alfakingdom.com/?utm_source=Cyton",
    logo_url: "https://hyperdragons.alfakingdom.com/favicon.ico",
    ios_version: "3.0.0.000000",
    android_version: "3.0.0.000000",
    developer: "",
    desc: "云斗龙 是一款基于以太坊智能合约开发的有收藏价值，以及趣味游戏性的数字收藏品",
    intro: "云斗龙 是一款基于以太坊智能合约开发的有收藏价值，以及趣味游戏性的数字收藏品",
  },
  {
    name: "DApp Review",
    url_address: "https://dapp.review/explore",
    marketing_url: "https://dapp.review/explore?utm_source=Cyton",
    logo_url: "https://dapp.review/favicon.ico",
    developer: "DappReview",
    desc: "DappReview 是一个 DApp 评测平台，提供精确的 DApp 数据，用户洞察和市场数据分析",
    intro: "DappReview 是一个 DApp 评测平台，提供精确的 DApp 数据，用户洞察和市场数据分析",
  }
].reverse!

banners = [
  {
    address: '1',
    image_url: 'http://img.newyx.net/article/image/201611/23/f5b8a4546b.jpg',

  },
  {
    address: '2',
    image_url: 'https://pic1.zhimg.com/v2-192038154899b948110dbfbd7c5ec1ae_1440w.jpg',

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
