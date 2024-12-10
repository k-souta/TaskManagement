Rails.application.routes.draw do
  root 'post#index'
get 'posts', to: 'posts#index'
end
