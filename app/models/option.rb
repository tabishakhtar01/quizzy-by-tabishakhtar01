class Option < ApplicationRecord
    belongs_to :question
    validates :answer, presence: true, length: { maximum: 50 }
    validates :correct_answer_id, presence: true
end