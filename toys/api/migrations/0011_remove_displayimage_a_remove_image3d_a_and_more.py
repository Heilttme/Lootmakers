# Generated by Django 4.0.3 on 2023-07-06 15:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_remove_item_aboutdescription_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='displayimage',
            name='a',
        ),
        migrations.RemoveField(
            model_name='image3d',
            name='a',
        ),
        migrations.RemoveField(
            model_name='imagelist',
            name='a',
        ),
    ]
