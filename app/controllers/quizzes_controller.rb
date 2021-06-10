class QuizzesController < ApplicationController
    def index
        quizzes = Quiz.all
        render status: :ok, json: {quizzes: quizzes}
    end

    def create
        @quiz = Quiz.new(quiz_params)
        if @quiz.save
          render status: :ok, json: { notice: 'Quiz was successfully created' }
        else
          errors = @quiz.errors.full_messages
          render status: :unprocessable_entity, json: { errors: errors  }
        end
      rescue ActiveRecord::RecordNotUnique => e
        render status: :unprocessable_entity, json: { errors: e.message }
      end
    
      private
    
      def quiz_params
        params.require(:quiz).permit(:title)
    end
end
