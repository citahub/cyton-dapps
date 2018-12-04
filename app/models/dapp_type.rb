class DappType < ApplicationRecord
  has_many :dapps
  validates :name, presence: true, uniqueness: true

  translates :name

  scope :default_order, -> { order(id: :asc) }
end
