from rest_framework import serializers
from .models import Review, Item, DisplayImage, ImageList, Image3D
from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ("id", "username", "email", "password")

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = "__all__"


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = "__all__"


class DisplayImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = DisplayImage
        fields = "__all__"


class ImageListSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImageList
        fields = "__all__"


class Image3DSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image3D
        fields = "__all__"
