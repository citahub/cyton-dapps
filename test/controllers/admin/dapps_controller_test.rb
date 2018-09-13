require 'test_helper'

class Admin::DappsControllerTest < ActionDispatch::IntegrationTest
  setup do
    sign_in
    @dapp = dapps(:one)
  end

  test "should get index" do
    get admin_dapps_url
    assert_response :success
  end

  test "should get new" do
    get new_admin_dapp_url
    assert_response :success
  end

  test "should create dapp" do
    assert_difference('Dapp.count') do
      post admin_dapps_url, params: { dapp: { android_version: @dapp.android_version, desc: @dapp.desc, developer: @dapp.developer, end_at: @dapp.end_at, intro: @dapp.intro, ios_version: @dapp.ios_version, logo_url: @dapp.logo_url, marketing_url: @dapp.marketing_url, name: @dapp.name, publish_at: @dapp.publish_at, score: @dapp.score, start_at: @dapp.start_at, url_address: @dapp.url_address, dapp_type_id: @dapp.dapp_type_id } }
    end

    assert_redirected_to admin_dapp_url(Dapp.last)
  end

  test "should show dapp" do
    get admin_dapp_url(@dapp)
    assert_response :success
  end

  test "should get edit" do
    get edit_admin_dapp_url(@dapp)
    assert_response :success
  end

  test "should update dapp" do
    patch admin_dapp_url(@dapp), params: { dapp: { android_version: @dapp.android_version, desc: @dapp.desc, developer: @dapp.developer, end_at: @dapp.end_at, intro: @dapp.intro, ios_version: @dapp.ios_version, logo_url: @dapp.logo_url, marketing_url: @dapp.marketing_url, name: @dapp.name, publish_at: @dapp.publish_at, score: @dapp.score, start_at: @dapp.start_at, url_address: @dapp.url_address, dapp_type_id: @dapp.dapp_type_id } }
    assert_redirected_to admin_dapp_url(@dapp)
  end

  test "should destroy dapp" do
    assert_difference('Dapp.count', -1) do
      delete admin_dapp_url(@dapp)
    end

    assert_redirected_to admin_dapps_url
  end
end
