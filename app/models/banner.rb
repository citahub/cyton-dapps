class Banner < ApplicationRecord
  include VersionControlConcern

  validates :start_at, presence: true
  validates :end_at, presence: true

  validates :image_url, presence: true
end
