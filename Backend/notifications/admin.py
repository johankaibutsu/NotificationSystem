from django.contrib import admin
from .models import Trigger, NotificationTemplate

# This makes "Triggers" and "Templates" appear in the admin dashboard
admin.site.register(Trigger)
admin.site.register(NotificationTemplate)
