require 'csv'
class Report < ApplicationRecord
    belongs_to :quiz

    def self.to_csv
        attributes = %w{quiz_name first_name last_name email correct incorrect }
        CSV.generate(headers: true) do |csv|
            csv << attributes

            all.each do |report|
                csv << report.attributes.values_at(*attributes)
            end
        end
    end
end