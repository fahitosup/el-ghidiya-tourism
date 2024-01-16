from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenVerifyView
)
from .views import CreateMailView
from django.urls import path

urlpatterns = [
    path('contact/', CreateMailView, name="create-mail"),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
]