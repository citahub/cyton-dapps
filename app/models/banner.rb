class Banner < ApplicationRecord
  include VersionControlConcern

  validates :image_url, presence: true
end
