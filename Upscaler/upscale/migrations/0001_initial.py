# Generated by Django 4.2.3 on 2023-07-19 12:35

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Upscale',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('input_image', models.ImageField(upload_to='input_images/')),
            ],
        ),
    ]
