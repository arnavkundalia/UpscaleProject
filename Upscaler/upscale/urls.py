from django.contrib import admin
from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'input_images',views.UpscaleView, 'input images')
router.register(r'result_images/images/output',views.UpscaleOutputView, 'result images')


urlpatterns = [
    path('', views.UpscaleView.create, name='upload_image'),
    path('api/', include(router.urls))

]
