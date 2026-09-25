from fastapi.responses import JSONResponse
from fastapi import Request
from fastapi.exceptions import RequestValidationError
from marshmallow import ValidationError
from libs import ApiError

async def exception_middleware(request: Request, exc: ApiError):
    return JSONResponse(
        status_code=exc.status,
        content={"message": exc.message, "errors": exc.errors, "stack": exc.stack},   
    )


async def validation_exception_handler(request: Request, exc: RequestValidationError):
    message = "Validation errors"
    errors: list[dict] = []
    for error in exc.errors():
        errors.append({
            "field:": error["loc"][1],
            "error": error["msg"]
        })
       
    raise ApiError(400, message, errors)

async def marsh_exception_handler(request: Request, exc: ValidationError):
    message = "Input Validation errors"
    errors: list[dict] = []
    for key, msg in exc.messages.items():
        errors.append({
            "field:": key,
            "error": msg
        })
       
    raise ApiError(400, message, errors)