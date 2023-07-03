from django.db import models

def upload_path_item_3d(instance, filename):
    return "media/item_content/item_{0}/3d/{0}.png".format(instance.item.id, filename)

def upload_path_item_display(instance, filename):
    return "media/item_content/item_{0}/display/{0}.png".format(instance.item.id, filename)

def upload_path_item_all_images(instance, filename):
    return "media/item_content/item_{0}/images/{0}.png".format(instance.item.id, filename)


class Item(models.Model):
    name = models.CharField(max_length=255, null=True, blank=True)
    theCollectibleDescription = models.CharField(max_length=2555, null=True, blank=True)
    aboutDescription = models.CharField(max_length=2555, null=True, blank=True)
    blockInfo = models.CharField(max_length=255, null=True, blank=True)
    isPreorder = models.BooleanField(null=True, blank=True)
    releaseDate = models.CharField(max_length=255, null=True, blank=True)
    price = models.IntegerField()
    quantityAvailable = models.IntegerField()


class DisplayImage(models.Model):
    image = models.ImageField(upload_to=upload_path_item_display)
    a = models.CharField(max_length=222, null=True, blank=True)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)

class Image3D(models.Model):
    image = models.ImageField(upload_to=upload_path_item_3d)
    a = models.CharField(max_length=222, null=True, blank=True)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)

class ImageList(models.Model):
    image = models.ImageField(upload_to=upload_path_item_all_images)
    a = models.CharField(max_length=222, null=True, blank=True)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)


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
