# Generated by Django 4.1.5 on 2023-07-02 19:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_alter_item_images'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='aboutDescription',
            field=models.CharField(blank=True, max_length=2555, null=True),
        ),
        migrations.AlterField(
            model_name='item',
            name='images',
            field=models.CharField(blank=True, max_length=2555, null=True),
        ),
        migrations.AlterField(
            model_name='item',
            name='images3D',
            field=models.CharField(blank=True, max_length=2555, null=True),
        ),
        migrations.AlterField(
            model_name='item',
            name='theCollectibleDescription',
            field=models.CharField(blank=True, max_length=2555, null=True),
        ),
    ]
