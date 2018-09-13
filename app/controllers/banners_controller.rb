class BannersController < ApplicationController
  def index
    now = Time.now
    options = {
      start_at_lteq: now,
      end_at_gteq: now
    }

    @banners = Banner.ransack(options).result
  end

  def show
    @banner = Banner.find_by(id: params[:id])
  end
end
