require "test_helper"

class UserTest < ActiveSupport::TestCase

    def setup
        User.delete_all
        
        @user = User.new(first_name: 'Kaif',
                        last_name: 'Mukhtar',
                        email: 'kaif@example.com')
    end
    
    def test_instance_of_user
        assert_instance_of User, @user
    end

    def test_should_be_valid
        assert @user.valid?
    end

    def test_user_should_be_not_be_valid_without_first_name
        @user.first_name = ''
        assert_not @user.valid?
        assert_equal ["First name can't be blank"], @user.errors.full_messages
    end

    def test_user_should_be_not_be_valid_without_last_name
        @user.last_name = ''
        assert_not @user.valid?
        assert_equal ["Last name can't be blank"], @user.errors.full_messages
    end

    def test_user_should_be_not_be_valid_without_email
        @user.email = ''
        assert_not @user.valid?
        assert_equal ["Email can't be blank", "Email is invalid"], @user.errors.full_messages
    end

    def test_first_name_should_be_of_valid_length
        @user.first_name = 'a' * 60
        assert @user.invalid?
    end

    def test_last_name_should_be_of_valid_length 
        @user.last_name = 'a' * 60
        assert @user.invalid?
    end

    def test_user_should_not_be_valid_and_saved_if_email_not_unique
        @user.save!
      
        test_user = @user.dup
        assert_not test_user.valid?
      
        assert_equal ['Email has already been taken'],
                      test_user.errors.full_messages
    end

    def test_email_validation_should_accept_valid_addresses
        valid_addresses = %w[user@example.com USER@foo.COM A_US-ER@foo.bar.org
                             first.last@foo.jp alice+bob@baz.cn]
        valid_addresses.each do |valid_address|
          @user.email = valid_address
          assert @user.valid?, "#{valid_address.inspect} should be valid"
        end
    end

    def email_validation_should_reject_invalid_addresses
        invalid_addresses = %w[user@example,com user_at_foo.org user.name@example.
                               foo@bar_baz.com foo@bar+baz.com]
        invalid_addresses.each do |invalid_address|
          @user.email = invalid_address
          assert_not @user.valid?, "#{invalid_address.inspect} should be invalid"
        end
    end

    def test_email_addresses_should_be_unique
        duplicate_user = @user.dup
        duplicate_user.email = @user.email.downcase
        @user.save
        assert_not duplicate_user.valid?
    end

end