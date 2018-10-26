class AddFilterIpToDapps < ActiveRecord::Migration[5.2]
  def change
    add_column :dapps, :filter_ip, :boolean, default: false
  end
end
