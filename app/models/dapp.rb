class Dapp < ApplicationRecord
  include VersionControlConcern

  validates :ios_version, presence: true
  validates :android_version, presence: true

  enum d_type: {
    new_dapp: 10,
    popular: 20,
    exchange: 30,
  }

end
