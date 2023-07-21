from rest_framework import serializers

from .models import Upscale, UpscaleOutput

class UpscaleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Upscale
        fields = ('id', 'input_image')

class UpscaleOutputSerializer(serializers.ModelSerializer):
    class Meta:
        model = UpscaleOutput
        fields = ('id', 'output_image') 