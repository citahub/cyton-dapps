class Dapp < ApplicationRecord
  include VersionControlConcern

  translates :name, :intro, :desc
  globalize_accessors

  validates :start_at, presence: true
  validates :end_at, presence: true

  belongs_to :dapp_type

  scope :default_order, -> { order(updated_at: :desc) }

  enum d_type: {
    new_dapp: 10,
    popular: 20,
    exchange: 30,
  }

  def name_or_default
    name.blank? ? name_zh_cn : name
  end

  def intro_or_default
    intro.blank? ? intro_zh_cn : intro
  end

  def desc_or_default
    desc.blank? ? desc_zh_cn : desc
  end

end
