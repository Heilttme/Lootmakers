from django import forms
from .models import Item, Image3D, ImageList

def upload_path_item_3d(instance, filename):
    return "item_content/item_{0}/3d".format(instance.id)

def upload_path_item_all_images(instance, filename):
    return "item_content/item_{0}/3d".format(instance.id)

class ItemForm(forms.Form):
    name = forms.CharField()
    collection = forms.CharField()
    images3D = forms.ImageField(widget=forms.ClearableFileInput(attrs={"multiple": True}))
    displayImage = forms.ImageField()
    images = forms.ImageField(widget=forms.ClearableFileInput(attrs={"multiple": True}))
    blockInfo = forms.CharField()
    isPreorder = forms.BooleanField(required=False)
    releaseDate = forms.CharField()
    price = forms.IntegerField()
    quantityAvailable = forms.IntegerField()

    def save(self, commit=True):
        name = self.cleaned_data.get('name')
        print(self.cleaned_data)
        images3D = self.cleaned_data.get_list('images3D')
        displayImage = self.cleaned_data.get('displayImage')
        images = self.cleaned_data.getlist('images')
        blockInfo = self.cleaned_data.get('blockInfo')
        isPreorder = self.cleaned_data.get('isPreorder')
        releaseDate = self.cleaned_data.get('releaseDate')
        price = self.cleaned_data.get('price')
        quantityAvailable = self.cleaned_data.get('quantityAvailable')

        item = Item(name=name, displayImage=displayImage, theCollectibleDescription=theCollectibleDescription, aboutDescription=aboutDescription, blockInfo=blockInfo, isPreorder=isPreorder, releaseDate=releaseDate, price=price, quantityAvailable=quantityAvailable)
        item.save()

        for i in images3D:
            i = Image3D(image=i, item=item.id)
            i.save()

        for i in images:
            i = Image3D(image=i, item=item.id)
            i.save()

        return 