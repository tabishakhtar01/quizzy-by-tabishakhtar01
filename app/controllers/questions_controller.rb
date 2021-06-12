class QuestionsController < ApplicationController
    before_action :load_question, only: [:show]
    # before_action :load_options, only: [:show]
    def index
        questions = Question.all
        render status: :ok, json: { questions: questions}
    end

    def create
        @question = Question.new(question_params)
        if @question.save
          render status: :ok, json: { notice: 'Question was successfully created' }
        else
          errors = @question.errors.full_messages
          render status: :unprocessable_entity, json: { errors: errors  }
        end
      rescue ActiveRecord::RecordNotUnique => e
        render status: :unprocessable_entity, json: { errors: e.message }
      end

      def show
        render status: :ok, json: { question: @question}
      end
    
      private
    
      def question_params
        params.require(:question).permit(:question, :quiz_id, options_attributes: [:answer])
      end


        def load_question
            @question = Question.where(quiz_id: params[:id])
            # render json: { notice: 'Something went wrong'}
        end

        # def load_options
        #   @options = Option.where(Question_id: params[:id]).limit(4)
    
        # rescue ActiveRecord::RecordNotFound => errors
        #   render json: {errors: errors }
        # end
end