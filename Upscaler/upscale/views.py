# Create your views here.
import subprocess
from requests import Response
from rest_framework import viewsets,status
from .serializers import UpscaleSerializer, UpscaleOutputSerializer
from .models import Upscale, UpscaleOutput
import os
import shutil
from django.views.decorators.csrf import csrf_exempt



def upload_image():
    """Process images uploaded by users"""
    # print("Test")
    input_path = 'media\\input_images'
    # Run the deep learning model using CLI calls
    command = ['python', 'HAT\\run.py', '--input', input_path]
    subprocess.run(command, check=True)
    print("Model finished running, flushing input files.")
    os.chmod(input_path, 0o644)
    shutil.rmtree(input_path, ignore_errors=False, onerror=None)

class UpscaleView(viewsets.ModelViewSet):
    serializer_class = UpscaleSerializer
    queryset = Upscale.objects.all()

    @csrf_exempt
    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        upload_image()
        header = self.get_success_headers(serializer.data)
        return Response


class UpscaleOutputView(viewsets.ModelViewSet):
    serializer_class = UpscaleOutputSerializer
    queryset = UpscaleOutput.objects.all()