class Api::V1::StoresController < ApplicationController

	# Sempre que chamar o metodo show vai chamar o metodo set_store
	before_action :set_store, only: [:show]

	def index
		@stores = Store.within(params[:longitude].to_f, params[:latitude].to_f)
			.sort_by{ |store| store.ratings_average }
			.reverse
	end

	def show
	end

	private 

	def set_store
		# Variavel de instacia que pode ser acessada por outras classes
		# metodo que encontra a STORE pelo google_place_id
		@store = Store.find_by!(google_place_id: params[:id])
	end
end
