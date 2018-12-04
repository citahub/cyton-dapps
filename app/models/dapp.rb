class Dapp < ApplicationRecord
  include VersionControlConcern

  translates :name, :intro, :desc

  validates :start_at, presence: true
  validates :end_at, presence: true

  belongs_to :dapp_type

  scope :default_order, -> { order(updated_at: :desc) }

  enum d_type: {
    new_dapp: 10,
    popular: 20,
    exchange: 30,
  }

end
