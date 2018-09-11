class DappType < ApplicationRecord
  validates :name, presence: true, uniqueness: true

  scope :default_order, -> { order(id: :asc) }
end
