class Quiz < ApplicationRecord
    validates :title, presence: true
    validates :title, presence: true, length: { maximum: 50 }
end