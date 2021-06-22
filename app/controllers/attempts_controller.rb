class AttemptsController < ApplicationController
    def index
        attempts = Attempt.all
        render status: :ok, json: {attempts: attempts}
    end

    def create
        @attempt = Attempt.new(attempt_params)
        if @attempt.save
          render status: :ok, json: { notice: 'Success' }
        else
          errors = @attempt.errors.full_messages
          render status: :unprocessable_entity, json: { errors: errors  }
        end
      rescue ActiveRecord::RecordNotUnique => e
        render status: :unprocessable_entity, json: { errors: e.message }
    end

    def update
      @attempt = Attempt.find(params[:id])
      # attempt_params.attempt_answers_attributes.each do |attempt_answer|
      #   attempt_answer.merge(attempt_id: @attempt.id)
      # end

      if @attempt.update(attempt_params)
        render status: :ok, json: { }
      else
        render status: :unprocessable_entity, json: { errors: @attempt.errors.full_messages }
      end
    end

    private
    
    def attempt_params
      params.require(:attempt).permit(:quiz_id, :slug_data, :submitted, :attempt_answers_attributes => [:question_id, :answer, :attempt_id])
    end
end

# :correct_answer ,options_attributes: [:answer, :correct_answer_id])
# def attempt_params
#   params.require(:attempt)
#     .permit(
#       :quiz_id,
#       :user_id,
#       :correct_answer_count,
#       :incorrect_answer_count,
#       :attempt_answers_attributes => [:answer, :attempt_id, :question_id]
#     ).merge(user_id: @current_user.id)
# end