class User < ApplicationRecord
    has_secure_password
    VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i

    validates :first_name, presence: true, length: { maximum: 50 }
    validates :last_name, presence: true, length: { maximum: 50 }
    validates :email, presence: true, 
                    uniqueness: true, 
                    format: { with: VALID_EMAIL_REGEX }
    validates :password, length: { minimum: 6 }
    validates :password_confirmation, presence: true, on: :create

    before_save :to_lowercase

    private
  
    def to_lowercase
      email.downcase!
    end
end