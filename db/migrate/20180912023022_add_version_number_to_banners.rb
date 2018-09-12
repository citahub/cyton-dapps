class AddVersionNumberToBanners < ActiveRecord::Migration[5.2]
  def change
    change_column :banners, :ios_version, :string
    change_column :banners, :android_version, :string

    add_column :banners, :ios_version_number, :bigint
    add_column :banners, :android_version_number, :bigint
  end
end
