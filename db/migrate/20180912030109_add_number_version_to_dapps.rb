class AddNumberVersionToDapps < ActiveRecord::Migration[5.2]
  def change
    change_column :dapps, :ios_version, :string
    change_column :dapps, :android_version, :string

    add_column :dapps, :ios_version_number, :bigint
    add_column :dapps, :android_version_number, :bigint
  end
end
