require 'test_helper'

class Admin::SessionsControllerTest < ActionDispatch::IntegrationTest
  test "new" do
    get new_admin_session_url

    assert_response :success
  end

  class CreateSessionTest < ::Admin::SessionsControllerTest
    def setup
      @username = "test"
      @password = "111111"
      @user = User.create!(username: @username, password: @password)
    end

    test "login success" do
      post "/admin/sessions", params: { session: { username: @username, password: @password } }
      assert session[:user_id], @user.id
      assert_redirected_to admin_images_path
    end

    test "user not found" do
      post "/admin/sessions", params: { session: { username: "test1", password: @password } }
      assert_nil session[:user_id]
      assert_response :success
    end

    test "password error" do
      post "/admin/sessions", params: { session: { username: @username, password: "111112" } }
      assert_nil session[:user_id]
      assert_response :success
    end
  end

  class DestroySessionTest < ::Admin::SessionsControllerTest
    test "not login" do
      delete "/admin/logout"
      assert_redirected_to admin_login_path
    end

    test "log out success" do
      sign_in
      delete "/admin/logout"
      assert_redirected_to admin_login_path
    end

    test "logout by get method" do
      sign_in
      get "/admin/logout"
      assert_redirected_to admin_login_path
    end
  end
end
