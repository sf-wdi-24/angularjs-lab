Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do
    resources :questions do
      resources :answers
    end
  end
  root 'site#index'
  get '*path', to: 'site#index'
end
