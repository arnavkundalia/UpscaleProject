from django.db import models

# Create your models here.

class Upscale(models.Model):
    input_image = models.ImageField(upload_to="input_images")

    def get_image_name(self):
        return self.input_image.name
    
    def get_input_image(self):
        return self.input_image