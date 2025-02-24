Rails.application.routes.draw do
	namespace :api do
		namespace :v1 do
			# criando rota resource da controller Stores, passando os metodos e formato JSON
			resources :stores, only: [:index, :show], defaults: { format: 'json'}
			resources :ratings, only: [:create], defaults: { format: 'json'}
			resources :google_stores, only: [:index, :show], defaults: { format: 'json'}
		end
	end
end
