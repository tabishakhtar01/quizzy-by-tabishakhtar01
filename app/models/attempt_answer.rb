class AttemptAnswer < ApplicationRecord
    belongs_to :attempt
    belongs_to :question
end