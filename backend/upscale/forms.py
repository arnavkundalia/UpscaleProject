from django import forms
from .models import Upscale


class ImageForm(forms.ModelForm):
    """Form for the image model"""
    class Meta:
        model = Upscale
        fields = ('input_image',)