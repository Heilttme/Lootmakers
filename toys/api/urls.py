from django.urls import path
from .views import get_items, get_reviews

urlpatterns = [
    path("get_items/", get_items),
    path("get_reviews/", get_reviews)
]
