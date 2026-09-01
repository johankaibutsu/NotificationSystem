from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Trigger, NotificationTemplate
from .serializers import TriggerSerializer, TemplateSerializer
from .services import send_notification

class TriggerViewSet(viewsets.ModelViewSet):
    queryset = Trigger.objects.all()
    serializer_class = TriggerSerializer

    # This creates the URL: /api/triggers/{id}/fire/
    @action(detail=True, methods=['post'])
    def fire(self, request, pk=None):
        trigger = self.get_object() # This looks up the Trigger by ID
        templates = trigger.templates.filter(is_active=True)

        for t in templates:
            send_notification(t)

        return Response({"status": f"Notifications for {trigger.name} sent!"})

class TemplateViewSet(viewsets.ModelViewSet):
    queryset = NotificationTemplate.objects.all()
    serializer_class = TemplateSerializer
