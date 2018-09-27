require 'test_helper'

class UserTest < ActiveSupport::TestCase
  def build_user(username: "test", password: "111111")
    User.new(
      username: username,
      password: password
    )
  end
  class ValidatesTest < UserTest
    test "default object should be valid" do
      assert build_user.valid?
    end

    test "username should be presence" do
      assert_not build_user(username: nil).valid?
    end

    test "username should be unique" do
      username = "test"
      build_user(username: username).save!
      assert_not build_user(username: username).valid?
    end

    test "password should be presence" do
      assert_not build_user(password: nil).valid?
    end

    test "password should be more or equal to 6 characters" do
      password = "11111"
      assert password.size, 5
      assert_not build_user(password: password).valid?
    end

    test "password can be blank when update" do
      password = "111111"
      user = build_user(password: password)
      user.save!
      assert user.update(username: "u"), true
      assert user.authenticate(password), true
    end
  end
end
