from fastapi import FastAPI 
from libs import ApiResponse, ApiError
from fastapi.exceptions import RequestValidationError
from middlewares import exception_middleware, validation_exception_handler, marsh_exception_handler
from marshmallow import ValidationError
from routers import router as ApiRouter

app = FastAPI()

app.add_exception_handler(ValidationError, marsh_exception_handler)
app.add_exception_handler(RequestValidationError, validation_exception_handler)
app.add_exception_handler(ApiError, exception_middleware)

app.include_router(ApiRouter, prefix="/api")

@app.get("/health")
def health_route():
    return ApiResponse(200, "Ok")


@app.get("/items/{item_id}")
async def read_item(item_id: int):
    if item_id == 3:
        raise ApiError(418, "Nope! I don't like 3.")
    return {"item_id": item_id}