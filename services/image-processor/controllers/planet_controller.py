from services import PlanetService
from libs import ApiResponse

class PlanetController:
    planetService: PlanetService
    def __init__(self, service: PlanetService ):
        self.planetService = service

    def getPlanet(self):
        return ApiResponse(200, "Ok")

    def createPlanet(self):
        result =  self.planetService.createPlanet({
            'name': 24,
            "age": 21
        })
        return  ApiResponse(201, "Planet Created", result)

