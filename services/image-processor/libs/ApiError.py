from typing import Any
import traceback

class ApiError(Exception):
    def __init__(self, status: int, message: str, errors: list[Any] | None = None, stack: str | None = None, ):
        self.status = status
        self.message = message
        self.success = False
        self.errors = errors or []

        if(stack):
            self.stack = stack
        else:
            self.stack = stack or "".join(traceback.format_stack()[:-1])

    
        

