# Generated by Django 4.1.5 on 2023-07-02 07:42

import api.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_item_images3d'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='images',
            field=models.FileField(default='pfps/default_pfp.jpg', upload_to=api.models.upload_path_item_all_images),
        ),
    ]
