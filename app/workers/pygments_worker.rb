class PygmentsWorker
    
    include Sidekiq::Worker
    sidekiq_options retry: false

def perform()
    puts "Reports controller after 10 sec?"
end

end