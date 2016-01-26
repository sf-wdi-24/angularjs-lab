Rails.application.routes.draw do
 root 'site#index'

 namespace :api, defaults: { format: :json } do
 	resources :questions do
 		resources :answers
 	end
 end

 get '*path', to: 'site#index'
end
