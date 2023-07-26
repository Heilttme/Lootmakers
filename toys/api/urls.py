from django.urls import path
from .views import get_items, get_reviews, toy_admin_panel, get_display_images, get_3d_images, get_list_images, get_item_images, get_item_3d_images, toy_admin_panel_review, toy_admin_panel_add_item, toy_admin_panel_add_review, remove_item, remove_review

urlpatterns = [
    path("get_items/", get_items),
    path("get_reviews/", get_reviews),
    path('toy_admin/', toy_admin_panel),
    path('toy_admin_review/', toy_admin_panel_review),
    
    path('toy_admin_add_item/', toy_admin_panel_add_item),
    path('toy_admin_add_review/', toy_admin_panel_add_review),

    path('get_display_images/', get_display_images),
    path('get_3d_images/', get_3d_images),
    path('get_list_images/', get_list_images),
    path('get_item_3d_images/', get_item_3d_images),
    path('get_item_images/', get_item_images),
    path('remove_item/', remove_item),
    path('remove_review/', remove_review),
]
