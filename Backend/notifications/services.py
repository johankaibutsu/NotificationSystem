import requests
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

def send_notification(template):
    """
    Main service to route notifications to the correct channel API.
    """
    if not template.is_active:
        print(f"--- [SKIPPED] {template.channel} template for '{template.trigger.name}' is not active. ---")
        return

    print(f"--- [START] Sending {template.channel} for trigger: {template.trigger.name} ---")

    # 1. WHATSAPP (Meta Cloud API)
    if template.channel == 'whatsapp':
        send_whatsapp(template)

    # 2. EMAIL (Resend API - Easiest for testing)
    elif template.channel == 'email':
        send_email(template)

    # 3. WEB PUSH (OneSignal API)
    elif template.channel == 'web_push':
        send_webpush(template)


def send_whatsapp(template):
    token = os.getenv('WHATSAPP_ACCESS_TOKEN')
    phone_id = os.getenv('PHONE_NUMBER_ID')
    recipient = os.getenv('TEST_PHONE') # Your phone number with country code

    url = f"https://graph.facebook.com/v17.0/{phone_id}/messages"
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    data = {
        "messaging_product": "whatsapp",
        "to": recipient,
        "type": "text",
        "text": {"body": template.body}
    }

    try:
        response = requests.post(url, json=data, headers=headers)
        print(f"WhatsApp Status: {response.status_code}")
        print(f"WhatsApp Response: {response.text}")
    except Exception as e:
        print(f"WhatsApp Error: {e}")


def send_email(template):
    api_key = os.getenv('RESEND_API_KEY')
    sender = "onboarding@resend.dev" # Default for Resend testing
    recipient = os.getenv('TEST_EMAIL') # Your verified email

    url = "https://api.resend.com/emails"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    data = {
        "from": sender,
        "to": recipient,
        "subject": template.subject or "Notification Update",
        "html": f"<p>{template.body}</p>"
    }

    try:
        response = requests.post(url, json=data, headers=headers)
        print(f"Email Status: {response.status_code}")
        print(f"Email Response: {response.text}")
    except Exception as e:
        print(f"Email Error: {e}")


def send_webpush(template):
    app_id = os.getenv('ONESIGNAL_APP_ID')
    rest_key = os.getenv('ONESIGNAL_REST_API_KEY')

    url = "https://onesignal.com/api/v1/notifications"
    headers = {
        "Authorization": f"Basic {rest_key}",
        "Content-Type": "application/json; charset=utf-8"
    }
    data = {
        "app_id": app_id,
        "included_segments": ["Subscribed Users"],
        "headings": {"en": template.subject or "New Alert"},
        "contents": {"en": template.body}
    }

    try:
        response = requests.post(url, json=data, headers=headers)
        print(f"Web Push Status: {response.status_code}")
        print(f"Web Push Response: {response.text}")
    except Exception as e:
        print(f"Web Push Error: {e}")
