# Generated by Django 4.2.3 on 2023-07-19 06:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('upscale', '0004_upscale_name_upscale_output_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='upscale',
            name='output_image',
        ),
    ]
