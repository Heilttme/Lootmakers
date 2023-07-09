from django.db import models

def upload_path_item_3d(instance, filename):
    item = Item.objects.filter(id=instance.item.id)[0]
    count = len(Image3D.objects.filter(item=item.id))
    s = str(item.id) + "_" + str(count)
    return "media/item_content/item_{0}/3d/{1}.png".format(instance.item.id, s)

def upload_path_item_display(instance, filename):
    return "media/item_content/item_{0}/display/{0}.png".format(instance.item.id, filename)

def upload_path_item_all_images(instance, filename):
    return "media/item_content/item_{0}/images/{0}.png".format(instance.item.id, filename)


class Item(models.Model):
    name = models.CharField(max_length=255, null=True, blank=True)
    collection = models.CharField(max_length=255, null=True, blank=True)
    blockInfo = models.CharField(max_length=255, null=True, blank=True)
    isPreorder = models.BooleanField(null=True, blank=True)
    releaseDate = models.CharField(max_length=255, null=True, blank=True)
    price = models.FloatField()
    quantityAvailable = models.IntegerField()


class DisplayImage(models.Model):
    image = models.ImageField(upload_to=upload_path_item_display)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)

class Image3D(models.Model):
    image = models.ImageField(upload_to=upload_path_item_3d)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)

class ImageList(models.Model):
    image = models.ImageField(upload_to=upload_path_item_all_images)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)


def upload_path_review_pfp(instance, filename):
    return "/".join(["media/review_pfps", filename])

def upload_path_review_image(instance, filename):
    return "/".join(["media/review_image", filename])

class Review(models.Model):
    nickname = models.CharField(max_length=255, null=True, blank=True)
    username = models.CharField(max_length=255, null=True, blank=True)
    content = models.CharField(max_length=255, null=True, blank=True)
    pfp = models.ImageField(default="pfps/default_pfp.jpg", upload_to=upload_path_review_pfp)
    reviewImage = models.ImageField(default="pfps/default_pfp.jpg", upload_to=upload_path_review_image)
