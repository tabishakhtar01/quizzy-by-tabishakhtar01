class UsersController < ApplicationController
  
    def index
      users = User.all
      render status: :ok, json: { users: users }
    end
  
    def create
        @user = User.new(user_params)
        if @user.save
            render status: :ok, json: {
                user_id: @user.id,
                user_first_name: @user.first_name,
              }
        else
          render status: :unprocessable_entity, json: {
            errors: @user.errors.full_messages.to_sentence
          }
        end
    end
  
    private
  
    def user_params
      params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation)
    end
  end