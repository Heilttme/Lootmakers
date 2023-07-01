from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Review
from .serializers import ReviewSerializer, ItemSerializer

@api_view(["GET"])
def get_reviews(request):
    reviews = Review.objects.all()

    return Response({"data": ReviewSerializer(reviews, many=True).data})

@api_view(["GET"])
def get_items(request):
    items = Review.objects.all()

    return Response({"data": ReviewSerializer(items, many=True).data})
