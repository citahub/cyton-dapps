Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root "dapps#index"

  resources :dapps, only: [:index, :show]
  resources :banners, only: [:index, :show]
  # get 'info', to: 'dapps#info'
  get 'more/:type_name', to: 'dapps#more', as: "more_dapps"
  get 'mine', to: 'dapps#mine'
  get 'history', to: 'dapps#history'

  namespace :admin do
    resources :images
    resources :banners
    resources :dapps
    resources :sessions, only: [:new, :create]
    get 'login', to: "sessions#new", as: :login
    match 'logout', to: "sessions#destroy", via: [:get, :delete], as: :logout
  end

end
