from typing import Type
from django.http import HttpResponse
from django.shortcuts import render, redirect
from rest_framework.decorators import api_view
from rest_framework.status import HTTP_200_OK
from rest_framework.response import Response
from django.views.generic.edit import FormView
from .models import Review, Item, Image3D, ImageList, DisplayImage
from .serializers import ReviewSerializer, ItemSerializer, Image3DSerializer, ImageListSerializer, DisplayImageSerializer
from .forms import ItemForm, ReviewForm
from django.urls import reverse_lazy

@api_view(["GET"])
def get_reviews(request):
    reviews = Review.objects.all()

    return Response({"data": ReviewSerializer(reviews, many=True).data})

@api_view(["GET"])
def get_items(request):
    items = Item.objects.all()

    return Response({"data": ItemSerializer(items, many=True).data})

@api_view(["GET"])
def get_display_images(request):
    images = DisplayImage.objects.all()

    return Response({"data": DisplayImageSerializer(images, many=True).data})

@api_view(["GET"])
def get_3d_images(request):
    images = Image3D.objects.all()

    return Response({"data": Image3DSerializer(images, many=True).data})

@api_view(["GET"])
def get_list_images(request):
    images = ImageList.objects.all()

    return Response({"data": ImageListSerializer(images, many=True).data})

@api_view(["POST"])
def get_item_3d_images(request):
    id = request.data.get("id")
    images = Image3D.objects.filter(item=id)
    images = Image3DSerializer(images, many=True).data

    return Response({"data": images})

@api_view(["POST"])
def get_item_images(request):
    id = request.data.get("id")
    images = ImageList.objects.filter(item=id)
    images = ImageListSerializer(images, many=True).data

    return Response({"data": images})

    
@api_view(["POST"])
def toy_admin_panel_add_item(request):
    name = request.data.get('name')
    collection = request.data.get('collection')
    mainText = request.data.get('mainText')
    quote = request.data.get('quote')
    author = request.data.get('author')
    blockInfo = request.data.get('blockInfo')
    isPreorder = request.data.get('isPreorder') == "on"
    releaseDate = request.data.get('releaseDate')
    price = request.data.get('price')
    quantityAvailable = request.data.get('quantityAvailable')

    item = Item(name=name, collection=collection, mainText=mainText, quote=quote, author=author, blockInfo=blockInfo, isPreorder=isPreorder, releaseDate=releaseDate, price=price, quantityAvailable=quantityAvailable)
    item.save()

    for i in request.FILES:
        if i.startswith("images3D"):
            im = Image3D(image=request.FILES[i], item=item)
            im.save()
        elif i.startswith("images"):
            im = ImageList(image=request.FILES[i], item=item)
            im.save()
        elif i.startswith("displayImage"):
            im = DisplayImage(image=request.FILES[i], item=item)
            im.save()

    return Response(status=HTTP_200_OK)

@api_view(["POST"])
def toy_admin_panel_add_review(request):
    nickname = request.data.get('nickname')
    username = request.data.get('username')
    content = request.data.get('content')
    pfp = request.FILES.get('pfp')
    reviewImage = request.FILES.get('reviewImage')

    review = Review(nickname=nickname, username=username, content=content, pfp=pfp, reviewImage=reviewImage)
    review.save()

    return Response(status=HTTP_200_OK)


def toy_admin_panel(request):
    if request.method == "POST": 
        form = ItemForm(request.POST, request.FILES)
        if form.is_valid(): 
            name = form.data.get('name')
            collection = form.data.get('collection')
            images3D = request.FILES.getlist('images3D')
            displayImage = request.FILES.getlist('displayImage')
            images = request.FILES.getlist('images')
            blockInfo = form.data.get('blockInfo')
            isPreorder = form.data.get('isPreorder')
            isPreorder = isPreorder == 'on'
            releaseDate = form.data.get('releaseDate')
            price = form.data.get('price')
            quantityAvailable = form.data.get('quantityAvailable')

            item = Item(name=name, collection=collection, blockInfo=blockInfo, isPreorder=isPreorder, releaseDate=releaseDate, price=price, quantityAvailable=quantityAvailable)
            item.save()

            for i in displayImage:
                i = DisplayImage(image=i, item=item)
                i.save()

            for i in images3D:
                i = Image3D(image=i, item=item)
                i.save()

            for i in images:
                i = ImageList(image=i, item=item)
                i.save()
    else: 
        form = ItemForm() 
        
    return render(request, "index.html", {"form": form})


def toy_admin_panel_review(request):
    if request.method == "POST": 
        form = ReviewForm(request.POST, request.FILES)
        if form.is_valid(): 
            nickname = form.data.get('nickname')
            username = form.data.get('username')
            content = form.data.get('content')
            pfp = request.FILES.get('pfp')
            reviewImage = request.FILES.get('reviewImage')

            item = Review(nickname=nickname, pfp=pfp, reviewImage=reviewImage, username=username, content=content)
            item.save()

    else: 
        form = ReviewForm() 

    return render(request, "index.html", {"form": form})

@api_view(["POST"])
def remove_item(request):
    items = Item.objects.filter(id=request.data.get("id"))[0].delete()
    # items = items.filter(key=lambda x: x.id == request.data.get("id"))[0].delete()

    return Response(status=HTTP_200_OK)

@api_view(["POST"])
def remove_review(request):
    items = Review.objects.filter(id=request.data.get("id"))[0].delete()

    return Response(status=HTTP_200_OK)