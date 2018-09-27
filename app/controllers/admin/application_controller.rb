class Admin::ApplicationController < ActionController::Base
  layout 'admin'

  before_action :auth_login
  helper_method :current_user, :logged_in?

  def current_user
    @current_user ||= User.find_by(id: session[:user_id])
  end

  def logged_in?
    !!current_user
  end

  protected

  def log_in(user)
    session[:user_id] = user.id
  end

  def log_out
    @current_user = nil
    reset_session
    redirect_to admin_login_path
  end

  def auth_login
    redirect_to admin_login_path unless logged_in?
  end
end
