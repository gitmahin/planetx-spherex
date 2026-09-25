from typing import Any

class ApiResponse:
    def __init__(self, status: int, message: str | None = None, data: Any | None= None ):
        self.status = status
        self.message = message
        self.success = True
        self.data = data