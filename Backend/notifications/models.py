from django.db import models

class Trigger(models.Model):
    name = models.CharField(max_length=100) # e.g., Login
    slug = models.SlugField(unique=True)     # e.g., login

    def __str__(self):
        return self.name

class NotificationTemplate(models.Model):
    CHANNELS = [('whatsapp', 'WhatsApp'), ('email', 'Email'), ('web_push', 'Web Push')]
    trigger = models.ForeignKey(Trigger, related_name='templates', on_delete=models.CASCADE)
    channel = models.CharField(max_length=20, choices=CHANNELS)
    subject = models.CharField(max_length=255, blank=True, null=True)
    body = models.TextField()
    is_active = models.BooleanField(default=False)

    class Meta:
        unique_together = ('trigger', 'channel')
