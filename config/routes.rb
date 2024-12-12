Rails.application.routes.draw do
  devise_for :users
  root 'posts#index'
get 'posts', to: 'posts#index'
resources :posts, except: [:show, :update]
resources :user, only: [:index]
end
