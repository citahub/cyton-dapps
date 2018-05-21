class CreateDapps < ActiveRecord::Migration[5.2]
  def change
    create_table :dapps do |t|
      t.string :logo_url
      t.string :name
      t.string :url_address
      t.integer :d_type

      t.timestamps
    end
  end
end
