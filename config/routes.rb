Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root "dapps#index"

  resources :dapps, only: [:index]
  get 'dapps/mine'

  namespace :admin do
    resources :images
  end

end
