# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# for develop

dapp_types = [
  {name: "人气推荐"},
  {name: "游戏"},
  {name: "去中心化交易所"},
  {name: "行情"},
  {name: "效率"},
  {name: "探索"},
  {name: "其它"}
]

dapps = [
  {
    name: "First Forever",
    url_address: "https://dapp.cryptape.com/demo/first-forever",
    d_type: :new_dapp,
    logo_url: "https://cdn.cryptape.com/neuron/Artboard3.png",
    ios_version: "0.0.0.000000",
    android_version: "0.0.0.000000",
  },
  {
    name: "AppChain Testnet Faucet",
    url_address: "https://dapp.cryptape.com/faucet",
    d_type: :new_dapp,
    logo_url: "https://avatars1.githubusercontent.com/u/35361817",
    ios_version: "0.0.0.000000",
    android_version: "0.0.0.000000",
  },
  {
    name: "Hyperdragon",
    url_address: "https://hyperdragons.alfakingdom.com/",
    d_type: :popular,
    logo_url: "https://hyperdragons.alfakingdom.com/favicon.ico",
    ios_version: "0.0.0.000000",
    android_version: "0.0.0.000000",
  },
  {
    name: "DApp Review",
    url_address: "https://dapp.review/explore",
    d_type: :popular,
    logo_url: "https://dapp.review/favicon.ico",
    ios_version: "0.0.0.000000",
    android_version: "0.0.0.000000",
  }
]

banners = [
  {
    image_url: "https://hyperdragons.alfakingdom.com/5ac2bef1e76efb93acee02b72391282f.jpg",
    ios_version: "0.0.0.000000",
    android_version: "0.0.0.000000",
  },
  {
    image_url: "https://hyperdragons.alfakingdom.com/5ac2bef1e76efb93acee02b72391282f.jpg",
    ios_version: "0.0.0.000000",
    android_version: "0.0.0.000000",
  },
  {
    image_url: "https://hyperdragons.alfakingdom.com/5ac2bef1e76efb93acee02b72391282f.jpg",
    ios_version: "0.0.0.000000",
    android_version: "0.0.0.000000",
  },
  {
    image_url: "https://hyperdragons.alfakingdom.com/5ac2bef1e76efb93acee02b72391282f.jpg",
    ios_version: "0.0.0.000000",
    android_version: "0.0.0.000000",
  },
  {
    image_url: "https://hyperdragons.alfakingdom.com/5ac2bef1e76efb93acee02b72391282f.jpg",
    ios_version: "0.0.0.000000",
    android_version: "0.0.0.000000",
  },
]

ApplicationRecord.transaction do
  DappType.create!(dapp_types)
  Banner.create!(banners)
  popular_type = DappType.find_by(name: "人气推荐")
  Dapp.create!(dapps.map{|n| n.merge(dapp_type_id: popular_type.id)})
end
