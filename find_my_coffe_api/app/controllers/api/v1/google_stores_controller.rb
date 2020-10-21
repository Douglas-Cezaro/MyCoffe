class Api::V1::GoogleStoresController < ApplicationController

	def index
		places = GetGoogleCoffeListService.new(params[:latitude], params[:longitude]).call
		render json: places
	end

	def show
		render json: GetGoogleCoffeDetailsService.new(params[:id]).call
	end
end
