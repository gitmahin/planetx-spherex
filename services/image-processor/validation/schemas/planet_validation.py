from marshmallow import Schema, fields

class PlanetValidationSchema:
    class CreatePlanetSchema(Schema):
        name = fields.Str()
        age = fields.Int()