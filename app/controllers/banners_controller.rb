class BannersController < ApplicationController
  def index
    now = Time.now
    options = {
      start_at_lteq: now,
      end_at_gteq: now,
      ios_version_number_lteq: handle_version(params[:ios_version]),
      android_version_number_lteq: handle_version(params[:android_version]),
    }

    @banners = Banner.ransack(options).result
  end

  def show
    @banner = Banner.find_by(id: params[:id])
  end

  private def handle_version(version)
    return if version.blank?
    Dapp.handle_version(version)
  end

end
