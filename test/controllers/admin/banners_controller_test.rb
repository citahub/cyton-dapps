require 'test_helper'

class Admin::BannersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @banner = banners(:one)
  end

  test "should get index" do
    get admin_banners_url
    assert_response :success
  end

  test "should get new" do
    get new_admin_banner_url
    assert_response :success
  end

  test "should create banner" do
    assert_difference('Banner.count') do
      post admin_banners_url, params: { banner: { address: @banner.address, android_version: @banner.android_version, end_at: @banner.end_at, image_url: @banner.image_url, ios_version: @banner.ios_version, start_at: @banner.start_at } }
    end

    assert_redirected_to admin_banner_url(Banner.last)
  end

  test "should show banner" do
    get admin_banner_url(@banner)
    assert_response :success
  end

  test "should get edit" do
    get edit_admin_banner_url(@banner)
    assert_response :success
  end

  test "should update banner" do
    patch admin_banner_url(@banner), params: { banner: { address: @banner.address, android_version: @banner.android_version, end_at: @banner.end_at, image_url: @banner.image_url, ios_version: @banner.ios_version, start_at: @banner.start_at } }
    assert_redirected_to admin_banner_url(@banner)
  end

  test "should destroy banner" do
    assert_difference('Banner.count', -1) do
      delete admin_banner_url(@banner)
    end

    assert_redirected_to admin_banners_url
  end
end
