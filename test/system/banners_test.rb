require "application_system_test_case"

class BannersTest < ApplicationSystemTestCase
  setup do
    @banner = banners(:one)
  end

  test "visiting the index" do
    visit banners_url
    assert_selector "h1", text: "Banners"
  end

  test "creating a Banner" do
    visit banners_url
    click_on "New Banner"

    fill_in "Address", with: @banner.address
    fill_in "Android Version", with: @banner.android_version
    fill_in "End At", with: @banner.end_at
    fill_in "Image Url", with: @banner.image_url
    fill_in "Ios Version", with: @banner.ios_version
    fill_in "Start At", with: @banner.start_at
    click_on "Create Banner"

    assert_text "Banner was successfully created"
    click_on "Back"
  end

  test "updating a Banner" do
    visit banners_url
    click_on "Edit", match: :first

    fill_in "Address", with: @banner.address
    fill_in "Android Version", with: @banner.android_version
    fill_in "End At", with: @banner.end_at
    fill_in "Image Url", with: @banner.image_url
    fill_in "Ios Version", with: @banner.ios_version
    fill_in "Start At", with: @banner.start_at
    click_on "Update Banner"

    assert_text "Banner was successfully updated"
    click_on "Back"
  end

  test "destroying a Banner" do
    visit banners_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Banner was successfully destroyed"
  end
end
