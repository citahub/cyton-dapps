class Banner < ApplicationRecord
  validates :image_url, presence: true
  validates :ios_version, presence: true
  validates :android_version, presence: true
end
