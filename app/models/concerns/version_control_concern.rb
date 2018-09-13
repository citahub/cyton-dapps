module VersionControlConcern
  extend ActiveSupport::Concern

  VERSION_REGEX = /\d{1,2}\.\d{1,2}.\d{1,2}\.\d{6}/

  included do
    validates :ios_version, presence: true, format: { with: VERSION_REGEX }
    validates :android_version, presence: true, format: { with: VERSION_REGEX }

    before_save :set_version_number

    private

    def set_version_number
      self.ios_version_number = self.class.handle_version(self.ios_version)
      self.android_version_number = self.class.handle_version(self.android_version)
    end

  end

  module ClassMethods
    def handle_version(version)
      version.split(".").map { |n| n.rjust(2, '0') }.join.to_i
    end
  end

end
