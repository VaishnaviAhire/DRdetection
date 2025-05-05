from django.db import models
from django.contrib.postgres.fields import ArrayField

class AnalysisResult(models.Model):
    """Model for storing diabetic retinopathy analysis results."""
    prediction = models.CharField(max_length=100)
    confidence = models.IntegerField()
    findings = ArrayField(models.CharField(max_length=255), blank=True, default=list)
    recommendations = ArrayField(models.CharField(max_length=255), blank=True, default=list)
    original_image = models.ImageField(upload_to='fundus_images/original/')
    processed_image = models.ImageField(upload_to='fundus_images/processed/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Analysis #{self.id} - {self.prediction} ({self.confidence}%)"
    
    class Meta:
        ordering = ['-created_at']

class Feedback(models.Model):
    """Model for collecting user feedback on analysis results."""
    ACCURACY_CHOICES = [
        ('accurate', 'Yes, it was accurate'),
        ('partially_accurate', 'Partially accurate'),
        ('inaccurate', 'No, it was not accurate'),
        ('unsure', 'I am not sure')
    ]
    
    analysis = models.ForeignKey(AnalysisResult, on_delete=models.CASCADE, related_name='feedbacks')
    accuracy = models.CharField(max_length=20, choices=ACCURACY_CHOICES)
    comments = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Feedback for Analysis #{self.analysis.id}"
    
    class Meta:
        ordering = ['-created_at']
