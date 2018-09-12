require "application_system_test_case"

class DappsTest < ApplicationSystemTestCase
  setup do
    @dapp = dapps(:one)
  end

  test "visiting the index" do
    visit admin_dapps_url
    assert_selector "h1", text: "Dapps"
  end

  test "creating a Dapp" do
    visit admin_dapps_url
    click_on "New Dapp"

    fill_in "Android Version", with: @dapp.android_version
    fill_in "Desc", with: @dapp.desc
    fill_in "Developer", with: @dapp.developer
    fill_in "End At", with: @dapp.end_at
    fill_in "Intro", with: @dapp.intro
    fill_in "Ios Version", with: @dapp.ios_version
    fill_in "Logo Url", with: @dapp.logo_url
    fill_in "Marketing Url", with: @dapp.marketing_url
    fill_in "Name", with: @dapp.name
    fill_in "Publish At", with: @dapp.publish_at
    fill_in "Score", with: @dapp.score
    fill_in "Start At", with: @dapp.start_at
    fill_in "Url Address", with: @dapp.url_address
    click_on "Create Dapp"

    assert_text "Dapp was successfully created"
    click_on "Back"
  end

  test "updating a Dapp" do
    visit admin_dapps_url
    click_on "Edit", match: :first

    fill_in "Android Version", with: @dapp.android_version
    fill_in "Desc", with: @dapp.desc
    fill_in "Developer", with: @dapp.developer
    fill_in "End At", with: @dapp.end_at
    fill_in "Intro", with: @dapp.intro
    fill_in "Ios Version", with: @dapp.ios_version
    fill_in "Logo Url", with: @dapp.logo_url
    fill_in "Marketing Url", with: @dapp.marketing_url
    fill_in "Name", with: @dapp.name
    fill_in "Publish At", with: @dapp.publish_at
    fill_in "Score", with: @dapp.score
    fill_in "Start At", with: @dapp.start_at
    fill_in "Url Address", with: @dapp.url_address
    click_on "Update Dapp"

    assert_text "Dapp was successfully updated"
    click_on "Back"
  end

  test "destroying a Dapp" do
    visit admin_dapps_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Dapp was successfully destroyed"
  end
end
