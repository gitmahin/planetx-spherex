from marshmallow import ValidationError

from services import PlanetService
from libs import ApiResponse
from validation.validators import PlanetValidator


class PlanetController:
    planetService: PlanetService
    planetValidator: PlanetValidator

    def __init__(self, service: PlanetService, validator: PlanetValidator):
        self.planetService = service
        self.planetValidator = validator

    def startTracking(self, payload: dict):
        try:
            data = self.planetValidator.startTrackingInput(payload)
            result = self.planetService.start_tracking(
                data["ra"], data["dec"], data["window_arcmin"], data["band"]
            )
            return ApiResponse(201, "Tracking session created", result)
        except ValidationError as e:
            return ApiResponse(422, "Validation failed", e.messages)
        except ValueError as e:
            return ApiResponse(404, str(e))

    def listEpochs(self, payload: dict):
        try:
            data = self.planetValidator.sessionInput(payload)
            return ApiResponse(200, "Ok", self.planetService.list_epochs(data["session_id"]))
        except ValidationError as e:
            return ApiResponse(422, "Validation failed", e.messages)
        except LookupError as e:
            return ApiResponse(404, str(e))

    def nextFrame(self, payload: dict):
        try:
            data = self.planetValidator.sessionInput(payload)
            return ApiResponse(200, "Ok", self.planetService.next_frame(data["session_id"]))
        except ValidationError as e:
            return ApiResponse(422, "Validation failed", e.messages)
        except LookupError as e:
            return ApiResponse(404, str(e))
        except IndexError as e:
            return ApiResponse(410, str(e))

    def getPath(self, payload: dict):
        try:
            data = self.planetValidator.sessionInput(payload)
            return ApiResponse(200, "Ok", self.planetService.get_path(data["session_id"]))
        except ValidationError as e:
            return ApiResponse(422, "Validation failed", e.messages)
        except LookupError as e:
            return ApiResponse(404, str(e))

    def compareEpochs(self, payload: dict):
        try:
            data = self.planetValidator.compareEpochsInput(payload)
            result = self.planetService.compare_epochs(
                data["session_id"], data["index_a"], data["index_b"]
            )
            return ApiResponse(200, "Ok", result)
        except ValidationError as e:
            return ApiResponse(422, "Validation failed", e.messages)
        except (LookupError, IndexError) as e:
            return ApiResponse(404, str(e))