class Store < ApplicationRecord
	has_many :ratings
  	# validador que não deixa criar um Rating sem lonlat, name e google_place_id
  	validates_presence_of :lonlat, :name, :google_place_id

  	# Validar para que o google_place_id seja unico
  	validates :google_place_id, uniqueness: true

  	# Função que retorna somente os cafes dentro de um certo raio de KM
  	scope :within, -> (longitude, latitude, distance_in_km = 5){
  		where (%{
  			ST_Distance(lonlat, 'POINT(%f %f)') < %d
  		} % [longitude, latitude, distance_in_km * 1000])
  	}
	
	# criando metodo dentro da model, onde vai trazer a media de avaliações
    def ratings_average
      return 0 if self.ratings.empty?
      # retorna o valor da media das avaliações sempre inteiro
      (self.ratings.sum(:value) / self.ratings.count).to_i

    end
end
