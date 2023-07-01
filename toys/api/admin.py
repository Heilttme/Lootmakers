from django.contrib import admin
from .models import Review, Item

admin.site.register(Item)
admin.site.register(Review)