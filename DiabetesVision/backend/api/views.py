from rest_framework import viewsets, status
from rest_framework.decorators import api_view, parser_classes
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from .models import AnalysisResult, Feedback
from .serializers import AnalysisResultSerializer, FeedbackSerializer, AnalysisResultWithFeedbackSerializer
import json

class AnalysisResultViewSet(viewsets.ModelViewSet):
    """ViewSet for the AnalysisResult model."""
    queryset = AnalysisResult.objects.all().order_by('-created_at')
    serializer_class = AnalysisResultSerializer
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return AnalysisResultWithFeedbackSerializer
        return AnalysisResultSerializer

class FeedbackViewSet(viewsets.ModelViewSet):
    """ViewSet for the Feedback model."""
    queryset = Feedback.objects.all().order_by('-created_at')
    serializer_class = FeedbackSerializer

@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def upload_image(request):
    """
    API endpoint for uploading an image for analysis.
    For now, this returns a hardcoded diabetic retinopathy analysis result.
    """
    if 'image' not in request.FILES:
        return Response({'error': 'No image file provided'}, status=status.HTTP_400_BAD_REQUEST)
    
    image = request.FILES['image']
    
    # Create new AnalysisResult object with the uploaded image
    result = AnalysisResult(
        prediction="Diabetic Retinopathy",
        confidence=85,
        findings=["Microaneurysms detected", "Hard exudates present", "Dot hemorrhages observed"],
        recommendations=["Schedule follow-up with ophthalmologist", "Control blood sugar levels", "Regular eye examinations every 6 months"],
        original_image=image
    )
    result.save()
    
    # Return the analysis result
    serializer = AnalysisResultSerializer(result)
    return Response(serializer.data, status=status.HTTP_201_CREATED)
