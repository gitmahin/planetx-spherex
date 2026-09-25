from .planet_router import router as planetRouter
from fastapi import APIRouter

router = APIRouter()

router.include_router(planetRouter, prefix="/v1/planets", tags=["planets"])