from django.urls import path
from .views import get_items, get_reviews, toy_admin_panel, get_display_images, get_3d_images, get_list_images, get_item_images, get_item_3d_images

urlpatterns = [
    path("get_items/", get_items),
    path("get_reviews/", get_reviews),
    path('toy_admin/', toy_admin_panel),
    path('get_display_images/', get_display_images),
    path('get_3d_images/', get_3d_images),
    path('get_list_images/', get_list_images),
    path('get_item_3d_images/', get_item_3d_images),
    path('get_item_images/', get_item_images),
]
