# Generated by Django 4.2.3 on 2023-07-18 05:42

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='MyModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('input_image', models.ImageField(upload_to='input_images/')),
                ('output_image', models.ImageField(upload_to='output_images/')),
            ],
        ),
    ]
