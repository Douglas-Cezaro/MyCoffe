require 'rest-client'
require 'json'

class GetGoogleCoffeListService
	
	# metodo que é chamado primeiro
	def initialize(latitude, longitude)
		@latitude = latitude
		@longitude = longitude
	end


	# metdo que faz a comunicação com a API do google
	def call
		# TRY CATCH CAGAO
		begin
			key = Rails.application.credentials.google_secret_key
			location = "#{@latitude}, #{@longitude}"
			radius = "5000"
			base_url = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=cafe&location=#{location}&radius=#{radius}&key=#{key}"
			response = RestClient.get base_url
			JSON.parse(response.body)


		rescue RestClient::ExceptionWithResponse => e
			e.response
		end
	end
end