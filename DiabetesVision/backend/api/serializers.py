from rest_framework import serializers
from .models import AnalysisResult, Feedback

class AnalysisResultSerializer(serializers.ModelSerializer):
    """Serializer for the AnalysisResult model."""
    class Meta:
        model = AnalysisResult
        fields = [
            'id', 'prediction', 'confidence', 'findings', 
            'recommendations', 'original_image', 'processed_image', 
            'created_at'
        ]
        read_only_fields = ['id', 'created_at']

class FeedbackSerializer(serializers.ModelSerializer):
    """Serializer for the Feedback model."""
    class Meta:
        model = Feedback
        fields = ['id', 'analysis', 'accuracy', 'comments', 'created_at']
        read_only_fields = ['id', 'created_at']

class AnalysisResultWithFeedbackSerializer(serializers.ModelSerializer):
    """Serializer for the AnalysisResult model with nested feedbacks."""
    feedbacks = FeedbackSerializer(many=True, read_only=True)
    
    class Meta:
        model = AnalysisResult
        fields = [
            'id', 'prediction', 'confidence', 'findings', 
            'recommendations', 'original_image', 'processed_image', 
            'created_at', 'feedbacks'
        ]
        read_only_fields = ['id', 'created_at']