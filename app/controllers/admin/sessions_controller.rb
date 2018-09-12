module Admin
  class SessionsController < ApplicationController
    skip_before_action :auth_login, only: [:new, :create]

    # GET /admin/sessions
    def new
    end

    # POST /admin/sessions
    def create
      @user = User.find_by(username: permit_params[:username])

      if @user&.authenticate(permit_params[:password])
        log_in(@user)
        redirect_to admin_images_path
      else
        flash.now[:error] = "user not exist or password error"
        render :new
      end
    end

    # DELETE /admin/sessions
    def destroy
      log_out
    end

    private

    def permit_params
      params.require(:session).permit(:username, :password)
    end

  end
end
