from fastapi import APIRouter, Body, Query
from controllers import PlanetController
from services import PlanetService
from repositories import PlanetRepository
from validation.validators import PlanetValidator

planetValidator = PlanetValidator()
planetRepository = PlanetRepository()
planetService = PlanetService(planetRepository)

router = APIRouter()
planetController: PlanetController = PlanetController(planetService, planetValidator)


def start_tracking(payload: dict = Body(...)):
    return planetController.startTracking(payload)


def list_epochs(session_id: str):
    return planetController.listEpochs({"session_id": session_id})


def next_frame(session_id: str):
    return planetController.nextFrame({"session_id": session_id})


def get_path(session_id: str):
    return planetController.getPath({"session_id": session_id})


def compare_epochs(session_id: str, index_a: int = Query(...), index_b: int = Query(...)):
    return planetController.compareEpochs(
        {"session_id": session_id, "index_a": index_a, "index_b": index_b}
    )

router.add_api_route("/sessions", start_tracking, methods=["POST"])
router.add_api_route("/sessions/{session_id}/epochs", list_epochs, methods=["GET"])
router.add_api_route("/sessions/{session_id}/next", next_frame, methods=["GET"])
router.add_api_route("/sessions/{session_id}/path", get_path, methods=["GET"])
router.add_api_route("/sessions/{session_id}/compare", compare_epochs, methods=["GET"])