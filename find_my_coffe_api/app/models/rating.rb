class Rating < ApplicationRecord
  belongs_to :store
  # validador que não deixa criar um Rating sem value, opinion e user_name
  validates_presence_of :value, :opinion, :user_name
end
