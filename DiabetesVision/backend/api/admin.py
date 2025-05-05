from django.contrib import admin
from .models import AnalysisResult, Feedback

@admin.register(AnalysisResult)
class AnalysisResultAdmin(admin.ModelAdmin):
    list_display = ('id', 'prediction', 'confidence', 'created_at')
    list_filter = ('prediction', 'created_at')
    search_fields = ('prediction',)
    readonly_fields = ('created_at',)

@admin.register(Feedback)
class FeedbackAdmin(admin.ModelAdmin):
    list_display = ('id', 'analysis', 'accuracy', 'created_at')
    list_filter = ('accuracy', 'created_at')
    search_fields = ('comments',)
    readonly_fields = ('created_at',)
