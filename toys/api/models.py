from django.db import models

def upload_path_item(instance, filename):
    return "/".join(["media/review_pfps", filename])


class Item(models.Model):
    name = models.CharField(max_length=255, null=True, blank=True)
    images3D = models.ImageField(default="pfps/default_pfp.jpg")
    displayImage = models.CharField(max_length=255, null=True, blank=True)
    images = models.CharField(max_length=255, null=True, blank=True)
    theCollectibleDescription = models.CharField(max_length=255, null=True, blank=True)
    aboutDescription = models.CharField(max_length=255, null=True, blank=True)
    blockInfo = models.CharField(max_length=255, null=True, blank=True)
    isPreorder = models.BooleanField()
    releaseDate = models.CharField(max_length=255, null=True, blank=True)
    price = models.IntegerField()
    quantityAvailable = models.IntegerField()

def upload_path_review_pfp(instance, filename):
    return "/".join(["media/review_pfps", filename])

def upload_path_review_image(instance, filename):
    return "/".join(["media/review_image", filename])

class Review(models.Model):
    pfp = models.ImageField(default="pfps/default_pfp.jpg", upload_to=upload_path_review_pfp)
    reviewImage = models.ImageField(default="pfps/default_pfp.jpg", upload_to=upload_path_review_image)
    nickname = models.CharField(max_length=255, null=True, blank=True)
    username = models.CharField(max_length=255, null=True, blank=True)
    content = models.CharField(max_length=255, null=True, blank=True)
