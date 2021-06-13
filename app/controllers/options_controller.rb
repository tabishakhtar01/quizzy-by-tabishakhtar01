class OptionsController < ApplicationController
    before_action :load_options, only: %i[index show update destroy]
        def index
            options = Option.all
            render status: :ok, json: { options: options}
        end

        def show
          render status: :ok, json: { option: @option }
        end

      def load_options
            @option = Option.where(question_id: params[:id]).limit(4)

          rescue ActiveRecord::RecordNotFound => errors
            render json: {errors: errors }
      end 
end
