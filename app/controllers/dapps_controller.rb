class DappsController < ApplicationController

  def index
    now = Time.now
    options = {
      start_at_lteq: now,
      end_at_gteq: now,
      ios_version_number_gteq: handle_version(params[:ios_version]),
      android_version_number_gteq: handle_version(params[:android_version]),
    }

    @banners = Banner.ransack(options).result
    # @dapps = Dapp.all.group_by { |dapp| dapp.d_type }
    @dapps = DappType.default_order.map do |dapp_type|
      { dapp_type.name => dapp_type.dapps.default_order.ransack(options).result.limit(3) }
    end.reduce({}, :merge).reject {|k, v| v.empty?}
  end

  # GET /dapps/:id
  def show
    @dapp = Dapp.find_by(id: params[:id])
    @start_at = @dapp.start_at.to_s.split(' ')[0]
    @star = @dapp.score
    if @star < 0
      @star = 0
    elsif @star > 5
      @star = 5
    end
    @stargray = 5 - @star
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

  private def handle_version(version)
    return if version.blank?
    Dapp.handle_version(version)
  end

end
