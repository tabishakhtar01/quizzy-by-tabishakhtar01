class SessionsController < ApplicationController
    def create
        user = User.find_by(email: login_params[:email].downcase)
        if user.present? && user.authenticate(login_params[:password])
          render status: :ok, json: { user_first_name: user.first_name}
        else
            render status: :unauthorized, json: { notice: 'session.incorrect_credentials' }
        end
    end

    def destroy
        @current_user = nil
    end
    
      private
    
        def login_params
          params.require(:login).permit(:email, :password)
        end
end