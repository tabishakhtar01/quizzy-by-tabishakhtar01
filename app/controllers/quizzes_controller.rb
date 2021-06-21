class QuizzesController < ApplicationController
  before_action :load_quiz, only: %i[show update destroy]

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

    def show
      render status: :ok, json: { quiz: @quiz}
    end

    def update
      if @quiz.update(quiz_params)
        render status: :ok, json: { notice: 'Successfully updated quiz.' }
      else
        render status: :unprocessable_entity, json: { errors: @quiz.errors.full_messages }
      end
    end

    def destroy
      if @quiz.destroy
        render status: :ok, json: { notice: 'Successfully deleted quiz.' }
      else
        render status: :unprocessable_entity, json: { errors:
        @quiz.errors.full_messages }
      end
    end
  
    private
  
    def quiz_params
      params.require(:quiz).permit(:title)
  end

  def load_quiz
    @quiz = Quiz.find_by_slug(params[:slug])
  end
   
end
