# Create your views here.
import subprocess
from django.shortcuts import render
from .forms import ImageUploadForm
from django.http import HttpResponse
from rest_framework import viewsets
from .serializers import UpscaleSerializer
from .models import Upscale

class UpscaleView(viewsets.ModelViewSet):
    serializer_class = UpscaleSerializer

    queryset = Upscale.objects.all()


def upload_image(request):
    if request.method == 'POST':
        form = ImageUploadForm(request.POST, request.FILES)
        if form.is_valid():
            image = form.cleaned_data['image']
            image_path = 'media/' + image.name
            with open(image_path, 'wb') as f:
                for chunk in image.chunks():
                    f.write(chunk)
            
            output_image_path = 'media/output_image.jpg'

            # Run the deep learning model using CLI calls
            command = ['python', 'HAT\\run.py', '--input', image_path, '--out', output_image_path]
            subprocess.run(command, check=True)
            
            # Provide the output image as a downloadable file
            response = HttpResponse(content_type='application/octet-stream')
            response['Content-Disposition'] = 'attachment; filename=output_image.jpg'
            with open(output_image_path, 'rb') as f:
                response.write(f.read())
            return response
    else:
        form = ImageUploadForm()
    return render(request, 'upload_image.html', {'form': form})
