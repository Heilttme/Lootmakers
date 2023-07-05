from typing import Type
from django.http import HttpResponse
from django.shortcuts import render, redirect
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.views.generic.edit import FormView
from .models import Review, Item, Image3D, ImageList, DisplayImage
from .serializers import ReviewSerializer, ItemSerializer, Image3DSerializer, ImageListSerializer, DisplayImageSerializer
from .forms import ItemForm
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


class Admin_Panel(FormView):
    form_class = ItemForm
    template_name = 'index.html'
    success_url = reverse_lazy('/')

    def form_valid(self, form):
        newForm = form
        newForm.save()

        return super(Admin_Panel, self).form_valid(form)
    
    
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