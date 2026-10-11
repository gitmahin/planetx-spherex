from marshmallow import Schema, fields, validate


class PlanetValidationSchema:

    class StartTrackingSchema(Schema):
        ra = fields.Float(required=True, validate=validate.Range(min=0, max=360))
        dec = fields.Float(required=True, validate=validate.Range(min=-90, max=90))
        window_arcmin = fields.Float(load_default=10.0, validate=validate.Range(min=0.5, max=60))
        band = fields.String(load_default="D1", validate=validate.OneOf(["D1", "D2", "D3", "D4", "D5", "D6"]))

    class SessionSchema(Schema):
        session_id = fields.String(required=True, validate=validate.Length(min=1))

    class CompareEpochsSchema(Schema):
        session_id = fields.String(required=True, validate=validate.Length(min=1))
        index_a = fields.Integer(required=True, validate=validate.Range(min=0))
        index_b = fields.Integer(required=True, validate=validate.Range(min=0))