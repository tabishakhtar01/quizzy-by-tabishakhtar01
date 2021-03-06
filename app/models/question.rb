class Question < ApplicationRecord
    belongs_to :quiz
    has_many :options, dependent: :destroy
    accepts_nested_attributes_for :options
    validates :correct_answer, presence: true
end