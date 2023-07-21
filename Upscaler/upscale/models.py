from django.db import models

# Create your models here.

class Upscale(models.Model):
    input_image = models.ImageField(upload_to='input_images/')
    
class UpscaleOutput(models.Model):
    output_image = models.ImageField(upload_to='result_images/images/output/')
