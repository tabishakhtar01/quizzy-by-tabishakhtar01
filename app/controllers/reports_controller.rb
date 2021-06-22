class ReportsController < ApplicationController
    def index
        @reports = Report.order('created_at DESC')
        render status: :ok, json: {reports: @reports}
    end

    def create
        @report = Report.new(report_params)
        if @report.save
          render status: :ok, json: { }
        else
          errors = @report.errors.full_messages
          render status: :unprocessable_entity, json: { errors: errors  }
        end
      rescue ActiveRecord::RecordNotUnique => e
        render status: :unprocessable_entity, json: { errors: e.message }
      end
    
      private
    
      def report_params
        params.require(:report).permit(:quiz_id, :quiz_name, :first_name, :last_name, :email, :correct, :incorrect)
    end
end
