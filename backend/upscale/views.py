# Create your views here.
from django.shortcuts import render
from .forms import ImageForm
from .models import Upscale
import subprocess
import os
from django.http import FileResponse

def upload_image(request):
    """Process images uploaded by users"""
    if request.method == 'POST':
        form = ImageForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()

            input_path = 'media/input_images'
            #return render(request, 'index.html', {'form': form, 'img_obj': img_obj})
            # Run the deep learning model using CLI calls
            command = ['python', 'HAT\\run.py', '--input', input_path]
            subprocess.run(command, check=True)
            print("Model finished running, flushing input files.")
            os.chmod(input_path, 0o644)
            os.remove(input_path)

            # Obtain the path and file name of the generated image
            image_path = os.path.join(os.path.abspath(os.path.join(__file__, os.pardir,os.pardir)), 'result_images')
            image_filename =  os.path.basename(image_path)

            # Set appropriate file permissions (optional)
            os.chmod(image_path, 0o644)  # Adjust the permission mode as needed
            
            # Serve the generated image for download
            with open(image_path, 'rb') as f:
                response = FileResponse(f)
                response['Content-Disposition'] = 'attachment; filename="{}"'.format(image_filename)
                return response
            
    else:
        form = ImageForm()
    #return render(request, 'upload_image.html', {'form': form})
