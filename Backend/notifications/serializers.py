from rest_framework import serializers
from .models import Trigger, NotificationTemplate

class TemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = NotificationTemplate
        fields = '__all__'

class TriggerSerializer(serializers.ModelSerializer):
    # This nesting allows the frontend to see templates inside the trigger
    templates = TemplateSerializer(many=True, read_only=True)

    class Meta:
        model = Trigger
        fields = ['id', 'name', 'slug', 'templates']
