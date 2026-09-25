from repositories import PlanetRepository
from validation.validators import  PlanetValidator

class PlanetService:
    planetRepository: PlanetRepository
    planetInputValidator: PlanetValidator
    
    def __init__(self, planetRepository: PlanetRepository, planetInputValidator: PlanetValidator):
        self.planetRepository = planetRepository
        self.planetInputValidator = planetInputValidator

    def createPlanet(self, data: dict):
        result = self.planetInputValidator.createPlanetInput(data)
        return result