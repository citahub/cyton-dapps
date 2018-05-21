class DappsController < ApplicationController

  def index
    @dapps = Dapp.all.group_by { |dapp| dapp.d_type }
  end

  def mine
  end

end
