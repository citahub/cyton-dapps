class SetDefaultNameEnToDappTypes < ActiveRecord::Migration[5.2]
  def change
    params = {
      "人气推荐" => "Most popular",
      "游戏" => "Games",
      "去中心化交易所" => "Exchanges",
      "行情" => "Markets",
      "效率" => "Utilities",
      "探索" => "Discover",
      "其它" => "Others"
    }

    params.each do |name, name_en|
      dapp_type = ::DappType.find_by(name: name)
      dapp_type.update(name_en: name_en) if !dapp_type.nil? && dapp_type.name_en.nil?
    end
  end
end
