from ..schemas import PlanetValidationSchema
from typing import Any

class PlanetValidator(PlanetValidationSchema):
    def createPlanetInput(self, payload: dict):
        schema = self.CreatePlanetSchema()
        result = schema.load(payload)
        return result

