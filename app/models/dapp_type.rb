class DappType < ApplicationRecord
  has_many :dapps
  validates :name, presence: true, uniqueness: true

  translates :name
  globalize_accessors

  scope :default_order, -> { order(id: :asc) }

  def name_or_default
    name.blank? ? name_zh_cn : name
  end
end
