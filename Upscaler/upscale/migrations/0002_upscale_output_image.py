# Generated by Django 4.2.3 on 2023-07-21 07:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('upscale', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='upscale',
            name='output_image',
            field=models.ImageField(default='output', upload_to='result_images/images/output/'),
            preserve_default=False,
        ),
    ]