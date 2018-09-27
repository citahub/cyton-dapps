require 'test_helper'

class Admin::ImagesControllerTest < ActionDispatch::IntegrationTest
  setup do
    sign_in
    @image = images(:one)
  end

  test "should get index" do
    get admin_images_url
    assert_response :success
  end

  test "should get new" do
    get new_admin_image_url
    assert_response :success
  end

  test "should create image" do
    assert_difference('Image.count') do
      post admin_images_url, params: { image: { name: @image.name } }
    end

    assert_redirected_to admin_image_url(Image.last)
  end

  test "should show image" do
    get admin_image_url(@image)
    assert_response :success
  end

  test "should get edit" do
    get edit_admin_image_url(@image)
    assert_response :success
  end

  test "should update image" do
    patch admin_image_url(@image), params: { image: { name: @image.name } }
    assert_redirected_to admin_image_url(@image)
  end

  test "should destroy image" do
    assert_difference('Image.count', -1) do
      delete admin_image_url(@image)
    end

    assert_redirected_to admin_images_url
  end
end
