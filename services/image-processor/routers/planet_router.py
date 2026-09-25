from fastapi import APIRouter
from controllers import PlanetController
from services import PlanetService
from repositories import PlanetRepository
from validation.validators import PlanetValidator

planetValidator = PlanetValidator()
planetRepository = PlanetRepository()
planetService = PlanetService(planetRepository, planetValidator)


router = APIRouter()
planetController: PlanetController = PlanetController(planetService)
  

router.add_api_route("/", lambda: planetController.getPlanet(), methods=["GET"])
router.add_api_route("/create", lambda: planetController.createPlanet(), methods=["GET"])
