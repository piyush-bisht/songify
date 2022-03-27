"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path

from . import views

urlpatterns = [
<<<<<<< HEAD
    path('', views.index, name='index'),
    path('getTrackFeatures',views.getTrackFeatures,name='getTrackFeatures'),
    # path('user/likedSongs/<slug:slug>',views.fetchUserSongs)
=======
    path('', views.make_user_user_dataset),
    path('user/likedSongs/<slug:slug>',views.fetchUserLikedSongs),
    path('user/likedSongs/rec/<slug:slug>',views.fetchUserSongs)
>>>>>>> b83b1f21d820f026bc4a6dcd53a9374c865d5737
]