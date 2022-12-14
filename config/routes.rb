Rails.application.routes.draw do
 
  resources :user_books
  resources :user_friends
  resources :posts
  resources :books
  resources :users

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
    
  post "/signup", to: "users#create"
  get "/me", to: "users#show"

  get "/bookposts/:book_title", to: "posts#bookposts"



  get '*path',
  to: 'fallback#index',
  constraints: ->(req) { !req.xhr? && req.format.html? }
end
