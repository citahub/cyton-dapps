class DappsController < ApplicationController

  def index
    @dapps = Dapp.all.group_by { |dapp| dapp.d_type }
  end

  def info
  end

  def more
  end

  def mine
  end

  def history
  end

end
