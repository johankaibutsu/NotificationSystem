# Notification System Simulator

A full-stack multi-channel notification system that allows admins to manage and fire templates for WhatsApp, Email, and Web Push from a single dashboard.

## 🚀 Live Links
*   **Frontend (Vercel):** [Frontend](https://notification-system-seven-delta.vercel.app/)
*   **Backend API (Render):** [Backend API](https://notificationsystem-backend.onrender.com/api/triggers/)
*   **Admin Panel:** [Admin Panel](https://notification-system-seven-delta.vercel.app/admin)

## 🛠 Tech Stack
*   **Backend:** Python + Django (REST Framework)
*   **Frontend:** Next.js + Tailwind CSS + TypeScript
*   **APIs:** WhatsApp Cloud API (Meta), Resend (Email), OneSignal (Web Push)
*   **Database:** SQLite (Render Ephemeral)

## ⚡ Triggers Built
1.  **Login:** Fires when a user signs in.
2.  **Logout:** Fires when a user signs out.
*Note: Both triggers support all 3 channels simultaneously.*

## 🔑 Environment Variables (.env)
To run this project, you need the following keys:

**Backend (Render):**
- `WHATSAPP_ACCESS_TOKEN`: Meta Temporary Access Token.
- `PHONE_NUMBER_ID`: WhatsApp Business Phone ID.
- `TEST_PHONE`: Your verified test phone number.
- `RESEND_API_KEY`: API key from Resend.com.
- `TEST_EMAIL`: Your verified sender email.
- `ONESIGNAL_APP_ID`: OneSignal App ID.
- `ONESIGNAL_REST_API_KEY`: OneSignal REST API Key.

**Frontend (Vercel):**
- `NEXT_PUBLIC_API`: Your Render Backend URL.
- `NEXT_PUBLIC_ONESIGNAL_APP_ID`: OneSignal App ID.

## 📖 Admin Instructions
1.  **Login:** Access the Django admin at `[Backend URL]/admin`.
2.  **Data Setup:** Create two triggers: `Login` (slug: `login`) and `Logout` (slug: `logout`).
3.  **Templates:** Add Notification Templates for each trigger.
4.  **Activation:** Ensure the **"Is Active"** checkbox is checked for each template to enable delivery.
5.  **Test:** Use the Frontend Simulator to fire the events.
