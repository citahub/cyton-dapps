class DappsController < ApplicationController

  def index
    @banners = Banner.all
    # @dapps = Dapp.all.group_by { |dapp| dapp.d_type }
    @dapps = DappType.default_order.map do |dapp_type|
      { dapp_type.name => dapp_type.dapps.default_order.limit(3) }
    end.reduce({}, :merge).reject {|k, v| v.empty?}
  end

  # GET /dapps/:id
  def show
    @dapp = Dapp.find_by(id: params[:id])
  end

  # GET /dapp/more/:type_name
  def more
    @dapp_type = DappType.find_by name: params[:type_name]
    @dapps = Dapp.default_order.where(dapp_type_id: @dapp_type&.id)
  end

  def mine
  end

  def history
  end

end
