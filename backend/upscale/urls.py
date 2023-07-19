from django.contrib import admin
from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()

router.register(r'input_images',views.UpscaleView, 'input images')


urlpatterns = [
    path('', views.upload_image, name='upload_image'),
    path('api/', include(router.urls))

]
