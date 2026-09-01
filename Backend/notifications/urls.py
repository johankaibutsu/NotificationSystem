from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TriggerViewSet

router = DefaultRouter()
# This creates the /triggers/ part of the URL
router.register(r'triggers', TriggerViewSet, basename='trigger')

urlpatterns = [
    path('', include(router.urls)),
]
