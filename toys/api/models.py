from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager, AbstractUser

def upload_path_item_3d(instance, filename):
    item = Item.objects.filter(id=instance.item.id)[0]
    count = len(Image3D.objects.filter(item=item.id))
    s = str(item.id) + "_" + str(count)
    return "media/item_content/item_{0}/3d/{1}.png".format(instance.item.id, s)

def upload_path_item_display(instance, filename):
    return "media/item_content/item_{0}/display/{0}.png".format(instance.item.id, filename)

def upload_path_item_all_images(instance, filename):
    return "media/item_content/item_{0}/images/{0}.png".format(instance.item.id, filename)

def upload_path_item_blur(instance, filename):
    return "media/item_content/item_{0}/blur/{0}.png".format(instance.item.id, filename)


class Item(models.Model):
    name = models.CharField(max_length=255, default="", null=True, blank=True)
    collection = models.CharField(max_length=255, default="", null=True, blank=True)
    type = models.CharField(max_length=255, default="", null=True, blank=True)
    madeBy = models.CharField(max_length=255, default="", null=True, blank=True)
    blockInfo = models.CharField(max_length=255, default="", null=True, blank=True)
    orderType = models.CharField(max_length=255, default="", null=True, blank=True)
    censor = models.BooleanField(default=None, null=True, blank=True)
    blurred = models.BooleanField(default=None, null=True, blank=True)

    year = models.IntegerField(null=True, blank=True)
    month = models.IntegerField(null=True, blank=True)
    day = models.IntegerField(null=True, blank=True)
    hour = models.IntegerField(null=True, blank=True)

    year1 = models.IntegerField(null=True, blank=True)
    month1 = models.IntegerField(null=True, blank=True)
    day1 = models.IntegerField(null=True, blank=True)
    hour1 = models.IntegerField(null=True, blank=True)

    quote = models.CharField(max_length=255, default="", null=True, blank=True)
    author = models.CharField(max_length=255, default="", null=True, blank=True)
    mainText = models.CharField(max_length=4095, default="", null=True, blank=True)
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


class BlurImage(models.Model):
    image = models.ImageField(upload_to=upload_path_item_blur)
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


class UserAccountManager(BaseUserManager):
    def create_user(self, email, username, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')

        email = self.normalize_email(email)
        user = self.model(email=email, username=username **extra_fields)

        user.set_password(password)
        user.save()

        return user

# class UserAccount(AbstractBaseUser, PermissionsMixin):
#     email = models.EmailField(max_length=255, unique=True)
#     username = models.CharField(max_length=255, default="", null=True, blank=True)
#     is_active = models.BooleanField(default=True)
#     is_staff = models.BooleanField(default=False)

#     objects = UserAccountManager()

#     USERNAME_FIELD = "email"
#     REQUIRED_FIELDS = ["email"]



#     def save(self, *args, **kwargs):
#         # Set the username field to the same value as the email field
#         self.username = ""

#         super(UserAccount, self).save(*args, **kwargs)


class UserAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    username = models.CharField(max_length=255, default="", blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['email']

    groups = models.ManyToManyField(
        'auth.Group',
        related_name='user_accounts_groups',
        blank=True,
        verbose_name='groups',
        help_text='The groups this user belongs to.',
    )

    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='user_accounts_permissions',
        blank=True,
        verbose_name='user permissions',
        help_text='Specific permissions for this user.',
    )
    
    def __str__(self):
        return self.email