class QuestionsController < ApplicationController
    before_action :load_question, only: %i[show]
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

      def destroy
        if @question = Question.find(params[:id])
          @question.destroy
          render status: :ok, json: { notice: 'Successfully deleted question.' }
        else
          render status: :unprocessable_entity, json: { errors:
          @question.errors.full_messages }
        end
      end
    
      private
    
      def question_params
        params.require(:question).permit(:question, :quiz_id, :correct_answer ,options_attributes: [:answer, :correct_answer_id])
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
