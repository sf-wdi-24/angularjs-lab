Rails.application.routes.draw do
  root 'site#index'
  
  namespace :api, defaults: { format: :json } do
    resources :questions , except: [:new, :edit]
  end
  namespace :api, defaults: { format: :json } do
    resources :answers , except: [:new, :edit]
  end
end
