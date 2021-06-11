class Quiz < ApplicationRecord
    has_many :questions, dependent: :destroy
    validates :title, presence: true
    validates :title, presence: true, length: { maximum: 50 }
end