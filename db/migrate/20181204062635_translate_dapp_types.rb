class TranslateDappTypes < ActiveRecord::Migration[5.2]
  def change
    reversible do |dir|
      dir.up do
        ::DappType.create_translation_table!({
                                           name: :string,
                                         }, {
                                           migrate_data: true,
                                           remove_source_columns: true
                                         })
      end

      dir.down do
        ::DappType.drop_translation_table! :migrate_data => true
      end
    end
  end
end
