from rest_framework import serializers

from .models import Upscale

class UpscaleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Upscale
        fields = ('id', 'input_image')