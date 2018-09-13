class DappType < ApplicationRecord
  has_many :dapps
  validates :name, presence: true, uniqueness: true

  scope :default_order, -> { order(id: :asc) }
end
