class ApplicationController < ActionController::Base

  before_action :set_locale

  def set_locale
    locale = params[:locale]&.to_sym || I18n.default_locale
    locale = I18n.default_locale unless I18n.available_locales.include?(locale)
    I18n.locale = locale
  end

end
