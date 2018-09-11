class CreateBanners < ActiveRecord::Migration[5.2]
  def change
    create_table :banners do |t|
      t.string :image_url
      t.string :address
      t.datetime :start_at
      t.datetime :end_at
      t.decimal :ios_version
      t.decimal :android_version

      t.timestamps
    end
  end
end
