from fastapi import FastAPI 
from libs import ApiResponse, ApiError
from fastapi.exceptions import RequestValidationError
from middlewares import exception_middleware, validation_exception_handler, marsh_exception_handler
from marshmallow import ValidationError
from routers import router as ApiRouter
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_exception_handler(ValidationError, marsh_exception_handler)
app.add_exception_handler(RequestValidationError, validation_exception_handler)
app.add_exception_handler(ApiError, exception_middleware)

app.include_router(ApiRouter, prefix="/api")

@app.get("/health")
def health_route():
    return ApiResponse(200, "Ok")