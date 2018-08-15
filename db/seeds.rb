# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# for develop
data = [
  {
    name: "First Forever",
    url_address: "https://dapp.cryptape.com/demo/first-forever",
    d_type: :new_dapp,
    logo_url: "https://cdn.cryptape.com/neuron/Artboard3.png"
  },
  {
    name: "AppChain Testnet Faucet",
    url_address: "https://dapp.cryptape.com/appchain-testnet-faucet",
    d_type: :new_dapp,
    logo_url: "https://avatars1.githubusercontent.com/u/35361817"
  },
  {
    name: "Hyperdragon",
    url_address: "https://hyperdragons.alfakingdom.com/",
    d_type: :popular,
    logo_url: "https://hyperdragons.alfakingdom.com/favicon.ico"
  },
  {
    name: "Dapp Exchange 1",
    url_address: "https://www.cryptape.com/#/about",
    d_type: :exchange,
    logo_url: "http://gravatar.com/avatar/673bb775f58719a6ea46c44f9d2a282e.png"
  },
]

Dapp.transaction do
  data.each do |attrs|
    Dapp.create!(attrs)
  end
end
