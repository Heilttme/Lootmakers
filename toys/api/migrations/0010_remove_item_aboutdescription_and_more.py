# Generated by Django 4.1.5 on 2023-07-04 18:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_displayimage_a_image3d_a_imagelist_a'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='item',
            name='aboutDescription',
        ),
        migrations.RemoveField(
            model_name='item',
            name='theCollectibleDescription',
        ),
        migrations.AddField(
            model_name='item',
            name='collection',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='item',
            name='blockInfo',
            field=models.CharField(blank=True, max_length=2555, null=True),
        ),
    ]
