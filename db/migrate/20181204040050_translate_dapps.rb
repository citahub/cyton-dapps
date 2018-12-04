class TranslateDapps < ActiveRecord::Migration[5.2]
  def change
    reversible do |dir|
      dir.up do
        ::Dapp.create_translation_table!({
                                         name: :string,
                                         intro: :text,
                                         desc: :text
                                       }, {
                                         migrate_data: true,
                                         remove_source_columns: true
                                       })
      end

      dir.down do
        ::Dapp.drop_translation_table! :migrate_data => true
      end
    end
  end
end
