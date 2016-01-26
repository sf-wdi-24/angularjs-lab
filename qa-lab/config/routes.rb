Rails.application.routes.draw do
  
  root 'site#index'

  namespace :api, defaults: { format: :json } do
    resources :questions, only: [:index, :create, :show, :update, :destroy] do 
    	resources :answers, only: [:index, :create, :show, :update, :destroy]
    end
# nested routes

  end

  get '*path', to: 'site#index'
  
end
