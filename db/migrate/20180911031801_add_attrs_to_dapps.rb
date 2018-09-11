class AddAttrsToDapps < ActiveRecord::Migration[5.2]
  def change
    add_column :dapps, :marketing_url, :string
    add_column :dapps, :desc, :text
    add_column :dapps, :start_at, :datetime
    add_column :dapps, :end_at, :datetime
    add_column :dapps, :ios_version, :decimal
    add_column :dapps, :android_version, :decimal
    add_column :dapps, :score, :integer
    add_column :dapps, :intro, :text
    add_column :dapps, :publish_at, :datetime
    add_column :dapps, :developer, :string

    add_reference :dapps, :dapp_type, index: true
  end
end
