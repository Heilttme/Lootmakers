from django.contrib import admin
from .models import Review, Item

admin.site.register(Item)
admin.site.register(Review)

from django.contrib import admin
from django.db import models

from .models import Item
from django.forms.widgets import FileInput


class ItemAdmin(admin.ModelAdmin):
    formfield_overrides = {
        models.CharField: {"widget": FileInput},
    }

    class Meta:
        model = Item