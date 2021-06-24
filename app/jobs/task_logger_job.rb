class TaskLoggerJob < ApplicationJob
  include Sidekiq
  sidekiq_options queue: :default, retry: 3
  # queue_as :default


  # queue :default

  def perform(report)
      generate_excel_file(report)
  end

  private

def generate_excel_file(report)
  Axlsx::Package.new do |xlxs_package|
    xlxs_package.workbook.add_worksheet(name: "report") do |sheet|
      sheet.add_row ['Quiz name', 'First name','Last Name', 'Email', 'Correct answers', 'Incorrect answers']
      report.map do |data|
        sheet.add_row [
          data[:quiz_name],
          data[:first_name],
          data[:last_name],
          data[:email],
          data[:correct],
          data[:incorrect]
        ]
      end
    end
    xlxs_package.use_shared_strings = true
    xlxs_package.serialize("public/report.xlsx")
  end
end

end
