from ..schemas import PlanetValidationSchema
from typing import Any


class PlanetValidator(PlanetValidationSchema):
    def startTrackingInput(self, payload: dict):
        return self.StartTrackingSchema().load(payload)

    def sessionInput(self, payload: dict):
        return self.SessionSchema().load(payload)

    def compareEpochsInput(self, payload: dict):
        return self.CompareEpochsSchema().load(payload)