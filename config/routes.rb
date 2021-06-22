Rails.application.routes.draw do
  # get 'home/index'
  resources :users, only: %i[index create]
  resource :sessions, only: %i[create destroy] 
  resources :quizzes, except: %i[new edit], param: :slug
  resources :questions, only: %i[create show], param: :slug
  resources :questions, only: %i[update destroy]
  resources :options
  resources :attempts, param: :slug

  get '/public/:slug', to: redirect('/public/%{slug}/attempt/new')
  root "home#index"
  get '*path', to: 'home#index', via: :all
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
