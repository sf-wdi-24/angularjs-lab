Rails.application.routes.draw do

  root 'site#index'

  namespace :api, defaults: { format: :json } do
    resources :questions, except: [:new, :edit] do
      resources :answers, only: [:create, :update, :destroy]
    end
  end

  get '*path', to: 'site#index'
end
