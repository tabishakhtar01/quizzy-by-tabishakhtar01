Rails.application.routes.draw do
  # get 'home/index'
  resources :users, only: %i[create]
  resource :sessions, only: %i[create destroy] 
  resources :quizzes, only: %i[index create]
  root "home#index"
  get '*path', to: 'home#index', via: :all
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
