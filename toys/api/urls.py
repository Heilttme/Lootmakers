from django.urls import path
from .views import get_items, get_reviews, toy_admin_panel, Admin_Panel

urlpatterns = [
    path("get_items/", get_items),
    path("get_reviews/", get_reviews),
    path('toy_admin/', toy_admin_panel),
]
