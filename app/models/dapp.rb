class Dapp < ApplicationRecord

  enum d_type: {
    new_dapp: 10,
    popular: 20,
    exchange: 30,
  }

end
