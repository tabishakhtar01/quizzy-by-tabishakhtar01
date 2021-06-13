class Option < ApplicationRecord
    belongs_to :question
    validates :answer, presence: true
    validates :correct_answer_id, presence: true
end