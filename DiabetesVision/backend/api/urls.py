from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'analysis-results', views.AnalysisResultViewSet)
router.register(r'feedback', views.FeedbackViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('upload/', views.upload_image, name='upload-image'),
]